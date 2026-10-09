import type { On } from 'claude-code'
import { expect, mock, test } from 'claude-code/testing'

const T0 = 1_000_000
const HOUR = 3_600_000
const MIN = 60_000
const hit = { answer: '', durationMs: 1, isAborted: false, turnId: 't', reason: 'error' } as const

// Stands in for the engine: a 5-hour window that is full and resets in one hour.
const world = (on: On) => {
  const clock = mock.clock(on, { now: T0 })
  const sent: string[] = []
  on('session.usage', () => ({
    value: {
      rateLimits: [{ kind: 'five_hour', percentUsed: 100, resetsAt: new Date(T0 + HOUR).toISOString() }],
    } as never,
  }))
  on('turn.complete', (_$, e) => ({ text: e.answer }))
  on('prompt.submit', (_$, e) => (sent.push(e.text), { text: e.text }))

  return { clock, sent }
}

test('sends continue 5 minutes after the reset', async ($, on) => {
  const { clock, sent } = world(on)
  await $.command.run({ command: 'auto-continue', args: 'on' })
  await $.turn.complete(hit)
  await clock.advance(HOUR + 4 * MIN)
  expect(sent).toEqual([])
  await clock.advance(2 * MIN)
  expect(sent).toEqual(['continue'])
})

test('a prompt the person types cancels the pending resume', async ($, on) => {
  const { clock, sent } = world(on)
  await $.command.run({ command: 'auto-continue', args: 'on' })
  await $.turn.complete(hit)
  await $.prompt.submit({ text: 'I am back', origin: { kind: 'composer' } } as never)
  await clock.advance(2 * HOUR)
  expect(sent).toEqual(['I am back'])
})

test('does nothing while disarmed', async ($, on) => {
  const { clock, sent } = world(on)
  await $.turn.complete(hit)
  await clock.advance(2 * HOUR)
  expect(sent).toEqual([])
})

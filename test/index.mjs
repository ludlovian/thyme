import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import convert, { jsonParse } from '../src/index.mjs'

function dateEqual (act, exp) {
  assert.ok(act instanceof Date, 'not a Date object')
  assert.strictEqual(act.getTime(), exp.getTime(), 'Dates not equal')
}

suite('Thyme', () => {
  suite('Conversion', () => {
    const d1 = new Date('1966-01-19T09:10:11Z')
    const d2 = new Date('1966-01-19T09:10:11.234Z')

    test('standard ISO strings', () => {
      const s1 = '1966-01-19T09:10:11Z'
      const exp1 = d1
      const act1 = convert(s1)
      dateEqual(act1, exp1)

      const s2 = '1966-01-19T09:10:11.234Z'
      const exp2 = d2
      const act2 = convert(s2)
      dateEqual(act2, exp2)
    })

    test('standard ISO strings with no Z', () => {
      const s1 = '1966-01-19T09:10:11'
      const exp1 = d1
      const act1 = convert(s1)
      dateEqual(act1, exp1)

      const s2 = '1966-01-19T09:10:11.234'
      const exp2 = d2
      const act2 = convert(s2)
      dateEqual(act2, exp2)
    })

    test('SQLite Datetime strings with space', () => {
      const s1 = '1966-01-19 09:10:11'
      const exp1 = d1
      const act1 = convert(s1)
      dateEqual(act1, exp1)

      const s2 = '1966-01-19 09:10:11.234'
      const exp2 = d2
      const act2 = convert(s2)
      dateEqual(act2, exp2)
    })

    test('SQLite Datetime strings with Z', () => {
      const s1 = '1966-01-19 09:10:11Z'
      const exp1 = d1
      const act1 = convert(s1)
      dateEqual(act1, exp1)

      const s2 = '1966-01-19 09:10:11.234Z'
      const exp2 = d2
      const act2 = convert(s2)
      dateEqual(act2, exp2)
    })

    test('Strings too long', () => {
      const s1 = '1966-01-19T09:10:11Z '
      const exp1 = s1
      const act1 = convert(s1)
      assert.strictEqual(act1, exp1)

      const s2 = '1966-01-19T09:10:11.234Z '
      const exp2 = s2
      const act2 = convert(s2)
      assert.strictEqual(act2, exp2)
    })

    test('Strings too short', () => {
      const s1 = '1966-01-19T09:10:1'
      const exp1 = s1
      const act1 = convert(s1)
      assert.strictEqual(act1, exp1)

      const s2 = '1966-01-19T09:10:11.23Z'
      const exp2 = s2
      const act2 = convert(s2)
      assert.strictEqual(act2, exp2)
    })

    test('Not strings', () => {
      const s1 = {}
      const exp1 = s1
      const act1 = convert(s1)
      assert.strictEqual(act1, exp1)

      const s2 = 17
      const exp2 = s2
      const act2 = convert(s2)
      assert.strictEqual(act2, exp2)

      const s3 = undefined
      const exp3 = s3
      const act3 = convert(s3)
      assert.strictEqual(act3, exp3)
    })
  })

  suite('JSON parsing', () => {
    const d1 = new Date('1966-01-19T09:10:11Z')
    const d2 = new Date('1966-01-19T09:10:11.234Z')

    test('Parse JSON with date', () => {
      const obj = { foo: d1, bar: d2 }
      const str = JSON.stringify(obj)
      const act = jsonParse(str)
      assert.ok(act.foo instanceof Date)
      assert.ok(act.bar instanceof Date)
      assert.strictEqual(+act.foo, +d1)
      assert.strictEqual(+act.bar, +d2)
    })
  })
})

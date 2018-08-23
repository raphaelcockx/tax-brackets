'use strict'
require('mocha')

const assert = require('assert')
const taxBrackets = require('./tax-brackets.js')

describe('Get', function () {
  describe('Within first bracket', function () {
    it('should return a single rate', function () {
      assert.deepStrictEqual(taxBrackets.get(15000, [[1, 30000, 2], [30001, 60000, 3]]), [[15000, 2]])
    })
  })

  describe('At edge of first bracket', function () {
    it('should return the full amount in one bracket', function () {
      assert.deepStrictEqual(taxBrackets.get(30000, [[1, 30000, 2], [30001, 60000, 3]]), [[30000, 2]])
    })
  })

  describe('Within second bracket', function () {
    it('should return a full and partial bracket', function () {
      assert.deepStrictEqual(taxBrackets.get(45000, [[1, 30000, 2], [30001, 60000, 3]]), [[30000, 2], [15000, 3]])
    })
  })
})

describe('Calculate', function () {
  describe('Within first bracket', function () {
    it('should use first bracket only', function () {
      assert.strictEqual(taxBrackets.calculate(15000, [[1, 30000, 2], [30001, 60000, 3]]), 15000 * 0.02)
    })
  })

  describe('At edge of first bracket', function () {
    it('should return the full amount at one rate', function () {
      assert.strictEqual(taxBrackets.calculate(30000, [[1, 30000, 2], [30001, 60000, 3]]), 30000 * 0.02)
    })
  })

  describe('Within second bracket', function () {
    it('should return the total of a full and partial bracket amount', function () {
      assert.strictEqual(taxBrackets.calculate(45000, [[1, 30000, 2], [30001, 60000, 3]]), 30000 * 0.02 + 15000 * 0.03)
    })
  })
})

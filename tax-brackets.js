/* global define */

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.taxBrackets = factory()
  }
})(this, function () {
  'use strict'

  const get = function (amount, rates) {
    var brackets = []

    rates.forEach(rate => {
      const [min, max, percentage] = rate

      // Our value includes all of this bracket
      if (amount > max) {
        brackets.push([max - min + 1, percentage])
      }

      // Our value falls within this bracket
      if (amount >= min && amount <= max) {
        brackets.push([amount - min + 1, percentage])
      }
    })

    return brackets
  }

  const calculate = function (amount, rates) {
    var tax = 0
    const brackets = get(amount, rates)

    brackets.forEach(bracket => {
      const [amount, percentage] = bracket
      tax = tax + amount * (percentage / 100)
    })

    tax = Math.round(tax)
    return tax
  }

  return {
    get,
    calculate
  }
})

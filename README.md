# tax-brackets

Easily calculate tax brackets and total payable for **progressive taxation** systems

## What does this do?

tax-brackets is a small module working in both Node and the browser that lets you calculate taxes for a progressive taxation system. Such systems do not simply apply a fixed percentage to the complete amount but will split it up in so called brackets. Each of these brackets - at least one - is then taxed at a different, increasing rate.

A bracket is defined by a percentage and the lowest and highest taxable amount at that rate.

## What does this module offer?

Two functions are available:

- `calculate` take an amount and a set of brackets and return the total amount payable
- `get` will take this same input and show exactly how the amount is split up and what the individual amounts are taxed at. This would work well if you not only want to show the total payable but also explain how it was calculated.

## How to get started

### In Node

```js
const taxBrackets = require('tax-brackets')

/*
Both functions expect the rates to be passed as an array of arrays.
Each element is composed as such: [lowestAmount, highestAmount, rate (in percentage)]
*/

const rates = [[1, 50000, 5], [50001, 100000, 10], [100001, Infinity, 15] // Note the need to use Infinity in the last item

/*
This will itself return an array with each element composed as such: [amount taxable, rate applied]
In the example below, the result will be [[50000, 5], [25000, 10]]. You could render that to e.g a table
*/

const brackets = taxBrackets.get(75000, rates)

/*
Using the same amount and rates, the total payable becomes (50000 * 0.05) + (25000 * 0.10) or 5000
*/

const tax = taxBrackets.calculate(75000, rates)
```

### In the browser

Most of this code will be the same. You should however load tax-brackets from the `tax-brackets.js` file after which both functions will be available under the global variable `taxBrackets`. The (simplified) code thus becomes:

```html
<script src="tax-brackets.js"></script>

<script>
const rates = [[1, 50000, 5], [50001, 100000, 10], [100001, Infinity, 15]
const brackets = taxBrackets.get(75000, rates)
const tax = taxBrackets.calculate(75000, rates)
</script>
```

## Thing to note

As of right now, this module is mostly the answer to me noticing I was writing the same (sloppy) code over and over again. In other words: it scratches my itch but might not do so for you.

That means for instance **no checking** is done on the **rates** you provide. You should particularly be careful to not have the amounts overlap and avoid missing ranges. Providing rates like `[[1, 25000, 2], [25000, 35000, 4], [40000, Infinity]]` will get you in trouble. It also explains the need to go up to Infinity (but not beyond) on the last element in the array.

Finally, please note that the amount returned by the `calculate` function will always be rounded to the nearest integer. That's somewhat of an arbitrary choice and might change in the (near future).

# License

MIT (c) 2018 Raphael Cockx ([@raphaelcockx](https://twitter.com/raphaelcockx))

"use strict"

const Decimal = require("decimal.js")
const isPlainObject = require("is-plain-obj")

module.exports = conversionRates => {
	if (!isPlainObject(conversionRates)) {
		throw new TypeError(`Expected a plain object, got ${typeof conversionRates}`)
	}

	const conversionMap = new Map(Object.entries(conversionRates))
	const conversions = {}

	for (const [from, fromRate] of conversionMap) {
		Object.defineProperty(conversions, from, {
			get() {
				const secondConversions = {}
				for (const [to, toRate] of conversionMap) {
					Object.defineProperty(secondConversions, to, {
						get() {
							return amount => {
								if (fromRate === toRate) {
									return amount
								}

								amount = new Decimal(amount)

								if (fromRate === 1) {
									return amount
										.times(toRate)
										.toNumber()
								}

								return amount
									.times(toRate)
									.times(new Decimal(1).dividedBy(fromRate))
									.toNumber()
							}
						},
						enumerable: true
					})
				}

				return secondConversions
			},
			enumerable: true
		})
	}

	return conversions
}

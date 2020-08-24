"use strict"

const Decimal = require("decimal.js")
const isPlainObject = require("is-plain-obj")

module.exports = conversionRates => {
	if (!isPlainObject(conversionRates)) {
		throw new TypeError(`Expected a plain object, got ${typeof conversionRates}`)
	}

	const conversionMap = Object.entries(conversionRates)
	const isUsingMultiples = conversionMap.every(([_, value]) => typeof value === "number")
	const conversions = {}

	for (const [from, fromConverter] of conversionMap) {
		Object.defineProperty(conversions, from, {
			get() {
				const secondConversions = {}
				for (const [to, toConverter] of conversionMap) {
					Object.defineProperty(secondConversions, to, {
						get() {
							if (isUsingMultiples) {
								// TODO: Move to `createConverter.multiples` in next major version.
								return amount => {
									if (fromConverter === toConverter) {
										return amount
									}

									amount = new Decimal(amount)

									if (fromConverter === 1) {
										return amount
											.times(toConverter)
											.toNumber()
									}

									return amount
										.times(toConverter)
										.times(new Decimal(1).dividedBy(fromConverter))
										.toNumber()
								}
							}

							return amount => {
								const fromBase = toConverter === true ? amount => amount : toConverter.fromBase
								const toBase = fromConverter === true ? amount => amount : fromConverter.toBase
								return fromBase(toBase(new Decimal(amount))).toNumber()
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

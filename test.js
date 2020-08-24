const test = require("ava")
const createConverter = require(".")

test("main", t => {
	const currencyConverter = createConverter({
		usd: 1,
		nzd: 1.5,
		gbp: 0.5
	})
	t.is(currencyConverter.usd.usd(1), 1)
	t.is(currencyConverter.usd.nzd(1), 1.5)
	t.is(currencyConverter.gbp.nzd(0.5), 1.5)

	const temperatureConverter = createConverter({
		celsius: true,
		fahrenheit: {
			toBase: amount => amount.minus(32).times(5).dividedBy(9),
			fromBase: amount => amount.times(9).dividedBy(5).add(32)
		},
		kelvin: {
			toBase: amount => amount.minus(273.15),
			fromBase: amount => amount.add(273.15)
		}
	})
	t.is(temperatureConverter.celsius.kelvin(22), 295.15)
})

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
})

import Decimal from "decimal.js"

/**
Create a unit converter.
@param conversionRates The conversion rates between units.
@example
```
const createConverter = require("create-converter");

const converter = createConverter({
	usd: 1,
	nzd: 1.5,
	gbp: 0.5
});

converter.nzd.gbp(12);
//=> 4
```
*/
declare function createConverter<UnitType extends string>(conversionRates: Record<UnitType, number | Decimal> | Record<UnitType, true | {
	toBase: (amount: Decimal) => Decimal
	fromBase: (amount: Decimal) => Decimal
}>): Record<UnitType, Record<UnitType, (amount: number) => number>>

export = createConverter

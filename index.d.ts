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
declare function createConverter<UnitType extends string>(conversionRates: Record<UnitType, number> | Record<UnitType, true | {
	toBase: (amount: Decimal) => number
	fromBase: (amount: Decimal) => number
}>): Record<UnitType, Record<UnitType, (amount: number) => number>>

export = createConverter

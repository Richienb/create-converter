# create-converter [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/create-converter/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/create-converter)

Create a unit converter.

[![NPM Badge](https://nodei.co/npm/create-converter.png)](https://npmjs.com/package/create-converter)

## Install

```sh
npm install create-converter
```

## Usage

```js
const createConverter = require("create-converter");

const currencyConverter = createConverter({
	usd: 1,
	nzd: 1.5,
	gbp: 0.5
});

currencyConverter.nzd.gbp(12);
//=> 4

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

temperatureConverter.celsius.kelvin(22)
//=> 295.15
```

## API

### createConverter(conversionRates)

#### conversionRates

Type: `object`

The conversion rates between units.

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

const converter = createConverter({
	usd: 1,
	nzd: 1.5,
	gbp: 0.5
});

converter.nzd.gbp(12);
//=> 4
```

## API

### createConverter(conversionRates)

#### conversionRates

Type: `object`

The conversion rates between units.

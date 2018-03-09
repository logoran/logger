
# logoran-logger

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

 Development style logger middleware for [logoran](https://github.com/logoran/logoran).

```
2018-03-09 16:10:21 <-- GET /
--> GET / 200 835ms 746b
2018-03-09 16:10:21 <-- GET /
--> GET / 200 960ms 1.9kb
2018-03-09 16:10:21 <-- GET /users
--> GET /users 200 357ms 922b
2018-03-09 16:10:21 <-- GET /users?page=2
--> GET /users?page=2 200 466ms 4.66kb
```

## Installation

```js
$ npm install logoran-logger
```

## Example

```js
const logger = require('logoran-logger')
const Logoran = require('logoran')

const app = new Logoran()
app.use(logger())
```

## Notes

  Recommended that you `.use()` this middleware near the top
  to "wrap" all subsequent middleware.

## License

  MIT

[npm-image]: https://img.shields.io/npm/v/logoran-logger.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/logoran-logger
[travis-image]: https://img.shields.io/travis/logoran/logger.svg?style=flat-square
[travis-url]: https://travis-ci.org/logoran/logger

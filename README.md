# SeedableJS
A simple class based seedable random generator in javascript.

## About

The goal is to provide an easy to use seeded random generator comming with
set of helpers to quickly generate random numbers, strings, arrays ...

It use a combinaison of the xmur3 hashing function and the mulberry32 pseudo random generator
https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316%2347593316


## Usage
```
npm install @llagache/seedablejs
```

### Example :
```javascript
import Seedable from "@llagache/seedablejs";
const s = new Seedable("seed");

var randomValue = s.value();
```
### Constructor :
```javascript
/**
* Create a new Seedable random generator
* @param {string?} optional seed 
*/
new Seedable(seed)
```
### Methods :
```javascript
/**
 * Update seed
 * @param {string} seed 
 */
updateSeed(seed=null)
```
```javascript
/**
 * @returns random number between 0 & 1
 */
value()
```
```javascript
/**
 * @param {number} min 
 * @param {number} max 
 * @returns random number between min & max
 */
range(min, max)
```
```javascript
/**
 * @param {array} array 
 * @returns random element from an array
 */
element(array)
```
```javascript
/**
 * @param {array} array 
 * @param {number} min 
 * @param {number} max 
 * @param {bool} autorizeDuplicate 
 * @returns mutiple (between min & max) random elements from an array
 */
elements(array, min, max, autorizeDuplicate=true)
```
```javascript
/**
 * @param {*} sizeX 
 * @param {*} sizeY 
 * @returns random image url from piscsum.photos
 */
image(sizeX, sizeY)
```
```javascript
/**
 * @param {number} min 
 * @param {number} max 
 * @returns random lorem ipsum sentence
 */
lorem(min, max)
```
```javascript
/**
 * @param {function} factoryFn 
 * @param {number} length 
 * @param {bool} unique 
 * @returns random array of elements based on the factoryFn
 */
pool(factoryFn, length, unique = false)
```
```javascript
/**
 * @param {date} start 
 * @param {date} end 
 * @returns random date between start & end
 */
date(start, end)
```
```javascript
/**
 * @param {number} length 
 * @returns random string using these char [ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]
 */
string(length)
```
### Static Methods :
```javascript
/**
 * @param {number} length 
 * @returns random seed 
 */
Seedable.randomSeed()
```

## Author

Lagache Louis ([@llagache_dev](https://twitter.com/llagache_dev))


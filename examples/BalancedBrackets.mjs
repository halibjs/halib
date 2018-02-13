import { foldl, shuffle, repeat, map, random } from 'halib'
import { printTable } from './output.mjs'


// from http://rosettacode.org/wiki/Balanced_brackets





const bal = foldl ((z, x) => z < 0 ? z : x === '[' ? z + 1 : z - 1) (0)
const brackets = n => shuffle(repeat(n, '[]'))



const fn = (n, _, b = brackets(random(0, n))) => [b, bal(b) ? ': NOT OK' : ': OK']
const res = map (fn) (repeat(10, 6))
printTable(res)










/*

[]][[[]][]   : NOT OK
[[[]]]       : OK
][[][]][     : NOT OK
][]][][][[   : NOT OK
[][][]       : OK
][[]         : NOT OK
             : OK
[[]][[][]]   : OK
][[[]]]][[   : NOT OK
][[][]]][[][ : NOT OK

*/












import { map, sort, sortBy, sortDescBy, count, intersperse, cp, join, unchars, head, last } from 'halib'
import { printv1D } from './output.mjs'




// from http://rosettacode.org/wiki/Letter_frequency, translation of Haskell


const str = 'letterfrequency'


const sortChar = sortBy(head)
const sortCharLoc = sortBy((x, y) => x[0].localeCompare(y[0]))

const sortFreq = sortDescBy(last)




const lf1 = cp(count, sort)
const lf2 = cp(sort, count)
const lf3 = cp(sortChar, count)
const lf4 = cp(sortCharLoc, count)

const lf5 = cp(sortFreq, count)






const draw = xs => join ('   ') (map (x => unchars(intersperse(': ')(x))) (xs))
printv1D(map (lf => cp(draw, lf)(str)) ([lf1, lf2, lf3, lf4, lf5]))







/*

c: 1   e: 4   f: 1   l: 1   n: 1   q: 1   r: 2   t: 2   u: 1   y: 1
c: 1   e: 4   f: 1   l: 1   n: 1   q: 1   r: 2   t: 2   u: 1   y: 1
c: 1   e: 4   f: 1   l: 1   n: 1   q: 1   r: 2   t: 2   u: 1   y: 1
c: 1   e: 4   f: 1   l: 1   n: 1   q: 1   r: 2   t: 2   u: 1   y: 1


e: 4   t: 2   r: 2   l: 1   f: 1   q: 1   u: 1   n: 1   c: 1   y: 1

*/









import { cp, uncons, cons, span, range, head, concatMap, len, tail, split, digit } from 'halib'
import { printh1D } from './output.mjs'



// from http://rosettacode.org/wiki/Range_expansion



const numb = (c, cs) => {
    const [digs, css] = span (digit) (cs)
    return [parseInt(cons(c) (digs)), css]
}

const parse = str => {
    const [c, cs] = uncons (str)
    const [n, rest] = c === '-' ? numb (c, cs) : numb ('+', str)
    return range (n, len (rest) ? cp(head, parse, tail) (rest) : n)
}

const list = '-6,-3--1,3-5,7-11,14,15,17-20'






const res = concatMap (parse) (split (',') (list))
printh1D(res)








/*

-6 -3 -2 -1 3 4 5 7 8 9 10 11 14 15 17 18 19 20

*/














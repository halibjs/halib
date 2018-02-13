import { takeFrom, drop, init, elemIndex, seqIndex } from 'halib'
import { printv1D } from './output.mjs'



// from http://rosettacode.org/wiki/Substring


const str = 'abcdefgh'

const res1 = takeFrom (2) (3) (str)
const res2 = drop (2) (str)
const res3 = init (str)
const res4 = takeFrom (elemIndex ('b') (str)) (3) (str)
const res5 = takeFrom (seqIndex ('bc') (str)) (3) (str)






printv1D([res1, res2, res3, res4, res5])




/*

cde
cdefgh
abcdefg
bcd
bcd

*/













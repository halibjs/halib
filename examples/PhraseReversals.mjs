import { reverse, map, words, unwords, cp } from 'halib'
import { printv1D } from './output.mjs'



// from http://rosettacode.org/wiki/Phrase_reversals


const phrase = 'rosetta code phrase reversal'

const revWhole = reverse
const revWords = cp(unwords, map(reverse), words)
const revOrder = cp(unwords, reverse, words)





printv1D([revWhole(phrase), revWords(phrase), revOrder(phrase)])






/*

lasrever esarhp edoc attesor
attesor edoc esarhp lasrever
reversal phrase code rosetta

*/
























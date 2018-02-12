import { startsWith, seq, seqIndex, seqIndices, endsWith, unwords } from 'halib'
import { printv1D } from 'output'



// from http://rosettacode.org/wiki/String_matching



const str = 'abcdef'

const res1 = startsWith ('ab') (str)
const res2 = seq ('cde') (str)
const res3 = endsWith ('ef') (str)


const res4 = seqIndex ('cde') (str)
const res5 = seqIndices ('bc') ('abcabcabc')



printv1D([res1, res2, res3, res4, unwords(res5)])








/*

true
true
true
2
1 4 7

*/





































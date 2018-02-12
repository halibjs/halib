import { len, split, seqIndices, countSeq, liftM2L } from 'halib'
import { printh1D } from 'output'



// from http://rosettacode.org/wiki/Count_occurrences_of_a_substring


const countSubstring1 = subStr => str => len(split (subStr) (str)) - 1
const countSubstring2 = subStr => str => len(seqIndices (subStr) (str))
const countSubstring3 = countSeq





const fns = [countSubstring1, countSubstring2, countSubstring3]
const args = [['th', 'the three truths'],
              ['abab', 'ababababab'],
              ['a*b', 'abaabba*bbaba*bbab']]

const res = liftM2L ((fn, arg) => fn (arg[0]) (arg[1])) (fns) (args)

printh1D(res)




/*

3 2 2 3 2 2 3 2 2

*/



















































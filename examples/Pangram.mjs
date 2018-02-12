import { cp, nul, minus, all, elem, range, toLower, map, append } from 'halib'
import { printv1D } from 'output'




// from http://rosettacode.org/wiki/Pangram_checker



const text1 = "The quick brown fox jumps over the lazy dog."
const text2 = "The quick brown fox jumped over the lazy dog."
const abc = range('a', 'z')



const pangram1 = (text, txt = toLower(text)) => all (c => elem (c) (txt)) (abc)
const pangram2 = cp(nul, minus(abc), toLower)





const fns = [pangram1, pangram2]
printv1D(append(map (fn => fn(text1)) (fns))(map (fn => fn(text2)) (fns)))






/*

true
true
false
false

*/









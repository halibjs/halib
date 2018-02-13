import { len, lines, filter, grouppBy, last, sortDescBy, cp, toObj, alpha, all, concatMap,head,take } from 'halib'
import { text } from './unixdict.mjs'
import { print, drawArr3D, printv1D } from './output.mjs'



// from http://rosettacode.org/wiki/Textonyms


const mapping_arr = 
    [['a','2'],['b','2'],['c','2'],
     ['d','3'],['e','3'],['f','3'],
     ['g','4'],['h','4'],['i','4'],
     ['j','5'],['k','5'],['l','5'],
     ['m','6'],['n','6'],['o','6'],
     ['p','7'],['q','7'],['r','7'],['s','7'],
     ['t','8'],['u','8'],['v','8'],
     ['w','9'],['x','9'],['y','9'],['z','9']]

const words = lines (text)
const abc_words = filter (all(alpha)) (words)
const mapping = toObj(mapping_arr)
const digit_combs = grouppBy (w => concatMap (l => mapping[l]) (w)) (abc_words)
const textonyms = filter (x => len (last(x)) > 1) (digit_combs)
const ambiguity = cp(len, last)
const digit_length = cp(len, head)

const top5_amb = take (5) (sortDescBy (ambiguity) (textonyms))
const top5_dig_len = take (5) (sortDescBy (digit_length) (textonyms))


const res = `There are ${ len (abc_words) } words in unixdict.txt which can be represented by the digit key mapping.
They require ${ len (digit_combs) } digit combinations to represent them.
${ len (textonyms) } digit combinations represent Textonyms.`



const topAmbStr = 'Top 5 in ambiguity:'
const topLenStr = 'Top 5 in length:'
printv1D([res, topAmbStr, drawArr3D(top5_amb), topLenStr, drawArr3D(top5_dig_len)])



/*

There are 24978 words in unixdict.txt which can be represented by the digit key mapping.
They require 22903 digit combinations to represent them.
1473 digit combinations represent Textonyms.
Top 5 in ambiguity:
[ [ 269, [ amy, any, bmw, bow, box, boy, cow, cox, coy ] ],
  [ 729, [ paw, pax, pay, paz, raw, ray, saw, sax, say ] ],
  [ 2273, [ acre, bard, bare, base, cape, card, care, case ] ],
  [ 726, [ pam, pan, ram, ran, sam, san, sao, scm ] ],
  [ 426, [ gam, gao, ham, han, ian, ibm, ibn ] ] ]
Top 5 in length:
[ [ 25287876746242, [ claustrophobia, claustrophobic ] ],
  [ 7244967473642, [ schizophrenia, schizophrenic ] ],
  [ 666628676342, [ onomatopoeia, onomatopoeic ] ],
  [ 49376746242, [ hydrophobia, hydrophobic ] ],
  [ 2668368466, [ contention, convention ] ] ]


*/





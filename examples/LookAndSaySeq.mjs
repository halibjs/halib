import { cp, len, head, concatMap, section, iterate, liftM2R, add } from 'halib'
import { printv1D } from './output.mjs'


// from http://rosettacode.org/wiki/Look-and-say_sequence, translation of Haskell




const seq = cp(concatMap(liftM2R (add) (len) (head)), section)

const seq2 = cp(concatMap(run => len(run) + head(run)), section)



const res = iterate (10) (seq) ('1')




printv1D(res)




/*

1
11
21
1211
111221
312211
13112221
1113213211
31131211131221
13211311123113112211
11131221133112132113212221

*/














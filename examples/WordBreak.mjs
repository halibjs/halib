import { cp, subsequences, concat, map, del, permutations, concatMap, elemIndex, unwords } from 'halib'
import { print2D } from './output.mjs'



// from http://rosettacode.org/wiki/Word_break_problem



const input = ['a', 'bc', 'abc', 'cd', 'b']
const dict  = ['abcd', 'abbc', 'abcbcd', 'acdbc', 'abcdd']


const arrs = cp(concatMap(permutations), del([]), subsequences) (input)
const words = map (concat) (arrs)
const res = map ((dw, _, ind = elemIndex(dw)(words)) => ind > -1 ? [dw, unwords(arrs[ind])] : ["Not possible"]) (dict)


print2D(res)




/*



abcd a b cd
abbc a b bc
abcbcd a bc b cd
acdbc a cd bc
Not possible



*/

















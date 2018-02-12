import { map, head, tail, words, unwords, cp, toUpper, cons } from 'halib'
import { print } from 'output'





const str = 'The quick brown fox jumps over the lazy dog.'


const toUC = w => cons (toUpper (head(w))) (tail(w))
const upper = cp(unwords, map(toUC), words)


print(upper(str))






/*

The Quick Brown Fox Jumps Over The Lazy Dog.

*/































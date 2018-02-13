import { lines, reverse, len, filter, take, intersect, map, minus, nub, min, elemSorted,
         groupBy, keys, foldr, foldl, unwords } from 'halib'
import { text } from './unixdict.mjs'
import { draw2D, printv1D } from './output.mjs'




// from http://rosettacode.org/wiki/Palindrome_detection, http://rosettacode.org/wiki/Semordnilap



const words = lines (text)

const isPalindrome = w => w === reverse(w)
const palindromes = filter (isPalindrome) (words)


const minW = w => min (w, reverse(w))



const sem1 = minus (intersect (words) (map (reverse) (words))) (palindromes)
const semord1 = nub (map (minW) (sem1))




const sem2 = filter (w => elemSorted(reverse(w))(words) && !isPalindrome(w)) (words)
const semord2 = nub (map (minW) (sem2))




const semord3 = filter (x => len(x) > 1) (groupBy (minW) (words))




const fn = (w, z) => (z[0].has(reverse(w)) ? z[1].push(w) : z[0].add(w), z)
const semord4 = reverse(foldr (fn) ([new Set(), []]) (words)[1])




const dict = foldl ((z, w) => (z[w] = reverse(w), z)) ({}) (words)
const isSem = w => dict[dict[w]]
const fn2 = (z, k) => (isSem(k) && k < dict[k] ? z.push([k, dict[k]]) : z, z)
const semord5 = foldl (fn2) ([]) (keys(dict))






const res1 = 'palindromes: ' + len (palindromes)
const res2 = take (5) (palindromes)

const res3 = 'semordnilaps1: ' + len (semord1)
const res4 = take (5) (map (x => [x, reverse(x)]) (semord1))

const res5 = 'semordnilaps2: ' + len (semord2)
const res6 = take (5) (map (x => [x, reverse(x)]) (semord2))

const res7 = 'semordnilaps3: ' + len (semord3)
const res8 = take (5) (semord3)

const res9 = 'semordnilaps4: ' + len (semord4)
const res10 = take (5) (map (x => [x, reverse(x)]) (semord4))

const res11 = 'semordnilaps5: ' + len (semord5)
const res12 = take (5) (semord5)





const draw = (xs, ind) => typeof xs === 'string' ? xs : ind === 1 ? unwords(xs) : draw2D(xs)
printv1D(map (draw) ([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11, res12]))





/*

palindromes: 88
a aaa aba ababa ada
semordnilaps1: 158
able elba
abut tuba
ac ca
ah ha
al la
semordnilaps2: 158
able elba
abut tuba
ac ca
ah ha
al la
semordnilaps3: 158
able elba
abut tuba
ac ca
ah ha
al la
semordnilaps4: 158
able elba
abut tuba
ac ca
ah ha
al la
semordnilaps5: 158
able elba
abut tuba
ac ca
ah ha
al la

*/







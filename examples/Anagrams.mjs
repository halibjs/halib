import { lines, cp, head, sort, maxLen, len, filter, combinations, sortDescBy, takeWhile,
         concatMap, maximumBy, groupBy, all, chain, eq } from 'halib'
import { text } from 'unixdict'
import { print, print2D, print3D } from 'output'






// from http://rosettacode.org/wiki/Anagrams

const hlen = cp(len, head)


const words = lines(text)
const anagrams = cp(filter(x => len(x) > 1), groupBy(sort)) (words)


const mxl = maxLen(anagrams)
const ml_anagrams1 = filter (cp(eq(mxl), len)) (anagrams)


const sorted = sortDescBy (len) (anagrams)
const ml_anagrams2 = takeWhile (cp(eq(hlen(sorted)), len)) (sorted)


const ml_anagrams3 = cp(maximumBy(hlen), groupBy(len)) (anagrams)





// from http://rosettacode.org/wiki/Anagrams/Deranged_anagrams

const deranged = xs => all((x, ind) => x !== xs[1][ind])(xs[0])



const max_derans1 = cp(maximumBy(hlen), filter(deranged), concatMap(combinations(2))) (anagrams)


const max_derans2 = chain(
    groupBy(sort),
    filter(x => len(x) > 1),
    concatMap(combinations(2)),
    filter(deranged),
    maximumBy(hlen)) (words)





print3D([ml_anagrams1, ml_anagrams2, ml_anagrams3])
print('')
print2D([max_derans1, max_derans2])






/*

abel able bale bela elba
alger glare lager large regal
angel angle galen glean lange
caret carte cater crate trace
elan lane lean lena neal
evil levi live veil vile
 
abel able bale bela elba
alger glare lager large regal
angel angle galen glean lange
caret carte cater crate trace
elan lane lean lena neal
evil levi live veil vile
 
abel able bale bela elba
alger glare lager large regal
angel angle galen glean lange
caret carte cater crate trace
elan lane lean lena neal
evil levi live veil vile

excitation intoxicate
excitation intoxicate

*/





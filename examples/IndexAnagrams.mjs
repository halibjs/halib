import { cp, foldl, nub, drop, sort, values, sum, fact, countOBy, id, each, takeWhile,
         elemIndex, permutations } from 'halib'
import { print } from './output.mjs'



// from https://stackoverflow.com/questions/18644470/anagram-index-calculation


// naivee (brute-force) solution => useful to understand the task
const listPos = word => cp(elemIndex(word), nub, permutations, sort) (word) + 1


print(listPos('EGYPTIAN')) // => 6453
//print(listPos('POSSESSION')) // => 41696     // slow 






const listPosition = word => {
    let res = 0
    let uniq, obj, val

    each ((c, ind) => {
        uniq = cp(sort, nub, drop(ind)) (word)
        obj = cp(countOBy(id), drop(ind)) (word)

        each (uc => {
            obj[uc]--
            val = values(obj)
            res += foldl ((z, v) => z /= fact(v)) (fact(sum(val))) (val)
            obj[uc]++
        }) (takeWhile (uc => uc !== c) (uniq))
    }) (word)
    return res + 1
};


print(listPosition('EGYPTIAN')) // => 6453
print(listPosition('POSSESSION')) // => 41696










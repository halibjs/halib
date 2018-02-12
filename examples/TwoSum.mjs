import { findIndex, elemIndexSorted, bindL, guardL, returnL } from 'halib'
import { printv1D, drawh1D } from 'output'


// from http://rosettacode.org/wiki/Two_Sum



const twoSum1 = (numbers, s) => bindL(numbers)
                  ((x, indx) => bindL(numbers)
                  ((y, indy) => guardL(x + y === s && indy > indx)
                          (_ => returnL([indx, indy]))))[0]




const twoSum2 = (numbers, s) => {
    const getInd = x => elemIndexSorted (s - x) (numbers)
    const index = findIndex ((x, i, ind = getInd(x)) => ind !== -1 && ind !== i) (numbers)
    return index !== -1 ? [index, getInd(numbers[index])] : []
}






const input = [0, 2, 11, 19, 90]
const ts1 = drawh1D(twoSum1(input, 21))
const ts2 = drawh1D(twoSum2(input, 21))


printv1D([ts1, ts2])







/*

1 3
1 3

*/


































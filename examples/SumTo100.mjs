import { foldl, foldr, append, unchars, tail, len, permRep, filter, map, sort, nub, last,
         section, divx, head, take, takeLast, sortDescBy, sortDesc, find } from 'halib'
import { printv1D, drawv1D, draw2D, drawh1D } from 'output'


// from http://rosettacode.org/wiki/Sum_to_100, translation of Haskell, Javascript



const asSum = xs => {
    const fn = (sign, a, ind, d = ind + 1) => {
        return sign !== 0 ? (a.n += sign * Number(unchars(append([d])(a.d))), a.d = [], a) :
                            (a.d = append ([d]) (a.d), a)
    }
    const dct = foldr (fn) ({ d: [], n: 0 }) (xs)
    return dct.n + (len(dct.d) > 0 ? Number(unchars(dct.d)) : 0)
}



const asString = xs => {
    const fn = (a, sign, ind, d = String(ind + 1)) => sign === 0 ? (a + d) : (a + (sign > 0 ? ' +' : ' -') + d)
    const ns = foldl (fn) ('') (xs)
    return ns[0] === '+' ? tail(ns) : ns
}


const universe = filter (x => x[0] !== 1) (permRep(9)([0,1,-1]))
const sumsTo100 = map (asString) (filter(x => asSum(x) === 100)(universe))


const allNNS = sort(filter (x => x >= 0) (map(asSum)(universe)))
const com10 = take (10) (sortDescBy (last) (map(divx (head) (len)) (section(allNNS))))


const uniqNNS = nub(allNNS)
const notExpr = find ((x, ind) => x !== ind) (sort(uniqNNS)) - 1


const largest10 = sortDesc(takeLast (10) (uniqNNS))






const sumsTo100Str = 'Sums to 100:'
const com10Str = '\n10 commonest sums [sum, number of routes to it]:'
const notExprStr = '\nFirst positive integer not expressible as a sum of this kind:'
const largest10Str = '\n10 largest sums:'

printv1D([sumsTo100Str, drawv1D(sumsTo100),
          com10Str, draw2D(com10),
          notExprStr, notExpr,
          largest10Str, drawh1D(largest10)])






/*


Sums to 100:
123 +45 -67 +8 -9
123 +4 -5 +67 -89
123 -45 -67 +89
123 -4 -5 -6 -7 +8 -9
12 +3 +4 +5 -6 -7 +89
12 +3 -4 +5 +67 +8 +9
12 -3 -4 +5 -6 +7 +89
1 +23 -4 +56 +7 +8 +9
1 +23 -4 +5 +6 +78 -9
1 +2 +34 -5 +67 -8 +9
1 +2 +3 -4 +5 +6 +78 +9
 -1 +2 -3 +4 +5 +6 +78 +9

10 commonest sums [sum, number of routes to it]:
9 46
27 44
1 43
15 43
21 43
45 42
3 41
5 40
7 39
17 39

First positive integer not expressible as a sum of this kind:
211

10 largest sums:
123456789 23456790 23456788 12345687 12345669 3456801 3456792 3456790 3456788 3456786


*/


























import { len, zipWith, range, filter, permutations, minus, cons, all, uniq, append, add, sub,
         foldM, map, unlines, unwords } from 'halib'
import { printv1D, print } from 'output'




// from http://rosettacode.org/wiki/N-queens_problem, translation of Haskell


const draw = b => unlines(map (x => unwords (map ((_, ind) => x === ind + 1 ? 'q' : '.') (b))) (b)) + '\n'


const queen1 = (n, r = range(1, n)) => {
    const check = (f, xs) => uniq(zipWith (f) (r) (xs))
    return filter (xs => check(add, xs) && check(sub, xs)) (permutations(r))
}

const res1 = queen1(8)




const queen2 = (n, r = range(1, n)) => {
    const notDiag = (q, qs) => all ((qi, i) => Math.abs(q - qi) !== i + 1) (qs)
    const fn = qs => map (q => cons (q) (qs)) (filter(q => notDiag(q, qs)) (minus (r)(qs)))
    return foldM (fn) ([]) (r)
}

const res2 = queen2(8)




printv1D(cons(len(res1))(map (draw) (res1)))
print('=================================================')
printv1D(cons(len(res2))(map (draw) (res2)))




/*

92
q . . . . . . .
. . . . q . . .
. . . . . . . q
. . . . . q . .
. . q . . . . .
. . . . . . q .
. q . . . . . .
. . . q . . . .

q . . . . . . .
. . . . . q . .
. . . . . . . q
. . q . . . . .
. . . . . . q .
. . . q . . . .
. q . . . . . .
. . . . q . . .

q . . . . . . .
. . . . . . q .
. . . q . . . .
. . . . . q . .
. . . . . . . q
. q . . . . . .
. . . . q . . .
. . q . . . . .

      .
      .
      .

*/






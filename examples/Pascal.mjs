import { zipWith, append, iterate, iter, map, range, last, len, cp, unwords, unlines, add,
         repeat, maximum } from 'halib'
import { print } from './output.mjs'



// from http://rosettacode.org/wiki/Pascal%27s_triangle, translation of Haskell


const pascal1 = n => {
    const nextRow = row => zipWith (add) (append([0]) (row)) (append(row) ([0]))
    return iterate(n - 1)(nextRow) ([1])
}


const res1 = pascal1(10)




const pascal2 = n => {
    const binCoeff = n => k => iter (k > n - k ? n - k : k) ((x, i) => x * (n - i) / (i + 1))(1)
    const pasc = n => map (binCoeff(n - 1)) (range(0, n - 1))
    return map (pasc) (range(1, n))
};


const res2 = pascal2(15)











const draw = pascal => {
    const field = maximum(map (cp(len, String)) (last(pascal)))  
    const rows = map (r => unwords(map (n => repeat (field - len(String(n)), ' ') + n) (r))) (pascal)
    const longest = len(last(rows))
    return unlines(map (r => repeat (Math.floor((longest - len(r)) / 2), ' ') + r) (rows))
}


print(draw(res1))
print(draw(res2))







/*

                    1
                  1   1
                1   2   1
              1   3   3   1
            1   4   6   4   1
          1   5  10  10   5   1
        1   6  15  20  15   6   1
      1   7  21  35  35  21   7   1
    1   8  28  56  70  56  28   8   1
  1   9  36  84 126 126  84  36   9   1
                                      1
                                   1    1
                                 1    2    1
                              1    3    3    1
                            1    4    6    4    1
                         1    5   10   10    5    1
                       1    6   15   20   15    6    1
                    1    7   21   35   35   21    7    1
                  1    8   28   56   70   56   28    8    1
               1    9   36   84  126  126   84   36    9    1
             1   10   45  120  210  252  210  120   45   10    1
          1   11   55  165  330  462  462  330  165   55   11    1
        1   12   66  220  495  792  924  792  495  220   66   12    1
     1   13   78  286  715 1287 1716 1716 1287  715  286   78   13    1
   1   14   91  364 1001 2002 3003 3432 3003 2002 1001  364   91   14    1

*/






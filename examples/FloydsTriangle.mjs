import { range, cp, map, len, last, repeat, unwords, unlines, sum } from 'halib'
import { print } from 'output'


// from http://rosettacode.org/wiki/Floyd%27s_triangle

const fn = (row, _, max = sum(range(1, row))) => range((max + 1) - row, max)
const floyd = rows => map (fn) (range(1, rows))


const draw = floyd => {
    const widths = map (cp(len, String)) (last(floyd))
    const fn = (v, ind) => repeat(widths[ind] - len(String (v)), ' ') + v
    return unlines(map (cp(unwords, map(fn))) (floyd))
}




const res = draw(floyd(14))



print(res)









/*

 1
 2  3
 4  5  6
 7  8  9 10
11 12 13 14 15
16 17 18 19 20 21
22 23 24 25 26 27 28
29 30 31 32 33 34 35 36
37 38 39 40 41 42 43 44  45
46 47 48 49 50 51 52 53  54  55
56 57 58 59 60 61 62 63  64  65  66
67 68 69 70 71 72 73 74  75  76  77  78
79 80 81 82 83 84 85 86  87  88  89  90  91
92 93 94 95 96 97 98 99 100 101 102 103 104 105

*/
















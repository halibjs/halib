import { len, take, drop, even, repeat, map } from 'halib'
import { printv1D } from 'output'



// from http://rosettacode.org/wiki/Middle_three_digits



const mid3 = n => {
    const str = '' + Math.abs (n)
    const slen = len (str)
    if (slen < 3) return 'small'
    if (even (slen)) return 'even'
    
    return take (3) (drop ((slen - 3) / 2) (str))
}



const data = [123, 12345, 1234567, 987654321, 10001, -10001, -123, -100, 100, -12345,
              1, 2, -1, -10, 2002, -2002, 0]

printv1D(map (num => num + repeat(10 - len(String(num)),' ') + mid3(num)) (data))






/*

123       123
12345     234
1234567   345
987654321 654
10001     000
-10001    000
-123      123
-100      100
100       100
-12345    234
1         small
2         small
-1        small
-10       small
2002      even
-2002     even
0         small

*/

















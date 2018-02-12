import { unlines, map, unchars, repeat, range, from, append, even } from 'halib'
import { print } from 'output'



const pattern1 = n => unlines(map (n => unchars(repeat(n, n))) (range(1, n)));
print(pattern1(5));
print('')



const pattern2 = n => unlines(map (m => unchars(range(n, n-m+1))) (range(n, 1)));
print(pattern2(5))
print('')



const christmasTree = height => {
    const width = (height * 2) - 1;
    const fn = n => repeat((width - n) / 2, ' ') + repeat(n, '*');
    return unlines(map (fn) (from(1, height, 2)));
};
print(christmasTree(5))
print('')



const diamond = n => {
    if (n <= 0 || even(n)) return 'diamond: n must be odd and greater than 0!';
    const fn = row => repeat((n - row) / 2, ' ') + repeat(row, '*');
    return unlines(append (map (fn) (range(1, n, 2))) (map (fn) (range(n - 2, 1, 2))));
};
print(diamond(5));





/*

1
22
333
4444
55555

54321
5432
543
54
5

    *
   ***
  *****
 *******
*********

  *
 ***
*****
 ***
  *

*/














































import { append, map, unchars, iter, iterate } from 'halib'
import { print, printv1D } from 'output'



// from http://rosettacode.org/wiki/Thue-Morse, translation of Haskell



const fn = a => append (a) (map (x => 1 - x) (a))

const thueMorse1 = n => iter (n) (fn) ([0])
const thueMorse2 = n => iterate (n) (fn) ([0])





print(unchars(thueMorse1(6)))
printv1D(map (unchars) (thueMorse2(6)))











/*

0110100110010110100101100110100110010110011010010110100110010110
0
01
0110
01101001
0110100110010110
01101001100101101001011001101001
0110100110010110100101100110100110010110011010010110100110010110

*/






























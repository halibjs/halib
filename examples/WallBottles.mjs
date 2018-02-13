import { foldr, range } from 'halib'
import { print } from './output.mjs'



// from http://rosettacode.org/wiki/99_Bottles_of_Beer



const onW = ' of beer on the wall\n'
const noW = ' of beer\n'
const bn = n => n === 0 ? 'No bottles' : (n === 1 ? 'One bottle' : n + ' bottles')
const td = 'Take one down, pass it around\n'

const b = (n, z) => z + bn(n) + onW + bn(n) + noW + td + bn(n - 1) + onW + '\n'
const bottles = foldr (b) ('') (range(1, 99))

print(bottles)





/*

99 bottles of beer on the wall
99 bottles of beer
Take one down, pass it around
98 bottles of beer on the wall

98 bottles of beer on the wall
98 bottles of beer
Take one down, pass it around
97 bottles of beer on the wall

97 bottles of beer on the wall
97 bottles of beer
Take one down, pass it around
96 bottles of beer on the wall

            .
            .
            .


3 bottles of beer on the wall
3 bottles of beer
Take one down, pass it around
2 bottles of beer on the wall

2 bottles of beer on the wall
2 bottles of beer
Take one down, pass it around
One bottle of beer on the wall

One bottle of beer on the wall
One bottle of beer
Take one down, pass it around
No bottles of beer on the wall            

*/








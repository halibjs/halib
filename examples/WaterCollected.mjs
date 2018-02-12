import { cp, sum, filter, zipWith, scanl1, scanr1, map, sub, max, min } from 'halib'
import { printh1D } from 'output'



// from http://rosettacode.org/wiki/Water_collected_between_towers, translation of Haskell, Javascript


const water = 
    [[1, 5, 3, 7, 2],
     [5, 3, 7, 2, 6, 4, 5, 9, 1, 2],
     [2, 6, 3, 5, 2, 8, 1, 4, 2, 2, 5, 3, 5, 7, 4, 1],
     [5, 5, 5, 5],
     [5, 6, 7, 8],
     [8, 7, 7, 6],
     [6, 7, 10, 7, 6]]




const waterCollected  = xs => {
    const maxRight = scanr1 (max) (xs)
    const maxLeft = scanl1 (max) (xs)
    const levels = zipWith (min) (maxRight) (maxLeft)
    return cp(sum, filter(x => x > 0), zipWith(sub)(levels)) (xs)
}




const res = map (waterCollected ) (water)
printh1D(res)






/*

2 14 35 0 0 0 0

*/
























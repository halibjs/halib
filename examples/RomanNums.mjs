import { repeat, map, each, startsWith, drop, len, foldr, foldl, cp, sum, sectionBy, find, chain } from 'halib'
import { printv1D, drawh1D } from 'output'



const Symbols = [[1000, 'M'],[900, 'CM'],[500, 'D'],[400, 'CD'],[100, 'C'],[90, 'XC'],
                 [50, 'L'],[40, 'XL'],[10, 'X'],[9, 'IX'],[5, 'V'],[4, 'IV'],[1, 'I']]

const nums = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }

const arabics = [1990, 2008, 1666, 2017]
const romans  = [ 'MCMXC', 'MMVIII', 'MDCLXVI', 'MMXVII' ]




// from http://rosettacode.org/wiki/Roman_numerals/Encode

const toRoman1 = (num, _, res = '') => {
    each (([d, rom]) => { res += repeat(Math.floor(num / d), rom); num %= d }) (Symbols)
    return res
}

const toRoman2 = num => {
    const syms = find (s => s[0] <= num) (Symbols)
    const res = num - syms[0]
    return syms[1] + (res > 0 ? toRoman2(res) : '')
}

const toRoman3 = n => foldl ((z, s) => (z = z + repeat(Math.floor(n / s[0]), s[1]), n %= s[0], z)) ('') (Symbols)



const rom1 = drawh1D(map (toRoman1) (arabics))
const rom2 = drawh1D(map (toRoman2) (arabics))
const rom3 = drawh1D(map (toRoman3) (arabics))






// from http://rosettacode.org/wiki/Roman_numerals/Decode

const toArabic1 = (roman, _, res = 0) => {
    each (([d, rom]) => { 
        while (startsWith (rom) (roman)) {
            res += d
            roman = drop (len(rom)) (roman)
        }
    }) (Symbols)
    return res
}

const toArabic2 = rom => foldr ((x, [a, pre]) => pre <= x ? [a+x,x] : [a-x,x]) ([0,0]) (map (c => nums[c]) (rom)) [0]

const toArabic31 = cp(sum, map(x => len(x) > 1 ? x[1]-x[0] : x[0]), sectionBy((x, y) => x < y), map(c => nums[c]))

const toArabic32 = rom => chain(
    map(c => nums[c]),
    sectionBy((x, y) => x < y),
    map(x => len(x) > 1 ? x[1]-x[0] : x[0]),
    sum) (rom)



const arabic1 = drawh1D(map (toArabic1) (romans))
const arabic2 = drawh1D(map (toArabic2) (romans))
const arabic3 = drawh1D(map (toArabic31) (romans))
const arabic4 = drawh1D(map (toArabic32) (romans))




printv1D([rom1, rom2, rom3, arabic1, arabic2, arabic3, arabic4])



/*

MCMXC MMVIII MDCLXVI MMXVII
MCMXC MMVIII MDCLXVI MMXVII
MCMXC MMVIII MDCLXVI MMXVII
1990 2008 1666 2017
1990 2008 1666 2017
1990 2008 1666 2017
1990 2008 1666 2017

*/




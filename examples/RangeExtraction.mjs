import { nul, last, consR, foldl, head, len } from 'halib'
import { print } from 'output'



// from http://rosettacode.org/wiki/Range_extraction



const list = [  0,  1,  2,  4,  6,  7,  8, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 
                25, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39 ]

const extract = xs => {
    const lastIndex = len(xs) - 1
    
    const ext = ({ser, res, ind }, x) => {
        const printRes = (lastChar) => {
            if (len(ser) < 2) res += head(ser) + lastChar
            else if (len(ser) < 3) res += head(ser) + ',' + last(ser) + lastChar
            else res += head(ser) + '-' + last(ser) + lastChar        
        }
        
        if (nul (ser) || x - last(ser) === 1) ser = consR (ser) (x)
        else {
            printRes(',')
            ser = [x]
        }

        if (ind === lastIndex) printRes('')
        return {ser, res, ind: ind + 1}
    };
    
    const {res} = foldl (ext) ({ser: [], res:'', ind: 0}) (xs)
    return res
}






print(extract(list))






/*

0-2,4,6-8,11,12,14-25,27-33,35-39

*/






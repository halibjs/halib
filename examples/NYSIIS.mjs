import { startsWith, dropWhile, zip, len, replaceSeq, toUpper, reverse, map, cons, filter, chars,
         repeat, elem, replaceAt, deleteAt, init, take, drop } from 'halib'
import { printTable } from './output.mjs'


// from http://rosettacode.org/wiki/NYSIIS



const a = ["MAC", "KN", "K", "PH", "PF", "SCH"];
const b = ["MCC", "N",  "C", "FF", "FF", "SSS"];

const c = ["EE", "IE", "DT", "RT", "RD", "NT", "ND"];
const d = ["Y",  "Y",  "D",  "D",  "D",  "D",  "D"];

const names = ["Bishop", "Carlson", "Carr", "Chapman",
    "Franklin", "Greene", "Harper", "Jacobs", "Larson", "Lawrence",
    "Lawson", "Louis, XVI", "Lynch", "Mackenzie", "Matthews",
    "McCormack", "McDaniel", "McDonald", "Mclaughlin", "Morrison",
    "O'Banion", "O'Brien", "Richards", "Silva", "Watkins",
    "Wheeler", "Willis", "brown, sr", "browne, III", "browne, IV",
    "knight", "mitchell", "o'daniel"]


const replace_At = (ind, name, from, to) => {
    const dname = drop (ind) (name)
    const res = dropWhile (([aa, _]) => !startsWith(aa)(dname)) (zip(from)(to))
    return take(ind)(name) + (len(res) ? replaceSeq (res[0][0]) (res[0][1]) (dname) : dname)
}

const replaceFirst = (name, a, b) => replace_At(0, name, a, b)
const replaceLast = (name, a, b) => reverse(replace_At(0, reverse(name), map(reverse)(a), map(reverse)(b)))


const isalpha = c => c >= 'A' && c <= 'Z'
const vowels = chars("AEIOU")

const nysiis = name => {
    name = filter (isalpha) (toUpper(name))
    name = replaceFirst(name, a, b)
    name = replaceLast(name, c, d)

    let nlen = len(name)
    let prev, curr, next
    name += ' '
    for (let i = 1; i < nlen; i++) {
        [prev, curr, next] = [name[i - 1], name[i], name[i + 1]]
        name = replace_At(i, name, cons('EV')(vowels), cons('AF')(chars(repeat(5, 'A'))))
        name = replace_At(i, name, chars("QZM"), chars("GSN"))
        name = replace_At(i, name, ["KN", "K"], ["N", "C"])
        name = replace_At(i, name, ["SCH", "PH"], ["SSS", "FF"])

        if (curr === 'H' && (!elem(prev)(vowels) || !elem(next)(vowels)))
            name = replaceAt(i)(prev)(name)
        else if (curr === 'W' && elem(prev)(vowels))
            name = replaceAt(i)('A')(name)
 
        if (name[i] === prev) {
            name = deleteAt(i--) (name)
            nlen--
        }
    }
    name = replaceLast(init(name), ['S', 'AY', 'A'], ['', 'Y', ''])
    return take (6) (name) + (len(name) > 6 ? '[' + drop (6) (name) + ']' : '')
}


printTable(map(name => [name, nysiis(name)])(names))



/*

Bishop      BASAP
Carlson     CARLSA[N]
Carr        CAR
Chapman     CAPNAN
Franklin    FRANCL[AN]
Greene      GRAN
Harper      HARPAR
Jacobs      JACAB
Larson      LARSAN
Lawrence    LARANC
Lawson      LASAN
Louis, XVI  LASXV
Lynch       LYNC
Mackenzie   MCANSY
Matthews    MATA
McCormack   MCARNA[C]
McDaniel    MCDANA[L]
McDonald    MCDANA[LD]
Mclaughlin  MCLAGL[AN]
Morrison    MARASA[N]
O'Banion    OBANAN
O'Brien     OBRAN
Richards    RACARD
Silva       SALV
Watkins     WATCAN
Wheeler     WALAR
Willis      WALA
brown, sr   BRANSR
browne, III BRAN
browne, IV  BRANAV
knight      NAGT
mitchell    MATCAL
o'daniel    ODANAL  
  
  */




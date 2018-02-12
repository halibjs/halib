import { transpose, takeWhile, all, head, map, unchars, cp, subsequences, intersect, len,
         maximumBy, inits, tails, concat, repeat, max } from 'halib'
import { print, printTable } from 'output'




// from http://rosettacode.org/wiki/Longest_common_prefix

const data = 
    [["interspecies", "interstellar", "interstate"],
     ["throne", "throne"],
     ["throne", "dungeon"],
     ["cheese"],
     [""],
     ["prefix", "suffix"],
     ["foo", "foobar"]]


const allEq = xs => all (x => x === head(xs)) (xs)
const lcp = cp(unchars, map(head), takeWhile(allEq), transpose)


const res1 = map (l => [l, lcp(l)]) (data)
printTable(res1)





// from http://rosettacode.org/wiki/Longest_common_subsequence

const lcsShort = (str1, str2) => maximumBy (len) (intersect (subsequences(str1)) (subsequences(str2)))


const lcs = (str1, str2) => {
    const [m, n] = [len(str1), len(str2)]
    const T = repeat (m+1, repeat(n+1, 0))
    let i, j, res = ''

    for (i = 0; i <= m; i++) {
        for (j = 0; j <= n; j++) {
            T[i][j] = i && j ? (str1[i-1] === str2[j-1] ? T[i-1][j-1] + 1 : max (T[i][j-1], T[i-1][j])) : 0
        }
    }

    for (i = m, j = n; i && j;) {        
        if (str1[i-1] === str2[j-1]) { res = str1[i-1] + res; i--; j--; }
        else if (T[i-1][j] > T[i][j - 1]) i--
        else j--
    }

    return res
}


const res2 = lcsShort('esting', 'atest')
const res3 = lcs('testing123testing', 'thisisatest')


print('')
print(res2)
print(res3)






// from http://rosettacode.org/wiki/Longest_Common_Substring

const substrings = cp(concat, map(inits), tails)
const lcstr = (str1, str2) => maximumBy (len) (intersect (substrings(str1)) (substrings(str2)))


const res4 = lcstr('testing123testing', 'thisisatest')

print('')
print(res4)










/*

interspecies,interstellar,interstate inters
throne,throne                        throne
throne,dungeon                             
cheese                               cheese
                                           
prefix,suffix                              
foo,foobar                           foo   


est
tsitest


test

*/



























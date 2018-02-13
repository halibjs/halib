import { bindL, guardL, returnL, words, map, nul, uncons, elem, del, cons, last, unwords, cp,
         take, len, toUpper } from 'halib'
import { print, print2D } from './output.mjs'



// from http://rosettacode.org/wiki/ABC_Problem



const blocks = words ('BO XK DQ CP NA GT RE TG QD FS JW HU VI AN OB ER FS LY PC ZM')
const test_words = words ('A BARK BoOK TrEAT COmMoN SQUAD conFUsE')

const abc1 = (blocks, w) => {
    if (nul (w)) return ['']
    const [c, cs] = uncons (w)

    return bindL (blocks)
     (b => guardL (elem (c) (b))
     (_ => bindL (abc1 (del (b) (blocks), cs))
   (ans => returnL (cons (c)(ans)))))
}

const res1 = map (w => [w, len (abc1 (blocks, toUpper(w))) > 0]) (test_words)


print2D(res1)




// from http://rosettacode.org/wiki/ABC_Problem


const abc2 = (blocks, w) => {
    if (nul (w)) return [['', '']]
    const [c, cs] = uncons (w)

    return bindL (blocks)
     (b => guardL (elem (c) (b))
     (_ => bindL (abc2 (del (b) (blocks), cs))
   (ans => returnL ([cons (c)(ans[0]), cons (b)(ans[1])]))))
}

const res2 = map (w => [w, cp(unwords, take (8), map (last)) (abc2 (blocks, toUpper(w)))]) (test_words)



print('')
print2D(res2)




/*

A true
BARK true
BoOK false
TrEAT true
COmMoN false
SQUAD true
conFUsE true

A NA AN
BARK BONAREXK BONAERXK BOANREXK BOANERXK OBNAREXK OBNAERXK OBANREXK OBANERXK
BoOK
TrEAT GTREERNATG GTREERANTG GTERRENATG GTERREANTG TGREERNAGT TGREERANGT TGERRENAGT TGERREANGT
COmMoN
SQUAD FSDQHUNAQD FSDQHUANQD FSQDHUNADQ FSQDHUANDQ FSDQHUNAQD FSDQHUANQD FSQDHUNADQ FSQDHUANDQ
conFUsE CPBONAFSHUFSRE CPBONAFSHUFSER CPBONAFSHUFSRE CPBONAFSHUFSER CPBOANFSHUFSRE CPBOANFSHUFSER CPBOANFSHUFSRE
 CPBOANFSHUFSER

*/







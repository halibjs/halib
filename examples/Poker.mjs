import { map, words, len, uniq, countBy, head, last, elem, any, seq, delAll, countElem, sortBy,
         elemIndex, rotate, combRep, minimum, liftM2L, append, chars } from 'halib'
import { print, printTable } from './output.mjs'


// from http://rosettacode.org/wiki/Poker_hand_analyser


const face = "A23456789TJQK"
const face2 = chars(face + 'A')
const combF1 = combRep (1) (face)
const combF2 = combRep (2) (face)
const combF  = n => n === 4 ? combF1 : combF2

const suit = "SHCD"
const handlen = 5
const combS1 = combRep (1) (suit)
const combS2 = combRep (2) (suit)
const combS  = n => n === 4 ? combS1 : combS2

const countF = countBy(head)
const countS = countBy(last)



const resText = ["five-of-a-kind", "straight-flush", "four-of-a-kind", "full-house", "flush",
                 "straight", "three-of-a-kind", "two-pair", "one-pair", "high-card"]


const isStraight = faces => {
    const correctA = f => head(f) === 'A' && last(f) === 'K' ? rotate(-1)(f) : f
    return seq(correctA(sortBy(x => elemIndex(x)(face))(faces)))(face2)
}

const evaluate = (faceCount, suitCount) => {
    let p1, p2, t, f, fl, st, ff
    
    if (len(faceCount) === 1) ff = true;
    else if (any(x => x[1] === 4)(faceCount)) f = true
    else {
        if (any(x => x[1] === 3)(faceCount)) t = true
        if (any(x => x[1] === 2)(faceCount)) {
            p1 = true
            if (!t && len(faceCount) === 3) p2 = true
        }
    }

    if (len(suitCount) === 1) fl = true
    if (!p1 && !p2 && !t && !f && !ff && isStraight(map(head)(faceCount))) st = true

    return ff ? 0 : st && fl ? 1 : f ? 2 : p1 && t ? 3 : fl ? 4 : st ? 5 : t ? 6 : p1 && p2 ? 7 : p1 ? 8 : 9
};

const analyze = (h, hand = words(h)) => {
    if (len(hand) !== handlen) return "Invalid hand."
    if (elem('WW')(hand)) {
        if (countElem ('WW') (hand) > 2) return 'Too many Jokers.'
        hand = delAll('WW') (hand)
        if (!uniq(hand)) return "Duplicated cards."
        const fn = (x, y) => len(x) > 1 ? [x[0] + y[0], x[1] + y[1]] : [x + y]
        const combs = liftM2L (fn) (combF(len(hand))) (combS(len(hand)))
        const table = map (comb => evaluate(countF(append(comb)(hand)), countS(append(comb)(hand)))) (combs)
        return resText[minimum(table)]
    }
    else {
        if (!uniq(hand)) return "Duplicated cards."
        return resText[evaluate(countF(hand), countS(hand))]
    }
}





const hands =
    ["2H 2D 2S KS QD",
     "2H 5H 7D 8S 9D",
     "AH 2D 3S 4S 5S",
     "2H 3H 2D 3S 3D",
     "2H 7H 2D 3S 3D",
     "2H 7H 7D 7S 7C",
     "TH JH QH KH AH",
     "4H 4C KC 5D TC",
     "QC TC 7C 6C 4C"]


const wildcards =
    ["2H 2D 2S KS WW",
     "2H 5H 7D 8S WW",
     "AH 2D 3S 4S WW",
     "2H 3H 2D 3S WW",
     "2H 7H 2D 3S WW",
     "2H 7H 7D WW WW",
     "TH JH QH WW WW",
     "4H 4C KC WW WW",
     "QC TC 7C WW WW",
     "QC TC 7H WW WW"]

printTable(map(h => [h, analyze(h)]) (hands))
print('')
printTable(map(h => [h, analyze(h)]) (wildcards))






/*

[ [ '2H 2D 2S KS QD', 'three-of-a-kind' ],
  [ '2H 5H 7D 8S 9D', 'high-card' ],
  [ 'AH 2D 3S 4S 5S', 'straight' ],
  [ '2H 3H 2D 3S 3D', 'full-house' ],
  [ '2H 7H 2D 3S 3D', 'two-pair' ],
  [ '2H 7H 7D 7S 7C', 'four-of-a-kind' ],
  [ 'TH JH QH KH AH', 'straight-flush' ],
  [ '4H 4C KC 5D TC', 'one-pair' ],
  [ 'QC TC 7C 6C 4C', 'flush' ] ]

[ [ '2H 2D 2S KS WW', 'four-of-a-kind' ],
  [ '2H 5H 7D 8S WW', 'one-pair' ],
  [ 'AH 2D 3S 4S WW', 'straight' ],
  [ '2H 3H 2D 3S WW', 'full-house' ],
  [ '2H 7H 2D 3S WW', 'three-of-a-kind' ],
  [ '2H 7H 7D WW WW', 'four-of-a-kind' ],
  [ 'TH JH QH WW WW', 'straight-flush' ],
  [ '4H 4C KC WW WW', 'four-of-a-kind' ],
  [ 'QC TC 7C WW WW', 'flush' ],
  [ 'QC TC 7H WW WW', 'three-of-a-kind' ] ]  

  */






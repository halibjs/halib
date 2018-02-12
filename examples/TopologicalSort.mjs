import { len, each, lines, words, map, head, tail, del, delAll, concat, append, find, difference,
         foldl, reject, any, elem } from 'halib'
import { print, printv1D } from 'output'



// from http://rosettacode.org/wiki/Topological_sort




const libs =
`des_system_lib  std synopsys std_cell_lib des_system_lib dw02 dw01 ramlib ieee
dw01             ieee dw01 dware gtech
dw02             ieee dw02 dware
dw03             std synopsys dware dw03 dw02 dw01 ieee gtech
dw04             dw04 ieee dw01 dware gtech
dw05             dw05 ieee dware
dw06             dw06 ieee dware
dw07             ieee dware
dware            ieee dware
gtech            ieee gtech
ramlib           std ieee
std_cell_lib     ieee std_cell_lib
synopsys`

const isArr = xs => xs && xs.constructor === Array

class Node {
    constructor(id, out) {
        this.id = id
        this.out = out
    }
}

const nodes = () => {
    const fn = (line, _, w = delAll ('') (words(line))) => new Node(head(w), del (head(w)) (tail(w)))
    const nodes1 = map (fn) (lines(libs))
    const ids = map (n => n.id) (nodes1)
    const nodes2 = map (w => new Node(w, [])) (difference (concat(map (n => n.out) (nodes1))) (ids))
    return append (nodes1) (nodes2)
};


const tsortKahn = nodes => {
    const hiE = node => any (n => elem(node.id)(n.out)) (nodes)
    const S = reject (n => hiE(n)) (nodes)   
    const res = []
    let ind, n, m

    while (len(S)) {
        n = S.pop()
        res.push(n)

        ind = len(n.out)
        while(ind--) {
            m = find (node => n.out[ind] === node.id) (nodes)
            n.out.pop()
            if (!hiE(m)) S.push(m)
        }
    }

    const nWE = find (n => len(n.out)) (nodes)
    return nWE ? nWE : res
};

const res = tsortKahn(nodes())
const resK = isArr(res) ? map (n => n.id) (res) : 'cycle: ' + res.id
printv1D(resK)



const tsortDFS = nodes => {    
    const nodesO = foldl ((m, n) => (m[n.id] = n, m)) ({}) (nodes)
    const seen = {}
    const marked = {}
    const res = []

    const visit = node => {
        if (seen[node.id]) throw new Error('cycle: ' + node.id)
        if (!marked[node.id]) {
            seen[node.id] = true
            each (w => visit(nodesO[w])) (node.out)
            seen[node.id] = false
            marked[node.id] = true
            res.unshift(node)
        }
    }

    each (visit) (nodes)
    return res
};

const resD = map (n => n.id) (tsortDFS(nodes()))
print('')
printv1D(resD)











/*

dw07
dw06
dw05
dw04
dw03
des_system_lib
synopsys
std_cell_lib
dw02
dw01
dware
gtech
ramlib
std
ieee

dw07
dw06
dw05
dw04
dw03
des_system_lib
ramlib
dw01
gtech
dw02
dware
std_cell_lib
ieee
synopsys
std

*/





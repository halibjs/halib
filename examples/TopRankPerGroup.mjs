import { map, take, cp, groupBy, last, maxLen, len, cons, transpose, repeat, unlines,
         unwords, foldl, init, concat, sortBy, sortDescBy } from 'halib'
import { print } from 'output'


// from http://rosettacode.org/wiki/Top_rank_per_group



const data =
    [["Tyler Bennett", "E10297", 32000, "D101"],
     ["John Rappl", "E21437", 47000, "D050"],
     ["George Woltman", "E00127", 53500, "D101"],
     ["Adam Smith", "E63535", 18000, "D202"],
     ["Claire Buckman", "E39876", 27800, "D202"],
     ["David McClellan", "E04242", 41500, "D101"],
     ["Rich Holcomb", "E01234", 49500, "D202"],
     ["Nathan Adams", "E41298", 21900, "D050"],
     ["Richard Potter", "E43128", 15900, "D101"],
     ["David Motsinger", "E27002", 19250, "D202"],
     ["Tim Sampair", "E03033", 27000, "D101"],
     ["Kim Arlich", "E10001", 57000, "D190"],
     ["Timothy Grove", "E16398", 29900, "D190"]]



const drawRes = (dps, deps = map (map (map(String))) (dps)) => {
    const indW = cp(len, String, maxLen) (deps) + 2
    const format = cp(cons(['Name', 'Id', 'Salary']), map(init))
    const widths = cp(map(maxLen), transpose, format, concat) (deps)
    const pad = (t, w, a, ws = repeat(w - len(t), ' ')) => a ? t + ws : ws + t
    const depHeader = dep => 'Department  ' + last(last (dep)) + '\n'
    const drawCell = (txt, ind) => pad(txt, widths[ind], ind < 2)
    const drawDep = (z, dep) => {
        const drawEmp = (emp, ind) => pad(ind ? ind + '.' : '', indW, true) + unwords(map (drawCell) (emp))
        return z + depHeader(dep) + cp(unlines, map(drawEmp), format) (dep) + '\n\n'
    };
    return foldl (drawDep) ('') (deps)
};




const dep = x => x[3]
const sal = x => x[2]

const tr = n => cp(map(cp(take(n), sortDescBy(sal))), groupBy(dep), sortBy(dep))



print(drawRes(tr(3)(data)))


/*

Department  D050
   Name            Id     Salary
1. John Rappl      E21437  47000
2. Nathan Adams    E41298  21900

Department  D101
   Name            Id     Salary
1. George Woltman  E00127  53500
2. David McClellan E04242  41500
3. Tyler Bennett   E10297  32000

Department  D190
   Name            Id     Salary
1. Kim Arlich      E10001  57000
2. Timothy Grove   E16398  29900

Department  D202
   Name            Id     Salary
1. Rich Holcomb    E01234  49500
2. Claire Buckman  E39876  27800
3. David Motsinger E27002  19250

*/
import { map, append, maxLen, len, transpose, nul, head, unlines, unwords, repeat, keys, cp, sortDescBy } from 'halib'
import { print } from 'output'

// from http://eloquentjavascript.net/code/chapter/06_object.js, translation



const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
    {name: "Everest", height: 8848, country: "Nepal"},
    {name: "Mount Fuji", height: 3776, country: "Japan"},
    {name: "Mont Blanc", height: 4808, country: "Italy/France"},
    {name: "Vaalserberg", height: 323, country: "Netherlands"},
    {name: "Denali", height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"},
    {name: "Kekesteto", height: 1015, country: "Hungary"}
]

const dataTable = data => {
    const header = keys(head (data))
    const headers = [header, map (_ => '') (header)]
    const body = map (row => map (k => String(row[k])) (header)) (data)
    
    return append (headers) (body)
}

const drawTable = dt => {
    const widths = map (maxLen) (transpose(dt))
    const cell = (txt, ind, ws = repeat (widths[ind] - len (txt), ' ')) =>
                 nul(txt) ? repeat (widths[ind], '-') : (isNaN(txt) ? txt + ws : ws + txt)
    
    return unlines (map (row => unwords (map (cell) (row))) (dt))
}


const mountains = cp(drawTable, dataTable, sortDescBy(m => m.height)) (MOUNTAINS)




print(mountains)





/*

name         height country
------------ ------ -------------
Everest        8848 Nepal
Denali         6168 United States
Kilimanjaro    5895 Tanzania
Popocatepetl   5465 Mexico
Mont Blanc     4808 Italy/France
Mount Fuji     3776 Japan
Kekesteto      1015 Hungary
Vaalserberg     323 Netherlands

*/









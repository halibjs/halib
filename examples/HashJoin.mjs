import { bindL, returnL, groupOBy, id, extend, entries, map } from 'halib'
import { printArr2D } from 'output'


const listA = [
    { age: 27, name: 'Jonah' },
    { age: 18, name: 'Alan' },
    { age: 28, name: 'Glory' },
    { age: 18, name: 'Popeye' },
    { age: 28, name: 'Alan' }
]
   
const listB = [
    { character: 'Jonah', nemesis: 'Whales' },
    { character: 'Jonah', nemesis: 'Spiders' },
    { character: 'Alan', nemesis: 'Ghosts' },
    { character: 'Alan', nemesis: 'Zombies' },
    { character: 'Glory', nemesis: 'Buffy' },
];


const M = groupOBy (obj => obj.character) (listB)
const res = bindL (listA)
      (a => bindL (M[a.name] || [])
      (b => returnL (extend(a)(b))))

      


printArr2D(map(entries)(res))




/*

[ [ [ age, 27 ], [ name, Jonah ], [ character, Jonah ], [ nemesis, Whales ] ],
  [ [ age, 27 ], [ name, Jonah ], [ character, Jonah ], [ nemesis, Spiders ] ],
  [ [ age, 18 ], [ name, Alan ], [ character, Alan ], [ nemesis, Ghosts ] ],
  [ [ age, 18 ], [ name, Alan ], [ character, Alan ], [ nemesis, Zombies ] ],
  [ [ age, 28 ], [ name, Glory ], [ character, Glory ], [ nemesis, Buffy ] ],
  [ [ age, 28 ], [ name, Alan ], [ character, Alan ], [ nemesis, Ghosts ] ],
  [ [ age, 28 ], [ name, Alan ], [ character, Alan ], [ nemesis, Zombies ] ] ]

*/








































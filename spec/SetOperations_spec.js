const { nub, minus, deleteAll, keepAll, intersect, difference, union, nubSorted, minusSorted,
         deleteAllSorted, keepAllSorted, intersectSorted, differenceSorted, unionSorted } = require('./halib.js');

// list => array/string


describe('Set operations:', () => {
    describe('nub', () => {
        it('removes duplicate elements from a list', () => {
            expect(nub([1,1,2,2])).toEqual([1,2]);
            expect(nub('aabb')).toEqual('ab');
            expect(nub([[1,1],[1,1],[1,2],[1,2]])).toEqual([[1,1],[1,2]]);
        });
                        
        it('returns an empty list when given an empty list', () => {
            expect(nub([])).toEqual([]);
            expect(nub('')).toEqual('');
        });
    });

    describe('minus', () => {
        it('each element in second list strikes out one element in first if equal', () => {
            expect(minus([1,1,2,2])([2,3])).toEqual([1,1,2]);
            expect(minus('aabb')('bc')).toEqual('aab');
            expect(minus([[1,1],[1,1],[1,2],[1,2]])([[1,2],[1,3]])).toEqual([[1,1],[1,1],[1,2]]);
        });
                        
        it('returns the first list when given an empty list as second arg', () => {
            expect(minus([1,1,2,2])([])).toEqual([1,1,2,2]);
            expect(minus('aabb')('')).toEqual('aabb');
            expect(minus([[1,1],[1,1],[1,2],[1,2]])([])).toEqual([[1,1],[1,1],[1,2],[1,2]]);
        });
        
        it('returns an empty list when given an empty list as first arg', () => {
            expect(minus([])([2,3])).toEqual([]);
            expect(minus('')('bc')).toEqual('');
            expect(minus([])([[1,2],[1,3]])).toEqual([]);
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(minus([])([])).toEqual([]);
            expect(minus('')('')).toEqual('');
        });
    });

    describe('deleteAll', () => {
        it('each element in first list strikes out every element in second if equal', () => {
            expect(deleteAll([2,3])([1,1,2,2])).toEqual([1,1]);
            expect(deleteAll('bc')('aabb')).toEqual('aa');
            expect(deleteAll([[1,2],[1,3]])([[1,1],[1,1],[1,2],[1,2]])).toEqual([[1,1],[1,1]]);
        });
                        
        it('returns the second list when given an empty list as first arg', () => {
            expect(deleteAll([])([1,1,2,2])).toEqual([1,1,2,2]);
            expect(deleteAll('')('aabb')).toEqual('aabb');
            expect(deleteAll([])([[1,1],[1,1],[1,2],[1,2]])).toEqual([[1,1],[1,1],[1,2],[1,2]]);
        });
        
        it('returns an empty list when given an empty list as second arg', () => {
            expect(deleteAll([2,3])([])).toEqual([]);
            expect(deleteAll('bc')('')).toEqual('');
            expect(deleteAll([[1,2],[1,3]])([])).toEqual([]);
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(deleteAll([])([])).toEqual([]);
            expect(deleteAll('')('')).toEqual('');
        });
    });

    describe('keepAll', () => {
        it('each element in first list keeps every element in second if equal', () => {
            expect(keepAll([2,3])([1,1,2,2])).toEqual([2,2]);
            expect(keepAll('bc')('aabb')).toEqual('bb');
            expect(keepAll([[1,2],[1,3]])([[1,1],[1,1],[1,2],[1,2]])).toEqual([[1,2],[1,2]]);
        });
                        
        it('returns an empty list when given an empty list as first arg', () => {
            expect(keepAll([])([1,1,2,2])).toEqual([]);
            expect(keepAll('')('aabb')).toEqual('');
            expect(keepAll([])([[1,1],[1,1],[1,2],[1,2]])).toEqual([]);
        });
        
        it('returns an empty list when given an empty list as second arg', () => {
            expect(keepAll([2,3])([])).toEqual([]);
            expect(keepAll('bc')('')).toEqual('');
            expect(keepAll([[1,2],[1,3]])([])).toEqual([]);
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(keepAll([])([])).toEqual([]);
            expect(keepAll('')('')).toEqual('');
        });
    });

    describe('intersect', () => {
        it('combines common elements of two lists, duplicate elements removed', () => {
            expect(intersect([1,1,2,2])([2,3])).toEqual([2]);
            expect(intersect('aabb')('bc')).toEqual('b');
            expect(intersect([[1,1],[1,1],[1,2],[1,2]])([[1,2],[1,3]])).toEqual([[1,2]]);
        });
                        
        it('returns an empty list when given an empty list as second arg', () => {
            expect(intersect([1,1,2,2])([])).toEqual([]);
            expect(intersect('aabb')('')).toEqual('');
            expect(intersect([[1,1],[1,1],[1,2],[1,2]])([])).toEqual([]);
        });
        
        it('returns an empty list when given an empty list as first arg', () => {
            expect(intersect([])([2,3])).toEqual([]);
            expect(intersect('')('bc')).toEqual('');
            expect(intersect([])([[1,2],[1,3]])).toEqual([]);
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(intersect([])([])).toEqual([]);
            expect(intersect('')('')).toEqual('');
        });
    });

    describe('difference', () => {
        it('each element in second list strikes out every element in first if equal' +
           'duplicate elements are removed from result' , () => {
            expect(difference([1,1,2,2])([2,3])).toEqual([1]);
            expect(difference('aabb')('bc')).toEqual('a');
            expect(difference([[1,1],[1,1],[1,2],[1,2]])([[1,2],[1,3]])).toEqual([[1,1]]);
        });
                        
        it('returns the first list when given an empty list as second arg, duplicates removed', () => {
            expect(difference([1,1,2,2])([])).toEqual([1,2]);
            expect(difference('aabb')('')).toEqual('ab');
            expect(difference([[1,1],[1,1],[1,2],[1,2]])([])).toEqual([[1,1],[1,2]]);
        });
        
        it('returns an empty list when given an empty list as first arg', () => {
            expect(difference([])([2,3])).toEqual([]);
            expect(difference('')('bc')).toEqual('');
            expect(difference([])([[1,2],[1,3]])).toEqual([]);
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(difference([])([])).toEqual([]);
            expect(difference('')('')).toEqual('');
        });
    });

    describe('union', () => {
        it('combines the elements of the two lists, duplicate elements removed', () => {
            expect(union([1,1,2,2])([2,3])).toEqual([1,2,3]);
            expect(union('aabb')('bc')).toEqual('abc');
            expect(union([[1,1],[1,1],[1,2],[1,2]])([[1,2],[1,3]])).toEqual([[1,1],[1,2],[1,3]]);
        });
                
        it('returns the first list when given an empty list as second arg, duplicates removed', () => {
            expect(union([1,1,2,2])([])).toEqual([1,2]);
            expect(union('aabb')('')).toEqual('ab');
            expect(union([[1,1],[1,1],[1,2],[1,2]])([])).toEqual([[1,1],[1,2]]);
        });

        it('returns the second list when given an empty list as first arg, duplicates removed', () => {
            expect(union([])([2,3])).toEqual([2,3]);
            expect(union('')('bc')).toEqual('bc');
            expect(union([])([[1,2],[1,3]])).toEqual([[1,2],[1,3]]);
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(union([])([])).toEqual([]);
            expect(union('')('')).toEqual('');
        });
    });





    
    describe('nubSorted', () => {
        it('removes duplicate elements from a sorted list, works only with simple types', () => {
            expect(nubSorted([1,1,2,2])).toEqual([1,2]);
            expect(nubSorted('aabb')).toEqual('ab');
        });
        
        it('returns an empty list when given an empty list', () => {
            expect(nubSorted([])).toEqual([]);
            expect(nubSorted('')).toEqual('');
        });
    });

    describe('minusSorted', () => {
        it('same as minus but works only with simple types, both args must be sorted list', () => {
            expect(minusSorted([1,1,2,2])([2,3])).toEqual([1,1,2]);
            expect(minusSorted('aabb')('bc')).toEqual('aab');
        });

        it('returns the first list when given an empty list as second arg', () => {
            expect(minusSorted([1,1,2,2])([])).toEqual([1,1,2,2]);
            expect(minusSorted('aabb')('')).toEqual('aabb');
        });
        
        it('returns an empty list when given an empty list as first arg', () => {
            expect(minusSorted([])([2,3])).toEqual([]);
            expect(minusSorted('')('bc')).toEqual('');
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(minusSorted([])([])).toEqual([]);
            expect(minusSorted('')('')).toEqual('');
        });
    });
    
    describe('deleteAllSorted', () => {
        it('same as deleteAll but works only with simple types, both args must be sorted list', () => {
            expect(deleteAllSorted([2,3])([1,1,2,2])).toEqual([1,1]);
            expect(deleteAllSorted('bc')('aabb')).toEqual('aa');
        });

        it('returns the second list when given an empty list as first arg', () => {
            expect(deleteAllSorted([])([1,1,2,2])).toEqual([1,1,2,2]);
            expect(deleteAllSorted('')('aabb')).toEqual('aabb');
        });
        
        it('returns an empty list when given an empty list as second arg', () => {
            expect(deleteAllSorted([2,3])([])).toEqual([]);
            expect(deleteAllSorted('bc')('')).toEqual('');
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(deleteAllSorted([])([])).toEqual([]);
            expect(deleteAllSorted('')('')).toEqual('');
        });
    });

    describe('keepAllSorted', () => {
        it('same as deleteAll but works only with simple types, both args must be sorted list', () => {
            expect(keepAllSorted([2,3])([1,1,2,2])).toEqual([2,2]);
            expect(keepAllSorted('bc')('aabb')).toEqual('bb');
        });

        it('returns the second list when given an empty list as first arg', () => {
            expect(keepAllSorted([])([1,1,2,2])).toEqual([]);
            expect(keepAllSorted('')('aabb')).toEqual('');
        });
        
        it('returns an empty list when given an empty list as second arg', () => {
            expect(keepAllSorted([2,3])([])).toEqual([]);
            expect(keepAllSorted('bc')('')).toEqual('');
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(keepAllSorted([])([])).toEqual([]);
            expect(keepAllSorted('')('')).toEqual('');
        });
    });

    describe('intersectSorted', () => {
        it('same as intersect but works works only with simple types, both args must be sorted list', () => {
            expect(intersectSorted([1,1,2,2])([2,3])).toEqual([2]);
            expect(intersectSorted('aabb')('bc')).toEqual('b');
        });

        it('returns an empty list when given an empty list as second arg', () => {
            expect(intersectSorted([1,1,2,2])([])).toEqual([]);
            expect(intersectSorted('aabb')('')).toEqual('');
        });
        
        it('returns an empty list when given an empty list as first arg', () => {
            expect(intersectSorted([])([2,3])).toEqual([]);
            expect(intersectSorted('')('bc')).toEqual('');
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(intersectSorted([])([])).toEqual([]);
            expect(intersectSorted('')('')).toEqual('');
        });
    });

    describe('differenceSorted', () => {
        it('same as difference but works only with simple types, both args must be sorted list', () => {
            expect(differenceSorted([1,1,2,2])([2,3])).toEqual([1]);
            expect(differenceSorted('aabb')('bc')).toEqual('a');
        });

        it('returns the first list when given an empty list as second arg, duplicates removed', () => {
            expect(differenceSorted([1,1,2,2])([])).toEqual([1,2]);
            expect(differenceSorted('aabb')('')).toEqual('ab');
        });
        
        it('returns an empty list when given an empty list as first arg', () => {
            expect(differenceSorted([])([2,3])).toEqual([]);
            expect(differenceSorted('')('bc')).toEqual('');
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(differenceSorted([])([])).toEqual([]);
            expect(differenceSorted('')('')).toEqual('');
        });
    });
    
    describe('unionSorted', () => {
        it('same as union but works only with simple types, both args must be sorted list', () => {
            expect(unionSorted([1,1,2,2])([2,3])).toEqual([1,2,3]);
            expect(unionSorted('aabb')('bc')).toEqual('abc');
        });

        it('returns the first list when given an empty list as second arg, duplicates removed', () => {
            expect(unionSorted([1,1,2,2])([])).toEqual([1,2]);
            expect(unionSorted('aabb')('')).toEqual('ab');
        });

        it('returns the second list when given an empty list as first arg, duplicates removed', () => {
            expect(unionSorted([])([2,3])).toEqual([2,3]);
            expect(unionSorted('')('bc')).toEqual('bc');
        });
        
        it('returns an empty list when both args are empty lists', () => {
            expect(unionSorted([])([])).toEqual([]);
            expect(unionSorted('')('')).toEqual('');
        });
    });
});

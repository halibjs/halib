const { copyO, clone, pick, pickBy, mapO, select, invert, invertAll, extend, omit } = require('./halib.js');
const { even, inc, sq, toUpper, cp } = require('./halib.js');


describe('Objects:', () => {
    describe('copyO', () => {
        const obj1 = {a:1,b:{c:{d:1}}};
        const res1 = copyO(obj1);
        const obj2 = {a:1,b:{c:{d:[1,2,3,{a:[4,5,{b:3}]}]}}};
        const res2 = copyO(obj2);
        it('returns a shallow copy of the given object', () => {
            expect(obj1).toEqual(res1);
            expect(obj1.b).toBe(res1.b);
            expect(obj2).toEqual(res2);
            expect(obj2.b).toBe(res2.b);
        });
    });

    describe('clone', () => {
        const obj1 = {a:1,b:{c:{d:1}}};
        const res1 = clone(obj1);
        const obj2 = {a:1,b:{c:{d:[1,2,3,{a:[4,5,{b:3}]}]}}};
        const res2 = clone(obj2);
        it('returns a deep copy of the given object', () => {
            expect(obj1).toEqual(res1);
            expect(obj1.b).not.toBe(res1.b);
            expect(obj2).toEqual(res2);
            expect(obj2.b).not.toBe(res2.b);
        });
    });
    
    describe('pick', () => {
        it('returns a shallow copy of obj with the properties specified in keys.', () => {
            expect(pick('a','b','c') ({a:1,b:2,c:3,d:4,e:5})).toEqual({a:1,b:2,c:3});
        });
    });

    describe('pickBy', () => {
        it('returns a shallow copy of obj with the properties that satisfy pred.', () => {
            expect(pickBy (even) ({a:1,b:2,c:3,d:4,e:5})).toEqual({b:2,d:4});
        });
    });

    describe('mapO', () => {
        it('returns an object obtained by applying fn to every property value.', () => {
            expect(mapO (inc) ({a:1,b:2,c:3,d:4,e:5})).toEqual({a:2,b:3,c:4,d:5,e:6});
        });
    });

    describe('select', () => {
        it('returns shallow copies of objs with the properties specified in keys.', () => {
            const res = [{a:1,b:2},{a:4,b:5},{a:7,b:8}];
            expect(select('a','b') ([{a:1,b:2,c:3},{a:4,b:5,c:6},{a:7,b:8,c:9}])).toEqual(res);
        });
    });

    describe('invert', () => {
        it(`returns an object obtained by inverting the keys and values of obj.
             If two values are equal in obj the last wins.`, () => {
            expect(invert({a:1,b:2,c:1})).toEqual({1:'c',2:'b'});
            expect(invert([7,8,9])).toEqual({7:0,8:1,9:2});            
        });
    });

    describe('invertAll', () => {
        it(`returns an object obtained by inverting the keys and values of obj.
            Properties are returned in array.`, () => {
            expect(invertAll({a:1,b:2,c:1})).toEqual({1:['a','c'],2:['b']});
            expect(invertAll([7,8,9])).toEqual({7:[0],8:[1],9:[2]});            
        });
    });

    describe('extend', () => {
        it('returns a shallow copy of obj1 extended with the properties of obj2.', () => {
            expect(extend({a:1,b:2})({c:3,d:4})).toEqual({a:1,b:2,c:3,d:4});
            expect(extend({a:1,c:2})({c:3,d:4})).toEqual({a:1,c:3,d:4});
        });
    });

    describe('omit', () => {
        it('returns a shallow copy of obj without the properties specified in keys.', () => {
            expect(omit ('a','b') ({a:1,b:2,c:1})).toEqual({c:1});
        });
    });
});
















































































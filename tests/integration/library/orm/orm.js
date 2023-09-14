var expect = require('chai').expect,
    chance = require('chance').Chance(),
    lib = require('../../../library');

describe('orm', () => {
    it('crud', () => {

        var test = {
            id: chance.guid(),
            name: chance.name(),
        };

        // create
        return lib.db.execute('INSERT INTO test (id, name) VALUES (:id, :name)', test).then(() => {

            // get
            return lib.db.fetchAll('SELECT * FROM test where id = :id', test).then((result) => {
                expect(result).to.exist;
                expect(result).to.have.length(1);
                expect(result[0].name).to.equal(test.name);

                // update
                var name2 = chance.name();
                return lib.db.execute('UPDATE test SET name = :name where id = :id', {
                    id: test.id,
                    name: name2
                }).then(() => {
                    return lib.db.fetchAll('SELECT * FROM test where id = :id', test).then((result) => {
                        expect(result).to.exist;
                        expect(result).to.have.length(1);
                        expect(result[0].name).to.equal(name2);

                        // delete
                        return lib.db.execute('DELETE FROM test where id = :id', test).then(() => {
                            return lib.db.fetchAll('SELECT * FROM test where id = :id', test).then((result) => {
                                expect(result).to.exist;
                                expect(result).to.have.length(0);
                            });
                        });
                    });
                });
            });
        });
    });
});

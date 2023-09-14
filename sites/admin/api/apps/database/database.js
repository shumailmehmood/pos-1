var _ = require('lodash'),
    lib = require('../../library');


module.exports = class  {
    static async dbQuery(req, res, next) {
        try {
            console.log(req.body.query)
            let result = await lib.db.fetchAll(req.body.query);
            // let result = await lib.db.fetchAll(`select * from providers `);
            
            return res.json({
                status: true,
                data: result,
                msg: 'DB query successfully run.'
            });
        } catch (err) {
            let statusCode = 500; 
            let errorMessage = 'Failed to execute query: ' + err;

            return res.status(statusCode).json({
                status: false,
                error: errorMessage
            });
        }
        
    }
}

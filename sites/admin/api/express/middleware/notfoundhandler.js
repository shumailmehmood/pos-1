module.exports = function () {
    return function (req, res) {
        res.status(404).render('express/views/404.ejs', {
            req
        });
    };
};
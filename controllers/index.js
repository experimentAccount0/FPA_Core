'use strict';

//import IndexModel from '../models/index';

module.exports = function (router) {

    //var model = new IndexModel();

    router.get('/', function (req, res) {

        res.send('<code><pre>' + "HELLO" + '</pre></code>');
        
    });

};
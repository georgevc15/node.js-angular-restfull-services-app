const customersRepo = require('../../../lib/customersRepository'),
      statesRepo = require('../../../lib/statesRepository'),
      util = require('util');


class CustomersController {
    //api /api/customers
    constructor(router) {
        router.get('/', this.getCustomers.bind(this))
    }

    getCustomers(req, res) {
        console.log(' -> getCustomers');
        customersRepo.getCustomers((err, data) => {
            if(err) {
                console.log(' -> getCustomers error' + util.inspect(err));
                res.json(null);
            } else {
                console.log(' -> getCustomers ok');
                res.json(data.customers);
            }
        });
    }

}

module.exports = CustomersController;
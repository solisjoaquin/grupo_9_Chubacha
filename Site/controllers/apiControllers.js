/* const cors = require("cors"); */
const { products, users } = require('../database/models')

const apiController = {

    products: (req, res) => {


        /*  app.use(cors()); */

        products.findAll().then((products) => {
            res.json({
                meta: {
                    status: 200,
                    totalProducts: products.length,
                    totalAmount: products
                        .reduce((total, product) => (total += product.price), 0)
                        .toFixed(2),
                    categories: ["Auricular", "Teclado", "Mouse", "Monitor"],
                    url: "/api/products",
                },
                data: products,
            });
        })

    },

    users: (req, res) => {



        /* res.send('users') */
        users.findAll().then((users) => {
            res.json({
                meta: {
                    status: 200,
                    totalUsers: users.length,
                    url: "/api/products",
                },
                data: users,
            });
        })
    }
}

module.exports = apiController;
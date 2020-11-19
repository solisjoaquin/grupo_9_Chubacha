const { check } = require('express-validator');

module.exports = {
    edit: [

        check('name').
            notEmpty().withMessage('Completa el campo').bail()
            .isLength({ min: 10 }).withMessage('El nombre debe ser de minimo 4 caracteres.'),

        check('price').
            notEmpty().withMessage('Completa el campo').bail(),

        check('category_id').
            notEmpty().withMessage('Selecciona una categoria').bail(),

    ],

    create: [

        check('name').
            notEmpty().withMessage('Completa el nombre del producto').bail()
            .isLength({ min: 4 }).withMessage('El nombre debe ser de minimo 4 caracteres.'),

        check('price').
            notEmpty().withMessage('Completa el precio del producto').bail(),

        check('category_id').
            notEmpty().withMessage('Selecciona una categoria').bail(),

    ]

}
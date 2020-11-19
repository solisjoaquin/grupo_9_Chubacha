const { check } = require('express-validator');

module.exports = {
    login: [
        check('email').
            notEmpty().withMessage('Completa el campo de email').bail()
            .isEmail().withMessage('Completa email valido'),


        check('password').
            notEmpty().withMessage('Completa el campo de contraseña').bail()

    ],

    register: [
        check('email').
            notEmpty().withMessage('Completa el campo de email').bail()
            .isEmail().withMessage('Completa email valido'),

        check('name').
            notEmpty().withMessage('Completa el campo de usuario').bail()
            .isLength({ min: 4 }).withMessage('El nombre debe ser de minimo 4 caracteres.'),


        check('password').
            notEmpty().withMessage('Completa el campo de contraseña').bail()
            .isLength({ min: 6 }).withMessage('La contraseña necesita minimo 6 caracteres'),

    ]

}
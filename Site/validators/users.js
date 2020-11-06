const {check}= require('express-validator');

module.exports ={
    login :[
        check('email').
        notEmpty().withMessage('Completa el campo de email').bail()
        .isEmail().withMessage('Completa email valido') ,


        check('password').
        notEmpty().withMessage('Completa el campo de contraseña').bail()
/*         .isLength({min:5}).withMessage('minimo 5 caracteres'), */
    ],
    
}
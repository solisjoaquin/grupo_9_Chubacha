module.exports = function(sequalize, dataType){
    
    let alias = "Producto";

    let cols = {
       id :{
            type:dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
       }, 
       name:{
            type:dataType.STRING
       },
       price:{
           type:dataType.DOUBLE
       },

       descripcion:{
           type:dataType.STRING
       },
       category:{
            type: dataType.INTEGER
       },
       imagen:{
           type: dataType.STRING
       }

    }

    let config = {
        tableName: "products",
        timestamps: false
    }
    
    let Product = sequalize.define(alias, cols, config);

    // esta parte no esta bien conectada todavia
   
    /* hasMany, belongsToMany, belongsTo*/
    Product.associate = function(models){
        Product.hasMany(models.Shop,{
            as : "product",
            //through: 
            // otherKey:
            //timestamps:

            foreignKey:""
        })
    }

    return Product;
}
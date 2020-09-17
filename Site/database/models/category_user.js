module.exports = function(sequalize, dataType){
    
    let alias = "Category_user";

    let cols = {
       id :{
            type:dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
       }, 
       category_name:{
            type:dataType.STRING
       },

    }

    let config = {
        tableName: "products",
        timestamps: false
    }
    
    let CategoryUser = sequalize.define(alias, cols, config);
    // esta parte no esta bien conectada todavia
    /* hasMany, belongsToMany, belongsTo*/
    CategoryUser.associate = function(models){
        CategoryUser.hasMany(models.Products,{
            as : "product",
            //through: 
            // otherKey:
            //timestamps:

            foreignKey:""
        })
    }
   
    return CategoryUser;
}
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = Schema({ 
    columns: Array,
    rows: [
        {
            Name: String,
            Specifications: String,
            Prices: String,
            AnnouncementDate: String
        }
    ]
});

const Product = mongoose.model("Products", ProductSchema);
     
module.exports = Product;
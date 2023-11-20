const ProductSchema = require("../Schemas/Products");
const pdata = require("./Dummy-Data-Products");
const axios = require("axios");

const AddDummyProducts = () => {
  let temp = pdata.products[0];

  ProductSchema.insertMany(
    {
      name: temp.title,
      description: temp.description,
      price: temp.price,
      discount: parseInt(temp.discountPercentage),
      image: temp.thumbnail,
      category: temp.category,
    },
    { maxTimeMS: 20000 }
  )
    .then((r4) => {
      if (r4.length > 0) {
        console.log(`${r4.length + 1} Product Inserted`);
      } else {
        console.log(`${r4.length + 1} Product Not Inserted`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = AddDummyProducts;

import mongoose from "mongoose";

// 몽고디비 콜렉션 tasks의 구조
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    tags: {
      type: Array,
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

// JS의 Product 모델 -> 몽고디비의 products 콜렉션에 대응
const Product = mongoose.model('Product', ProductSchema); 

export default Product;
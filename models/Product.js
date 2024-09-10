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

const Product = mongoose.model('Product', ProductSchema); // Product 모델 -> products 몽고 콜렉션에 대응

export default Product;
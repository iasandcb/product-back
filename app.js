import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import Product from './models/Product.js';

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Connected to DB'));

const app = express(); // JSON 요청 파싱

// const corsOptions = {
//   origin: ['http://127.0.0.1:3001', 'https://netlify.com'],
// };

// middleware 모든 요청에 공통적으로 적용한다.
app.use(express.json());
app.use(cors());
// app.use(cors(corsOptions));

function asyncHandler(handler) {
  // 함수를 인수로 받아서 함수를 반환한다.
  const newHandler = async function(req, res) {
    try {
      await handler(req, res)
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message});
      } else if (e.name === 'CastError') {
        res.status(404).send({ message: 'Cannot find given id.'});
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  }
  return newHandler;
}

app.get('/products', asyncHandler(async (req, res) => {
  // TODO: name, description 포함 검색을 몽고디비로
  // 오프셋 기반 페이지네이션을 구현하세요.
  // offset(이미 본 갯수), limit(앞으로 보고싶은 갯수)
  const sort = req.query.sort;
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  const sortOption = sort === 'recent' ? { createdAt: 'desc' } : {};
  const products = await Product.find().sort(sortOption).skip(offset).limit(limit);
  res.send(products);
}));

app.listen(process.env.PORT, () => console.log("Booted up"));

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // mongose에서 가져오기 때문

// Product model 만들기 - 데이터 베이스에 저장하기
const productSchema = mongoose.Schema({
  // 로그인한 User
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength: 50
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0
  },
  images: {
    type: Array,
    default: []
  },
  continents: {
    type: String,
    default: 1
  },
  sold: { // 얼마나 팔렸는지
    type: Number,
    maxlength: 100,
    default: 0
  },
  view: { // 얼마나 봤는지
    type: Number,
    default: 0
  }
   
}, { timestamps: true}) // 자동적으로 등록 시간이나, 업데이트 같은 것이 등록


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }
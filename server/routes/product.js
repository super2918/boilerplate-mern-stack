const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             product
//=================================


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 파일을 받는 폴더 path
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
 
var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
  // 가져온 이미지를 저장해준다.
  // multer -> 프론트로부터 받은 파일에 대한 처리를 할 수 있도록 도와준다.
    upload(req, res, err => {
      if (err) {
        // 실패시
        return req.json({ success: false, err})
      }
      // 성공시
      return res.json({ success: true, filePath: res.req.file.path , fileName: res.req.file.filename })
    })

} );

// 똑같은 api/product니까 
router.post('/', (req, res) => {
  // 받아온 정보들를 DB에 넣어준다. -> product model를 가져와야 한다.
  const product = new Product(req.body) // req.body에 모든 정보들이 담겨져 있는데 ->  새로운 객체를 생성한다.

 // 자동적으로 req.body에 있는 모든 정보들이 다 저장이되는 것이다.
  product.save((err) => { // err가 날 경우 적어야
    if(err) return res.status(400).json({ success: false, err}) // 실패할 경우 
    return res.status(200).json({ success: true })
  })
});


module.exports = router;

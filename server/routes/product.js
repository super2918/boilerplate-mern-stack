const express = require('express');
const router = express.Router();
const multer = require('multer');


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


module.exports = router;

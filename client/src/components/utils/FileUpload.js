import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from "styled-components"
import { Icon } from 'antd';
import axios from 'axios';


const ImageDropZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 240px;
  border: 1px solid lightgray;
  cursor: pointer;
`;

const ImgaesWrap = styled.div`
  border: 1px solid red;
  width: 320px;
  height: 240px;
  overflow-x: scroll;
`;

const ImageItem = styled.div`
  width: 320px;
`;


function FileUpload(props) {
  const [ Images , setImages ] = useState([]);

  const dropHandler = (files) => {
  // 1. 파일의 정보를 Fron -> Back으로 전달해 준다. 
  // 2. 전달된 파일을 Back-end에 저장이 되고 multer
  // 3. Back-end에서 저장 받은 정보를 다시 Front에 전달해준다.
  // 4. 확인 버튼을 누를 때 이미지에 대한 정보도 전달하기 때문에 useState에 저장을 한다

    let formData = new FormData;
    
    const config = {
      // back-end에서 파일을 전달 받을 때에 타입을 알고 있기 때문에 오류가 없이 전달을 받는다.
      header: { 'content-type' : 'multipart/form-data'}
    }

    formData.append("file", files[0]);

    console.log(formData);

    axios.post('/api/product/image', formData, config)
    .then(response => {
      if(response.data.success) {
        console.log(response.data)
        setImages([...Images, response.data.filePath])
        props.refreshFunction([...Images, response.data.filePath])
      } else {
        console.log('파일을 저장하는데 실패 하였습니다.')
      }
    })
  }

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image)

    let newImages = [...Images]
    newImages.splice(currentIndex, 1)
    setImages(newImages)
    props.refreshFunction(newImages)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <Dropzone onDrop={ dropHandler }>
        {({getRootProps, getInputProps}) => (
          <ImageDropZone>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type='plus' style={{ fontSize: '3rem' }} />
            </div>
          </ImageDropZone>
        )}
      </Dropzone>

      <ImgaesWrap>
          {
            Images.map((image, index) => {
              return (
                <ImageItem onClick={() => deleteHandler(image)} key={index} >
                  <img src={ `http://localhost:5000/${image}`} alt="" />
                </ImageItem>
              )})
          }
      </ImgaesWrap>

    </div>
  );
}

export default FileUpload;
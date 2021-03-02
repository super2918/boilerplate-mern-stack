import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
 
const { TextArea } = Input;

// select
const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
]

function UploadProductPage(props) { 

  const [ Title, setTitle] = useState('');
  const [ Description, setDescription ] = useState('');
  const [ Price, setPrice ] = useState(0);
  const [ Continent, setContinent ] = useState(1);
  const [ Images, setImages ] = useState([]); // images가 이미지 정보를 가지고 있어야 하는데

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value)
    console.log(event.currentTarget.value)
  }

  const descriptionChageHandler = (event) => {
    setDescription(event.currentTarget.value)
  }

  const priceChangeHalder = (event) => {
    setPrice(event.currentTarget.value)
  }

  const continentChangeHandelr = (event) => {
    setContinent(event.currentTarget.value)
  }

  const updateImages = (newImages) => {
    setImages(newImages)
    // 
  }

  console.log('props.user', props.user)

  const submitHandler = (event) => {
    event.preventDefault(); // 확인 버튼을 누를 때에 refresh가 되지 않는다.
    // 유효성 검사 - 하나 이상의 State가 비워져 있을 경우에 
    if (!Title || !Description || !Price || !Continent || !Images ) {
      return alert('모든 값을 채워주셔야 합니다.')
    }

    // 서버에 채운 값들을 request로 보낸다.
    const body = {
      // 현재 로그인한 User Id 
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent
    }

    //server route -> product.js  
    Axios.post('/api/product', body)
    .then( response => {
      if(response.data.success) {
        alert('상품 업로드에 성공하였습니다.')
        // 상품을 저장을 한 뒤 메인 페이지로 이동 
        props.history.push('/')
      } else {
        alert('상품 업로드에 실패하였습니다.')
      }
    })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
        <h2>여행 상품 업로드</h2>
      </div>
      <Form onSubmit={ submitHandler }>
        {/* DropZone */}
        <FileUpload refreshFunction={ updateImages } />

        <br/>
        <br/>
        <label>이름</label>
        <Input onChange={ titleChangeHandler } value={ Title }/>
        <br/>
        <br/>
        <label>설명</label>
        <TextArea onChange={ descriptionChageHandler } value={ Description } /> 
        <br/>
        <br/>
        <label>가격($)</label>
        <Input type="number" onChange={ priceChangeHalder } value={ Price } />
        <br/>
        <br/>
        <select onChange={ continentChangeHandelr } value={ Continent }>
          {
            Continents.map(item => {
              return <option key={item.key} value={item.key}>{item.value}</option>
            })
          }
        </select>
        <br/>
        <br/>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
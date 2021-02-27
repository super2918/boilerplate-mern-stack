import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import { set } from 'mongoose';
 
const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage(props) {

  const [ Title, setTitle] = useState('');
  const [ Description, setDescription ] = useState('');

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value)
    console.log(event.currentTarget.value);
  }


  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
        <h2>여행 상품 업로드</h2>
      </div>
      <Form>
        {/* DropZone */}
        <br/>
        <br/>
        <label>이름</label>
        <Input onChange={ titleChangeHandler }/>
        <br/>
        <br/>
        <label>설명</label>
        <TextArea />
        <br/>
        <br/>
        <label>가격($)</label>
        <Input />
        <br/>
        <br/>
        <select>
          <option></option>
        </select>
        <br/>
        <br/>
        <Button>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
import React from 'react';
import Dropzone from 'react-dropzone';
import styled from "styled-components"
import { Icon } from 'antd';


const ImageDropZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  cursor: pointer;
`;

function FileUpload() {
  return (
    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
      {({getRootProps, getInputProps}) => (
        <ImageDropZone>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon type='plus' style={{ fontSize: '3rem' }} />
          </div>
        </ImageDropZone>
      )}
    </Dropzone>
  );
}

export default FileUpload;
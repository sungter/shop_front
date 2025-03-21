import axios from 'axios';
import React, { useState } from 'react'

//파일(이미지, 동영상 등....) 업로드

const UploadTest = () => {
  //type이 file인 input 태그에서 선택한 파일 데이터를 저장할 변수
  const [firstFile, setFirstFile] = useState(null);

  //type이 file인 input 태그에서 선택한 다중 파일 데이터를 저장할 변수
  const [secondFiles, setSecondFiles] = useState(null);

  //자바로 데이터를 전달할 때, 문자 뿐 아니라 파일 데이터도 가져간다는 것을 설정
  const fileConfig = {header : {'Content-Type' : 'multipart/form-data'}};

  const sendFile = () => {
    //첨부파일 데이터를 자바로 전달하기 위해서는 FormData() 객체를 사용해야한다.
    //form 데이터 객체 생성 : 첨부파일, input 태그 등의 모든 데이터를 
    //                       자바로 가져갈 수 있게 변환해주는 객체
    const form = new FormData();
    form.append('firstFile', firstFile);


    //post() 메서드의 세번째 매개변수로 fileConfig를 전달 
    //*(파일 첨부 java에 보내기 위해서 필수적으로 사용해야되는 정의된 문법)
    axios.post(
      '/api/test/upload1'
      , form
      , fileConfig)
      .then()
      .catch();
  };

  return (
    <div>
      <input 
        type="file" 
        //multiple // 한 번에 여러 파일을 선택할 수 있게 해주는 속성
        onChange={(e) => {
          //e.target.files : 선택한 파일들의 정보
          //선택한 파일들 리스트
          console.log(e.target.files);
          //선택한 파일 한 개
          console.log(e.target.files[0]);

          //파일을 선택할 때 마다 선택한 파일을 firstFile에 저장한다.
          setFirstFile(e.target.files[0]);       
        }}
      />

      <button type='button' onClick={() => {sendFile()}}>파일 전송</button>

      <br />
      
      <input 
        type="file" 
        multiple
        onChange={(e) => {
          setSecondFiles(e.target.files)
        }}
      />

      <button type='button' onClick={() => {
        const form2 = new FormData();
        //form2.append('files', secondFiles[0]);
        //데이터가 여러개인 배열이기 떄문에 하나씩 append 해줘야한다.
        //form2 데이터를 넘길때 자바에서 files로 받기 때문에 append의 첫 매개변수 동일
        //파일 첨부를 했을때만..
        if(secondFiles !== null){
          //첨부한 파일 갯수만큼 formData에 저장
          for(const eachFile of secondFiles){
            form2.append('files', eachFile)
          }
        }
        

        axios.post('/api/test/upload2', form2 , fileConfig)
            .then()
            .catch()
      }}>다중 파일 전송</button>
    </div>
  )
}

export default UploadTest
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Axios흐름 = () => {
  const [num, setNum] = useState(0);




  useEffect(() => {
    if(num != 0){
      //받은 게시글 번호에 달린 댓글 목록 조회
      axios.get(`/api/replies/${num}`)
          .then()
          .catch()
    }
  }, [num]);




  useEffect(() => {
    console.log('통신 전')
    
    //비동기 방식
    axios.get('/api/test/1')
        .then(res => {
          //서버에서 받은 게시글 번호를 num에 저장
          setNum(res.data)
        })
        .catch();

  }, []);

  return (
    <>
      <div>Axios흐름</div>

    </>
   
  )
}

export default Axios흐름
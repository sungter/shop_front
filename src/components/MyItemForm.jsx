import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MyItemForm = () => {
  //카테고리 정보 받아올 변수
  const [bookCategory, setBookCategory] = useState([]);
  //책 등록하기 위해 입력한 값 저장할 변수
  const [regItem, setRegItem] = useState({
    cateCode : 0
  });

  //책 등록 입력값을 변수에 넣을 함수
  const changeRegItem = (e) => {
    setRegItem({
      ...regItem,
      [e.target.name] : e.target.value
    })
  };

  //카테고리 정보 받아올 함수
  useEffect(() => {
    axios.get('/api/categories')
        .then(res => setBookCategory(res.data))
        .catch(error => console.log(error))
  }, []);

  //책 등록 쿼리 함수
  const regBook = () => {
    if(regItem.cateCode === 0){
      alert('카테고리를 선택하시오.')
      return;
    }

    if(!confirm('등록하시겠습니까?')){
      return;
    }

    axios.post('/api/admins', regItem)
        .then(res => {
          alert('등록이 완료되었습니다.')
          window.location.reload();
        })
        .catch(error => console.log(error))
  };


  return (
    <div>
      <div>
        <span>책 이름 : </span>
        <input type="text" placeholder='책 이름을 입력하시오.'
        name='bookName' value={regItem.bookName} onChange={(e) => {changeRegItem(e)}}/>
      </div>

      <div>
        <span>가격 : </span>
        <input type="text" placeholder='책 가격을 입력하시오.' 
        name='bookPrice' value={regItem.bookPrice} onChange={(e) => {changeRegItem(e)}}/>
      </div>

      <div>
        <span>출판사 : </span>
        <input type="text" placeholder='출판사를 입력하시오.' 
        name='publisher' value={regItem.publisher} onChange={(e) => {changeRegItem(e)}}/>
      </div>

      <div>
        <span>책 설명 : </span>
        <textarea cols={50} rows={10} 
        name='bookInfo' value={regItem.bookInfo} onChange={(e) => {changeRegItem(e)}}/>
      </div>

      <div>
        <span>카테고리</span>
        <select name='cateCode' value={regItem.cateCode} onChange={(e) => {changeRegItem(e)}}>
          <option value="0">선택</option>
          {
            bookCategory.map((category, i) => {
              return(
                <option value={category.cateCode} key={i}>{category.cateName}</option>
              )
            })
          }
        </select>
      </div>

      <div>
        <button type='button' onClick={(e) => {regBook()}}>등록하기</button>
      </div>

    </div>
  )
}

export default MyItemForm
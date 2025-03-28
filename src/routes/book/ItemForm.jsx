import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as bookApi from '../../apis/bookApi'
import ShopInput from '../../common_component/ShopInput';
import ShopButton from '../../common_component/ShopButton';
import ShopTextarea from '../../common_component/ShopTextarea';
import ShopSelect from '../../common_component/ShopSelect';

//상품 등록 컴포넌트
//도서명 input
//가격 input
//출판사 input
//책정보 textarea
//카테고리 코드 select
const ItemForm = () => {
  //카테고리 정보 목록 저장할 변수
  const [bookCategory, setBookCategory] = useState([]);

  //도서 등록을 위해 입력받은 값을 저장할 변수
  const [bookData, setBookData] = useState({
    cateCode : 1,
    bookName : '',
    publisher : '',
    bookPrice : 0,
    bookInfo : ''
  });

  //메인, 상세 이미지 파일 저장할 변수
  const [mainImg , setMainImg] = useState(null);
  const [subImg , setSubImg] = useState(null);

  

  //카테고리 정보 목록을 가져올 함수
  useEffect(() => {
    bookApi.getCategoryList()
      .then(res => setBookCategory(res.data))
      .catch(error => console.log(error));
  } , []);

  //regBook를 입력한 값으로 바꿀 함수
  const changeBookData = (e) => {
    setBookData({
      ...bookData,
      [e.target.name] : e.target.value
    })
  };

  //도서 테이블에 새로 등록하는 기능을 가진 함수
  const regBook = () => {
    if(!confirm('새로운 도서를 등록하시겠습니까?')){
      return;
    }



    const regForm = new FormData();
    //도서 등록시(DB에 insert) 필요한 데이터 적재
    regForm.append('cateCode', bookData.cateCode);
    regForm.append('bookInfo', bookData.bookInfo);
    regForm.append('bookName', bookData.bookName);
    regForm.append('bookPrice', bookData.bookPrice);
    regForm.append('publisher', bookData.publisher);

    //첨부파일 데이터 적재
    regForm.append('mainImg', mainImg);
    regForm.append('subImg', subImg);
    


    bookApi.insertBook(regForm)
        .then(res => {
          alert('등록이 완료되었습니다.');
          window.location.reload();
        })
        .catch(error => console.log(error))
  };


  return (
    <div className='item-form-container'>
      <div>
        <h3>도서 등록</h3>
      </div>
      
      <div>
        <div>
          <h4>카테고리</h4>
          <ShopSelect 
            name='cateCode'
            size='small'
            value={bookData.cateCode} 
            onChange={e => changeBookData(e)}
          >
            {
              bookCategory.map((category, i) => {
                return(
                  <option key={i} value={category.cateCode}>{category.cateName}</option>
                )
              })
            }
          </ShopSelect>
        </div>
        
        <div>
          <h4>도서명</h4>
                    
          <ShopInput 
            name='bookName'
            value={bookData.bookName} 
            onChange={e => changeBookData(e)}
          />
        </div>
        
        <div>
          <h4>출판사</h4>
    
          <ShopInput 
            name='publisher' 
            value={bookData.publisher} 
            onChange={e => changeBookData(e)}
          />
        </div>
        
        <div>
          <h4>가격</h4>

          <ShopInput 
            name='bookPrice' 
            value={bookData.bookPrice} 
            onChange={e => changeBookData(e)}
          />
        </div>
        
        <div>
          <h4>책 소개</h4>
        
          <ShopTextarea 
            cols={50}
            rows = {10}
            name='bookInfo'
            value={bookData.bookInfo} 
            onChange={e => changeBookData(e)}
          />
        </div>

        <div>
          <h4>도서 이미지</h4>
          
          <div>
            {/* 메인 이미지 */}
            <span>도서 메인 이미지</span>
            <input type="file" onChange={e => setMainImg(e.target.files[0])} />
          </div>

          <div>
            {/* 상세 이미지 */}
            <span>도서 상세 이미지</span>
            <input type="file" onChange={e => setSubImg(e.target.files[0])} />
          </div>

        </div>
      </div>
      
      <div>
        <ShopButton 
          click={e => regBook()} 
          size='small'
          title='등 록'
        />
      </div>
    </div>
  )
}

export default ItemForm
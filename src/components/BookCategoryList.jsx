import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './BookList.module.css'

const BookCategoryList = () => {
  const {cateCode} = useParams();

  //책 리스트 가져와 저장할 변수
  const [BookList, setBookList] = useState([]);

  //책 리스트 불러오는 함수
  useEffect(() => {
    axios.get(`/api/homes/${cateCode}`)
        .then(res => setBookList(res.data))
        .catch(error => console.log(error))
  }, []);

  console.log(BookList);

  return (
    <div className={styles.book_list}>
          {
            BookList.map((book, i) => {
              return(
                <div key={i}>
                  <div>이미지</div>
                  <div>{book.bookName}</div>
                  <div>￦ {book.bookPrice.toLocaleString()}</div>
                </div>
              )
            })
          }
        </div>
  )
}

export default BookCategoryList
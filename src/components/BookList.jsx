import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './BookList.module.css'
import { useParams } from 'react-router-dom';

const BookList = () => {

  //책 리스트 가져와 저장할 변수
  const [bookList, setBookList] = useState([]);

  //책 리스트 불러오는 함수
  useEffect(() => {
    axios.get('/api/homes')
        .then(res => setBookList(res.data))
        .catch(error => console.log(error))
  }, []);
  console.log(bookList)


  return (
    <div className={styles.book_list}>
      {
        bookList.map((book, i) => {
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

export default BookList
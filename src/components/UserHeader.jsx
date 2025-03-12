import React, { useEffect, useState } from 'react'
import styles from './UserHeader.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const nav = useNavigate();

  //카테고리 정보 받아올 변수
  const [bookCategory, setBookCategory] = useState([]);
  
  //카테고리 정보 받아올 함수
  useEffect(() => {
    axios.get('/api/categories')
        .then(res => setBookCategory(res.data))
        .catch(error => console.log(error))
  }, []);

  return (
    <div className={styles.header_container}>
      
      <div className={styles.login_div}>
        <span onClick={e => nav('/login')}>Login</span>
        <span onClick={e => nav('/join') }>Join</span>
      </div>

      <div className={styles.banner_div}>
        <img src="/23673952_6850521.jpg" alt="book-banner" />
        <div><img src="/public\KakaoTalk_20250226_155432849.png"/></div>
        
      </div>

      <div className={styles.menu_div}>
        <ul className={styles.menu_ul}>
          <li onClick={e => nav('/')}>전체</li>
          {
            bookCategory.map((category, i) => {
              return(
                <li key={i} value={category.cateCode} 
                  onClick={e => {nav(`/${category.cateCode}`), window.location.reload()}}
                >{category.cateName}</li>
              )
            })
          }
        </ul>
      </div>

      
    </div>
  )
}

export default UserHeader
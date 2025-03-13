import React, { useEffect, useState } from 'react'
import styles from './UserHeader.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const nav = useNavigate();

  //카테고리 정보 받아올 변수
  const [bookCategory, setBookCategory] = useState([]);

  //sessionStorage에 있는 loginInfo 데이터 가져오기
  //loginInfo 데이터가 없다면 로인 안한 것, -> null
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));

  
  //카테고리 정보 받아올 함수
  useEffect(() => {
    axios.get('/api/categories')
        .then(res => setBookCategory(res.data))
        .catch(error => console.log(error))
  }, []);


  //세션 스토리지 안 로그인 정보 삭제 함수
  const deleteLoginInfo = () => {
    sessionStorage.removeItem('loginInfo')
    window.location.reload()
  }
  

  return (
    <div className={styles.header_container}>
      
      {/* 로그인 했을 경우와 안했을 경우 header배너 변경 */}
      {
        loginInfo === null 
        ? 
        <div className={styles.login_div}>
          <span onClick={e => nav('/login')}>Login</span>
          <span onClick={e => nav('/join') }>Join</span>
        </div>
        :
        <div className={styles.loginInfo_div}>
          <span>{`[ ${loginInfo.userId} 님 ]`}</span>
          <span onClick={e => deleteLoginInfo()} className={styles.logout} >Logout</span>
        </div>
      }
      

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
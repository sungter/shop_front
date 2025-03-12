import React, { useState } from 'react'
import ShopInput from '../common_component/ShopInput';
import ShopButton from '../common_component/ShopButton';
import axios from 'axios';
import { loginUser } from '../apis/userApi';
import styles from './Login.module.css'

/**
 * axios.get으로 여러 데이터를 전달하는 방법(delete도 가능)
 * axios.get('url', {params : 전달할 데이터})
 * 
 * 전달할 데이터는 객체 형식으로 전달
 * 
 * 위 방식으로 전달한 데이터는 Spring에서
 * 1. RequestParam 어노테이션을 사용해 객체 안 키 값을 하나씩 받거나,
 * 2. 어노테이션 없이 DTO 객체 형태로 데이터를 받으면 된다.
 * 
 * PS. 리액트 2번 PDF Query String으로 전달된 데이터를 받는 방식과 일치하다.(페이지 번호 : 23번)
 */
const Login = () => {
  
  //아이디, 비밀번호 입력받은 데이터 저장할 state 변수
  const [loginData, setLoginData] = useState({
    userId : '',
    userPw : ''
  });

  //입력시 입력받은 데이터로 변수 변환하는 함수
  const changeLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }

  //axios.get() 방식으로 버튼 클릭시 실행될 함수
  const checkLogin = () => {
    loginUser(loginData)
        .then((res) => {
          console.log(res.data)
          //자바에서 null데이터가 넘어오면 ''(빈문자로 받는다) 아닌경우, 조회한 데이터를 가진 객체가 넘어온다
          if(res.data === ''){
            alert('실패')
          }
          else{
            alert('성공')
          }
        })
        .catch()
  }

  return (
    <div className={styles.container}>
      <div>
        <p>아이디</p>
        <ShopInput 
          name='userId' 
          size='wide' 
          value={loginData.userId} 
          onChange={e => changeLoginData(e)}
        />
      </div>

      <div>
        <p>비밀번호</p>
        <ShopInput 
          name='userPw' 
          size='wide' 
          type='password' 
          value={loginData.userPw} 
          onChange={e => changeLoginData(e)} 
        />
      </div>

      <div>
        <ShopButton size='small' title='로그인' click={e => checkLogin()} />
      </div>
    </div>
  )
}

export default Login
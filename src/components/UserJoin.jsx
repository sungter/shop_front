import React, { useEffect, useState } from 'react'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import axios from 'axios';
import styles from './UserJoin.module.css'
import ShopSelect from '../common_component/ShopSelect';
import { regUser } from '../apis/userApi';

const UserJoin = () => {
  //id 입력이 잘못되었을 때 나타나는 에러 메세지
  const [errorMsg, setErrorMsg] = useState({
    userId : '',
    userPw : '',
    userName : '',
    userTel : ''
  });

  //입력한 값을 저장할 변수
  const [insertData, setInsertData] = useState({
    userId : '',
    userPw : '',
    userName : '',
    userEmail : '', //완성된 이메일
    email1 : '',
    email2 : '@naver.com',
    userTel : '', //완성된 연락처 ex) 010-1111-1111
    tel1 : '010',
    tel2 : '',
    tel3 : ''
  });


  //email1, email2 값이 변경 될때만 실행 함수 쓰거나 밑에 changeInsertData 함수에서 삼항연산자 사용
  useEffect(() => {
    setInsertData({
      ...insertData,
      userEmail : insertData.email1 + insertData.email2,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [insertData.email1, insertData.email2]);

  //tel1, tel2, tel3 값이 변경될 때만 실행 함수 --
  useEffect(() => {
    setInsertData({
      ...insertData,
      userTel : [insertData.tel1, insertData.tel2, insertData.tel3].join('-')
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ insertData.tel1, insertData.tel2, insertData.tel3])


  //insertData를 입력한 값으로 바꾸는 함수
  const changeInsertData = (e) => {
    // //이메일을 수정했다면?
    // if(e.target.name === 'email1' || e.target.name === 'email2'){
    //   setInsertData({
    //     ...insertData,
    //     [e.target.name] : e.target.value,
    //     userEmail : e.target.name === 'email1' ?
    //                   e.target.value + insertData.email2 
    //                   : 
    //                   insertData.email1 + e.target.value
    //   });

      
    // }

    // //연락처를 수정했다면?
    // else if(e.target.name === 'tel1' || e.target.name === 'tel2' || e.target.name === 'tel3'){
    //   const userTel = 
    //   e.target.name === 'tel1' ? e.target.value + '-' + insertData.tel2 + '-' + insertData.tel3
    //                     : e.target.name === 'tel2' ? insertData.tel1 + '-' + e.target.value + '-' + insertData.tel3
    //                     : insertData.tel1 + '-' + insertData.tel2 + '-' + e.target.value

    //   setInsertData({
    //     ...insertData,
    //     [e.target.name] : e.target.value,
    //     userTel : userTel
    //   });
    // }

    // //이메일, 연락처를 제외한 나머지를 수정했다면?
    // else{
    //   setInsertData({
    //     ...insertData,
    //     [e.target.name] : e.target.value
    //   });
    // }

    setInsertData({
      ...insertData,
      [e.target.name] : e.target.value
    });
    
  };


  //회원가입을 위해 입력한 값 유효성 검사
  const insertValidate = () => {
    let isUsable = false;

    setErrorMsg((state) => {
      return {...state,
        userId : '',
        userPw : '',
        userName : '',
        userTel : ''
      }
    });

    //방법 1 (다른 방법 : 새 변수를 만들어 마지막에 setErrorMsg 함수를 쓰는 방법, useEffect, 삼항연산자 등 있다.)
    
    //정규식을 활용한 코딩
    const regex_id = /^[A-Za-z]{4,16}$/;
    if(!regex_id.test(insertData.userId)){
      setErrorMsg((state) => {
        return {...state, userId : '잘못된 아이디입니다.'}
      });
      isUsable = true;
    }
    
    const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    if(! regex_pw.test(insertData.userPw)){
      setErrorMsg((state) => {
        return {...state, userPw : '잘못된 비밀번호입니다.'}
      });
      isUsable = true;
    }
    

    const regex_name = /^[A-Za-z가-힣]{2,16}$/;
    if(!regex_name.test(insertData.userName)){
      setErrorMsg((state) => {
        return {...state, userName : '잘못된 형식의 이름입니다.'}
      });
      isUsable = true;
    }

    const regex_tel = /^(01[0-9]-\d{3,4}-\d{4}|0[2-9][1-9]-\d{3,4}-\d{4})$/;
    if(!regex_tel.test(insertData.userTel)){
      setErrorMsg((state) => {
        return {...state, userTel : '잘못된 형식의 전화번호입니다.'}
      });
      isUsable = true;
    }

    return isUsable;
  }



  //회원가입 버튼 클릭시 작용할 기능
  const insertUser = () => {
    
    if(!insertValidate()){
      regUser(insertData)
        .then(res => {
          if(res.data === 1){
            alert(`${insertData.userId} 님 가입을 축하합니다.`);
            window.location.reload();
          }
          else if(res.data === 2){
            alert('중복된 아이디가 있습니다.')
          }
          else if(res.data === 3){
            alert('같은 전화번호가 있습니다.')
          }
        })
        .catch(error => console.log(error))
    }

  };


  return (
    <div className={styles.container}>
      <h3>회원 가입하기</h3>

      <div className={styles.body}>

        <table >
          <tbody>
            <tr>
              <td>아이디 <span className={styles.red}>*</span></td>
              <td>
                <ShopInput 
                  maxLength={16}
                  name='userId' 
                  value={insertData.userId} 
                  onChange={e => changeInsertData(e)}
                />
                <span className={styles.check_data}> 영문 대,소문자 4~16자</span>
              
                { errorMsg.userId && <p className='error-msg' >{errorMsg.userId}</p> }
              </td>
            </tr>
  
            <tr>
              <td>비밀번호 <span className={styles.red}>*</span></td>
              <td>
                <ShopInput 
                  maxLength={20}
                  type='password' 
                  name='userPw' 
                  value={insertData.userPw} 
                  onChange={e => changeInsertData(e)}
                />
                <span className={styles.check_data}> 영문 대,소문자와 숫자 조합 6~20자</span>
                { errorMsg.userPw && <p className='error-msg' >{errorMsg.userPw}</p> }
              </td>
            </tr>
  
            <tr>
              <td>이름 <span className={styles.red}>*</span></td>
              <td>
                <ShopInput
                  maxLength={16}
                  name='userName' 
                  value={insertData.userName} 
                  onChange={e => changeInsertData(e)} 
                />
                <span className={styles.check_data}> 영문 대,소문자 혹은 한글 2~16자</span>
                { errorMsg.userName && <p className='error-msg'>{errorMsg.userName}</p> }
              </td>
            </tr>
  
            <tr>
              <td>E-mail</td>
              <td>
                <ShopInput 
                  name='email1' 
                  value={insertData.email1} 
                  onChange={e => changeInsertData(e)}
                />
                @
                <ShopSelect 
                  size='small' 
                  name='email2' 
                  value={insertData.email2} 
                  onChange={e => changeInsertData(e)} 
                >
                  <option value="@naver.com">naver.com</option>
                  <option value="@gmail.com">gmail.com</option>
                  <option value="@daum.net">daum.net</option>
                </ShopSelect>
              </td>
            </tr>
  
            <tr>
              <td>전화번호<span className={styles.red}>*</span></td>
              <td>
                <ShopInput 
                  maxLength={3}
                  size='small'
                  name='tel1' 
                  value={insertData.tel1} 
                  onChange={e => changeInsertData(e)}
                />
                -
                <ShopInput 
                  maxLength={4}
                  size='small'
                  name='tel2' 
                  value={insertData.tel2} 
                  onChange={e => changeInsertData(e)}
                />
                -
                <ShopInput 
                  maxLength={4}
                  size='small'
                  name='tel3' 
                  value={insertData.tel3} 
                  onChange={e => changeInsertData(e)}
                />
                { errorMsg.userTel && <p className='error-msg'>{errorMsg.userTel}</p> }
              </td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <span className={styles.red}> * </span>
          <span className={styles.small_span}>필수 입력 사항</span>
          <br />
          <ShopButton title='회원가입' size='small' click={e => insertUser()} />
        </div>
  
      </div>
      
    </div>
  )
}

export default UserJoin
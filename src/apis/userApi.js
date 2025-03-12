import axios from "axios";



/**
 * 회원가입
 */
export const regUser = (insertData) => {
  const response = axios.post('/api/users', insertData);
  return response;
}


/**
 * 로그인
 * loginData = {userId : '??' , userPw : '??'}
 */
export const loginUser = (loginData) => {
  const response = axios.get('/api/users/login', {params : loginData});
  return response;
}


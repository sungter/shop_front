// 외부파일에서 선언한 변수 및 함수를 사용하기 위해서는
// export(내보내기)와 import(가져오기)를 적절히 사용해야함.

import axios from "axios";


// 첫 번째 방식 (export default)
// export default는 파일당 하나만 사용 가능
// export default로 내보낸 데이터는 사용할때, 이름을 변경해서 받을 수 있다. 



// 두 번째 방식
// 변수나 함수 앞에 export 키워드만 붙여서 내보내기 가능
// export default와 달리 필요한 만큼 데이터를 보낼 수 있다.
// export로 내보내진 데이터는 사용 시 반드시 이름 동일하게만 사용할 수 있다.
//export로 내보내진 데이터는 import시 중괄호에 데이터 이름을 가져간다.



// 해당 파일에 도서 카테고리와 도서관련 axios 기능을 모아놓을 파일

/**
 * 카테고리 목록 조회
 */
export const getCategoryList = () => {
  const response = axios.get('/api/categories');
  return response;
};


/**
 * 카테고리 등록
 * param : 신규 등록되는 카테고리명(객체)
 */
export const insertCategory = (cateName) => {
  const response = axios.post(`/api/categories`, cateName);
  return response;
};


/**
 * 카테고리 삭제
 * param : 등록된 카테고리 삭제하기 위한 코드 번호 (int)
 */
export const deleteCategory = (cateCode) => {
  const response = axios.delete(`/api/categories/${cateCode}`);
  return response;
};


/**
 * 도서 등록
 * param : 도서 등록을 위해 입력한 값을 받은 데이터 (객체)
 * 
 * {
 * cateCode : 1,
    bookName : '',
    publisher : '',
    bookPrice : 0,
    bookInfo : ''
 * }
 * 
 */
export const insertBook = (bookData) => {
  const response = axios.post('/api/books', bookData);
  return response;
};















import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./routes/common/UserLayout";
import BookList from "./components/BookList";
import UserJoin from "./routes/member/UserJoin";
import Login from "./routes/member/Login";
import AdminLayout from "./routes/common/AdminLayout";
import ItemForm from "./routes/book/ItemForm";
import CateManage from "./routes/book/CateManage";
import BookCategoryList from './components/BookCategoryList'
import BookDetail from './components/BookDetail'

function App() {
  //sessionStorage에 있는 loginInfo데이터 받아오기
  //받은 데이터는 객체가 아닌 json 데이터이다.(문자열 데이터)
  //사용하려면 객체로 변환해줘야한다. -> JSON.parse(json데이터)

  // const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
  // console.log(loginInfo)

  return (
    <div className="container">
      {/* 파일 업로드 연습 */}
      {/* <UploadTest /> */}

      {/* <StorageTest /> */}
      {/* 연습
      <div>
        <ShopInput size="wide" />
      </div>
      
      <div>
        <ShopInput type={'password'} />
      </div>
      

      <ShopButton title={'버튼1'} size={'small'} click={() => {console.log(1)}} />
      <ShopButton title={'버튼2'} size={'normal'} click={() => {console.log(5)}} />
      <ShopButton size={'large'} click={() => {console.log(10)}} /> */}

      <Routes>
        {/* 유저가 접속하는 페이지 */}
        <Route path="/" element={<UserLayout />}>
          {/* 상품 목록 페이지 */}
          <Route path="" element={<BookList />} />

          {/* 카테고리 안 정보 페이지 */}
          <Route path=":cateCode" element={<BookCategoryList />} />

          {/* 회원가입 페이지 */}
          <Route path="join" element={<UserJoin />} />

          {/* 로그인 페이지 */}
          <Route path="login" element={<Login />} />

          {/* 상품 상세 페이지 */}
          <Route path="detail" element={<BookDetail />} />
        </Route>

        {/* 관리자가 접속하는 페이지 */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* 상품 등록 */}
          <Route path="reg-item" element={<ItemForm />} />
          {/* <Route path="reg-item" element={ <MyItemForm /> } /> */}

          {/* 카테고리 관리 */}
          <Route path="cate-manage" element={<CateManage />} />

          {/* 회원 관리 */}
          <Route path="user-manage" element={<div>회원관리</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

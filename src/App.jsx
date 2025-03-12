

import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import UserHeader from "./components/UserHeader";
import ItemForm from "./components/ItemForm";
import MyItemForm from "./components/MyItemForm";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import Category from "./components/CateManage";
import CateManage from "./components/CateManage";
import BookCategoryList from "./components/BookCategoryList";
import State변경함수흐름 from "./components/practice/State변경함수흐름";
import Axios흐름 from "./components/practice/Axios흐름";
import ShopButton from "./common_component/ShopButton";
import ShopInput from "./common_component/ShopInput";
import UserJoin from "./components/UserJoin";
import State변경함수흐름2 from "./components/practice/State변경함수흐름2";
import State변경함수흐름3 from "./components/practice/State변경함수흐름3";
import Login from "./components/Login";


function App() {
  

  return (
    <div className='container'>
      
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
        <Route path="/" element={ <UserLayout/> } >
          {/* 상품 목록 페이지 */}
          <Route path="" element={ <BookList /> } />

          {/* 카테고리 안 정보 페이지 */}
          <Route path=":cateCode" element={ <BookCategoryList/> } />

          {/* 회원가입 페이지 */}
          <Route path="join" element={ <UserJoin /> } />

          {/* 로그인 페이지 */}
          <Route path="login" element={ <Login /> } />
        
          {/* 상품 상세 페이지 */}
          <Route path="detail" element={ <BookDetail/> } />
        </Route>



        {/* 관리자가 접속하는 페이지 */}
        <Route path="/admin" element={ <AdminLayout/> } >
          {/* 상품 등록 */}
          <Route path="reg-item" element={ <ItemForm /> } />
          {/* <Route path="reg-item" element={ <MyItemForm /> } /> */}

          {/* 카테고리 관리 */}
          <Route path="cate-manage" element={ <CateManage /> } />

          {/* 회원 관리 */}
          <Route path="user-manage" element={ <div>회원관리</div> } />
        </Route>

      </Routes>
    </div>
  );
}

export default App;

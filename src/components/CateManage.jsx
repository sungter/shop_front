import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as bookApi from '../apis/BookApi';
import styles from './CateManage.module.css'
import ShopInput from '../common_component/ShopInput';
import ShopButton from '../common_component/ShopButton';

const CateManage = () => {
  //카테고리 목록 받아와 저장할 변수
  const [cateList, setCateList] = useState([]);

  //카테고리 등록을 위한 변수
  const [insertData, setInsertData] = useState({
    cateName : ''
  });

  //오류 메세지를 저장할 변수
  const [errorMsg, setErrorMsg] = useState('')

  
  //updateData 데이터 변경 함수
  const changeUpdate = (e, code, i) => {
    let copyCateList = [...cateList];
    copyCateList[i].cateCode = code;
    copyCateList[i].cateName = e.target.value;
    setCateList(copyCateList);
  };

  //update를 위해 데이터 보낼 함수
  const updateCate = (i) => {
    if(!confirm('수정하시겠습니까?')){
      return;
    }

    axios.put('/api/categories', cateList[i])
        .then(res => {
          alert('수정되었습니다');
          window.location.reload();
        })
        .catch(error => console.log(error))
  };


  //insertData 변경 함수
  const changeData = (e) => {
    setInsertData({
      ...insertData,
      [e.target.name] : e.target.value
    })
  };

 
  //풀이로 쿼리를 통해 유효성 검사함.............
  //등록시 유효성 검사
  // const checkData = () => {
  //   let check = true;
    
  //   for(let i = 0 ; i < cateList.length; i++){
  //     if(insertData.cateName === cateList[i].cateName){
  //       alert('동일한 카테고리가 있습니다.')
  //       check = false;
  //     }
  //   }

  //   return check;
  // }; 

  //카테고리 등록 함수
  const insertCate = () => {
    // if(!checkData()){
    //   return;
    // }
    if(insertData.cateName === ''){
      setErrorMsg('카테고리명은 최소 한 글자 이상입니다.');
      return;
    }

    if (!confirm('카테고리를 등록 하시겠습니까?')){
      return;
    }

    bookApi.insertCategory(insertData)
        .then(res => {
          //등록 여부에 따라 다른 코드 진행
          if(res.data === 1){
            alert('등록 성공');
            //input 태그의 값을 초기화
            setInsertData({...insertData, cateName : ''})
            setErrorMsg('')
            window.location.reload();
          }
          else{
            setErrorMsg('이미 등록된 카테고리명입니다');
          }
        })
        .catch(error => {
          console.log(error);
        })
  };

  //카테고리 목록 받아오는 함수
  useEffect(() => {
    bookApi.getCategoryList()
    .then(res => setCateList(res.data))
    .catch(error => console.log(error));

    // axios.get('/api/categories')
    //     .then(res => setCateList(res.data))
    //     .catch(error => console.log(error));
  }, []);

  //카테고리 삭제하기 위한 함수
  const deleteCate = (cateCode) => {
    if(!confirm('삭제하시겠습니까?')){
      return;
    }

    bookApi.deleteCategory(cateCode)
        .then(res => {
          alert('삭제되었습니다.');
          window.location.reload();
        })
        .catch(error => console.log(error))
  };



  return (
    <div>
      <h3>카테고리 관리</h3>

      <div>
        <p>카테고리 등록</p>
        
        <ShopInput 
          name='cateName'
          value={insertData.cateName}
          onChange={(e) => {
            changeData(e)
          }}
          onKeyDown={(e) => {
            //키보드 엔터를 누르면...
            if(e.key === 'Enter'){
              insertCate()
            }
          }}
        />

        <ShopButton 
          title='카테고리 등록'
          click={e => insertCate()}
        />
        {
          errorMsg && 
          <p className={styles.error_p}>
            {errorMsg}
          </p>
        }
      </div>
      
      <div>
        <p>카테고리 목록</p>
        <table border={1}>
          <thead>
            <tr>
              <td>No</td>
              <td>카테고리 코드</td>
              <td>카테고리명</td>
              <td>수정</td>
              <td>삭제</td>
            </tr>
          </thead>

          <tbody>
            {
              cateList.map((cate, i) => {
                return(
                  <tr key={i}>
                    <td>{cateList.length - i}</td>
                    <td>{cate.cateCode}</td>
                    <td>
                      <ShopInput 
                        value={cate.cateName} 
                        onChange={e => changeUpdate(e, cate.cateCode, i)}
                      />
                    </td>
                    <td>
                      <ShopButton 
                        size='small' 
                        title='수정' 
                        click={e => updateCate(i)}
                      />
                    </td>
                    <td>
                      <ShopButton 
                        size='small'
                        title='삭제'
                        click={e => deleteCate(cate.cateCode)}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default CateManage

import React, { useEffect, useState } from 'react'

const State변경함수흐름3 = () => {
  const [student, setStudent] = useState({
    name : 'hong',
    age : 20, 
    score : 90
  });

  // 매개변수로 들어간 state = student 데이터의 최신 데이터를 가진다.
  // setStudent((state) => {
  //   return {...state, name : 'kim'}
  // });

  const changeData = () => {
    setStudent((state) => {
      return {...state, name : 'kim'}
    });

    setStudent((state) => {
      return {...state, age : 30}
    });

    console.log('함수 안');
    console.log(student);
  };

  useEffect(() => {
    changeData();
  } , []);

  console.log('함수 밖');
  console.log(student);

  return (
    <div>State변경함수흐름3</div>
  )
}

export default State변경함수흐름3
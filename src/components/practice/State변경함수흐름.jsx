import React, { useEffect, useState } from 'react'

/**
 * 동기 방식과 비동기 방식의 차이
 * 동기 방식 : 코드의 결과를 기다린 후 다음 코드를 진행
 * 비동기 방식 : 코드의 결과를 기다리지 않고 다음 코드를 진행
 * 비동기 방식으로 동작되는 대표들 : state 변경함수 , axios
 * 
 * ※ !! 매우 중요 !! ※
 * state 변경 함수는 모든 코드 해석 후 마지막에 일괄 처리한다.
 * 때문에 state 변경 함수가 여러 줄 실행되도 한 번만 재렌더링 한다.
 * 
 */



const State변경함수흐름 = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  
  useEffect(() => {
    console.log(1);
    setNum1(num1 + 1);
    console.log(2);
    setNum2(num1 + 1);
    console.log(3);
  } , []);

  console.log('rerender')

  return (
    <>
      <h3>{num1}</h3>
      <h3>{num2}</h3>
    </>
  )
}

export default State변경함수흐름
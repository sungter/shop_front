
import React, { useEffect, useState } from 'react'

/**
 * state 변경함수의 인자로는 데이터, 함수가 전달 가능하다.
 * state 변경함수의 인자로 전달되는 함수를 updater 라 부른다.
 * 인자로 함수를 사용하면 항상 최신의 state 값을 전달받을 수 있음
 * updater를 사용한 state 변경함수는
 * state 변경함수가 2회 연속 진행되면서 2번째 state 변경 함수의 기능이
 * 처음 state 변경함수의 결과에 의존적일때 사용.
 */


const State변경함수흐름2 = () => {
  //해석 순서(return 제외) -> 결과 : b = 0 , a = 0 , b = 1
  //usestate 변경 함수는 모든 코드 해석 후 일괄처리 
  //setNum(num + 1) 이 3개 들어가도 해석 되어 num값이 바뀌기 전에 3개의 코드가 실행되기에
  //세개의 변경함수 모두 시작시 num값은 0으로 함수시작한다.(reRendering은 일괄처리로 한 번만 실행한다.)
  const [num, setNum] = useState(0);

  const changeNum = () => {
    setNum(num + 1); // 4번
    setNum(num + 1); // 4번
    setNum(num + 1); // 4번

    // updater 사용 => 매개변수 : state 변수의 값, 이 값은 항상 최신의 값을 유지한다.
    // 함수의 리턴 값을 state 변수의 값으로 업데이트 
    // updater 를 사용하여 최신값을 유지한다해서 setNum 비동기가 아니게 되는건 아니다. (마지막 일괄처리)
    // setNum((state) => {
    //   return state + 1
    // });

    // setNum((state) => {
    //   return state + 1
    // });

    // setNum((state) => {
    //   return state + 1
    // });
    // => 이렇게 함수를 사용하면 해석 후 결과가 b = 0, a = 0, b = 3이 된다.

    console.log('a = ', num); // 3번
  };

  useEffect( () => { // 2번
    changeNum();
  } , [] )

  console.log('b = ' , num); // 1번 , 5번


  return (
    <div>State변경함수흐름2</div>
  )
}

export default State변경함수흐름2
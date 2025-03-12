import React from 'react'
import styles from './ShopSelect.module.css'

// children 은 option 태그를 전부 가져오는 props 방식
const ShopSelect = ({children, name = '', size = 'normal', ...props}) => {

  return (
    <>
      <select 
        className={[styles.select, styles[size]].join(' ')}
        name={name}
        {...props} 
      >
        {children}
      </select>
    </>
  )
}

export default ShopSelect
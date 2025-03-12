import React from 'react'
import styles from './ShopInput.module.css'

const ShopInput = ({type = 'text', size = '', ...props }) => {

  return (
    <>
      <input
        className={
          
          size === '' ? 
          styles.input :
          [styles.input, styles[size]].join(' ')
        }
        type={type} 
        {...props}
      />
    </>
  )
}

export default ShopInput
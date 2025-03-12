
import React from 'react'
import styles from './ShopTextarea.module.css'

const ShopTextarea = ({cols = 10, rows = 10 , ...props}) => {
  return (
    <>
      <textarea 
        className={styles.textarea}
        cols={cols} 
        rows={rows} 
        {...props}
      ></textarea>
    </>
  )
}

export default ShopTextarea
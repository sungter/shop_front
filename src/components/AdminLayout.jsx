import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './AdminLayout.module.css'
import UserHeader from './UserHeader'
import ShopButton from '../common_component/ShopButton'

const AdminLayout = () => {
  const nav = useNavigate();
  return (
    <div className={styles.admin_container}>

      <div>
        <UserHeader />
      </div>

      <div className={styles.admin_body}>
        <div className={styles.side_div}>
          <ShopButton title='상품 등록' click={e => nav('/admin/reg-item')}/>
          
          <ShopButton title='카테고리 관리' click={e => nav('/admin/cate-manage')}/>

          <ShopButton title='회원 관리' click={e => nav('/admin/user-manage')}/>
        </div>
  
        <div className={styles.content_div}>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default AdminLayout
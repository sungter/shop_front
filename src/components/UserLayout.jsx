import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from './UserHeader'

const UserLayout = () => {
  return (
    <div className='user-container'>
      <div>
        <UserHeader />
      </div>

      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserLayout
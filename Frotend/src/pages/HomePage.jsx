import React from 'react'
import { useAuth } from '../utils/Provider'

const HomePage = () => {
  const {user} = useAuth()
  console.log("token ", "admin".includes(user.role))
  return (
    <div>
      <h1>Hello User!</h1>
    </div>
  )
}

export default HomePage

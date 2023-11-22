import React from 'react'
import { Navigate } from 'react-router-dom'

function ForUser({children}) {
  const userrole=window.localStorage.getItem("userLoggedIn")
  const adminrole=window.localStorage.getItem("adminLoggedIn")
  const sadminrole=window.localStorage.getItem("sAdminLoggedIn")

  if(!userrole){
      return <Navigate to='/login'/>
  }
  else if(adminrole){
      return <Navigate to='/societydetails' />
  }
  else if(sadminrole){
    return <Navigate to='/societydetails/membersdetailsnportal'/>
  }
  return children
}
export default ForUser
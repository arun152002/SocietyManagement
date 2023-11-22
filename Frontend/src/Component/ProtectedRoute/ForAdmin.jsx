import React from 'react'
import { Navigate } from 'react-router-dom'

function ForAdmin({children}) {
    const userrole=window.localStorage.getItem("userLoggedIn")
    const adminrole=window.localStorage.getItem("adminLoggedIn")
    const sadminrole=window.localStorage.getItem("sAdminLoggedIn")
    if(!adminrole){
        return <Navigate to='/login'/>
    }
    else if(userrole){
        return <Navigate to='/' />
    }
    else if(sadminrole){
        return <Navigate to='/societydetails/membersdetails'/>
    }
    return children
}

export default ForAdmin
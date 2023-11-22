import React from 'react'
import { Navigate } from 'react-router-dom'

function SocietyAdmin({ children }) {
    const userrole = window.localStorage.getItem("userLoggedIn")
    const adminrole = window.localStorage.getItem("adminLoggedIn")
    const sadminrole = window.localStorage.getItem("sAdminLoggedIn")
    if (adminrole) {
        return <Navigate to='/societydetails' />
    }
    else if(userrole){
        return <Navigate to="/"/>
    }
    else if (!sadminrole) {
        return <Navigate to='/login' />
    }
    return children
}

export default SocietyAdmin
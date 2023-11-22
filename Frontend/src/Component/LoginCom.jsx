import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginCom() {
  const navigate = useNavigate()
  const [User, setUser] = useState({
    Email: "",
    Password: ""
  })
  const handleChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(User.Society)

    if (User.Email && User.Password) {
      axios.post("http://localhost:9000/login", {
        Email: User.Email,
        Password: User.Password
      }).then(res => {
        const result = res.data.user

        if (result) {
          const role = res.data.role
          const uid = res.data.data
          const societyName=res.data.user.Society
          console.log(res.data.user.role)

          if (role == "user") {
            window.localStorage.setItem("userId", uid)
            window.localStorage.setItem("userLoggedIn", true)
            navigate('/')
            window.location.reload(false)
          }
          else if(role=="societyAdmin"){
            window.localStorage.setItem("sAdminId",uid)
            window.localStorage.setItem("sAdminLoggedIn",true)
            window.localStorage.setItem("societyName",societyName)
            navigate('/')
            window.location.reload(false)
          }
          else {
            window.localStorage.setItem("adminLoggedIn", true)
            navigate('/')
            window.location.reload(false)

          }

        } else {
          toast.error("Not Valid", {
            theme: "colored"
          })
        }
      })
    } else {
      toast.error("Fill all the fileds", {
        theme: "colored"
      })
    }

  }
  return (
    <section className="background-radial-gradient overflow-hidden">
      <ToastContainer
        autoClose={2500}
      />
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Society Management <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your Society</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
            A user-friendly portal/platform for members of a society to pay their bills 
            related to vendors, security guards, water bills and electricity 
            bill. Database will contain details of society members who want to
            opt for paying their bills from a single platform in a very easy and efficient way.
            </p>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
            <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
            <div className="card bg-glas">
              <div className="card-body px-4 py-5 px-md-5">
                <form>

                  <div className="form-outline mb-4">
                    <input type="email" className="form-control"
                      onChange={handleChange} name="Email" value={User.Email} />
                    <label className="form-label">Email address</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" className="form-control"
                      onChange={handleChange} name="Password" value={User.Password} />
                    <label className="form-label" >Password</label>
                  </div>
                  <Link to="/forgotpassword" className='forgotpass'>Forgot Password?</Link><br /><br />
                  <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>
                    Login
                  </button>
                  <Link to="/register" className='newuser'>New User</Link>
                </form>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginCom
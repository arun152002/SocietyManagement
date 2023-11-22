import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RegisterCom() {
  const [societyData, setSocietyData] = useState()
  const [User, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    cPassword: "",
    Society: "",
    Block: ""
  })
  const handleChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios.get("http://localhost:9000/societyList").then((res) => {
      setSocietyData(res.data)
    })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(User.Block)
    if (User.Name && User.Email && User.Password && User.cPassword && User.Society && User.Block) {
      if (User.Password == User.cPassword) {
        axios.post("http://localhost:9000/register", {
          Name: User.Name,
          Email: User.Email,
          Password: User.Password,
          Society: User.Society,
          Block: User.Block,
          Role:"user"
        }).then(res => {
          console.log("Data send to backend")
          const exist=res.data.message
          if(exist){
            toast.error(exist, {
              theme: "colored"
            })
          }else{
            axios.post("http://localhost:9000/profile", {
              Name: User.Name,
              userId: res.data.userId
            })
            axios.post("http://localhost:9000/assignbills",{
              userId:res.data.userId
            })
            toast.success("Login to access the site", {
              theme: "colored"
            })
          }
          
        })
      } else {
        toast.error("Password not match", {
          theme: "colored"
        })
      }

    } else {
      toast.error("Fill all the fields", {
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
                    <input type="text" className="form-control"
                      onChange={handleChange} name="Name" value={User.Name} />
                    <label className="form-label">Name</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" className="form-control"
                      onChange={handleChange} name="Email" value={User.Email} />
                    <label className="form-label" >Email Address</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" className="form-control"
                      onChange={handleChange} name="Password" value={User.Password} />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" className="form-control"
                      onChange={handleChange} name="cPassword" value={User.cPassword} />
                    <label className="form-label" >Conform Password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <select className="form-control" id="inputGroupSelect01" onChange={handleChange} name="Society" value={User.Society}>
                      {
                        societyData?.map(e =>
                          <option key={e._id}>{e.SocietyName}</option>
                        )
                      }
                    </select>
                    <label className="form-label" >Select Society</label>

                  </div>
                  <div className="form-outline mb-4">
                    <input type="Number" className="form-control"
                      onChange={handleChange} name="Block" value={User.Block} />
                    <label className="form-label" >Block Number</label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>
                    Signup
                  </button>
                  <Link to="/login" className='newuser'>already registered</Link>
                </form></div>
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}

export default RegisterCom
import { Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const userId = window.localStorage.getItem("userId")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profile, setProfile] = useState({
    Phone: "",
    FamilyMembers: "",
    Address: ""
  })
  const [pshow, setpShow] = useState(false);
  const phandleClose = () => setpShow(false);
  const changePassword = () => setpShow(true);
  const [pass,setPass]=useState({
    oldPass:"",newPass:"",confirmPass:""
  })
  const passwordChange=(e)=>{
    setPass({ ...pass, [e.target.name]: e.target.value })
  }
  const passwordSubmit=()=>{
    if(pass.newPass && pass.confirmPass && pass.oldPass){
      if(pass.newPass == pass.confirmPass){
        axios.put("http://localhost:9000/register/password",{
          _id:userId,
          oldPass:pass.oldPass,
          newPass:pass.newPass
      }).then((res)=>{
        const result=res.data.message
        if(result==true){
          toast.success("Password Changed", {
            theme: "colored"
          })
        }else{
          toast.error("Old Password Not Matched", {
            theme: "colored"
          })
        }
        setpShow(false)
        setPass({oldPass:"",newPass:"",confirmPass:""})
      })
      
      }else{
        toast.error("Password Not matched", {
          theme: "colored"
        })
      }
    }else{
      toast.error("Fill all the fileds", {
        theme: "colored"
      })
    }
    
  }
  const [profileData, setProfileData] = useState({ Name: "", Email: "", BlockNumber: "" })
  const [profilePData, setProfilePData] = useState({ Phone: "", FamilyMembers: "", Address: "" })
  const profileChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }
  const profileSubmit = e => {
    if(profile.Phone && profile.FamilyMembers && profile.Address){
      axios.put("http://localhost:9000/profile", {
        Phone: profile.Phone,
        FamilyMembers: profile.FamilyMembers,
        Address: profile.Address,
        userId: userId
      }).then((res) => {
        console.log("Data send to backend")
      })
      axios.put("http://localhost:9000/register",{
        FamilyMembers:profile.FamilyMembers,
        _id:userId
      })
      //setProfile({Name: "",Phone: "",FamilyMembers: "",Address: ""})
      setShow(false)
      window.location.reload(false)
    }else{
      toast.error("Fill all the fileds", {
        theme: "colored"
      })
    }
    
  }
  useEffect(() => {
    getAll()
  }, [])

  const getAll = () => {
    axios.get(`http://localhost:9000/register/details/${userId}`).then((res) => {
      const data = res.data
      data.map(e => {
        setProfileData({ Name: e.Name, Email: e.Email, BlockNumber: e.BlockNumber })
      })
    })
    axios.get(`http://localhost:9000/profile/${userId}`).then((res) => {
      const pdata = res.data
      pdata.map(e => {
        setProfilePData({ Phone: e.PhoneNumber, FamilyMembers: e.FamilyMembers, Address: e.Address })
      })
    })



  }

  return (
    <div className='container'>
      <ToastContainer
        autoClose={2500}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="Number" className="form-control" placeholder="Phone"
            name="Phone" value={profile.Phone} onChange={profileChange} /><br />
          <input type="Number" className="form-control" placeholder="Family mumbers"
            name="FamilyMembers" value={profile.FamilyMembers} onChange={profileChange} /><br />
          <textarea className="form-control" placeholder="Address"
            name="Address" value={profile.Address} onChange={profileChange} /><br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={profileSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={pshow} onHide={phandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="password" className="form-control" placeholder="Old Password"
            name="oldPass" value={pass.oldPass} onChange={passwordChange} /><br />
          <input type="password" className="form-control" placeholder="New Password"
            name="newPass" value={pass.newPass} onChange={passwordChange} /><br />
          <input type="password" className="form-control" placeholder="Confirm Password"
            name="confirmPass" value={pass.confirmPass} onChange={passwordChange} /><br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={phandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={passwordSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{ width: 80 }} />
                    <h5>{profileData.Name}</h5>

                    <i className="far fa-edit mb-5" />
                  </div>
                  <div className="col-md-8">
                    <div className="cardbody p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{profileData.Email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{profilePData.Phone}</p>
                        </div>
                      </div>
                      <h6>Society Details</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Block Number</h6>
                          <p className="text-muted">{profileData.BlockNumber}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Family Members</h6>
                          <p className="text-muted">{profilePData.FamilyMembers}</p>
                        </div>
                      </div>
                      <h6>Address</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <p className="text-muted">{profilePData.Address}</p>
                        </div>
                      </div>
                      <Button onClick={handleShow} variant='outline-primary'>Edit Profile</Button>{''}
                      <p align="right">
                      <Button onClick={changePassword} variant='outline-primary pull-right'>Change Password</Button></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

}

export default Profile
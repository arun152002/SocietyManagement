import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

function OTPverification() {
    const [email, setEmail] = useState()
    const [newPass, setnewPassword] = useState()
    const [confirmPass, setconfirmPassword] = useState()
    const [userOTP, setUserOTP] = useState()

    const sentOtp = () => {
        if(email){
            axios.post("http://localhost:9000/emailverification", {
                toEmail: email
            }).then((res) => {
                // setOTP(res.data.message)
                toast.info(res.data.message, {
                    theme: "colored"
                })
            })
        }else{
            toast.warn("Fill the field")
        }
    }
    const handleSubmit = () => {
        console.log(newPass)
        console.log(confirmPass)
        if(userOTP && newPass && confirmPass){
            if (newPass == confirmPass) {
                axios.post("http://localhost:9000/emailverification/otp", {
                    uotp: userOTP,
                    password:newPass
                }).then((res) => {
                    toast.info(res.data.response, {
                        theme: "colored"
                    })
                })
            }else{
                toast.error("Password not matched", {
                    theme: "colored"
                })    
            }
        }else {
            toast.error("Enter all the fields", {
                theme: "colored"
            })
        }
        
    }
    return (
        <div className="container height-100 d-flex justify-content-center align-items-center mt-4">
            <ToastContainer
                autoClose={2500}
            />
            <div className="position-relative">
                <div className="card p-2 text-center">
                    <h6>Enter your Email Address</h6>
                    <input type="email" className="form-control mt-3" onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <div className="mt-4"> <Button variant="outline-danger" onClick={sentOtp}>Sent OTP</Button> </div>
                </div>
                <div className="card p-2 text-center mt-3">
                    <h6>Please enter the one time password <br /> to reset the password</h6>
                    <div> <span>A code has been sent to Email Address</span> </div>
                    <input type="text" className="form-control mt-3" onChange={e => setUserOTP(e.target.value)} placeholder="Enter the OTP" />
                    <input type="text" className="form-control mt-3" onChange={e => setnewPassword(e.target.value)} placeholder="New Password" />
                    <input type="text" className="form-control mt-3" onChange={e => setconfirmPassword(e.target.value)} placeholder="Conform Password" />
                    <div className="mt-4"> <Button onClick={handleSubmit} variant="outline-danger" className="px-4 validate">Reset</Button> </div>
                </div>
            </div>
        </div>
    )
}

export default OTPverification
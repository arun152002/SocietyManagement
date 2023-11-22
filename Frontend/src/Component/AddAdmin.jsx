import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import './Login.css'
function AddAdmin() {
    const [societyData, setSocietyData] = useState()
    const [admin, setAdmin] = useState({ Name: "", Email: "", Password: "", Society: "" })
    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (admin.Name && admin.Email && admin.Password && admin.Society) {
            axios.post("http://localhost:9000/register", {
                Name: admin.Name,
                Email: admin.Email,
                Password: admin.Password,
                Society: admin.Society,
                Role: "societyAdmin"
            }).then((res) => {
                setAdmin({Name: "", Email: "", Password: "", Society: "" })
                toast.success("Admin Added", {
                    theme: "colored"
                })
            })
        } else {
            toast.error("Fill all the fields", {
                theme: "colored"
            })
        }

    }
    useEffect(() => {
        axios.get("http://localhost:9000/societyList").then((res) => {
            setSocietyData(res.data)
        })
    }, [])

    return (
        <div className="container col-md-4 admincontainer">
            <ToastContainer
                autoClose={2500}
            />
            <div className="card bg-glas">
                <div className="card-body px-4 py-5 px-md-5">
                    <form>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" placeholder='Admin Name'
                                onChange={handleChange} name="Name" value={admin.Name} />
                        </div>
                        <div className="form-outline mb-4">
                            <input type="email" className="form-control" placeholder='Admin Email'
                                onChange={handleChange} name="Email" value={admin.Email} />
                        </div>
                        <div className="form-outline mb-4">
                            <input type="password" className="form-control" placeholder='Admin Password'
                                onChange={handleChange} name="Password" value={admin.Password} />
                        </div>
                        <div className="form-outline mb-4">
                            <select className="form-control" id="inputGroupSelect01" onChange={handleChange} name="Society" value={admin.Society}>
                                {
                                    societyData?.map(e =>
                                        <option key={e._id}>{e.SocietyName}</option>
                                    )
                                }

                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form></div>
            </div>
        </div>

    )
}

export default AddAdmin
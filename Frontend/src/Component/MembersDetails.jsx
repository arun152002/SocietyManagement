import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
function MembersDetails() {
    const userId = window.localStorage.getItem("sAdminId")
    const navigate = useNavigate()
    const [membersList, setMembersList] = useState()
    const sname = window.localStorage.getItem("societyName")
    useEffect(() => {
        axios.get(`http://localhost:9000/register/${sname}`).then((res) => {
            setMembersList(res.data)
        })
    }, [])

    function viewBills(block, id) {
        window.localStorage.setItem("BlockNumber", block)
        window.localStorage.setItem("memberId", id)
        navigate('/societydetails/membersdetails/billdetails')
    }
    const [pshow, setpShow] = useState(false);
    const phandleClose = () => setpShow(false);
    const changePassword = () => setpShow(true);
    const [pass, setPass] = useState({
        oldPass: "", newPass: "", confirmPass: ""
    })
    const passwordChange = (e) => {
        setPass({ ...pass, [e.target.name]: e.target.value })
    }
    const passwordSubmit = () => {
        if (pass.newPass && pass.confirmPass && pass.oldPass) {
            if (pass.newPass == pass.confirmPass) {
                axios.put("http://localhost:9000/register/password", {
                    _id: userId,
                    oldPass: pass.oldPass,
                    newPass: pass.newPass
                }).then((res) => {
                    const result = res.data.message
                    if (result == true) {
                        toast.success("Password Changed", {
                            theme: "colored"
                        })
                    } else {
                        toast.error("Old Password Not Matched", {
                            theme: "colored"
                        })
                    }
                    setpShow(false)
                    setPass({ oldPass: "", newPass: "", confirmPass: "" })
                })

            } else {
                toast.error("Password Not matched", {
                    theme: "colored"
                })
            }
        } else {
            toast.error("Fill all the fileds", {
                theme: "colored"
            })
        }
    }

    return (
        <div className='container'>
            <ToastContainer
                autoClose={2500}
            />
            < Modal show={pshow} onHide={phandleClose} >
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
            </Modal >
            <h2>Society Name: {sname}</h2>
            <p align="right"><Button variant='outline-primary' onClick={changePassword} >Change Password</Button><br /><br /></p>
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Member Name</th>
                        <th>Block No</th>
                        <th>Family Count</th>
                        <th>Bill Details</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        membersList?.length > 0 ?
                            (membersList.map(e =>
                                <tr key={e._id}>
                                    <td>{e.Name}</td>
                                    <td>{e.BlockNumber}</td>
                                    <td>{e.FamilyMembers}</td>
                                    <td><Button onClick={() => viewBills(e.BlockNumber, e._id)}>
                                        View</Button></td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td>No Data</td>
                            </tr>
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default MembersDetails
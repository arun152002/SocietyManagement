import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SocietyDetails() {
    useEffect(() => {
        getAll()
    }, [])
    const navigate = useNavigate()
    const [addshow, addsetShow] = useState(false);
    const addhandleClose = () => addsetShow(false);
    const addhandleShow = () => addsetShow(true);

    const [societydata, setSocietyData] = useState([])
    const [society, setSociety] = useState({ sName: "", sCity: "", sPincode: "", secName: "" })
    const addSocietyChange = (e) => {
        setSociety({ ...society, [e.target.name]: e.target.value })
    }
    const addSocietySub = (e) => {
        // addsetShow(false)
        //e.preventDefault()
        // console.log(society.sCity)
        if (society.sName && society.sCity && society.sPincode && society.secName) {
            axios.post("http://localhost:9000/societyList", {
                sName: society.sName,
                sCity: society.sCity,
                sPincode: society.sPincode,
                secName: society.secName,

            }).then(res => {
                console.log("Data send to backend")
            })
            setSociety({ sName: "", sCity: "", sPincode: "", secName: "" })
            window.location.reload(false)
        } else {
            toast.error("Fill all the fields", {
                theme: "colored"
            })

        }
    }
    const getAll = () => {
        axios.get("http://localhost:9000/societyList").then((res) => {
            setSocietyData(res.data)
        })
    }
    function viewMembers(sname) {
        window.localStorage.setItem("societyName", sname)
        navigate('/societydetails/memberslist')
    }

    return (
        <div className="container">
            <Modal show={addshow} onHide={addhandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Society</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" placeholder="Society Name"
                        onChange={addSocietyChange} name="sName" value={society.sName} /><br />
                    <input type="text" className="form-control" placeholder="City"
                        onChange={addSocietyChange} name="sCity" value={society.sCity} /><br />
                    <input type="number" className="form-control" placeholder="Pincode"
                        onChange={addSocietyChange} name="sPincode" value={society.sPincode} /><br />
                    <input type="text" className="form-control" placeholder="Secretary Name"
                        onChange={addSocietyChange} name="secName" value={society.secName} /><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addhandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addSocietySub}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                autoClose={2500}
            />
            <Button className="outline-success" onClick={addhandleShow} variant="outline-info">Add New Society</Button>{' '}
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Society Name</th>
                        <th>City</th>
                        <th>PinCode</th>
                        <th>Secretary Name</th>
                        <th>View Members</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        societydata.length > 0 ?
                            (
                                societydata.map(e =>

                                    <tr key={e._id}>
                                        <td>{e.SocietyName}</td>
                                        <td>{e.City}</td>
                                        <td>{e.Pincode}</td>
                                        
                                        <td>{e.SecretaryName}</td>
                                        <td><Button onClick={() => viewMembers(e.SocietyName)}>
                                            View</Button></td>
                                    </tr>

                                )
                            )
                            :
                            (
                                <tr>
                                    <td>No Society </td>
                                </tr>
                            )
                    }

                </tbody>
            </Table>

        </div>
    )
}

export default SocietyDetails
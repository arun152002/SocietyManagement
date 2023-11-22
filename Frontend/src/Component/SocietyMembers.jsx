import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

function SocietyMembers() {
    const [membersList, setMembersList] = useState()
    const sname=window.localStorage.getItem("societyName")
    useEffect(() => {
        axios.get(`http://localhost:9000/register/${sname}`).then((res) => {
            setMembersList(res.data)
        })
    }, [])
    return (
        <div className='container'>
        <h2>Society Name: {sname}</h2>
        <Table striped bordered hover>
            <thead>
                <tr>

                    <th>Member Name</th>
                    <th>Block No</th>
                    <th>Family Count</th>
                    
                </tr>
            </thead>
            <tbody>

                {
                    membersList?.length >0 ? 
                    (membersList.map(e=>
                        <tr key={e._id}>
                            <td>{e.Name}</td>
                            <td>{e.BlockNumber}</td>
                            <td>{e.FamilyMembers}</td>
                            
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

export default SocietyMembers
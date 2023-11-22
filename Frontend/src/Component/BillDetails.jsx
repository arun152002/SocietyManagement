import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';

function BillDetails() {
    const [billamount, setBillamount] = useState()
    const [newamount,setNewamount]=useState()
    const blockNumber=window.localStorage.getItem("BlockNumber")
    const userId=window.localStorage.getItem("memberId")
    useEffect(() => {
        axios.get(`http://localhost:9000/assignbills/${userId}`).then((res)=>{
            setNewamount(res.data)
        })
    }, [])
    const assignRent=(e)=>{
        axios.put("http://localhost:9000/assignbills/rent",{
            userId,
            billamount
        }).then((res)=>{
            setNewamount(res.data.amount)
        })
        window.location.reload(false)
        
    }
    const assignWaterBill=(e)=>{
        axios.put("http://localhost:9000/assignbills/water",{
            userId,
            billamount
        }).then((res)=>{
            setNewamount(res.data.amount)
        })
        window.location.reload(false)
        
    }
    const assignElecBills=(e)=>{
        axios.put("http://localhost:9000/assignbills/elec",{
            userId,
            billamount
        }).then((res)=>{
            setNewamount(res.data.amount)
        })
        window.location.reload(false)
        
    }
    const assignKeepingBills=(e)=>{
        axios.put("http://localhost:9000/assignbills/keeping",{
            userId,
            billamount
        }).then((res)=>{
            setNewamount(res.data.amount)
        })
        window.location.reload(false)
        
    }
    const assignParkingBills=(e)=>{
        axios.put("http://localhost:9000/assignbills/parking",{
            userId,
            billamount
        }).then((res)=>{
            setNewamount(res.data.amount)
        })
        window.location.reload(false)
        
    }
    const assignStorageBills=(e)=>{
        axios.put("http://localhost:9000/assignbills/storage",{
            userId,
            billamount
        }).then((res)=>{
            setNewamount(res.data.amount)
        })
        window.location.reload(false)
        
    }
    const assignLaundryBills=(e)=>{
        axios.put("http://localhost:9000/assignbills/laundry",{
            userId,
            billamount
        }).then((res)=>{
            setNewamount(res.data.amount)
        })
        window.location.reload(false)
        
    }
    
    return (
        <div className='container'>
            
            <h2>Block Number: {blockNumber}</h2>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Bill</th>
                        <th>Bill Amount</th>
                        <th>Status</th>
                        <th>New Bill</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {newamount?.length >0 ? 
                    (newamount.map(e=>
                        <>
                        <tr>
                        <td>House Rent</td>
                        <td>{e.HouseRent}</td>
                        {e.HouseRent ==0 ?<td>Paid</td>:<td>Pending</td>}
                        <td><input type="number" onChange={e=>setBillamount(e.target.value)}/></td>
                        <td><Button onClick={assignRent}>Assign</Button></td>
                    </tr>
                    <tr>
                        <td>Water</td>
                        <td>{e.WaterBill}</td>
                        {e.WaterBill ==0 ?<td>Paid</td>:<td>Pending</td>}
                        <td><input type="number" onChange={e=>setBillamount(e.target.value)}/></td>
                        <td><Button onClick={assignWaterBill}>Assign</Button></td>
                    </tr>
                    <tr>
                        <td>Electricity</td>
                        <td>{e.ElectricityBill}</td>
                        {e.ElectricityBill ==0 ?<td>Paid</td>:<td>Pending</td>}
                        <td><input type="number" onChange={e=>setBillamount(e.target.value)}/></td>
                        <td><Button onClick={assignElecBills}>Assign</Button></td>
                    </tr>
                    <tr>
                        <td>House Keeping</td>
                        <td>{e.HouseKeeping}</td>
                        {e.HouseKeeping ==0 ?<td>Paid</td>:<td>Pending</td>}
                        <td><input type="number" onChange={e=>setBillamount(e.target.value)}/></td>
                        <td><Button onClick={assignKeepingBills}>Assign</Button></td>
                    </tr>
                    <tr>
                        <td>Parking Fee</td>
                        <td>{e.ParkingFee}</td>
                        {e.ParkingFee ==0 ?<td>Paid</td>:<td>Pending</td>}
                        <td><input type="number" onChange={e=>setBillamount(e.target.value)}/></td>
                        <td><Button onClick={assignParkingBills}>Assign</Button></td>
                    </tr>
                    <tr>
                        <td>Storage Fee</td>
                        <td>{e.StorageFee}</td>
                        {e.StorageFee ==0 ?<td>Paid</td>:<td>Pending</td>}
                        <td><input type="number" onChange={e=>setBillamount(e.target.value)}/></td>
                        <td><Button onClick={assignStorageBills}>Assign</Button></td>
                    </tr>
                    <tr>
                        <td>Laundry</td>
                        <td>{e.Laundry}</td>
                        {e.Laundry ==0 ?<td>Paid</td>:<td>Pending</td>}
                        <td><input type="number" onChange={e=>setBillamount(e.target.value)}/></td>
                        <td><Button onClick={assignLaundryBills}>Assign</Button></td>
                    </tr></>
                        )):
                        <tr></tr>
                        
                    }
                        
                    
                    

                </tbody>
            </Table>
            </div>
        
    )
}

export default BillDetails
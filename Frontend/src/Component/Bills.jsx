import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import GooglePayButton from '@google-pay/button-react'

function Bills() {
    const [billamount, setbillAmount] = useState()
    const userId = window.localStorage.getItem("userId")
    useEffect(() => {
        axios.get(`http://localhost:9000/assignbills/${userId}`).then((res) => {
            setbillAmount(res.data)
        })
    }, [])

    const houseRent=(e)=>{
        axios.put('http://localhost:9000/assignbills/rent',{
            userId,
            billamount:0
        })
        window.location.reload(false)
    }
    const waterBill=(e)=>{
        axios.put('http://localhost:9000/assignbills/water',{
            userId,
            billamount:0
        })
        window.location.reload(false)
    }
    const electricityBill=(e)=>{
        axios.put('http://localhost:9000/assignbills/elec',{
            userId,
            billamount:0
        })
        window.location.reload(false)
    }
    const houseKeeping=(e)=>{
        axios.put('http://localhost:9000/assignbills/keeping',{
            userId,
            billamount:0
        })
        window.location.reload(false)
    }
    const parkingFee=(e)=>{
        axios.put('http://localhost:9000/assignbills/parking',{
            userId,
            billamount:0
        })
        window.location.reload(false)
    }
    const storageFee=(e)=>{
        axios.put('http://localhost:9000/assignbills/storage',{
            userId,
            billamount:0
        })
        window.location.reload(false)
    }
    const laundry=(e)=>{
        axios.put('http://localhost:9000/assignbills/laundry',{
            userId,
            billamount:0
        })
        window.location.reload(false)
    }
    return (
        <div className='container mt-4'>

            <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Bill</th>
                            <th>Status</th>
                            <th>bill amount</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billamount?.length > 0 ?
                            (billamount.map(e =>
                                <>
                                    <tr>
                                        <td>House Rent</td>
                                        {e.HouseRent == 0 ? <td>Paid</td> : <td>Pending</td>}
                                        <td>{e.HouseRent}</td>
                                        {e.HouseRent == 0 ? <td><Button className='paidButton' variant="dark" disabled>Paid</Button></td>
                                            : <td>
                                                
                                                <GooglePayButton
                                                    environment="TEST"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: 'CARD',
                                                                parameters: {
                                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: 'PAYMENT_GATEWAY',
                                                                    parameters: {
                                                                        gateway: 'example',
                                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: '12345678901234567890',
                                                            merchantName: 'Demo Merchant',
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: 'FINAL',
                                                            totalPriceLabel: 'Total',
                                                            totalPrice: String(e.HouseRent),
                                                            currencyCode: 'INR',
                                                            countryCode: 'IN',
                                                        },
                                                        shippingAddressRequired: true,
                                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log("paid successfully");
                                                        houseRent()
                                                    }}
                                                    onPaymentAuthorized={paymentData => {
                                                        console.log('Payment Authorised Success', paymentData)
                                                        return { transactionState: 'SUCCESS' }
                                                    }
                                                    }
                                                    onPaymentDataChanged={paymentData => {
                                                        console.log('On Payment Data Changed', paymentData)
                                                        return {}
                                                    }
                                                    }
                                                    existingPaymentMethodRequired='false'
                                                    buttonColor='black'
                                                    buttonType='pay'
                                                />
                                            </td>}
                                    </tr>
                                    <tr>
                                        <td>Water</td>
                                        {e.WaterBill == 0 ? <td>Paid</td> : <td>Pending</td>}
                                        <td>{e.WaterBill}</td>
                                        {e.WaterBill == 0 ? <td><Button  className='paidButton' variant="dark" disabled>Paid</Button></td>
                                            : <td>
                                                <GooglePayButton
                                                    environment="TEST"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: 'CARD',
                                                                parameters: {
                                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: 'PAYMENT_GATEWAY',
                                                                    parameters: {
                                                                        gateway: 'example',
                                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: '12345678901234567890',
                                                            merchantName: 'Demo Merchant',
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: 'FINAL',
                                                            totalPriceLabel: 'Total',
                                                            totalPrice: String(e.WaterBill),
                                                            currencyCode: 'INR',
                                                            countryCode: 'IN',
                                                        },
                                                        shippingAddressRequired: true,
                                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log("paid successfully");
                                                        waterBill()
                                                    }}
                                                    onPaymentAuthorized={paymentData => {
                                                        console.log('Payment Authorised Success', paymentData)
                                                        return { transactionState: 'SUCCESS' }
                                                    }
                                                    }
                                                    onPaymentDataChanged={paymentData => {
                                                        console.log('On Payment Data Changed', paymentData)
                                                        return {}
                                                    }
                                                    }
                                                    existingPaymentMethodRequired='false'
                                                    buttonColor='black'
                                                    buttonType='pay'
                                                />
                                                </td>}
                                    </tr>
                                    <tr>
                                        <td>Electricity</td>
                                        {e.ElectricityBill == 0 ? <td>Paid</td> : <td>Pending</td>}
                                        <td>{e.ElectricityBill}</td>
                                        {e.ElectricityBill == 0 ? <td><Button  className='paidButton' variant="dark" disabled>Paid</Button></td>
                                            : <td>
                                                <GooglePayButton
                                                    environment="TEST"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: 'CARD',
                                                                parameters: {
                                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: 'PAYMENT_GATEWAY',
                                                                    parameters: {
                                                                        gateway: 'example',
                                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: '12345678901234567890',
                                                            merchantName: 'Demo Merchant',
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: 'FINAL',
                                                            totalPriceLabel: 'Total',
                                                            totalPrice: String(e.ElectricityBill),
                                                            currencyCode: 'INR',
                                                            countryCode: 'IN',
                                                        },
                                                        shippingAddressRequired: true,
                                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log("paid successfully");
                                                        electricityBill()
                                                    }}
                                                    onPaymentAuthorized={paymentData => {
                                                        console.log('Payment Authorised Success', paymentData)
                                                        return { transactionState: 'SUCCESS' }
                                                    }
                                                    }
                                                    onPaymentDataChanged={paymentData => {
                                                        console.log('On Payment Data Changed', paymentData)
                                                        return {}
                                                    }
                                                    }
                                                    existingPaymentMethodRequired='false'
                                                    buttonColor='black'
                                                    buttonType='pay'
                                                />
                                                </td>}
                                    </tr>
                                    <tr>
                                        <td>House Keeping</td>
                                        {e.HouseKeeping == 0 ? <td>Paid</td> : <td>Pending</td>}
                                        <td>{e.HouseKeeping}</td>
                                        {e.HouseKeeping == 0 ? <td><Button className='paidButton'variant="dark" disabled>Paid</Button></td>
                                            : <td>
                                                <GooglePayButton
                                                    environment="TEST"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: 'CARD',
                                                                parameters: {
                                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: 'PAYMENT_GATEWAY',
                                                                    parameters: {
                                                                        gateway: 'example',
                                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: '12345678901234567890',
                                                            merchantName: 'Demo Merchant',
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: 'FINAL',
                                                            totalPriceLabel: 'Total',
                                                            totalPrice: String(e.HouseKeeping),
                                                            currencyCode: 'INR',
                                                            countryCode: 'IN',
                                                        },
                                                        shippingAddressRequired: true,
                                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log("paid successfully");
                                                        houseKeeping()
                                                    }}
                                                    onPaymentAuthorized={paymentData => {
                                                        console.log('Payment Authorised Success', paymentData)
                                                        return { transactionState: 'SUCCESS' }
                                                    }
                                                    }
                                                    onPaymentDataChanged={paymentData => {
                                                        console.log('On Payment Data Changed', paymentData)
                                                        return {}
                                                    }
                                                    }
                                                    existingPaymentMethodRequired='false'
                                                    buttonColor='black'
                                                    buttonType='pay'
                                                />
                                                </td>}
                                    </tr>
                                    <tr>
                                        <td>Parking Fee</td>
                                        {e.ParkingFee == 0 ? <td>Paid</td> : <td>Pending</td>}
                                        <td>{e.ParkingFee}</td>
                                        {e.ParkingFee == 0 ? <td><Button className='paidButton' variant="dark" disabled>Paid</Button></td>
                                            : <td>
                                                
                                                <GooglePayButton
                                                    environment="TEST"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: 'CARD',
                                                                parameters: {
                                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: 'PAYMENT_GATEWAY',
                                                                    parameters: {
                                                                        gateway: 'example',
                                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: '12345678901234567890',
                                                            merchantName: 'Demo Merchant',
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: 'FINAL',
                                                            totalPriceLabel: 'Total',
                                                            totalPrice: String(e.ParkingFee),
                                                            currencyCode: 'INR',
                                                            countryCode: 'IN',
                                                        },
                                                        shippingAddressRequired: true,
                                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log("paid successfully");
                                                        parkingFee()
                                                    }}
                                                    onPaymentAuthorized={paymentData => {
                                                        console.log('Payment Authorised Success', paymentData)
                                                        return { transactionState: 'SUCCESS' }
                                                    }
                                                    }
                                                    onPaymentDataChanged={paymentData => {
                                                        console.log('On Payment Data Changed', paymentData)
                                                        return {}
                                                    }
                                                    }
                                                    existingPaymentMethodRequired='false'
                                                    buttonColor='black'
                                                    buttonType='pay'
                                                />
                                            </td>}
                                    </tr>
                                    <tr>
                                        <td>Storage Fee</td>
                                        {e.StorageFee == 0 ? <td>Paid</td> : <td>Pending</td>}
                                        <td>{e.StorageFee}</td>
                                        {e.StorageFee == 0 ? <td><Button className='paidButton' variant="dark" disabled>Paid</Button></td>
                                            : <td>
                                                
                                                <GooglePayButton
                                                    environment="TEST"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: 'CARD',
                                                                parameters: {
                                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: 'PAYMENT_GATEWAY',
                                                                    parameters: {
                                                                        gateway: 'example',
                                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: '12345678901234567890',
                                                            merchantName: 'Demo Merchant',
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: 'FINAL',
                                                            totalPriceLabel: 'Total',
                                                            totalPrice: String(e.StorageFee),
                                                            currencyCode: 'INR',
                                                            countryCode: 'IN',
                                                        },
                                                        shippingAddressRequired: true,
                                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log("paid successfully");
                                                        storageFee()
                                                    }}
                                                    onPaymentAuthorized={paymentData => {
                                                        console.log('Payment Authorised Success', paymentData)
                                                        return { transactionState: 'SUCCESS' }
                                                    }
                                                    }
                                                    onPaymentDataChanged={paymentData => {
                                                        console.log('On Payment Data Changed', paymentData)
                                                        return {}
                                                    }
                                                    }
                                                    existingPaymentMethodRequired='false'
                                                    buttonColor='black'
                                                    buttonType='pay'
                                                />
                                            </td>}
                                    </tr>
                                    <tr>
                                        <td>Laundry</td>
                                        {e.Laundry == 0 ? <td>Paid</td> : <td>Pending</td>}
                                        <td>{e.Laundry}</td>
                                        {e.Laundry == 0 ? <td><Button className='paidButton' variant="dark" disabled>Paid</Button></td>
                                            : <td>
                                                
                                                <GooglePayButton
                                                    environment="TEST"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                            {
                                                                type: 'CARD',
                                                                parameters: {
                                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                },
                                                                tokenizationSpecification: {
                                                                    type: 'PAYMENT_GATEWAY',
                                                                    parameters: {
                                                                        gateway: 'example',
                                                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        merchantInfo: {
                                                            merchantId: '12345678901234567890',
                                                            merchantName: 'Demo Merchant',
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: 'FINAL',
                                                            totalPriceLabel: 'Total',
                                                            totalPrice: String(e.Laundry),
                                                            currencyCode: 'INR',
                                                            countryCode: 'IN',
                                                        },
                                                        shippingAddressRequired: true,
                                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                                    }}
                                                    onLoadPaymentData={paymentRequest => {
                                                        console.log("paid successfully");
                                                        laundry()
                                                    }}
                                                    onPaymentAuthorized={paymentData => {
                                                        console.log('Payment Authorised Success', paymentData)
                                                        return { transactionState: 'SUCCESS' }
                                                    }
                                                    }
                                                    onPaymentDataChanged={paymentData => {
                                                        console.log('On Payment Data Changed', paymentData)
                                                        return {}
                                                    }
                                                    }
                                                    existingPaymentMethodRequired='false'
                                                    buttonColor='black'
                                                    buttonType='pay'
                                                />
                                            </td>}
                                    </tr>
                                </>
                            ))
                            :
                            <tr></tr>
                        }


                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Bills
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Orders.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Modal } from "antd";
import { useAuth } from '../../store/authContext'
import { ThreeCircles } from "react-loader-spinner";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom';

function Orders() {
const [orders, setOrders] = useState()
const [loading, setLoading] = useState(true);
const [visible, setVisible] = useState(false)
const [selectedOrder, setSelectedOrder] = useState(null)
const navigate=useNavigate()
const[auth]=useAuth()
  const getOrders =async()=>{
    try {
      const {data} =await axios.get(`/api/v1/auth/orders/${auth.user._id}`)
      setOrders(data)
      setLoading(false)
    } catch (error) {
      toast.error('Error in getting orders')
    }
  }
  useEffect(() => {
    if(auth?.token)getOrders()
    // eslint-disable-next-line
  },[])
  
  return (
    <>
    {loading ?(<ThreeCircles
          height="100"
          width="100"
          color="#656565"
          wrapperStyle={{}}
          wrapperClass="justify-content-center align-items-center h-100"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />):( <>
    <Header/>
      <div className='mt-2 text-center'>
        <h1 className='head-t'>Orders</h1>
      </div>
      <div className='container-fluid'>
          <div className='col-12 col-md-9 col-lg-7 m-auto'>
          <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'>No.</th>
          <th scope='col'>Status</th>
          <th scope='col'>Method</th>
          <th scope='col'>Total</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {orders?.map((o,i) =>(<>
          <tr className='order' onClick={()=>{ 
            setSelectedOrder(o)
            setVisible(true)
          }} key={i}>
          <th scope='row'>{i+1}</th>
          <td>{o.status}</td>
          <td>{o.payment.type}</td>
          <td>₹ {o.payment.total}</td>
        </tr>
        </>))}
      </MDBTableBody>
    </MDBTable>
          </div>
      </div>
      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
          <div>
            {selectedOrder && (
              <div className='mt-3'>
              {selectedOrder.products.map((p)=>(
                 <>
                 <div className="row align-items-center">
                   <div
                     onClick={() => {
                       navigate(`/product/${p.slug}`);
                     }}
                     className="col-4 col-md-3 mb-2"
                   >
                     <img
                       src={`/api/v1/product/product-photo1/${p?.product}`}
                       className="img-fluid rounded-3"
                       alt="Cotton"
                     />
                   </div>
                   <div
                     onClick={() => {
                       navigate(`/product/${p.slug}`);
                     }}
                     className="col-6 col-md-4"
                   >
                     <h5 className="colr">{p.slug}</h5>
                   </div>
                   <div className="col-6 col-md-3">
                     <h6 className="pric">
                       Quntity : {p.quantity}
                       <br/>
                       <br/>
                       size : {p.size}
                     </h6>
                   </div>
                 </div>
                 <hr />
               </>
              ))}
              </div>
            )}
          </div>
        </Modal>
    </>)}</>
  )
}

export default Orders

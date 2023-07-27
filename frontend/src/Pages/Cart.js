import React, { useState } from "react";
import "./AllProducts.css";
import { Modal } from "antd";
import Header from "../Components/Header/Header";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBIcon, MDBTextArea } from "mdb-react-ui-kit";
import { useAuth } from "../store/authContext";
import { ThreeCircles } from "react-loader-spinner";
import toast from "react-hot-toast";
import axios from "axios";
function Cart() {
  const [auth, setAuth] = useAuth();
  const { cart, setCart } = useCart();
  const [paymentMethod,setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  //total
  const totalPrice = () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    return totalPrice;
  };
  //total items
  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  };
  //delete
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //Adrress
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setVisible(false);
      setLoading(true);
      const { data } = await axios.put(
        `/api/v1/auth/profile/${auth.user._id}`,
        {
          address: address,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        setLoading(false);
        toast.success("Profile Updated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //orderId
  function generateOrderId() {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomString}`;
  }

  //payment
  const handleProceedOrder = async () => {
    //client side
    try {
      if (paymentMethod === 'online') {
        setCheckout(false)
        setLoading(true)
        const { data } = await axios.post('/api/v1/product/payment-online', {
          orderId: generateOrderId(),
          amount: cart,
          customerId: auth.user._id,
          email: auth.user.email, 
      })
      initPayment(data.order)

    } else if (paymentMethod === 'cod') {
        setCheckout(false)
        setLoading(true)
        const { data } = await axios.post('/api/v1/product/payment-cod', {
          cart:cart,
          user:auth.user._id
          });
       if(data.success){
        localStorage.removeItem('cartItems')
        setCart([])
        navigate('/user/orders')
       }
      }
    } catch (error) {
      setLoading(false)
      console.error('Error placing order:', error);
    }
  };
  //set online payment data
  const setOnline=async()=>{
    const {data}=await axios.post('/api/v1/product/payment-online-set', {
      cart:cart,
      user:auth.user._id
      })
      if(data.success){
        localStorage.removeItem('cartItems')
        setCart([])
      }
  }
//init payment
const initPayment=(data)=>{
  const options={
    key:process.env.RAZORPAY_KEY_ID,
    amount:data.amount,
    currency:data.currency,
    name:data.name,
    description:'order payment',
    order_id:data.id,
    handler:async(response)=>{
      try {
        const {data}=await axios.post('/api/v1/product/verifyRazorpayPayment',response)
        if(data.success){
          setOnline()
          toast.success('Payment successfull')
        navigate('/user/orders')
        }else{
          setLoading(false)
          toast.error('retry payment')
        }
      } catch (error) {
        setLoading(false)
        toast.error('Something went wrong')
      }
    },
    theme: {
      color: "#656565",
    },
  }
  const rzp1=new window.Razorpay(options)
  rzp1.open();
}
  return (
    <>
      {loading ? (
        <ThreeCircles
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
        />
      ) : (
        <>
          <Header />
          <div className="row g-0 container-fluid">
            <div className="col-lg-8">
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                  <h1 className="head-t">Shopping Cart</h1>
                  <h6 className="mb-0 text-muted">{cart?.length} items</h6>
                </div>
                <hr />
                {cart.length === 0 ? (
                  <>
                    <h2 className="mt-5 pt-5 head-t upper text-center">
                      cart is empty !!!
                    </h2>
                  </>
                ) : (
                  <>
                    {cart?.map((p) => (
                      <>
                        <div className="row mb-4 d-flex justify-content-between align-items-center">
                          <div
                            onClick={() => {
                              navigate(`/product/${p.slug}`);
                            }}
                            className="col-4 col-md-2  col-lg-2 col-xl-2 mb-2"
                          >
                            <img
                              src={`/api/v1/product/product-photo1/${p?._id}`}
                              className="img-fluid rounded-3"
                              alt="Cotton T-shirt"
                            />
                          </div>
                          <div
                            onClick={() => {
                              navigate(`/product/${p.slug}`);
                            }}
                            className="col-7 col-md-3 col-lg-3 col-xl-3"
                          >
                            <h5 className="colr">{p.name}</h5>
                          </div>
                          <div className="col-5 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="pric">Price : ₹{p.price}</h6>
                          </div>
                          <div className="col-5 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="pric">
                              Quntity : {p.count}
                              <br />
                              <br />
                              size: {p.size}
                            </h6>
                          </div>
                          <div
                            className=" col-2 col-md-1 col-lg-1 col-xl-1 text-end"
                            onClick={() => removeCartItem(p._id)}
                          >
                            <MDBIcon
                              className="pt-2 pb-2 trash-ic"
                              icon="trash-can"
                              size="lg"
                            />
                          </div>
                        </div>
                        <hr className="my-4" />
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-4 bg-grey">
              <div className="container-fluid">
                <h3 className="mb-1 mt-5 head-t">Summary</h3>
                <hr className="my-4" />
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="text-uppercase">
                    items : {getTotalItemCount()}
                  </h5>
                  <h5>₹ {totalPrice()}</h5>
                </div>
                <hr className="my-4" />
                <div className="d-flex justify-content-between mb-5">
                  <h5 className="text-uppercase">Total price :</h5>
                  <h5>₹ {totalPrice()}</h5>
                </div>
                <hr className="my-4" />
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="head-t">Shipping address</h5>
                </div>
                {auth.user.address ? (
                  <>
                    <MDBTextArea
                      placeholder="Address"
                      rows={3}
                      className="mb-1"
                      value={auth?.user?.address}
                      disabled
                    />
                    <div className="text-center">
                      <MDBBtn
                        onClick={() => {
                          setVisible(true);
                        }}
                        className="btn-login"
                        type="submit"
                      >
                        Update address
                      </MDBBtn>
                    </div>
                  </>
                ) : (
                  <>
                    <MDBTextArea
                      placeholder="Address"
                      rows={3}
                      className="mb-1"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="text-center">
                      <MDBBtn
                        className="btn-login"
                        onClick={handleSubmit}
                        type="submit"
                      >
                        Add address
                      </MDBBtn>
                    </div>
                  </>
                )}
                {cart?.length === 0 ? (
                  ""
                ) : (
                  <button
                    className="cart-btn p-1 pe-3 ps-3 col-12 mb-5"
                    onClick={() => {
                      setCheckout(true);
                    }}
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <form onSubmit={handleSubmit}>
              <div>
                <MDBTextArea
                  placeholder="Address"
                  rows={3}
                  className="mt-3 mb-1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <MDBBtn className="btn-login" type="submit">
                  Update address
                </MDBBtn>
              </div>
            </form>
          </Modal>
          <Modal
            onCancel={() => setCheckout(false)}
            footer={null}
            visible={checkout}
          >
            <div className="mt-3">
              <MDBBtn
              onClick={()=>{setPaymentMethod('online')
              handleProceedOrder()}}
                value="online"
                id="online"
                className="cart-btn col-12 mb-4 mt-2"
                >Online Payment</MDBBtn>
              <br/>
              <MDBBtn
              onClick={()=>{setPaymentMethod('cod')
              handleProceedOrder()}}
                value="cod"
                id="cod"
                className="cart-btn col-12"
              >Cash on delevery</MDBBtn>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default Cart;

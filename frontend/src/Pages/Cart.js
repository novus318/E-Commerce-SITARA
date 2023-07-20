import React from "react";
import "./AllProducts.css";
import Header from "../Components/Header/Header";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/authContext";
import { useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";

function Cart() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  //total
  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((i) => (total = total + i.price));
      return total;
    } catch (error) {
      console.log(error);
    }
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
  return (
    <>
      <Header />

      <div className="row g-0">
        <div className="col-lg-8">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
              <h1 className="head-t">Shopping Cart</h1>
              <h6 className="mb-0 text-muted">{cart?.length} items</h6>
            </div>
            <hr />
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
                      src={`/api/v1/product/product-photo/${p?._id}`}
                      className="img-fluid rounded-3"
                      alt="Cotton T-shirt"
                    />
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                    className="col-4 col-md-3 col-lg-3 col-xl-3"
                  >
                    <h5 className="colr">{p.name}</h5>
                    <h6 className="text-black">
                      {p.description.substring(0, 15)}...
                    </h6>
                  </div>
                  <div className="col-3 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 className="pric">Price : ₹{p.price}</h6>
                  </div>
                  <div
                    className=" col-1 col-md-1 col-lg-1 col-xl-1 text-end"
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
          </div>
        </div>
        <div className="col-lg-4 bg-grey">
          <div className="container-fluid">
            <h3 className="mb-1 mt-5 head-t">Summary</h3>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-4">
              <h5 className="text-uppercase">items {cart?.length}</h5>
              <h5>{totalPrice()}</h5>
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-5">
              <h5 className="text-uppercase">Total price</h5>
              <h5>{totalPrice()}</h5>
            </div>
            <button className="cart-btn p-1 pe-3 ps-3">Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

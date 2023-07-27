import "./AdminDashboard.css";
import React, { useEffect, useState } from "react";
import MenuSidebar from "./Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import { ThreeCircles } from "react-loader-spinner";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import { Select } from "antd";
const { Option } = Select;
function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [status, setstatus] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      setstatus([
        "Not processed",
        "Processing",
        "Ready to Ship",
        "Order Shipped",
        "Order Delevered",
        "Order Cancelled",
      ])
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error in getting orders");
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, []);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      if(data){
        getOrders();
      toast.success("Status updated");
    }
  } catch (error) {
      toast.error("Something went wrong");
    }
  };
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
          <div className="d-flex">
            <MenuSidebar />
            <div className="m-auto text-center col-8 col-md-10 col-lg-11">
              <h1 className="head-t">Orders</h1>
              <div className="container-fluid">
                <div className="col-12 col-md-9 col-lg-7 m-auto">
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Status</th>
                        <th scope="col">Method</th>
                        <th scope="col">Total</th>
                        <th scope="col">View details</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {orders?.map((o, i) => (
                        <>
                          <tr className="order" key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>
                              <Select
                                className="order"
                                bordered={false}
                                onChange={(value, orderId) =>
                                  handleChange(o._id, value)
                                }
                                defaultValue={o?.status}
                              >
                                {status.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td>{o.payment.type}</td>
                            <td>₹ {o.payment.total}</td>
                            <td>
                              <button
                                onClick={() => {
                                  setSelectedOrder(o);
                                  setVisible(true);
                                }}
                                className="v-btn p-1 pe-2 ps-2"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <div>
                  {selectedOrder && (
                    <div className="mt-3">
                      {selectedOrder.products.map((p, i) => (
                        <>
                          <div key={i} className="row align-items-center">
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
                                <br />
                                <br />
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Orders;

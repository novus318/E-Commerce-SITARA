import "./AdminDashboard.css";
import React, { useEffect, useState } from "react";
import MenuSidebar from "./Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { ThreeCircles } from "react-loader-spinner";
import { MDBBtn, MDBCheckbox, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
function UpdateProduct() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  //Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("sizes", JSON.stringify(sizes));
      productData.append("category", category);
      productData.append("quantity", quantity);
      photo1 && productData.append("image1", photo1);
      photo2 && productData.append("image2", photo2);
      photo3 && productData.append("image3", photo3);
      photo4 && productData.append("image4", photo4);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success === false) {
        toast.error(data?.message);
      } else {
        toast.success("Product updated Successfully");
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setSizes(data.product.sizes);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setName(data.product.name);
      setShipping(data.product.shipping);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //size change
  const handleSizeChange = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size)); // Unchecking a size, remove it from the array
    } else {
      setSizes([...sizes, size]); // Checking a size, add it to the array
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while loading category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //delete product
  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure to delete the product");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product deleted successfully");
        navigate("/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
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
            <div className="m-auto col-7 text-center">
              <h1 className="head-t mt-3 ">Update Product</h1>
              <div>
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  className="form-select-sm col-12 mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-3">
                    {photo1 ? photo1.name : "Upload photo 1"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => {
                        setPhoto1(e.target.files[0]);
                      }}
                      hidden
                    />
                  </label>
                  <label className="btn btn-outline-secondary col-md-3">
                    {photo2 ? photo2.name : "Upload photo 2"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => {
                        setPhoto2(e.target.files[0]);
                      }}
                      hidden
                    />
                  </label>
                  <label className="btn btn-outline-secondary col-md-3">
                    {photo3 ? photo3.name : "Upload photo 3"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => {
                        setPhoto3(e.target.files[0]);
                      }}
                      hidden
                    />
                  </label>
                  <label className="btn btn-outline-secondary col-md-3">
                    {photo4 ? photo4.name : "Upload photo 4"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => {
                        setPhoto4(e.target.files[0]);
                      }}
                      hidden
                    />
                  </label>
                </div>
                <div className="row mb-3">
                  {photo1 ? (
                    <div className="col-3">
                      <img
                        src={URL.createObjectURL(photo1)}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="col-3">
                      <img
                        src={`/api/v1/product/product-photo1/${id}`}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                  {photo2 ? (
                    <div className="col-3">
                      <img
                        src={URL.createObjectURL(photo2)}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="col-3">
                      <img
                        src={`/api/v1/product/product-photo2/${id}`}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                  {photo3 ? (
                    <div className="col-3">
                      <img
                        src={URL.createObjectURL(photo3)}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="col-3">
                      <img
                        src={`/api/v1/product/product-photo3/${id}`}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                  {photo4 ? (
                    <div className="col-3">
                      <img
                        src={URL.createObjectURL(photo4)}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="col-3">
                      <img
                        src={`/api/v1/product/product-photo4/${id}`}
                        alt={name}
                        height={"100em"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <h5 className="head-t">Size</h5>
                  <MDBCheckbox
                    name="inlineCheck"
                    checked={sizes.includes("S")}
                    onChange={() => handleSizeChange("S")}
                    label="S"
                    inline
                  />
                  <MDBCheckbox
                    name="inlineCheck"
                    checked={sizes.includes("M")}
                    onChange={() => handleSizeChange("M")}
                    label="M"
                    inline
                  />
                  <MDBCheckbox
                    name="inlineCheck"
                    checked={sizes.includes("L")}
                    onChange={() => handleSizeChange("L")}
                    label="L"
                    inline
                  />
                  <MDBCheckbox
                    name="inlineCheck"
                    checked={sizes.includes("XL")}
                    onChange={() => handleSizeChange("XL")}
                    label="XL"
                    inline
                  />
                  <MDBCheckbox
                    name="inlineCheck"
                    checked={sizes.includes("XXL")}
                    onChange={() => handleSizeChange("XXL")}
                    label="XXL"
                    inline
                  />
                </div>
                <div className="mb-3">
                  <MDBInput
                    wrapperClass="mb-2"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Enter a Name"
                    type="text"
                  />
                  <MDBTextArea
                    wrapperClass="mb-2"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Enter a Description"
                    type="text"
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    placeholder="Enter a Price"
                    type="number"
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    placeholder="Enter a Quantity"
                    type="number"
                  />
                  <Select
                    bordered={true}
                    placeholder="Select a Shipping"
                    size="large"
                    className="form-select-sm w-50 mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <MDBBtn className="update-btn" onClick={handleUpdate}>
                    Update Product
                  </MDBBtn>
                </div>
                <div className="mb-5">
                  <MDBBtn className="delete-btn " onClick={handleDelete}>
                    Delete Product
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateProduct;

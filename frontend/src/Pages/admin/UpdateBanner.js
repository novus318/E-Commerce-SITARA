import "./AdminDashboard.css";
import React, { useEffect, useState } from "react";
import MenuSidebar from "./Sidebar";
import toast from "react-hot-toast";
import axios from "axios";


function UpdateBanner() {
  const [banner, setBanner] = useState("");
  const [banners, setBanners] = useState([]);
  const [id, setId] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      
      const productData = new FormData();
      banner && productData.append("banner", banner);
      const { data } = await axios.put(
        `/api/v1/banner/update-banner/${id}`,
        productData
      );
      if (data?.success === false) {
        toast.error(data?.message);
      } else {
        toast.success("Banner updated Successfully");
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllBanners = async () => {
    try {
      const { data } = await axios.get("/api/v1/banner/get-banners");
      if (data?.success) {
        setBanners(data?.banners);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while loading Banners");
    }
  };
  useEffect(() => {
    getAllBanners();
  }, []);
  return (
    <>
      <div className="d-flex">
        <MenuSidebar />
        <div className="m-auto text-center mt-4 mb-4 col-7">
          <h1 className="head-t">Update Banner</h1>
          {banners?.map((b) => (
            <>
              <div key={b._id} className="mt-3 mb-2">
                <label
                  onClick={() => {
                    setId(b._id);
                  }}
                  className="btn btn-outline-secondary col-12"
                >
                  Upload Banner
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setBanner(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
                <button
                  className="btn btn-secondary col-12 mt-2"
                  onClick={handleUpdate}
                >
                  Update Banner
                </button>
                <div className="mt-3">
                  <div>
                    <img
                      src={`http://localhost:8080/api/v1/banner/get-banner/${b._id}`}
                      alt="banner"
                      width={"100%"}
                      className="img img-responsive"
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default UpdateBanner;

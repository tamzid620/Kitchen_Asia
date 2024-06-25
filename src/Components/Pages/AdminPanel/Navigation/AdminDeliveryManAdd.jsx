import { useEffect, useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../../Layout/Loading";

const AdminDeliveryManAdd = () => {

    const navigate = useNavigate();
    const [loading,setLoading] =useState(false);
    const [adminCategory, setAdminCategory] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
  
    // handle control --------------------
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    const handlePhoneNoChange = (e) => {
      setPhoneNo(e.target.value);
    };
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "You have to Login first",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/adminlogin");
      // } else {
      //   const user = JSON.parse(localStorage.getItem("user"));
      //   const headers = {
      //     accept: "application/json",
      //     Authorization: "Bearer " + user.token,
      //   };
      //   setLoading(true)
      //   axios
      //     .get(`https://backend.ap.loclx.io/api/login`, {
      //       headers: headers,
      //     })
      //     .then((res) => {
      //       setAdminCategory(res.data);
      //       setLoading(false)
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      }
    }, [navigate]);
    console.log(adminCategory);
  
    // handle submit button ----------------
    const handleSubmit = (e) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const headers = {
        accept: "application/json",
        Authorization: "Bearer " + user.token,
      };
  
      e.preventDefault();
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("phoneNo", phoneNo);
      console.log(data);
      // post method --------------
      axios
        .post("https://backend.ap.loclx.io/api/add-delivery-man", data, {
          headers: headers,
        })
        .then((res) => {
          console.log("Data:", res.data);
          // to refresh to form ---------------
          setName("");
          setEmail("");
          setPhoneNo("");
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/adminDeliveryManList");
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: ("An error occurred:", error),
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    return (
        <div className="text-yellow-500 bg-gray-300 min-h-screen">
        <div className="fixed z-10 w-full">
          <SearchPanel />
        </div>
  
        {/* main section  */}
        <div className="flex justify-center ">
          <div className="mt-24 w-full">
            <h1 className="text-3xl flex justify-center text-black uppercase">
              Add Delivety Man
            </h1>
            <hr className="mt-1 border border-black " />
            {/* form section  */}
            {!loading &&<div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10"
            >
              {/* name and email section  */}
              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
                {/* name section   */}
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                    
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                {/* email section  */}
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
  
              {/* Discription section  */}
              <div>
                <label htmlFor="phoneNo">phoneNo:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="phoneNo"
                  id="phoneNo"
                  value={phoneNo}
                  onChange={handlePhoneNoChange}
                />
              </div>
  
              <button
                className="bg-[#FFD700] hover:bg-yellow-500 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-3"
                type="submit"
              >
                Save
              </button>
            </form>
            </div>}
            {loading && <Loading/>}
          </div>
        </div>
      </div>
    );
};

export default AdminDeliveryManAdd;
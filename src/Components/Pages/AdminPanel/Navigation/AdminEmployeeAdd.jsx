import {  useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Layout/Loading";

const AdminEmployeeAdd = () => {
    
  const [loading,setLoading] =useState(false);
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    designation: "",
    address: "",
    salary: "",
    jobType: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const headers = {
        accept: "application/json",
        Authorization: "Bearer " + user.token,
      };

      const bodyFormData = new FormData();
      bodyFormData.append("name", formData.name);
      bodyFormData.append("email", formData.email);
      bodyFormData.append("phoneNo", formData.phoneNo);
      bodyFormData.append("designation", formData.designation);
      bodyFormData.append("address", formData.address);
      bodyFormData.append("salary", formData.salary);
      bodyFormData.append("jobType", formData.jobType);
      bodyFormData.append("image", formData.image);

// post  data ---------------
setLoading(true)
      axios
        .post("https://backend.ap.loclx.io/api/add-employee", bodyFormData, {
          headers: headers,
        })
        .then((res) => {
          console.log("Data:", res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setFormData({
            name: "",
            email: "",
            phoneNo: "",
            designation: "",
            address: "",
            salary: "",
            jobType: "",
            image: null,
          });
          navigate("/adminEmployeeList");
          setLoading(false)
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "An error occurred: " + error,
            showConfirmButton: false,
            timer: 1500,
          });
        });
       
    }
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
            Add Employee
          </h1>
          <hr className="mt-1 border border-black " />
          {/* form section */}
          {!loading && <form onSubmit={handleSubmit} className="bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10">
            {/* --------- name and email input -------- */}
            <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* name input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="mb-2 font-bold text-lg">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                />
              </div>
              {/* email input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-2 font-bold text-lg">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                />
              </div>
            </div>
            {/* --------- phoneNO and designation input -------- */}
            <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* phoneNo input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="phoneNo" className="mb-2 font-bold text-lg">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  id="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                />
              </div>
              {/* designation input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="designation" className="mb-2 font-bold text-lg">
                  Designation:
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                />
              </div>
            </div>
            {/* --------- address and salary input -------- */}
            <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* address input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="address" className="mb-2 font-bold text-lg">
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                />
              </div>
              {/* salary input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="salary" className="mb-2 font-bold text-lg">
                  Salary:
                </label>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                />
              </div>
            </div>
            {/* --------- jobtype and image input -------- */}
            <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* jobtype input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="jobType" className="mb-2 font-bold text-lg">
                  Job Type:
                </label>
                <input
                  type="text"
                  name="jobType"
                  id="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                />
              </div>
              {/* image input  */}
              <div className="flex flex-col mb-4">
                <label htmlFor="image" className="mb-2 font-bold text-lg">
                  Image:
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  required
                  className="text-black file-input file-input-bordered file-input-warning w-full"
                />
              </div>
            </div>
{/* ---------submit button --------- */}
<div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 mt-4 bg-yellow-500 text-white border  border-black rounded-md hover:bg-yellow-600 hover:text-black"
            >
              Submit
            </button>
</div>
          </form>}
            {loading && <Loading/>}
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeeAdd;

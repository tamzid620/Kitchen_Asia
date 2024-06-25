import { useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Layout/Loading";

const AdminPressAdd = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    description: "",
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
      bodyFormData.append("eventName", formData.eventName);
      bodyFormData.append("eventDate", formData.eventDate);
      bodyFormData.append("description", formData.description);
      bodyFormData.append("image", formData.image);

    
      // post  data ---------------
      setLoading(true);
      axios
        .post("https://backend.ap.loclx.io/api/add-press", bodyFormData, {
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
            eventName: "",
            eventDate: "",
            description: "",
            image: null,
          });
          navigate("/adminPressList");
          setLoading(false);
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
    console.log("formData", formData);
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
            Add Press
          </h1>
          <hr className="mt-1 border border-black " />
          {/* form section */}
          {!loading && (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10"
            >
              {/* --------- name and eventDate input -------- */}
              <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {/* name input  */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="eventName" className="mb-2 font-bold text-lg">
                    Event Name:
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    id="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                  />
                </div>
                {/* eventDate input  */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="eventDate" className="mb-2 font-bold text-lg">
                    eventDate:
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                  />
                </div>
              </div>
              {/* --------- phoneNO and description input -------- */}
              <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {/* image input  */}
                <div className="flex flex-col mb-4 ">
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
                {/* description input  */}
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="description"
                    className="mb-2 font-bold text-lg"
                  >
                    description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full pt-2 pb-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3 "
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
            </form>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default AdminPressAdd;

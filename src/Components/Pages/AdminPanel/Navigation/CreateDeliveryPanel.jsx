import { useNavigate, useParams } from "react-router-dom";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CreateDeliveryPanel = () => {
  const { deliveryManId } = useParams();
  const navigate = useNavigate();
  const [createDelivery, setCreateDelivery ]= useState({});
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

      // handle control --------------------
      const handleIdChange = (e) => {
        setId(e.target.value);
      };
      const handleNameChange = (e) => {
        setName(e.target.value);
      };
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handlepasswordChange = (e) => {
        setPassword(e.target.value);
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
        } else {
          const user = JSON.parse(localStorage.getItem("user"));
          const headers = {
            accept: "application/json",
            Authorization: "Bearer " + user.token,
          };
          // get foodItem data ---------------
          axios
            .get(`https://backend.ap.loclx.io/api/delivery-man-info/${deliveryManId}`, {
              headers: headers,
            })
            .then((res) => {
                const deliveryManData = res.data.deliveryMan;
                console.log("Delivery Man Data:", deliveryManData);
                setId(deliveryManData.id);
                setName(deliveryManData.name);
                setEmail(deliveryManData.email);
                setCreateDelivery(deliveryManData.createDelivery);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, [deliveryManId,navigate]);
      console.log(createDelivery);

        

      // handle Modal  submit button ----------------
      const handleModalSubmit = (e) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = {
          accept: "application/json",
          Authorization: "Bearer " + user.token,
        };
    
        e.preventDefault();
        const data = new FormData();
        data.append("id", id);
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        console.log(data);
        // post method --------------
        axios
          .post("https://backend.ap.loclx.io/api/create-delivery-panel", data, {
            headers: headers,
          })
          .then((res) => {
            console.log("Data:", res.data);
            // to refresh to form ---------------
            setId("");
            setName("");
            setEmail("");
            setPassword("");
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
        <div className="mt-24 w-full ">
          <h1 className="text-3xl flex justify-center text-black uppercase">
            Create Delivery Panel 
          </h1>
          <hr className="mt-1 border border-black mb-10" />
          {/* input  section  */}
          <div className="flex justify-center">
          <form
            onSubmit={handleModalSubmit}
            className=" bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10"
          >
            {/* name and email section  */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
              {/* ID section   */}
              <div hidden>
                <label htmlFor="id">Id:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                  type="text"
                  name="id"
                  id="id"
                  value={id}
                  onChange={handleIdChange}
                />
              </div>
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
              <label htmlFor="password">password:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="password"
                id="password"
                value={password}
                onChange={handlepasswordChange}
              />
            </div>

            <button
              className="bg-[#FFD700] hover:bg-yellow-500 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-3"
              type="submit"
            >
              Save
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeliveryPanel;

import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { MdCheckCircle } from "react-icons/md";
import review from "../../../../../public/images/review.gif";
import cooking from "../../../../../public/images/cooking.gif";
import onTheWay from "../../../../../public/images/onTheWay.gif";
import Delivered from "../../../../../public/images/delivered.gif";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../Layout/Loading";

const AdminOrderProcessing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams();
  const [orderProcess, setorderProcess] = useState([]);
  // const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  // handle control --------------------
  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  // handle control --------------------
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    // get method -------------------
    setLoading(true);
    axios
      .get(`https://backend.ap.loclx.io/api/order-detail/${orderId}`, {
        headers: headers,
      })
      .then((res) => {
        setorderProcess(res.data.order);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get("https://backend.ap.loclx.io/api/delivery-panel-list", {
        headers: headers,
      })
      .then((res) => {
        setDeliveryMen(res.data.deliveryPanel);
        setId(orderId);
      })
      .catch((error) => {
        console.error("Error fetching delivery men:", error);
      });
  }, [orderId]);
  console.log(orderProcess);
  console.log(deliveryMen);

  // handlePendingChange-------------------------
  const handlePendingChange = (orderId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    axios
      .get(`https://backend.ap.loclx.io/api/order-stage-approve/${orderId}`, {
        headers: headers,
      })
      .then((res) => {
        setorderProcess(orderProcess);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  // handleCoockingChange-------------------------
  const handleCoockingChange = (orderId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    axios
      .get(`https://backend.ap.loclx.io/api/order-stage-way/${orderId}`, {
        headers: headers,
      })
      .then((res) => {
        setorderProcess(orderProcess);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  // handle submit button ----------------
  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    e.preventDefault();
    const data = new FormData();
    data.append("id", id);
    data.append("name", name);
    console.log(data);
    // post method --------------
    axios
      .post("https://backend.ap.loclx.io/api/assign-order", data, {
        headers: headers,
      })
      .then((res) => {
        console.log("Data:", res.data);
        // to refresh to form ---------------
        setId("");
        setName("");
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/adminOrderDelivery");
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
    <div className="text-yellow-500 bg-gray-700 min-h-screen">
      <div className="fixed z-10 w-full">
        <SearchPanel />
      </div>

      {/* main section  */}
      <div className="flex justify-center ">
        <div className="mt-24 w-full ">
          <h1 className="text-3xl flex justify-center text-white uppercase">
            Order Processing
          </h1>
          <hr className="mt-1 border border-white mb-10" />
          {/* information section  */}
          {!loading && (
            <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* review section  */}
              <div
                className={`text-white flex justify-center uppercase ${
                  orderProcess.orderStage === "pending" ? "animate-pulse" : ""
                }`}
              >
                <div>
                  <span
                    className={`mb-1 flex justify-center ${
                      orderProcess.orderStage === "pending" ? "hidden" : ""
                    }`}
                  >
                    <MdCheckCircle size={30} className="text-green-500" />
                  </span>
                  <h1
                    className={`font-bold text-2xl  ${
                      orderProcess.orderStage === "pending"
                        ? "text-green-500"
                        : "text-gray-800"
                    } uppercase flex justify-center`}
                  >
                    Review
                  </h1>
                  <p
                    className={`btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex justify-center items-center ${
                      orderProcess.orderStage === "pending"
                        ? "visible"
                        : "text-gray-800"
                    }`}
                  >
                    step-1
                  </p>
                  <button
                    onClick={() => handlePendingChange(orderProcess.id)}
                    className={`ms-[108px] btn-xs text-black bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white mt-5 flex items-center ${
                      orderProcess.orderStage === "pending"
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    Shift
                  </button>
                  <div
                    className={`my-[80px] flex justify-center ${
                      orderProcess.orderStage === "pending"
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    <img className="w-[250px] " src={review} alt="" />
                  </div>
                </div>
              </div>

              {/* Cooking section  */}
              <div
                className={`text-white flex justify-center uppercase ${
                  orderProcess.orderStage === "cooking" ? "animate-pulse" : ""
                }`}
              >
                <div>
                  <span
                    className={` mb-1 flex justify-center ${
                      orderProcess.orderStage === "cooking"
                        ? "hidden"
                        : orderProcess.orderStage === "pending"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <MdCheckCircle size={30} className="text-green-500" />
                  </span>
                  <h1
                    className={`font-bold text-2xl uppercase flex justify-center ${
                      orderProcess.orderStage === "cooking"
                        ? "text-green-500"
                        : "text-gray-800"
                    }`}
                  >
                    Cooking
                  </h1>
                  <p
                    className={`btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center ${
                      orderProcess.orderStage === "cooking"
                        ? "visible"
                        : "text-gray-800"
                    }`}
                  >
                    step-2
                  </p>
                  <button
                    onClick={() => handleCoockingChange(orderProcess.id)}
                    className={`ms-[108px] btn-xs text-black bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white mt-5 flex items-center ${
                      orderProcess.orderStage === "cooking"
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    Shift
                  </button>
                  <div
                    className={`my-10 flex justify-center ${
                      orderProcess.orderStage === "cooking"
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    <img className="w-[250px]" src={cooking} alt="" />
                  </div>
                </div>
              </div>

              {/* On the Way section  */}
              <div
                className={`text-white flex justify-center uppercase ${
                  orderProcess.orderStage === "on the way"
                    ? "animate-pulse"
                    : ""
                }`}
              >
                <div>
                  <span
                    className={`flex justify-center mb-1 ${
                      orderProcess.orderStage === "on the way"
                        ? "hidden"
                        : orderProcess.orderStage === "pending"
                        ? "hidden"
                        : orderProcess.orderStage === "cooking"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <MdCheckCircle size={30} className="text-green-500" />
                  </span>
                  <h1
                    className={`font-bold text-2xl uppercase flex justify-center ${
                      orderProcess.orderStage === "on the way"
                        ? "text-green-500"
                        : "text-gray-800"
                    }`}
                  >
                    On the Way
                  </h1>
                  <p
                    className={`btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center ${
                      orderProcess.orderStage === "on the way"
                        ? "visible"
                        : "text-gray-800"
                    }`}
                  >
                    step-3
                  </p>
                  {/* invoice button  */}
                  <Link to={`/invoice/${orderProcess.id}`}>
                    <button
                      className={`ms-[100px] btn-xs text-black bg-blue-500 rounded-lg font-semibold uppercase hover:bg-blue-800 hover:text-white mt-5 flex items-center ${
                        orderProcess.orderStage === "on the way"
                          ? "visible"
                          : "invisible"
                      }`}
                    >
                      Invoice
                    </button>
                  </Link>
                  {/* image section  */}
                  <div
                    className={`my-10 flex justify-center ${
                      orderProcess.orderStage === "on the way"
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    <img className="w-[250px]" src={onTheWay} alt="" />
                  </div>
                  {/* async to button  */}
                  <div>
                    {/* modal section ---------------- */}
                    <button
                      className={`ms-[100px] btn-xs text-black bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white mt-5 flex items-center ${
                        orderProcess.orderStage === "on the way"
                          ? "visible"
                          : "invisible"
                      }`}
                      onClick={() =>
                        document.getElementById("my_modal_5").showModal()
                      }
                    >
                      assign to
                    </button>
                    <dialog id="my_modal_5" className="modal">
                      <div className="modal-box text-black">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        {/*delivety man  selector  */}
                        <div className="flex justify-center items-center gap-10">
                          {/* ID section   */}
                          <div  hidden>
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
                          {/* select your delivery man  */}
                          <div>
                            <label
                              htmlFor="name"
                              className=" block mb-2"
                            >
                              Select Delivery Man:
                            </label>
                            <select
                              id="name"
                              name="name"
                              className="border border-black rounded p-2 mb-4"
                              value={name}
                              onChange={handleNameChange}
                            >
                              <option value="">Select Delivery Man</option>
                              {deliveryMen &&
                                deliveryMen.map((deliveryMan) => (
                                  <option
                                    key={deliveryMan.id}
                                    value={deliveryMan.name}
                                  >
                                    {deliveryMan.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          {/* submit button  */}
                          <div>
                            <button
                              onClick={handleSubmit}
                              className="btn-md bg-[#FFD700] rounded-lg font-semibold uppercase hover:bg-amber-500 hover:text-white"
                            >
                              assign
                            </button>
                          </div>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>

              {/* Delivered section  */}
              <div
                className={`text-white flex justify-center uppercase ${
                  orderProcess.orderStage === "delivered" ? "animate-pulse" : ""
                }`}
              >
                <div>
                  <span
                    className={`hidden mb-1 ${
                      orderProcess.orderStage === "delivered" ? "hidden" : ""
                    }`}
                  >
                    <MdCheckCircle size={30} className="text-green-500" />
                  </span>
                  <h1
                    className={`font-bold text-2xl uppercase flex justify-center ${
                      orderProcess.orderStage === "delivered"
                        ? "text-green-500"
                        : "text-gray-800"
                    }`}
                  >
                    Delivered
                  </h1>
                  <p
                    className={`btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center ${
                      orderProcess.orderStage === "delivered"
                        ? "visible"
                        : "text-gray-800"
                    }`}
                  >
                    step-4
                  </p>
                  <div
                    className={`my-[80px] flex justify-center ${
                      orderProcess.orderStage === "delivered"
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    <img className="w-[250px]" src={Delivered} alt="" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderProcessing;


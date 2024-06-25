import { useEffect, useState } from "react";
import Loading from "../../Layout/Loading";
import axios from "axios";
import { IoMdDoneAll } from "react-icons/io";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DeliveryAssignList = () => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderAssigns, setOrderAssigns] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    setLoading(true);
    axios
      .get("https://backend.ap.loclx.io/api/order-assign-list", {
        headers: headers,
      })
      .then((res) => {
        setOrderAssigns(res.data.assignList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching delivery men:", error);
      });
  }, []);

  // delete section
  const handleswich = (assignId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    axios
      .get(`https://backend.ap.loclx.io/api/order-stage-delivered/${assignId}`, {
        headers: headers,
      })
      .then((res) => {
        setOrderAssigns((prevAssign) =>
          prevAssign.filter((assign) => assign.id !== assignId)
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload()
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
// logout system --------------------------
const logoutSubmit = (e) => {
  console.log("button clicked");
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + user.token,
  };
  axios
    .post(`https://backend.ap.loclx.io/api/admin-logout`, null, {
      headers: headers,
    })
    .then((res) => {
      if (res.data.status === "405") {
        localStorage.removeItem("token", res.data.token);
        localStorage.removeItem("user", res.data.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/adminlogin");
      }
    });
};


  return (
    <div className="bg-white">
      <div className="flex justify-center ">
        <div className="mt-24 w-full">
          <h1 className="text-3xl flex justify-center text-black uppercase">
            Order Assign List
          </h1>
          <hr className="mt-1 mb-10 border border-black " />
          {/* logout Button  */}
          <div className="flex justify-end me-5">
            <button 
            onClick={logoutSubmit} 
            className="uppercase bg-red-500 hover:bg-red-700 hover:text-white text-black  font-bold py-2 px-4 rounded">
                LogOut
            </button>
            </div>
          {/* table section  */}
          {!loading && (
            <div className="overflow-x-auto">
              <table className="table table-zebra text-black">
                {/* head */}
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th></th>
                    <th>Client Name</th>
                    <th>Order Handler</th>
                    <th>Order Stage</th>
                    <th>Order Code </th>
                    <th>Total Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {orderAssigns &&
                    orderAssigns.map((assign, index) => (
                      <tr key={assign.id}>
                        <th>{index + 1}</th>
                        <td>{assign.clientName}</td>
                        <td>{assign.orderHandler}</td>
                        <td>{assign.orderStage}</td>
                        <td>{assign.orderCode}</td>
                        <td>{assign.totalAmount}</td>
                        {/* Delevered button  */}
                        <td>
                          {assign.orderStage === "on the way" ? (
                            <button
                              onClick={() => handleswich(assign.id)}
                              className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white"
                            >
                              Delivered
                            </button>
                          ) : (
                            <button
                              disabled
                              className="flex items-center gap-2 btn-xs  rounded-lg font-semibold uppercase text-green-500"
                            >
                              <span>Delivery Complete</span>{" "}
                              <span>
                                <IoMdDoneAll size={10} color="green" />
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAssignList;

import { MdCheckCircle } from "react-icons/md";
import review from "../../../../public/images/review.gif";
import cooking from "../../../../public/images/cooking.gif";
import onTheWay from "../../../../public/images/onTheWay.gif";
import Delivered from "../../../../public/images/delivered.gif";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserOrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderProcess, setorderProcess] = useState([]);
  const [deliveryManInfo, setDeliveryManInfo] = useState([]);

  useEffect(() => {
    // get method -------------------
    axios
      .get(`https://backend.ap.loclx.io/api/user-order-detail/${orderId}`)
      .then((res) => {
        if (res.data.status === "401") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/ordertracking");
        }
        if (res.data.status === "201") {
          setorderProcess(res.data.order);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // delivery man info get api -----------------
    axios
      .get(`https://backend.ap.loclx.io/api/delivery-man-info/${orderId}`)
      .then((res) => {
        setDeliveryManInfo(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [orderId, navigate]);

  return (
    <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-[150px]">
      {/* review section  */}
      <div
        className={`text-white flex justify-center uppercase ${
          orderProcess.orderStage === "pending" ? "animate-pulse" : ""
        }`}
      >
        <div>
          <span
            className={`mb-1 flex justify-center  ${
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
            className={` btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex justify-center items-center ${
              orderProcess.orderStage === "pending"
                ? "visible"
                : "text-gray-800"
            }`}
          >
            step-1
          </p>
          <div
            className={`my-[80px] flex justify-center ${
              orderProcess.orderStage === "pending" ? "visible" : "invisible"
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
            className={` mb-1 flex justify-center  ${
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
            className={`font-bold text-2xl uppercase flex justify-center  ${
              orderProcess.orderStage === "cooking" ? "" : "text-gray-800"
            }`}
          >
            Cooking
          </h1>
          <p
            className={` btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center ${
              orderProcess.orderStage === "cooking"
                ? "visible"
                : "text-gray-800"
            }`}> step-2</p>
          <div
            className={`my-10 flex justify-center ${
              orderProcess.orderStage === "cooking" ? "visible" : "invisible"
            }`}
          >
            <img className="w-[250px]" src={cooking} alt="" />
          </div>
        </div>
      </div>
{/* On the way section  */}
      <div
        className={`text-white flex justify-center uppercase ${
          orderProcess.orderStage === "on the way" ? "animate-pulse" : ""
        }`}
      >
        <div>
          <span
            className={`flex justify-center mb-1  ${
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
            className={`font-bold text-2xl uppercase flex justify-center  ${
              orderProcess.orderStage === "on the way" ? "" : "text-gray-800"
            }`}
          >
            On the Way
          </h1>
          <p
            className={`btn-xs w-[60px] ms-[100px] bg-slate-800  text-white rounded-2xl mt-2 flex items-center justify-center ${
              orderProcess.orderStage === "on the way"
                ? "visible"
                : "text-gray-800"
            }`}
          >
            step-3
          </p>
          {/* image and delivery man info section  */}
          <div 
            className={`my-10 ${
              orderProcess.orderStage === "on the way" ? "visible" : "invisible"
            }`}
          >
          <div className="flex justify-center mb-10">
            <img className="w-[250px]" src={onTheWay} alt="" />
                {/* delivery man info  */}
          </div>
       <div className="flex justify-center items-center">
            <div className="w-[230px]">
              {deliveryManInfo && deliveryManInfo.deliveryMan && (
                <div className="bg-gray-300 text-black p-2 rounded-lg">
                  <h1 className="underline flex justify-center mb-2">Delivery Man Details:</h1>
                  <p>
                    name: <span>{deliveryManInfo.deliveryMan.name}</span>
                  </p>
                  <p>
                    phone: <span>{deliveryManInfo.deliveryMan.phoneNo}</span>{" "}
                  </p>
                </div>
              )}
              {deliveryManInfo && (
                <p
                  className={deliveryManInfo.status === "401" ? "text-red" : ""}
                >
                  {deliveryManInfo.message}
                </p>
              )}
            </div>
          </div>
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
            className={`hidden mb-1  ${
              orderProcess.orderStage === "delivered" ? "hidden" : ""
            }`}
          >
            <MdCheckCircle size={30} className="text-green-500" />
          </span>
          <h1
            className={`font-bold text-2xl uppercase flex justify-center  ${
              orderProcess.orderStage === "delivered" ? "" : "text-gray-800"
            }`}
          >
            Delivered
          </h1>
          <p
            className={`btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center  ${
              orderProcess.orderStage === "delivered"
                ? "visible"
                : "text-gray-800"
            }`}
          >
            step-4
          </p>
          <div
            className={`my-[80px] flex justify-center ${
              orderProcess.orderStage === "delivered" ? "visible" : "invisible"
            }`}
          >
            <img className="w-[250px]" src={Delivered} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;

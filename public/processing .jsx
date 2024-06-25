import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { MdCheckCircle } from "react-icons/md";
import review from "../../../../../public/images/review.gif";
import cooking from "../../../../../public/images/cooking.gif";
import onTheWay from "../../../../../public/images/onTheWay.gif";
import Delivered from "../../../../../public/images/delivered.gif";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrderProcessing = () => {
  const { orderId } = useParams();
  const [orderProcess, setOrderProcess] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    // get method -------------------
    axios
      .get(`https://backend.ap.loclx.io/api/order-detail/${orderId}`, {
        headers: headers,
      })
      .then((res) => {
        setOrderProcess(res.data.order.orderStage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [orderId]);
  console.log(orderProcess);

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
          <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* review section  */}
            <div className="text-white flex justify-center uppercase">
              <div>
                <span className="hidden mb-1">
                  <MdCheckCircle size={30} className="text-green-500 " />
                </span>
                <h1 className="font-bold text-2xl text-green-500 uppercase flex justify-center">
                  Review
                </h1>
                <p className="btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex justify-center items-center">
                  step-1
                </p>
                <div className="my-[80px] flex justify-center">
                  <img className="w-[250px] " src={review} alt="" />
                </div>
              </div>
            </div>

            {/* Cooking section  */}
            <div className="text-white flex justify-center uppercase">
              <div>
                <span className="hidden mb-1">
                  <MdCheckCircle size={30} className="text-green-500" />
                </span>
                <h1 className="font-bold text-2xl uppercase flex justify-center ">
                  Cooking
                </h1>
                <p className="btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center">
                  step-2
                </p>
                <button className="ms-[108px] btn-xs text-black bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white mt-5 flex items-center">
                  Shift
                </button>
                <div className="my-10 flex justify-center">
                  <img className="w-[250px]" src={cooking} alt="" />
                </div>
              </div>
            </div>

            {/* On the Way section  */}
            <div className="text-white flex justify-center uppercase">
              <div>
                <span className="hidden mb-1">
                  <MdCheckCircle size={30} className="text-green-500" />
                </span>
                <h1 className="font-bold text-2xl uppercase flex justify-center ">
                  On the Way
                </h1>
                <p className="btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center">
                  step-3
                </p>
                {/* invoice button  */}
                <button className="ms-[100px] btn-xs text-black bg-blue-500 rounded-lg font-semibold uppercase hover:bg-blue-800 hover:text-white mt-5 flex items-center">
                  Invoice
                </button>
                <div className="my-10 flex justify-center">
                  <img className="w-[250px]" src={onTheWay} alt="" />
                </div>
              </div>
            </div>

            {/* Delivered section  */}
            <div className="text-white flex justify-center uppercase">
              <div>
                <span className="hidden mb-1">
                  <MdCheckCircle size={30} className="text-green-500" />
                </span>
                <h1 className="font-bold text-2xl uppercase flex justify-center ">
                  Delivered
                </h1>
                <p className="btn-xs w-[60px] ms-[100px] bg-slate-800 text-white rounded-2xl mt-2 flex items-center justify-center">
                  step-4
                </p>
                <div className="my-[80px] flex justify-center">
                  <img className="w-[250px]" src={Delivered} alt="" />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminOrderProcessing;

import { useEffect, useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import axios from "axios";
import Loading from "../../../Layout/Loading";

const AdminOrderDelivery = () => {
  const [loading, setLoading] = useState(false);
  const [orderDelivery, setOrderDelivery] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    setLoading(true);
    axios
      .get("https://backend.ap.loclx.io/api/order-delivery-list", {
        headers: headers,
      })
      .then((res) => {
        setOrderDelivery(res.data.orderDeliveryList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching delivery men:", error);
      });
  }, []);

  return (
    <div className="text-yellow-500 bg-gray-300 min-h-screen">
      <div className="fixed z-10 w-full">
        <SearchPanel />
      </div>

      {/* main section  */}
      <div className="flex justify-center ">
        <div className="mt-24 w-full">
          <h1 className="text-3xl flex justify-center text-black uppercase">
            Order Delivery
          </h1>
          <hr className="mt-1 mb-10 border border-black " />
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
                </tr>
              </thead>
              <tbody>
              {orderDelivery &&
                    orderDelivery.map((order, index) => (
                <tr key={order.id}>
                  <th>{index +1}</th>
                  <td>{order.clientName}</td>
                  <td>{order.orderHandler}</td>
                  <td>{order.orderStage}</td>
                  <td>{order.orderCode}</td>
                  <td>{order.totalAmount}</td>
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

export default AdminOrderDelivery;

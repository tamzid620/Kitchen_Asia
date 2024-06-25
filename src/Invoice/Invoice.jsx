import "./Invoice.css";
import mLogo from "../../public/icons/Restaurant.png";
import ReactToPrint from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Layout/Loading";
import axios from "axios";

const Invoice = () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const { orderId } = useParams();

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
        setOrderDetails(res.data.order);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [orderId]);
  console.log(orderDetails);

  return (
    <div>
      {!loading && (
        <div className="bg-white">
          <div ref={ref}>
            <h1 className="school-title">Fresh Meal </h1>
            <div className="top-container">
              {/* protection division        */}
              <div className="invoice-parent">
                {/* mlogo image  and Invoice text  */}
                <div className="mLogo-Invoice">
                  <img className="mLogo" src={mLogo} alt="" />
                  {/* <h1 className="invoice hidden">Invoice</h1> */}
                  <div className="invoice-title">
                    <p>
                      Invoice No. <span>{orderDetails.orderCode}</span>
                    </p>
                    <p>{orderDetails.date}</p>
                  </div>
                </div>
                {/* billed to and billed date  */}
                <div className="billedTo-billedDate">
                  <div className="billedTo">
                    <h1>Billed To:</h1>
                    <p>Name: {orderDetails.clientName}</p>
                    <p> PhoneNo: {orderDetails.phoneNo}</p>
                    <p>Email: {orderDetails.email}</p>
                  </div>
                  <div className="billedDate">
                    {/* <h1>Billed To:</h1> */}
                    <p>A.B.C School and College</p>
                    <p>+01666666666</p>
                    <p>Zakir Hussain road,Khulsi,Chattogram</p>
                    {/* <p>Invoice No. <span>12345</span></p>
              <p>19 Nov 2023</p> */}
                  </div>
                </div>
                {/* table  */}
                <div className="items">
                  <hr className="hr" />

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Sub Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orderDetails &&
                        orderDetails.items &&
                        orderDetails.items.map((order, index) => (
                          <tr key={order}>
                            <td>{index + 1}</td>
                            <td>{order.foodName}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                            <td>{order.subTotal}</td>
                          </tr>
                        ))}

                      <tr>
                        <td className="total-div" colSpan={4}>
                          total:
                        </td>
                        <td>{orderDetails.totalAmount}</td>
                      </tr>
                      <tr>
                        <td className="total-div" colSpan={4}>
                          {" "}
                          vat:
                        </td>
                        <td>{orderDetails.vat} %</td>
                      </tr>
                      <tr>
                        <td className="total-div" colSpan={4}>
                          Delivety Charge:
                        </td>
                        <td>{orderDetails.deliveryCharge}</td>
                      </tr>
                      <tr>
                        <td className="total-div" colSpan={4}>
                          Grand Total:
                        </td>
                        <td>
                        {orderDetails.grandTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* thank you text  */}
                  <h1 className="ThankYou">Thank You !</h1>
                  {/* payment information  */}
                  <div className="paymentInformaiton">
                    {/* payment div  */}
                    <div>
                      <p>Freah Meal </p>
                      <p> Name: {orderDetails.clientName}</p>
                      <p>Account No: 123-456-789</p>
                      <p>Pay by {orderDetails.date}</p>
                    </div>
                    {/* Name div  */}
                    <div className="Namediv">
                      <h1>{orderDetails.clientName}</h1>
                      <p>{orderDetails.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* print button ------------------------------ */}
          <div className="flex justify-center my-10">
            <ReactToPrint
              trigger={() => (
                <button className="btn bg-blue-900 text-white border border-black shadow-lg shadow-black hover:text-black hover:border-black ">
                  Print
                </button>
              )}
              content={() => ref.current}
            ></ReactToPrint>
          </div>
          {/* print button ------------------------------ */}
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Invoice;

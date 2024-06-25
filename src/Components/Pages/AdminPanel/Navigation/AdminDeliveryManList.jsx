import { useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../Layout/Loading";

const AdminDeliveryManList = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [deliveryMans, setDeliveryMans] = useState({ deliveryManItem: [] });

  const [currentPage, setCurrentPage] = useState(1);
  const deliveryManItemPerPage = 20;

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
      setLoading(true);
      axios
        .get(`https://backend.ap.loclx.io/api/delivery-man-list`, {
          headers: headers,
        })
        .then((res) => {
          // setDeliveryMans({ deliveryManItem: res.data });
          setDeliveryMans({ deliveryManItem: res.data.deliveryMan });

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);
  // delete section----------------
  const handleDelete = (deliveryManId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    axios
      .delete(
        `https://backend.ap.loclx.io/api/delivery-man-delete/${deliveryManId}`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        setDeliveryMans((prevdeliveryMans) =>
          prevdeliveryMans.filter(
            (deliveryMans) => deliveryMans.id !== deliveryManId
          )
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting DeliveryMans",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };
  // disclose section----------------
  const handleDisclose = (deliveryManId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    axios
      .get(
        `https://backend.ap.loclx.io/api/close-delivery-panel/${deliveryManId}`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        setDeliveryMans((prevdeliveryMans) =>
          prevdeliveryMans.filter(
            (deliveryMans) => deliveryMans.id !== deliveryManId
          )
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  // pagination section -----------
  const indexOfLastDeliveryManItem = currentPage * deliveryManItemPerPage;
  const indexOfFirstDeliveryManItem =
    indexOfLastDeliveryManItem - deliveryManItemPerPage;

  const currentDeliveryManItem =
    deliveryMans.deliveryManItem &&
    deliveryMans.deliveryManItem.slice(
      indexOfFirstDeliveryManItem,
      indexOfLastDeliveryManItem
    );

  const totalDeliveryManItems =
    deliveryMans.deliveryManItem && deliveryMans.deliveryManItem.length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            Delivery Man List
          </h1>
          <hr className="mt-1 border border-black mb-10" />
          {/* table section  */}
          {!loading && (
            <div className="overflow-x-auto text-black">
              <div className="flex justify-between ms-2 me-2">
                <div>{/* "" */}</div>
                {/* add button  */}
                <div>
                  <Link to="/adminDeliveryManAdd">
                    <button className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white">
                      Add
                    </button>
                  </Link>
                </div>
              </div>
              <table className="table table-zebra">
                {/* head */}
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th>index</th>
                    <th>Name</th>
                    {/* <th>password</th> */}
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDeliveryManItem &&
                    currentDeliveryManItem.map((deliveryMans, index) => (
                      <tr key={deliveryMans.id}>
                        <th>{index + 1}</th>
                        <td>{deliveryMans.name}</td>
                        {/* <td>{deliveryMans.password}</td> */}
                        <td>{deliveryMans.email}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            {/* Edit button  */}
                            <Link
                              to={`/adminDeliveryManEdit/${deliveryMans.id}`}
                            >
                              <button className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white">
                                Edit
                              </button>
                            </Link>
                            {/* Delete button   */}
                            <button
                              onClick={() => handleDelete(deliveryMans.id)}
                              className="btn-xs bg-red-500 rounded-lg font-semibold uppercase hover:bg-red-800 hover:text-white"
                            >
                              Delete
                            </button>
                            {/* create delivery panel button   */}
                            {deliveryMans.status === 1 && (
                              <Link
                                to={`/createDeliveryPanel/${deliveryMans.id}`}
                              >
                                <button className="btn-xs bg-blue-500 rounded-lg font-semibold uppercase hover:bg-blue-800 hover:text-white">
                                  Create Delivery Panel
                                </button>
                              </Link>
                            )}
                            {deliveryMans.status === 2 && (
                                <button
                                onClick={() => handleDisclose(deliveryMans.id)}
                                  className="btn-xs rounded-lg font-semibold uppercase bg-gray-500 text-gray-950 hover:bg-gray-800 hover:text-white"
                                >
                                  Disclose Delivery Panel
                                </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* pagination array section ------------- */}
              <div className="pagination my-10 flex justify-center">
                {totalDeliveryManItems &&
                  Array.from(
                    {
                      length: Math.ceil(
                        totalDeliveryManItems / deliveryManItemPerPage
                      ),
                    },
                    (_, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm ${
                          currentPage === index + 1
                            ? "bg-gray-800 text-white"
                            : "bg-white"
                        }`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
              </div>
            </div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default AdminDeliveryManList;

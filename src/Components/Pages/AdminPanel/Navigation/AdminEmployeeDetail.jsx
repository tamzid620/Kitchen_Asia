import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Layout/Loading";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";

const AdminEmployeeDetail = () => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const { employeeId } = useParams();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    // get method -------------------
    setLoading(true);
    axios
      .get(`https://backend.ap.loclx.io/api/employee-detail/${employeeId}`, {
        headers: headers,
      })
      .then((res) => {
        setOrderDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [employeeId]);

  return (
    <div className="text-yellow-500 bg-gray-300 min-h-screen">
      <div className="fixed z-10 w-full">
        <SearchPanel />
      </div>

      {/* main section  */}
      <div className="flex justify-center ">
        <div className="mt-24 w-full ">
          <h1 className="text-3xl flex justify-center text-black uppercase">
            Employee Details
          </h1>
          <hr className="mt-1 border border-black mb-10" />
          {/* information section  */}
          {!loading && (
            <div className="container mx-auto">
              <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
                <div className="relative">
                  <img
                    className="w-full h-full  bg-gray-200"
                    src={orderDetails.file}
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 p-4 bg-gray-800 text-white">
                    {orderDetails.employee.jobType}
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-2">{orderDetails.employee.name}</h1>
                  <p className="text-gray-600">{orderDetails.employee.designation}</p>
                  <div className="mt-4">
                    <p className="text-gray-700">
                      <strong>Email:</strong> {orderDetails.employee.email}
                    </p>
                    <p className="text-gray-700">
                      <strong>Phone:</strong> {orderDetails.employee.phoneNo}
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> {orderDetails.employee.address}
                    </p>
                    <p className="text-gray-700">
                      <strong>Salary:</strong> {orderDetails.employee.salary}
                    </p>
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

export default AdminEmployeeDetail;

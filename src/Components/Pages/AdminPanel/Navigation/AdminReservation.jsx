import { useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../Layout/Loading";

const AdminReservation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reservationList, setReservationList] = useState([]);

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
      // get reserveItem data ---------------
      setLoading(true);
      axios
        .get(`https://restaurantbackend.softplatoon.com/api/reservation-list`, {
          headers: headers,
        })
        .then((res) => {
          setReservationList(res.data.reserveList);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);

  // approve section--------------------------
  const handleApprove = (reserveId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    axios
      .get(`https://restaurantbackend.softplatoon.com/api/reservation-approve/${reserveId}`, {
        headers: headers,
      })
      .then((res) => {
        setReservationList((prevReserveItem) =>
          prevReserveItem.filter((reserveItem) => reserveItem.id !== reserveId)
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
        window.location.reload();
      });
  };

  // delete section---------------------
  const handleDelete = (reserveId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    axios
      .delete(
        `https://restaurantbackend.softplatoon.com/api/reservation-delete/${reserveId}`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        setReservationList((prevReserveItem) =>
          prevReserveItem.filter((reserveItem) => reserveItem.id !== reserveId)
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
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
        window.location.reload();
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
            Reservation List
          </h1>
          <hr className="mt-1 border border-black mb-10" />
          {/* table section  */}
          {!loading && (
            <div className="overflow-x-auto text-black">
              <table className="table table-zebra">
                {/* head */}
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th>index</th>
                    <th>Client Name</th>
                    <th>Event Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Type Of Event</th>
                    <th>Number Of People</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationList.map((reserve, index) => (
                    <tr key={reserve.id}>
                      <th>{index + 1}</th>
                      <td>{reserve.clientName}</td>
                      <td>{reserve.eventDate}</td>
                      <td>{reserve.startTime}</td>
                      <td>{reserve.endTime}</td>
                      <td>{reserve.eventType}</td>
                      <td>{reserve.numbOfPeople}</td>
                      <td className="flex gap-2">
                        {/* approve button  */}
                        <button
                          onClick={() => handleApprove(reserve.id)}
                          className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white"
                        >
                          Approve
                        </button>
                        {/* Delete button   */}
                        <button
                          onClick={() => handleDelete(reserve.id)}
                          className="btn-xs bg-red-500 rounded-lg font-semibold uppercase hover:bg-red-800 hover:text-white"
                        >
                          Delete
                        </button>
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

export default AdminReservation;

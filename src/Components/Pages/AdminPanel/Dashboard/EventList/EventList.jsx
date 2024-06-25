import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";

const EventList = () => {
  const navigate = useNavigate();
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
      axios
        .get(`https://backend.ap.loclx.io/api/reservation-list`, {
          headers: headers,
        })
        .then((res) => {
        //   setReservationList(res.data.reserveList);
          const sortedReservations = res.data.reserveList.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
          const latestReservations = sortedReservations.slice(0, 5);

          setReservationList(latestReservations);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);

  return (
    <div>
        <div className="card">
          <div className="card-body border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 bg-gray-800 rounded-xl sm: w-[350px] md:w-full lg:w-[750px] lg:h-[500px]">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h4 className="card-title mb-1t text-white">
                  Reservation List
                </h4>
              </div>
              <div>
                <p className="text-muted mb-1 text-white">Your data status</p>
              </div>
            </div>
            {/* information section  */}
            {reservationList.map((reserve) => (
              <div key={reserve.id}>
                <div className="lg:flex md:flex lg:justify-between md:justify-between">
                  <div className="flex items-center">
                    <div className="bg-yellow-500 p-3 rounded-xl me-2">
                      <AiFillClockCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h6 className=" text-white">{reserve.eventType}</h6>
                      <p className="">{reserve.reserveState}</p>
                    </div>
                  </div>
                  <div className="sm: ms-12 lg:ms-72 ">
                    <p className="">
                      {reserve.startTime} - {reserve.endTime}
                    </p>
                    <p className="">{reserve.eventDate} </p>
                  </div>
                </div>
                <hr className="my-3 " />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default EventList;

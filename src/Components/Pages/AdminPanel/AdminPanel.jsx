import AmountSecion from "./Dashboard/AmountSecion/AmountSecion";
import EventList from "./Dashboard/EventList/EventList";
import NumberStatus from "./Dashboard/NumberStatus/NumberStatus";
import PaymentStatus1 from "./Dashboard/PaymentStatus/PaymentStatus1";
import SearchPanel from "./Dashboard/SearchPanel/SearchPanel";
import Transaction from "./Dashboard/Transaction/Transaction";
import adminBackground from ".././../../../public/images/Admin_Background.png";
// import adminBackground from ".././../../../public/images/w1.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminPanel = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
   const userRole=  localStorage.getItem("user"); 

    if (!token) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "You have to Login first",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/adminlogin");
    } 
    else if (userRole.role ===  1) {
      navigate("/dp");
    } 
    else if (userRole.role ===  2) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "You are not eligible for this page",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/adminlogin");
    } 
  }, [navigate]);



  return (
    <div className="text-yellow-500 ">
      <div className="fixed z-10 w-full">
        <SearchPanel />
      </div>

      {/* main section  */}
      <div
        style={{
          backgroundImage: `url(${adminBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="flex justify-center "
      >
        <div>
          <div className="mt-24 mb-10 w-full max-w-screen-xl ">
            <NumberStatus />
          </div>
          <div className="lg:flex  gap-5">
            <div className="col-span-4 lg:col-span-4 sm: mb-10">
              <Transaction />
            </div>
            <div className="col-span-8 lg:col-span-8 mb-10">
              {/* Reservation list  */}
              <EventList />
            </div>
          </div>
          <div className="w-full max-w-screen-xl mb-10">
            <AmountSecion />
          </div>
          <div className="w-full max-w-screen-xl mb-10">
            <PaymentStatus1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

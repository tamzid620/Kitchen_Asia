import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const DeliveryManPanel = () => {


    const navigate = useNavigate();

    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     Swal.fire({
    //       position: "center",
    //       icon: "warning",
    //       title: "You have to Login first",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     navigate("/adminlogin");
    //   }
    // }, [navigate]);
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
      else if (userRole.role ===  2) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "SuccessFully Login",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/deliverymanPanel");
      } 
      else if (userRole.role ===  1) {
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
        <div>
          {/* Delivery button  */}
          <div className="flex items-center justify-center h-screen">
            <Link to="/deliveryAssignList">
            <button 
            className="bg-yellow-500 hover:bg-yellow-700 hover:text-black text-gray-500 font-bold py-2 px-4 rounded">
                Delivery
            </button>
            </Link>
          </div>
          
        </div>
    );
};

export default DeliveryManPanel;
import icon1 from "../../../../public/icons/start-filled.svg";
import icon2 from "../../../../public/icons/star-grey.svg";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "react-rating";
// import bgBanner2 from "../../../../public/images/bg-Banner-5.jpeg";
import Swal from "sweetalert2";
import RatingModal from "../RatingModal/RatingModal";
import hr from "../../../../public/icons/hr.png";

const OnlineOrder = () => {
  Aos.init();
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    axios
      .get("https://backend.ap.loclx.io/api/food-item-list")
      .then((res) => {
        setOnlineOrders(res.data.foodItem);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  const handleOrderNowClick = (id) => {
    axios
      .get(`https://backend.ap.loclx.io/api/add-to-cart/${id}`)

      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: ("An error occurred:", error),
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleLikeClick = (id) => {
    setModalOpen(true);
    setSelectedOrderId(id);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div
      // style={{
      //   backgroundImage: `url(${bgBanner2})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
      className="relative bg-transparent"
    >
      <div className="absolute inset-0 bg-black opacity-60" />
      {/* title section  */}
      <div className=" flex justify-center Pt-16 pt-10 ">
        <div
          data-aos="flip-down"
          data-aos-easing="linear"
          data-aos-duration="500"
        >
          <h1
            style={{ fontFamily: "Mooli, sans-serif" }}
            className="flex justify-center text-3xl text-white font-semibold"
          >
            Online Order
          </h1>
          <img src={hr} alt="" />
        </div>
      </div>
      {/*------------------------- information section ------------------------ */}
      <div
        className="flex justify-center pb-10"
        data-aos="zoom-in-up"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
        <div className="max-w-screen-lg mx-auto">
          <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {onlineOrders.map((onlineOrder) => (
              <div
                key={onlineOrder.id}
                data-aos="flip-up"
                className={`bg-white rounded-xl border-t-2 border-[#bc161c] 
                  shadow-md shadow-[#bc161c] p-3 w-[280px] 
                  transition-transform transform hover:scale-105`}
              >
                <div>
                  <img
                    className="w-80 h-48 rounded-lg"
                    src={onlineOrder.imgLink}
                    alt=""
                  />
                  <div>
                    {/* food name,description and like logo  */}
                    <h1 className="flex justify-between items-center">
                      <h2>
                        <h3
                          style={{ fontFamily: "Montserrat, sans-serif " }}
                          className=" text-xl text-[#bc161c] font-semibold uppercase mt-5"
                        >
                          {onlineOrder.foodName}
                        </h3>
                        <h3 className="text-black font-semibold">
                          {onlineOrder.description}
                        </h3>
                      </h2>
                      {/* ------------review thumbsup option ----------- */}
                      <h1
                      title="review now"
                        onClick={() => handleLikeClick(onlineOrder.id)}
                        className="text-[#bc161c] hover:text-white hover:bg-[#bc161c]
                     border-2 border-[#bc161c] hover:border-[#f9941e] rounded-full"
                      >
                        <BiSolidLike size={25} className="p-1" />
                      </h1>
                    </h1>
                    {/* price and rating  */}
                    <div className="flex justify-between items-center mt-5">
                      <div className="flex text-[#bc161c] text-xl font-mono font-bold">
                        <span>{onlineOrder.price}</span> <span>৳</span>
                      </div>
                      {/* react rating section  */}
                      <div>
                      <Rating
                          initialRating={parseFloat(onlineOrder.review)}
                          emptySymbol={<img src={icon2} alt="empty star" className="icon" />}
                          fullSymbol={<img src={icon1} alt="full star" className="icon" />}
                          fractions={2}
                          readonly
                        />
                      </div>
                    </div>
                    <button
                      title="Add to Cart"
                      onClick={() => handleOrderNowClick(onlineOrder.id)}
                      className=" flex items-center gap-2
                       border-2 border-[#bc161c] bg-transparent
                        text-[#bc161c]
                      hover:border-[#f9941e] hover:bg-[#bc161c] hover:text-white 
                    font-bold px-3 py-3 mt-3 rounded-md "
                    >
                      <span> Add to Cart </span>
                      <span>
                        {" "}
                        <BsFillCartPlusFill />{" "}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {modalOpen && <RatingModal closeModal={closeModal} id={selectedOrderId} />}
    </div>
  );
};

export default OnlineOrder;

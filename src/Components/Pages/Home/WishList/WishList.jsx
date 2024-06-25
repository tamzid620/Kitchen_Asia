import aboutPhoto from "../../../../../public/images/contactUs.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const WishList = () => {
  const [WishListItems, setWishListItems] = useState([]);

  useEffect(() => {
    // Retrieve the data from localStorage
    const listItem = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishListItems(listItem);
  }, []);

  const handleAddToCart = (id) => {
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

  return (
    <div className="bg-black py-10">
      {/* title section */}
      <div
        style={{
          backgroundImage: `url(${aboutPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          // marginTop:'30px'
        }}
        className="flex justify-center"
      >
        {/* title tag */}
        <div className="bg-gray-800 opacity-70 w-full h-full flex flex-col justify-center items-center">
          <h1
            style={{ fontFamily: "Mooli, sans-serif" }}
            className="text-3xl text-white font-semibold "
          >
            Wishlist
          </h1>
          <img src="../../../../public/icons/hr.svg" alt="" />
        </div>
      </div>
      {/*------------------------- information section ------------------------ */}

      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {WishListItems &&
          WishListItems.map((listItem, index) => (
            <div
              key={index}
              className="border-t-2 border-[#bc161c] 
                  shadow-md shadow-[#bc161c] bg-white rounded overflow-hidden"
            >
              <div className="card-zoom w-[325px] shadow-md shadow-gray-500">
                <div className=" w-[325px]  bg-base-100 rounded-none  ">
                  <figure className="zoom-effect">
                    <img
                      className="w-full h-40 object-cover object-center"
                      src={listItem.imgLink}
                      alt={listItem.foodName}
                    />
                  </figure>
                </div>
              </div>

              <div className="p-4">
                <h1 className="text-xl text-[#bc161c] font-semibold mb-2">
                  {listItem.foodName}
                </h1>
                <p className="font-semibold">{listItem.price} ৳</p>
                <div className="flex justify-start text-center">
                  <button
                    onClick={() => handleAddToCart(listItem.id)}
                    className=" flex items-center  border-2
             border-[#f9941e] bg-transparent
                        text-[#bc161c]
                      hover:border-[#f9941e] hover:bg-[#bc161c] hover:text-white 
font-bold px-3 py-1  mt-3 rounded-md "
                  >
                    Add to Cart{" "}
                    <span className="ml-1">
                      <BsFillCartPlusFill />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default WishList;

import "./SpecialMenu.css";
import { BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
// import bgBanner1 from "../../../../public/images/DSCF7688.jpg";
import hr from "../../../../public/icons/hr.png";
import { useEffect, useState } from "react";
import axios from "axios";

const SpecialMenu = () => {
  const [specialItem, setSpecialItem] = useState("");

  useEffect(() => {
    Aos.init();
    axios
      .get("https://backend.ap.loclx.io/api/food-item-list")
      .then((res) => {
        const specialItemData = res.data.foodItem.filter(
          (item) => item.priority === "special"
        );
        setSpecialItem(specialItemData);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  const handleWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = [...wishlist, item];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    toast.success("Item added to Wishlist!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="relative bg-transparent">
      <div className="absolute inset-0 bg-black opacity-60" />
      <div
        className="max-w-screen-xl mx-auto pt-20  pb-10"
        data-aos="flip-right"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
        {/* title section  */}
        <div className="flex justify-center mt-16">
          {/* tittle tag */}
          <div>
            <h1
              style={{ fontFamily: "Mooli, sans-serif" }}
              className="flex justify-center text-3xl text-white font-semibold"
            >
              Special Menu
            </h1>
            <img src={hr} alt="" />
          </div>
        </div>

        {/*------------------------- information section ------------------------ */}
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {specialItem &&
            specialItem.map((item) => (
              <div
                key={item.id}
                className="border-t-2 border-[#bc161c] 
                  shadow-md shadow-[#bc161c] bg-white rounded overflow-hidden"
              >
                <div className="card-zoom w-[325px] shadow-md shadow-gray-500">
                  <div className=" w-[325px]  bg-base-100 rounded-none  ">
                    <figure className="zoom-effect">
                      <img
                        className="w-full h-40 object-cover object-center"
                        src={item.imgLink}
                        alt={item.foodName}
                      />
                    </figure>
                  </div>
                </div>
                  <input  type="hidden" name="id" value={item.id} />
                  
                <div className="p-4">
                  <h1 className="text-xl text-[#bc161c] font-semibold mb-2">
                    {item.foodName}
                  </h1>
                  <p className="font-semibold">{item.price} ৳</p>
                  <div className="flex justify-start text-center">
                    <button
                      onClick={() =>
                        handleWishlist({
                          id: item.id ,
                          foodName: item.foodName,
                          price: item.price,
                          imgLink: item.imgLink,
                        })
                      }
                      className=" flex items-center  border-2
             border-[#f9941e] bg-transparent
                        text-[#bc161c]
                      hover:border-[#f9941e] hover:bg-[#bc161c] hover:text-white 
font-bold px-3 py-1  mt-3 rounded-md "
                    >
                      Add to Wishlist{" "}
                      <span className="ml-1">
                        <BsHeartFill />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialMenu;

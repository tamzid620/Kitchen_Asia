import aboutPhoto from "../../../../public/images/contactUs.jpg";
import icon1 from "../../../../public/icons/start-filled.svg";
import icon2 from "../../../../public/icons/star-grey.svg";
import { BsFillCartPlusFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Rating from "react-rating";
import Swal from "sweetalert2";
import Loading from '../../Layout/Loading'

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading , setIsLoading] = useState(false) ;
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [activeTab, setActiveTab] = useState("Drinks");


  useEffect(() => {
    // get method --------------------
    setIsLoading(true) ; 
    axios
      .get("https://backend.ap.loclx.io/api/food-item-list")
      
      .then((res) => {
        setMenus(res.data.foodItem);
        setIsLoading(false) ; 
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);


  useEffect(() => {
    const filtered = menus.filter((menuItem) => menuItem.categoryId === activeTab);
    setFilteredMenus(filtered);
  }, [activeTab, menus]);


  // handle submit button ----------------
  const handleOrderNowClick = (id) => {

    // post method --------------
    setIsLoading(true) ; 
    axios
      .get(`https://backend.ap.loclx.io/api/add-to-cart/${id}`)

      .then((res) => {
        // to refresh to form ---------------
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: ("An error occurred:", error),
          showConfirmButton: false,
          timer: 1500,
        });
      });
    };


  return (
    <div className="bg-black">
      {/* title section */}
      <div
        style={{
          backgroundImage: `url(${aboutPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
        }}
        className="flex justify-center"
      >
        {/* title tag */}
        <div className="bg-black opacity-70 w-full h-full flex flex-col justify-center items-center">
          <h1
            style={{ fontFamily: "Mooli, sans-serif" }}
            className="text-3xl text-white font-semibold "
          >
            Our Menu
          </h1>
          <img src="../../../../public/icons/hr.svg" alt="" />
        </div>
      </div>
      {/* ---------------------------------------------------------- */}
     <div className="flex justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        
      /******************* * information section ******************/
      <div className="max-w-screen-xl mx-auto mt-20 sm: ms-2 sm: me-2 lg:ms-0 lg:me-0 pb-10">
       {/* Tabs section */}
       <div className="flex justify-center gap-3 my-10">
        <button
          className={`tab-btn border-2 border-[#f9941e]  bg-transparent text-[#f9941e] 
                        hover:border-[#bc161c] hover:text-white 
       font-bold px-3 py-1 rounded-md  ${activeTab === "Drinks" ? "active" : ""}`}
          onClick={() => setActiveTab("Drinks")}
        >
          Drinks
        </button>
        <button
          className={`tab-btn border-2 border-[#f9941e]  bg-transparent text-[#f9941e] 
                        hover:border-[#bc161c] hover:text-white 
       font-bold px-3 py-1 rounded-md  ${activeTab === "Meals" ? "active" : ""}`}
          onClick={() => setActiveTab("Meals")}
        >
          Meals
        </button>
        <button
          className={`tab-btn border-2 border-[#f9941e]  bg-transparent text-[#f9941e] 
                        hover:border-[#bc161c] hover:text-white 
       font-bold px-3 py-1 rounded-md  ${activeTab === "Dessert" ? "active" : ""}`}
          onClick={() => setActiveTab("Dessert")}
        >
          Dessert
        </button>
        <button
          className={`tab-btn border-2 border-[#f9941e]  bg-transparent text-[#f9941e] 
                        hover:border-[#bc161c] hover:text-white 
       font-bold px-3 py-1 rounded-md  ${activeTab === "Snacks" ? "active" : ""}`}
          onClick={() => setActiveTab("Snacks")}
        >
          Snacks
        </button>
      </div>
        <div className="mb-5 flex justify-center">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10 ">
            {filteredMenus.map((menuItem) => (
              <div key={menuItem.id} className="flex items-center gap-5">
                <div>
                  <img
                    className="w-52 h-40 rounded-xl"a
                    src={menuItem.imgLink}
                    alt={menuItem.foodName}
                  />
                </div>
                <div>
                  <div>
                    <h1 className="text-xl text-[#bc161c] font-semibold uppercase mt-5">
                      {menuItem.foodName}
                    </h1>
                    <h2 className="text-white font-semibold">
                      {menuItem.description}
                    </h2>
                    <div className="lg:flex md:block sm:block justify-between mt-5">
                      <div>
                        <div className="flex">
                          <Rating
                            emptySymbol={
                              <img
                                src={icon2}
                                alt="empty star"
                                className="icon"
                              />
                            }
                            fullSymbol={
                              <img
                                src={icon1}
                                alt="filled star"
                                className="icon"
                              />
                            }
                            fractions={2}
                            initialRating={menuItem.rating}
                            readonly
                          />
                        </div>
                        <p className="text-[#bc161c] text-2xl font-mono font-bold">
                          ${menuItem.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-5 -mt-3 lg:ms-10 ">
                        {/* id section   */}
                        {/* <div>
                          <label htmlFor="foodId"></label>
                          <input
                            type="hidden"
                            title="foodId"
                            id="foodId"
                            value={menuItem.id}
                            onChange={handleIdChange}
                          />
                        </div> */}
                        <button
                          onClick={() => handleOrderNowClick(menuItem.id)}
                          className="hover:border-[#bc161c] hover:text-white
                             text-[#f9941e]  border-2 border-[#f9941e]  font-bold px-2  py-1 
                             rounded-md mt-3 flex items-center gap-2"
                        >
                          <span> Add to Cart </span>
                          <span>
                            <BsFillCartPlusFill />{" "}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="border-2-[#f9941e]  mb-10" />
        </div>
      </div>

        )}
      </div> 
    </div>
  );
};

export default Menu;

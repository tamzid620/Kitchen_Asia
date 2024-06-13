import { useEffect, useState } from "react";
import aboutPhoto from "../../../../public/images/contactUs.jpg";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import Order from "../../Shared/Order/Order";

const Cart = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    axios
      .get("https://restaurantbackend.softplatoon.com/api/cart-item")
      .then((res) => res.data.foodCart)
      .then((data) => setCarts(data));
  }, []);
  console.log(carts);

  // delete method -----------------
  const handleDeleteItem = (cartId) => {
    console.log("Deleting cart with ID:", cartId);

    axios
      .delete(`https://restaurantbackend.softplatoon.com/api/food-cart-delete/${cartId}`)

      .then((res) => {
        setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== cartId));
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
      });
    console.log(cartId);
  };

  return (
    <div className="">
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
        <div className="bg-black opacity-70 w-full h-full flex flex-col justify-center items-center">
          <h1
            style={{ fontFamily: "Mooli, sans-serif" }}
            className="text-3xl text-white font-semibold "
          >
            Cart
          </h1>
          <img src="../../../../public/icons/hr.svg" alt="" />
        </div>
      </div>

      {/* information section */}
      <div className="max-w-screen-xl mx-auto flex justify-center mt-20" >
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-10">
          {/* selected items */}
          {carts.map((cart) => (
            <div
              key={cart.id}
              className="border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 rounded-xl lg:w-[500px] md:w-[500px] sm:w-[358px] text-yellow-500 bg-overflow-y-auto flex carts-center mb-5"
            >
              <img
                className="rounded-xl lg:w-[150px] md:w-[150px] sm:w-[100px] me-5 ms-2"
                src={cart.imgLink}
                alt={cart.foodName}
              />
              <div className="item flex justify-between items-center w-full">
                <div className="-mt-5 flex-grow">
                  <h1 className="text-md text-yellow-500 font-semibold uppercase mt-5">
                    {cart.foodName}
                  </h1>
                  <h2 className="text-[#808080] font-semibold">
                    Price: <span>${cart.price}</span>
                  </h2>
                  {/* Add more details as needed */}
                </div>
                {/* delete button  */}
                <div className="flex items-center">
                  <button
                    onClick={() => handleDeleteItem(cart.id)}
                    className="w-[50px] h-[50px] border border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black mr-4 flex justify-center items-center"
                  >
                    <MdDeleteForever className="w-[30px] h-[30px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* modal section  */}
<div className="flex justify-center mt-5">
<button 
className="border border-yellow-500 bg-transparent text-yellow-500
hover:border-white hover:text-white 
font-bold px-3 py-1 rounded-md "
onClick={()=>document.getElementById('my_modal_3').showModal()}>Order Now</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box w-11/12 max-w-5xl bg-slate-900 border border-yellow-500 shadow-lg shadow-yellow-500">
    <form method="dialog">
      <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2">✕</button>
    </form>
            <Order />
  </div>
</dialog>
    </div>


    </div>
  );
};

export default Cart;

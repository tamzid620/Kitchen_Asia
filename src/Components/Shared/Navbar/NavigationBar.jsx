import homeLogo from "../../../../public/icons/Kitchen-Asia-Updated-Logo-01.png";
import { Link } from "react-router-dom";
import "./NavCss.css";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { BsHeartFill, BsFillCartCheckFill } from "react-icons/bs";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  // state section --------------------------------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedItem, setSelectedItem] = useState("item1");
  const [specialRequest, setSpecialRequest] = useState("");

  const createOrder = () => {
    Swal.fire({
      icon: "success",
      title: "Order Created!",
      text: "Your order has been successfully created.",
      confirmButtonText: "OK",
      confirmButtonColor: "#FFD700",
    }).then(() => {
      setName("");
      setPhone("");
      setAddress("");
      setSelectedItem("item1");
      setSpecialRequest("");
    });
    console.log(
      "Name:",
      name,
      "----Phone:",
      phone,
      "----Selected Item:",
      selectedItem,
      "----Special ----Request:",
      specialRequest
    );
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  // scroll navbare option -------------
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const navBarClass = scrolling ? "bg-slate-950" : "bg-gray-800";
  const navBarClass = scrolling ? "bg-gray-300" : "bg-gray-200";

  // navmenu open close option -----------
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    const toggleNav = () => {
      // Animate Links
      navLinks.classList.toggle("open");
      links.forEach((link) => {
        link.classList.toggle("fade");
      });

      // Hamburger Animation
      hamburger.classList.toggle("toggle");
      setIsOpen(!isOpen);
    };

    const closeNav = () => {
      // Close the menu
      if (isOpen) {
        navLinks.classList.remove("open");
        links.forEach((link) => {
          link.classList.remove("fade");
        });

        hamburger.classList.remove("toggle");
        setIsOpen(false);
      }
    };

    hamburger.addEventListener("click", toggleNav);

    links.forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    return () => {
      hamburger.removeEventListener("click", toggleNav);
      links.forEach((link) => {
        link.removeEventListener("click", closeNav);
      });
    };
  }, [isOpen]);

  return (
    <nav className={`fixed z-10 ${navBarClass}`}>
      <div className="flex items-center justify-between">
        {/* resturant logo section  */}
        <div className="flex">
          <Link to="/">
            <img
              className="w-[90px]"
              src={homeLogo}
              alt=""
              title="Resturant_Logo"
            />
          </Link>
        </div>
        <div>
        </div>
        
        {/* create order button  */}
        {/* <div className=" lg:hidden md:hidden sm: hidden">
          <button
            title="create order"
            className="
               border border-yellow-500 bg-transparent text-yellow-500
                 hover:border-white hover:text-white 
font-bold px-3 py-1 rounded-md "
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Create Order
          </button>
        </div> */}
      </div>
      {/* cart and wishlist for small device  */}
        <div className="flex items-center lg:ms-0 md:ms-[65%] sm: ms-[40%] lg:hidden ">
          <Link to="/cart">
            <button
              title="Cart"
              className="hover:text-black text-[#bc161c] font-bold px-3 py-1 rounded-md"
            >
              <BsFillCartCheckFill className="w-[20px] h-[20px]" />
            </button>
          </Link>

          <Link to="/wishlist">
            <button
              title="Wishlist"
              className="hover:text-black text-[#bc161c] font-bold px-3 py-1 rounded-md"
            >
              <BsHeartFill className="w-[20px] h-[20px]" />
            </button>
          </Link>
        </div>
      {/* menu button  for small device */}
      <div className="hamburger">
        <div className={`line1 ${isOpen ? "line1-open" : ""}`}></div>
        <div className={`line2 ${isOpen ? "line2-open" : ""}`}></div>
        <div className={`line3 ${isOpen ? "line3-open" : ""}`}></div>
      </div>

      <ul className="nav-links text-[#bc161c]">
        <li title="Home">
          <Link to="/">Home</Link>
        </li>
        <li title="Order Tracking">
          <Link to="/ordertracking">Order Tracking</Link>
        </li>
        <li title="Menu">
          <Link to="/menu">Menu</Link>
        </li>
        <li title="Reservation">
          <Link to="/reservation">Reservation</Link>
        </li>
        <li title="Press">
          <Link to="/press">Press</Link>
        </li>
        <li title="About Us">
          <Link to="/aboutUs">About Us</Link>
        </li>

        {/* cart , wishlist and create order section   */}
        <div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="ms-10 lg:flex md:hidden sm: hidden">
              {/* view cart button  */}
              <Link to="/cart">
                <button
                  title="Cart"
                  className="text-[#bc161c] hover:text-black font-bold px-3 py-1
      rounded-md"
                >
                  {" "}
                  <BsFillCartCheckFill className="w-[20px] h-[20px]" />
                </button>
              </Link>
              {/* wishlist button  */}
              <Link to="/wishlist">
                <button
                  title="Wishlist"
                  className="text-[#bc161c] hover:text-black font-bold px-3 py-1
      rounded-md"
                >
                  {" "}
                  <BsHeartFill className="w-[20px] h-[20px]" />
                </button>
              </Link>
            </div>

            {/* create order button  */}
            <div className=" lg:flex md:flex ">
              <button
                title="create order"
                className="
               border border-[#bc161c] bg-transparent text-[#bc161c]
                 hover:border-black hover:text-black 
font-bold px-3 py-1 rounded-md "
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                Create Order
              </button>
            </div>

            {/* modal section  */}
            <dialog id="my_modal_4" className="modal bg-black bg-opacity-40">
              <div className="modal-box w-11/12 max-w-5xl border border-white bg-black bg-opacity-40">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
                    ✕
                  </button>
                </form>

                <div className="modalForm my-5">
                  <div className="flex justify-center mb-5 ">
                    <div>
                      <h1
                        style={{ fontFamily: "Mooli, sans-serif" }}
                        className="flex justify-center text-3xl text-white font-semibold"
                      >
                        Order Your Meals
                      </h1>
                      <img src="../../../../public/icons/hr.svg" alt="" />
                    </div>
                  </div>

                  <form
                    method="dialog"
                    className="space-y-4 "
                    onSubmit={createOrder}
                  >
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 ">
                      <div>
                        <label htmlFor="name" className="block text-white">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
                          // placeholder="Your Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-white">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
                          // placeholder="Phone Number"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="address" className="block text-white">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="focus:outline-none w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
                          // placeholder="Delivery Address"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="items" className="block text-white">
                          Choose Items
                        </label>
                        <select
                          id="items"
                          name="items"
                          className="lg:w-full md:w-64 sm:w-48 w-full bg-transparent  px-3 py-1 border-b-2 text-gray-400 border-white focus:outline-none focus:shadow-outline"
                          value={selectedItem}
                          onChange={(e) => setSelectedItem(e.target.value)}
                        >
                          <option value="item1">Item 1</option>
                          <option value="item2">Item 2</option>
                          <option value="item3">Item 3</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="request" className="block text-white">
                        Special Request
                      </label>
                      <textarea
                        id="request"
                        name="request"
                        className="w-full bg-transparent  px-3 py-1 border-b-2 text-white border-white"
                        rows="3"
                        placeholder="create Custom Order"
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex justify-center ">
                      <button
                        type="submit"
                        onClick={(e) => createOrder(e)}
                        className="
                        border border-yellow-500 bg-transparent text-yellow-500
                        hover:border-white hover:text-white 
       font-bold px-3 py-1 rounded-md "
                      >
                        Create Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default NavigationBar;

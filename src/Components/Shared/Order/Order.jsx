import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Order = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phoneNo: "",
    location: "",
    foodItems: [
      {
        foodId: "",
        quantity: "",
        price: "",
        subTotal: "",
      },
    ],
  });
  const [totalAmount, setTotalAmount] = useState(0);

  // get data from json -------------------------
  useEffect(() => {
    axios
      .get(`https://backend.ap.loclx.io/api/cart-item`)
      .then((res) => res.data)
      .then((data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          foodItems: data.foodCart.map((cartItem) => ({
            foodId: cartItem.id,
            foodName: cartItem.foodName,
            price: cartItem.price,
            quantity: 1,
            // subTotal: 0,
            subTotal: calculateSubtotal(1, cartItem.price),
          })),
        }));

        // Fetch and update food details for each food item
        data.foodCart.forEach((cartItem, index) => {
          axios
            .get(`https://backend.ap.loclx.io/api/cart-item/${cartItem.id}`)
            .then((res) => res.data)
            .then((foodDetails) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                foodItems: prevFormData.foodItems.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        foodName: foodDetails.foodName,
                        price: cartItem.price,
                        subTotal: calculateSubtotal(
                          item.quantity,
                          cartItem.price
                        ),
                      }
                    : item
                ),
              }));
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    const initialTotal = formData.foodItems.reduce(
      (accumulator, item) => accumulator + item.subTotal,
      0
    );
    setTotalAmount(initialTotal);
  }, []);
  //  console.log(formData);

  // calculateSubtotal section --------------------
  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  // handle input change -----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Food Item change -------------------
  // Inside the handleFoodItemChange function
  const handleFoodItemChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      foodItems: prevFormData.foodItems.map((item, i) =>
        i === index
          ? {
              ...item,
              [name === "foodName" ? "foodName" : "foodId"]: value,
              subTotal: calculateSubtotal(item.quantity, item.price),
            }
          : item
      ),
    }));

    // Recalculate total
    const newTotal = formData.foodItems.reduce(
      (accumulator, item) => accumulator + item.subTotal,
      0
    );
    setTotalAmount(newTotal);
  };

  // Quantity Change -----------------
  const handleQuantityChange = (index, change) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        foodItems: prevFormData.foodItems.map((item, i) =>
          i === index
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + change),
                subTotal: calculateSubtotal(item.quantity + change, item.price),
              }
            : item
        ),
      };

      // Recalculate total
      const newTotal = updatedFormData.foodItems.reduce(
        (accumulator, item) => accumulator + item.subTotal,
        0
      );

      // Set the total
      setTotalAmount(newTotal);

      return updatedFormData;
    });
  };

  // submit button -----------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithTotal = {
      ...formData,
      totalAmount: totalAmount,
    };

    console.log("Form submitted:", formDataWithTotal);

    axios
      .post(`https://backend.ap.loclx.io/api/add-order`, formDataWithTotal)
      .then((res) => {
        console.log("Order submitted successfully:", res.data);
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
        });
        // window.location.reload();
      })

      .catch((error) => {
        console.error("Error submitting order:", error);
        toast.error("Error submitting order", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
        });
      });

    setFormData({
      clientName: "",
      email: "",
      phoneNo: "",
      location: "",
      foodItems: [
        {
          foodId: "",
          quantity: "",
          price: "",
          subTotal: "",
        },
      ],
    });
    setTotalAmount(0);
  };

  return (
    <div className="my-5">
      {/* title section */}
      <div className="flex justify-center">
        {/* title tag */}
        <div className=" w-full h-full flex flex-col justify-center items-center">
          <h1
            style={{ fontFamily: "Mooli, sans-serif" }}
            className="text-3xl text-white font-semibold"
          >
            Order Now
          </h1>
          <img src="../../../../public/icons/hr.svg" alt="" />
        </div>
      </div>

      {/* information form  section  */}
      {/* <div className="p-4 flex justify-center "> */}
      <form className="my-5 " onSubmit={handleSubmit}>
        {/* client name and email section  */}
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm: grid-cols-1 gap-10">
          {/* ClientName Input */}
          <div className="mb-4 max-w-[500px]">
            <label htmlFor="clientName" className="text-white">
              Name:
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              required
              className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
            />
          </div>

          {/* Email Input */}
          <div className="mb-4 max-w-[500px]">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
            />
          </div>
        </div>
        {/* phone no and location section  */}
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm: grid-cols-1 gap-5">
          {/* phoneNo Input */}
          <div className="mb-4 max-w-[500px]">
            <label htmlFor="phoneNo" className="text-white">
              Phone No:
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
            />
          </div>

          {/* Location Input */}
          <div className="mb-4 max-w-[500px]">
            <label htmlFor="location" className="text-white">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
            />
          </div>
        </div>

        {/* Food Items section */}
        <div className="">
          {Array.isArray(formData.foodItems) &&
            formData.foodItems.map((foodItem, index) => (
              <div
                key={index}
                className="grid lg:grid-cols-4 md:grid-cols-4 sm: grid-cols-2 gap-5 mb-4"
              >
                {/* Food Id Input */}
                <input
                  type="hidden"
                  id={`foodId-${index}`}
                  name="foodItems"
                  value={foodItem.id}
                  onChange={(e) => handleFoodItemChange(index, e)}
                />
                {/* Food Name Input */}
                <div className="max-w-[200px]">
                  <label htmlFor={`foodName-${index}`} className="text-white">
                    Food Name:
                  </label>
                  <input
                    type="text"
                    id={`foodName-${index}`}
                    name="foodName"
                    value={foodItem.foodName}
                    onChange={(e) => handleFoodItemChange(index, e)}
                    required
                    readOnly
                    className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
                  />
                </div>
                {/* Quantity Input */}
                <div className="max-w-[200px]">
                  <label htmlFor={`quantity-${index}`} className="text-white">
                    Quantity:
                  </label>
                  <div className="flex items-center ml-2">
                    {/* Minus Button */}
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(index, -1)}
                      className="px-2 border rounded-md bg-gray-300 text-black"
                    >
                      -
                    </button>
                    {/* Quantity Input */}
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      name="quantity"
                      value={foodItem.quantity}
                      onChange={(e) => handleFoodItemChange(index, e)}
                      required
                      readOnly
                      className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
                    />
                    {/* Plus Button */}
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(index, 1)}
                      className="px-2 border rounded-md bg-gray-300 text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Price Input */}
                <div className="max-w-[200px]">
                  <label htmlFor={`price-${index}`} className="text-white">
                    Price:
                  </label>
                  <input
                    readOnly
                    type="number"
                    id={`price-${index}`}
                    name="price"
                    value={foodItem.price}
                    onChange={(e) => handleFoodItemChange(index, e)}
                    required
                    className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
                  />
                </div>

                {/* Subtotal Input */}
                <div className="max-w-[200px]">
                  <label htmlFor={`subtotal-${index}`} className="text-white">
                    Subtotal:
                  </label>
                  <input
                    readOnly
                    type="number"
                    id={`subtotal-${index}`}
                    name="subTotal"
                    value={foodItem.subTotal}
                    onChange={(e) => handleFoodItemChange(index, e)}
                    required
                    className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white "
                  />
                </div>
              </div>
            ))}
          {/* total Input  */}
          <div className="flex justify-center ">
            <div className="max-w-[100px]flex mt-5">
              <label htmlFor="totalAmount" className="text-white">
                Total:
              </label>
              <input
                readOnly
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={totalAmount}
                className="ms-2 w-16 border rounded shadow bg-gray-100 text-black outline-none"
              />
            </div>
          </div>
        </div>

        {/* Confirm button  */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="border border-yellow-500 bg-transparent text-yellow-500
              hover:border-white hover:text-white 
font-bold px-3 py-1 rounded-md"
          >
            Confirm
          </button>
        </div>
      </form>
      {/* </div> */}
      <ToastContainer />
    </div>
  );
};

export default Order;

import aboutPhoto from "../../../../public/images/contactUs.jpg";
import hrIcon from "../../../../public/icons/hr.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Reservation = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phoneNo: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    eventType: "",
    numbOfPeople: "",
    eventInfo: "",
  });
  const [showMessage, setShowMessage] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // post method ---------------------
    axios
      .post("https://restaurantbackend.softplatoon.com/api/add-reservation", formData)
      .then((res) => {
        console.log("Response from the server:", res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form
        setFormData({
          clientName: "",
          email: "",
          phoneNo: "",
          eventDate: "",
          startTime: "",
          endTime: "",
          eventType: "",
          numbOfPeople: "",
          eventInfo: "",
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  useEffect(() => {
    // get method -------------------
    axios
      .get("https://restaurantbackend.softplatoon.com/api/user-reservation-info")
      .then((res) => {
        setShowMessage(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reservation info:", error);

        console.log(showMessage);
      });
  }, [showMessage]);

  return (
    <div>
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
        {/* overlay */}
        <div className="bg-black opacity-70 w-full h-full flex flex-col justify-center items-center">
          <h1
            style={{ fontFamily: "Mooli, sans-serif" }}
            className="text-3xl text-white font-semibold"
          >
            Reservation
          </h1>
          <img src={hrIcon} alt="Divider" />
        </div>
      </div>

      {/* information section */}
      <div className="mx-auto mt-8 p-4 max-w-full ">
        
           {/* show message  */}
    {showMessage.status === "201" && (
      <div className="flex justify-center text-lg text-green-500">
        <div>
          <p className="flex justify-center">{showMessage.message}</p>
          {showMessage.reserve?.eventDate && (
            <p className="flex justify-center">
              Date: {showMessage.reserve.eventDate}
            </p>
          )}
          <p className="flex justify-center">
            <span className="me-2">
              Time: {showMessage.reserve?.startTime}
            </span>{" "}
            to <span className="ms-2">{showMessage.reserve?.endTime}</span>
          </p>
        </div>
      </div>
    )}

    {showMessage.status === "202" && (
      <p className="flex justify-center text-lg text-green-500">{showMessage.message}</p>
    )}

    {showMessage.status === "401" && (
      <p className="flex justify-center text-lg text-green-500">{showMessage.message}</p>
    )}
        {/* form section  */}
        <form
          onSubmit={handleSubmit}
          className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-transparent"
        >
          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="mb-4 ">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="clientName"
              >
                Name
              </label>
              <input
                className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="clientName"
                type="text"
                placeholder="Full Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>

            {/*Email Input */}
            <div className="mb-4 ">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="email"
                type="text"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* Phone Number Input */}
            <div className="mb-4 ">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="phoneNo"
              >
                Phone Number
              </label>
              <input
                className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="phoneNo"
                type="tel"
                placeholder="Phone Number"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>

            {/* Event Date Input */}
            <div className="mb-4 ">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="eventDate"
              >
                Event Date
              </label>
              <input
                className=" focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="eventDate"
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* StartTime and EndTime Inputs */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* start time input  */}
            <div className="mb-4 ">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="startTime"
              >
                Start Time
              </label>
              <input
                className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="startTime"
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            {/* end time input  */}
            <div className="mb-4 ">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="endTime"
              >
                End Time
              </label>
              <input
                className="focus:shadow-outline focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="endTime"
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* Type of Event Selector */}
            <div className="mb-4 ">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="eventType"
              >
                Type of Event
              </label>
              <select
                className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option  value="" disabled>
                  Select Type
                </option>
                <option value="birthday" className="text-black">Corporate Lunch</option>
                <option value="wedding" className="text-black">Family Event</option>
                <option value="wedding" className="text-black">Meeting / Presentation</option>
                <option value="wedding" className="text-black">Wedding</option>
                <option value="wedding" className="text-black">Birthday party</option>
                <option value="wedding" className="text-black">Other</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Number of People Input */}
            <div className="mb-4 ">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="numbOfPeople"
              >
                Number of People
              </label>
              <input
                className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 py-1 border-b-2  border-white text-white"
                id="numbOfPeople"
                type="number"
                name="numbOfPeople"
                value={formData.numbOfPeople}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Additional Information Input */}
          <div className="mb-6 ">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="eventInfo"
            >
              Additional Information
            </label>
            <textarea
              className="focus:outline-none focus:shadow-outline w-full bg-transparent  px-3 pb-10 py-1 border-b-2  border-white text-white"
              id="eventInfo"
              placeholder="Additional Information"
              name="eventInfo"
              value={formData.eventInfo}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              className="bg-yellow-500 text-gray-500 hover:bg-yellow-500 hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;

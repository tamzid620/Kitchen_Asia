import aboutPhoto from "../../../../public/images/contactUs.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Press = () => {
  const [press, setPress] = useState([]);

  useEffect(() => {
    // get method --------------------
    axios
      .get("https://backend.ap.loclx.io/api/press-list")
      .then((res) => {
        setPress(res.data.press);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);
  console.log("press----------", press);

  return (
    <div className="bg-black">
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
            Press
          </h1>
          <img src="../../../../public/icons/hr.svg" alt="" />
        </div>
      </div>
      {/* information section */}
      <div className="flex justify-center text-white mt-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {press.map((pres) => (
          <div key={pres.id}>
              <div className="border p-1">
                <div className="border border-white  p-2 flex justify-center">
                  {" "}
                  <img className="w-[300px] h-[250px]" src={pres.imgLink} alt="" />
                </div>
              </div>
              <div className="w-[300px] text-center">
                <h1 className="text-xl font-bold mb-3 text-[#bc161c]">{pres.eventName}</h1>
                <p>{pres.description}</p>
              </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Press;

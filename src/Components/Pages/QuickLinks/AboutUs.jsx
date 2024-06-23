import unknownPhoto from "../../../../public/images/Unknown.png";
import aboutPhoto from "../../../../public/images/AboutUs1.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restaurantbackend.softplatoon.com/api/employee-list`)
      .then((res) => {
        setAboutUs(res.data.employee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(aboutUs);

  // Separate employees based on designation
  const owners = aboutUs.filter((employee) => employee.designation === "Owner");
  const managers = aboutUs.filter(
    (employee) => employee.designation === "Manager"
  );
  const chefs = aboutUs.filter((employee) => employee.designation === "Chef");
  const waiters = aboutUs.filter(
    (employee) => employee.designation === "Waiter"
  );
  const cleaners = aboutUs.filter(
    (employee) => employee.designation === "Cleaner"
  );

  // Concatenate arrays in the desired order
  const sortedEmployees = [
    ...owners,
    ...managers,
    ...chefs,
    ...waiters,
    ...cleaners,
  ];

  return (
    <div className="bg-black">
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
            About Us
          </h1>
          <img src="../../../../public/icons/hr.svg" alt="" />
        </div>
      </div>

      {/* information section  */}
      <div className="mt-10 ">
        <h1 className="flex text-center items-center font-semibold text-white text-lg leading-7 mb-10">
          Welcome to Fresh Meal, a destination for culinary enthusiasts seeking
          to embark on a global gastronomic adventure. We're passionate about
          uniting cultures through the language of food, believing that it's a
          bridge to understanding, a catalyst for connection, and a universal
          pleasure that transcends borders.
          <br /> Our diverse team of chefs, each with a rich tapestry of
          international culinary backgrounds, collaborates to craft innovative
          interpretations of iconic dishes from around the world. We blend
          tradition with innovation, infusing every creation with a touch of
          creativity while staying faithful to the essence of the originals.
          We're dedicated to making your dining experience a journey through
          flavors, offering lighter, brighter, and extraordinarily flavorful
          renditions of global classics.
          <br /> Having been fortunate to explore the far corners of the world,
          we've been humbled by the warmth and hospitality extended to us, often
          by those with the simplest means in the most remote locations. In many
          cultures, hosting travelers is an esteemed privilege, and we proudly
          embrace that tradition. Thank you for joining us on our culinary
          expedition to discover the world's diverse culinary treasures.
          <br /> Welcome to our culinary haven!
          <br /> Your Guides at Fresh Meal
        </h1>
        {/* our team seciton  */}
        <div>
          {/* our team title */}
          <div className="flex justify-center mt-10">
            <div>
              <h1
                style={{ fontFamily: "Mooli, sans-serif" }}
                className="flex justify-center text-3xl text-white font-semibold"
              >
                {" "}
                Our Team{" "}
              </h1>
              <img src="../../../../public/icons/hr.svg" alt="" />
            </div>
          </div>
          {/* our team information */}
          <div className="mt-10">
            {/* owner section  */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {sortedEmployees.map((employee) => (
                <div key={employee.id} className="mb-5">
                  <div className="flex justify-center">
                    <img
                      className="w-[350px] h-[350px] rounded-xl bg-[#f9941e] "
                      src={employee.imgLink || unknownPhoto}
                      alt=""
                    />
                  </div>
                  <h1 className="flex justify-center mt-3 font-semibold text-[#f9941e]  text-2xl uppercase">
                    {employee.name}
                  </h1>
                  <p className="flex justify-center font-semibold text-white uppercase">
                    {employee.designation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

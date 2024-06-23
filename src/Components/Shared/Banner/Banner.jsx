import { Link } from "react-router-dom";
import homeLogo from "../../../../public/icons/Kitchen-Asia-Updated-Logo-01.png";
import banner from "../../../../public/images/Banner5.jpg";
import bannerSm from "../../../../public/images/BannerSm5.jpg";
import Aos from "aos";
import { useEffect, useState } from "react";

const Banner = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    Aos.init();
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${isSmallScreen ? bannerSm : banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="pt-[80px]">
      <div
        style={backgroundStyle}
        className=" gap-10 text-lg font-semibold bg-black"
      >
        <div className="max-w-screen-xl mx-auto flex items-center lg:ms-10 lg:py-[100px] md:py-[100px] sm: pb-[100px] ">
          {/* banner heading paragraph-------------- */}
          <div className=" sm: ms-2 sm:me-2 lg:ms-0 lg:me-0">
            <div className="flex items-center mb-4">
              <div
                className="grid sm:grid-cols-2 text-white sm: mt-[50px] md:mt-0 lg:mt-0"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000"
              >
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif ",
                    fontWeight: 500,
                  }}
                  className=" sm: mb-3 text-white flex items-center"
                >
                  {" "}
                  Welcome to
                </span>
                <img className=" me-2 w-[90px]" src={homeLogo} alt="" />
              </div>
            </div>
            <div>
              <h1
                style={{ fontFamily: "Mooli, sans-serif" }}
                className="text-white text-4xl mb-5 font-bold font"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1200"
              >
                The World Best{" "}
                <span className="text-[#f9941e]">Restaurant</span> Website
              </h1>
              <p
                className="text-white"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
                style={{
                  fontFamily: "Montserrat, sans-serif ",
                  fontWeight: 500,
                }}
              >
                {" "}
                When I got to know about freelancing, I felt excited about it
                and started <br /> to collect information about fiver and upwork
                portal. I found a lot of <br /> interesting thing that would
                make me satisfied that if I could create <br /> some skils, than
                i would make a lot of money
              </p>
            </div>
            <div>
              <Link to="/menu">
                <button
                  className=" border-2 border-[#f9941e]
                   bg-transparent text-[#f9941e]
                  hover:border-[#bc161c] hover:text-white hover:shadow-lg
                   hover:shadow-[#bc161c] 
                   font-bold px-3 py-3 mt-5 rounded-md "
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-duration="1700"
                >
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

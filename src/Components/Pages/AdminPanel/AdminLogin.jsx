import { useState } from "react";
import adminloginbanner from "../../../../public/images/Admin_Login.png";
import marketien from "../../../../public/icons/Main Logo White-01.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import showPasswordIcon from "../../../../public/icons/show-password-icon-19.jpg";
import hidePasswordIcon from "../../../../public/icons/show-password-icon-18.jpg";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
      if (!e.target.value) {
        setPasswordError("Password is required");
      } else {
        setPasswordError("");
      }
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const data = { email, password };

  // handle submit button -------------

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    axios.post(`https://backend.ap.loclx.io/api/login`, data).then((res) => {
      if (res.data.status === "201") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.user.role === 1) {
          navigate("/dp");
        } else if (res.data.user.role === 2) {
          navigate("/deliverymanPanel");
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.data.status === "403") {
        Swal.fire({
          icon: "error",
          title: res.data.message,
          text: res.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.message,
          text: res.data.message,
        });
      }
    });
  };

  const backgroundStyles = {
    backgroundImage: `url(${adminloginbanner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={backgroundStyles}
      className="relative flex items-center justify-center min-h-screen"
    >
      <div className="absolute inset-0 bg-gray-800 opacity-50" />
      <div className="w-full max-w-md relative">
        {/* form section  */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4 shadow-lg shadow-yellow-500 border-t-2 border-yellow-500"
        >
          <h1 className="font-semibold text-white text-center mb-3">
            Management Login Only
          </h1>
          {/* email field  */}
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Enter Gmail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span className="text-red-600">{emailError}</span>
          </div>
          {/* password field  */}
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                onClick={handleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                {showPassword ? (
                  <img
                    className="w-[20px] h-[20px]"
                    src={showPasswordIcon}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-[20px] h-[20px]"
                    src={hidePasswordIcon}
                    alt=""
                  />
                )}
              </span>
            </div>
            <span className="text-red-600">{passwordError}</span>
          </div>
          {/* login button  */}
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-300 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>
          {/* home button-------------  */}

          <button className="mt-5  bg-yellow-300 hover:bg-yellow-500 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
            <a className="flex justify-center" href="/">
              Return Home
            </a>
          </button>
          <hr className="my-5 border border-yellow-300" />
          <h1 className="flex justify-center items-center text-white">
            copyright ©{" "}
            <img className="w-[120px] ms-2" src={marketien} alt="" />
          </h1>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

import { useEffect, useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Loading from "../../../Layout/Loading";

const AdminPackageAdd = () => {
  const [loading,setLoading] =useState(false);
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  const [packageName, setPackageName] = useState("");
  const [menu, setMenu] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [numOfPeople, setNumOfPeople] = useState("");
  const [price, setPrice] = useState("");

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };
  const handleMenuChange = (e) => {
    setMenu(e.target.value);
  };

  const handleNumOfPeopleChange = (e) => {
    setNumOfPeople(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleFoodItemsChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setFoodItems(selectedValues);
  };
 
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "You have to Login first",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/adminlogin");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const headers = {
        accept: "application/json",
        Authorization: "Bearer " + user.token,
      };

      //get dropdown list method ---------------
      setLoading(true)
      axios
        .get(`https://backend.ap.loclx.io/api/get-dropdown-food-item`, {
          headers: headers,
        })
        .then((res) => {
          setPackages(res.data.category);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);

  // handle submit button ----------------
  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    e.preventDefault();

    const data = new FormData();
    data.append("packageName", packageName);
    data.append("menu", menu);
    data.append("foodItems", JSON.stringify(foodItems));
    data.append("numOfPeople", numOfPeople);
    data.append("price",price);
    console.log(data);
    console.log(packageName,foodItems,);
    console.log(foodItems);
    // post method --------------
    axios
      .post("https://backend.ap.loclx.io/api/add-package", data, {
        headers: headers,
      })
      .then((res) => {
        console.log("Data:", res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/adminPackageList");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "An error occurred: " + error,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="text-yellow-500 bg-gray-300 min-h-screen">
      <div className="fixed z-10 w-full">
        <SearchPanel />
      </div>

      {/* main section  */}
      <div className="flex justify-center ">
        <div className="mt-24 w-full ">
          <h1 className="text-3xl flex justify-center text-black uppercase">
            Add Package
          </h1>
          <hr className="mt-1 border border-black mb-10" />
          {/* table section  */}
          {!loading &&  <div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10"
            >
              {/* Package Name */}
              <div className="mb-4">
                <label htmlFor="" className="block text-sm font-bold mb-2">
                  Package Name
                </label>
                <input
                  type="text"
                  name="packageName"
                  id="packageName"
                  value={packageName}
                   onChange={handlePackageNameChange}
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              {/* Dropdown for  Select */}
              <div className="grid sm: grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {/* Dropdown for Menu */}
                <div className="mb-4">
                  <label htmlFor="menu" className="block text-sm font-bold mb-2">
                    Menu Category
                  </label>
                  <select
                    name="menu" id=""
                    value={menu}
                     onChange={handleMenuChange}
                    className="w-full p-2 border rounded text-black"
                  >
                    <option value="">Select Menu</option>
                    {packages.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown for Items */}
                <div className="mb-4">
                  <label htmlFor="foodItems" className="block text-sm font-bold mb-2">Items </label>
                  <Select
                    isMulti
                    name="foodItems"
                    id="foodItems"
                    onChange={handleFoodItemsChange}
                    className=" text-black"
                    options={packages.flatMap((category) =>
                      category.fooditems.map((foodItem) => ({
                        value: foodItem.foodName,
                        label: foodItem.foodName,
                      }))
                    )}
                  />
                </div>
              </div>

              <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {/* Number of People */}
                <div className="mb-4">
                  <label htmlFor="numOfPeople" className="block text-sm font-bold mb-2">
                    Number of People
                  </label>
                  <input
                    type="number"
                    name="numOfPeople"
                    id="numOfPeople"
                    value={numOfPeople}
                    onChange={handleNumOfPeopleChange}
                    className="w-full p-2 border rounded text-black"
                  />
                </div>

                {/* Price */}
                <div className="mb-6">
                  <label htmlFor="price" className="block text-sm font-bold mb-2">Price</label>
                  <input
                    type="text"
                    name="price" id=""
                    value={price}
                     onChange={handlePriceChange}
                    className="w-full p-2 border rounded text-black"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white hover:text-black font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>}
          {loading && <Loading/>}
        </div>
      </div>
    </div>
  );
};

export default AdminPackageAdd;

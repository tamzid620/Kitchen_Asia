import { useEffect, useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../../Layout/Loading";

const AdminFoodItemEdit = () => {
  const [loading,setLoading] =useState(false);
  const { foodItemId } = useParams();

  const [adminCategory, setAdminCategory] = useState([]);
  const [adminSubCategory, setAdminSubCategory] = useState([]);
  const navigate = useNavigate();

  const [id, setid] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodCode, setFoodCode] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // handle control --------------------
  const handleIdChange = (e) => {
    setid(e.target.value);
  };
  const handleCategoryName = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);
  
    const selectedCategory = adminCategory.find(
      (category) => category.id == selectedCategoryId
    );
    if (selectedCategory) {
      setAdminSubCategory(selectedCategory.subcategories);
    } else {
      setAdminSubCategory([]);
    }
  };

  const handlesubCategoryIdChange = (e) => {
    setSubCategoryId(e.target.value);
  };
  const handlefoodNameChange = (e) => {
    setFoodName(e.target.value);
  };
  const handlefoodCodeChange = (e) => {
    setFoodCode(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
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

      //get drop down list method ---------------
      setLoading(true)
      axios
    .get(`https://backend.ap.loclx.io/api/get-dropdown`, {
      headers: headers,
    })
    .then((res) => {
      setAdminCategory(res.data.category);
      const selectedCategory = res.data.category.find(
        (category) => category.id == categoryId
      );

      if (selectedCategory) {
        setAdminSubCategory(selectedCategory.subcategories);
      } else {
        setAdminSubCategory([]);
      }
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
    });
      // set data to edit form
      axios
        .get(`https://backend.ap.loclx.io/api/food-item-edit/${foodItemId}`, {
          headers: headers,
        })
        .then((response) => {
          const foodItemData = response.data.foodItem;
          console.log("Food Item Data:", foodItemData);
          setid(foodItemData.id);
          setCategoryId(foodItemData.categoryId);
          setSubCategoryId(foodItemData.subCategoryId);
          setFoodName(foodItemData.foodName);
          setFoodCode(foodItemData.foodCode);
          setPrice(foodItemData.price);
          setRating(foodItemData.rating);
          setImage(foodItemData.image);
          setDescription(foodItemData.description);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate, foodItemId, categoryId]);

  // handle submit button ----------------
  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    e.preventDefault();
    const data = new FormData();
    data.append("id", id);
    data.append("categoryId", categoryId);
    data.append("subCategoryId", subCategoryId);
    data.append("foodCode", foodCode);
    data.append("foodName", foodName);
    data.append("price", price);
    data.append("rating", rating);
    data.append("image", image);
    data.append("description", description);
    console.log(data);
    // post method --------------
    axios
      .post("https://backend.ap.loclx.io/api/food-item-update", data, {
        headers: headers,
      })
      .then((res) => {
        console.log("Data:", res.data);
        // to refresh to form ---------------
        setid("");
        setCategoryId("");
        setSubCategoryId("");
        setFoodCode("");
        setFoodName("");
        setPrice("");
        setRating("");
        setImage("");
        setDescription("");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/adminFoodItem");
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
    <div className="text-yellow-500 bg-gray-300 min-h-screen">
      <div className="fixed z-10 w-full">
        <SearchPanel />
      </div>

      {/* main section  */}
      <div className="flex justify-center ">
        <div className="mt-24 w-full">
          <h1 className="text-3xl flex justify-center text-black uppercase">
            Edit FoodItem
          </h1>
          <hr className="mt-1 border border-black " />
          {/* form section  */}
          {!loading && <form
            onSubmit={handleSubmit}
            className="bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10"
          >
            {/* subCategoryId and foodCode section  */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
              {/* Category Name section */}
              <div>
                <label htmlFor="categoryName">Category Name:</label>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={categoryId}
                  onChange={handleCategoryName}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                >
                  <option value="">Select Category</option>
                  {adminCategory.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              {/* sub Category Name section */}
              <div>
                <label htmlFor="subCategoryId">Sub Category Name:</label>
                <select
                  name="subCategoryId"
                  id="subCategoryId"
                  value={subCategoryId}
                  onChange={handlesubCategoryIdChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                >
                  <option value="">Select Subcategory</option>
                  {adminSubCategory.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.subCategoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
              {/* Food Name section  */}
              <div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <label htmlFor="foodName">Food Name:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // placeholder="Add Father Name"
                  type="text"
                  name="foodName"
                  id="foodName"
                  value={foodName}
                  onChange={handlefoodNameChange}
                />
              </div>
              {/* foodCode section  */}
              <div>
                <label htmlFor="foodCode">Food Code:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                  type="text"
                  name="foodCode"
                  id="foodCode"
                  value={foodCode}
                  onChange={handlefoodCodeChange}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
              {/* Price section  */}
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>

              {/* Discription section  */}
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
              {/* Rating section  */}
              <div>
                <label htmlFor="rating">Rating:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="rating"
                  id="rating"
                  value={rating}
                  onChange={handleRatingChange}
                />
              </div>

              {/* Image section  */}
              <div>
                <label htmlFor="file">Picture: </label> <br />
                <input
                  className="file-input file-input-bordered file-input-warning w-full text-black"
                  type="file"
                  name="file"
                  id="file"
                  // value={image}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            {/* id section   */}
            <div>
              <label htmlFor="id"></label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                type="hidden"
                title="id"
                id="id"
                value={id}
                onChange={handleIdChange}
              />
            </div>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-3"
              type="submit"
            >
              Save
            </button>
          </form>}
          {loading && <Loading/>}
        </div>
      </div>
    </div>
  );
};

export default AdminFoodItemEdit;

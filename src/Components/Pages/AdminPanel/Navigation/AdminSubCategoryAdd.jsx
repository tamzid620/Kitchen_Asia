import { useEffect, useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../../Layout/Loading";

const AdminSubCategoryAdd = () => {
  const [loading,setLoading] =useState(false);
  const [adminSubCategory, setAdminSubCategory] = useState([]);
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryCode, setCategoryCode] = useState("");
  const [description, setDescription] = useState("");

  // handle control --------------------
  const handleCategoryName = (e) => {
    setCategoryId(e.target.value);
  };
  const handleSubCategoryNameChange = (e) => {
    setSubCategoryName(e.target.value);
  };
  const handleCategoryCodeChange = (e) => {
    setCategoryCode(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        position: "center",
        icon: "warning",
        subCategoryName: "You have to Login first",
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

      setLoading(true)
      axios
        .get(`https://backend.ap.loclx.io/api/category-list`, {
          headers: headers,
        })
        .then((res) => {
          setAdminSubCategory(res.data.category);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);
  console.log(adminSubCategory);

  // handle submit button ----------------
  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    e.preventDefault();
    const data = new FormData();
    data.append("categoryId", categoryId);
    data.append("subCategoryName", subCategoryName);
    data.append("subCategoryCode", subCategoryCode);
    data.append("description", description);
    console.log(data);
    // post method --------------

    axios
      .post("https://backend.ap.loclx.io/api/add-sub-category", data, {
        headers: headers,
      })
      .then((res) => {
        console.log("Data:", res.data);
        // to refresh to form ---------------
        setCategoryId("");
        setSubCategoryName("");
        setCategoryCode("");
        setDescription("");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/adminSubCategory");
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
            Add Sub Category
          </h1>
          <hr className="mt-1 border border-black " />
          {/* form section  */}
          {!loading &&<form
            onSubmit={handleSubmit}
            className="bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10"
          >
            {/* subCategoryName and subCategoryCode section  */}
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
                  {adminSubCategory.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* subCategoryName section   */}
              <div>
                <label htmlFor="subCategoryName">Sub Category Name:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                  type="text"
                  name="subCategoryName"
                  id="subCategoryName"
                  value={subCategoryName}
                  onChange={handleSubCategoryNameChange}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
              {/* subCategoryCode section  */}
              <div>
                <label htmlFor="subCategoryCode">Sub Category Code:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black mb-3"
                  type="text"
                  name="subCategoryCode"
                  id="subCategoryCode"
                  value={subCategoryCode}
                  onChange={handleCategoryCodeChange}
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

export default AdminSubCategoryAdd;

import { useEffect } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../../Layout/Loading";

const AdminCategoryEdit = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);

  // post method
  const [id, setid] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // handle control --------------------
  const handleIdChange = (e) => {
    setid(e.target.value);
  };
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleCategoryCodeChange = (e) => {
    setCategoryCode(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // get  method ----------------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    setLoading(true);
    axios
      .get(`https://backend.ap.loclx.io/api/category-edit/${categoryId}`, {
        headers: headers,
      })
      .then((response) => {
        const categoryData = response.data.category;
        setid(categoryData.id);
        setCategoryName(categoryData.categoryName);
        setCategoryCode(categoryData.categoryCode);
        setDescription(categoryData.description);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryId]);

  // post section ----------------
  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    e.preventDefault();
    const data = new FormData();
    data.append("id", id);
    data.append("categoryName", categoryName);
    data.append("categoryCode", categoryCode);
    data.append("description", description);
    console.log(data);
    // post method --------------
    axios
      .post("https://backend.ap.loclx.io/api/category-update", data, {
        headers: headers,
      })
      .then((res) => {
        console.log("Data:", res.data);
        // to refresh to form ---------------
        setid("");
        setCategoryName("");
        setCategoryCode("");
        setDescription("");
        Swal.fire({
          position: "center",
          icon: "success",
          categoryName: "updated Data successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/adminCategory");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          categoryName: ("An error occurred:", error),
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
            Edit Category
          </h1>
          <hr className="mt-1 border border-black " />
          {/* form section  */}
          {!loading && <form
            onSubmit={handleSubmit}
            className="bg-gray-800 text-white drop-shadow-2xl rounded-xl px-8 pt-6 pb-8 mt-10"
          >
            {/*id,  categoryName and categoryCode section  */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-3">
              {/* categoryName section   */}
              <div>
                <label htmlFor="categoryName">Category Name:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                  type="text"
                  title="categoryName"
                  id="categoryName"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                />
              </div>
              {/* categoryCode section  */}
              <div>
                <label htmlFor="categoryCode">Category Code:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  title="categoryCode"
                  id="categoryCode"
                  value={categoryCode}
                  onChange={handleCategoryCodeChange}
                />
              </div>
            </div>

            {/* description section  */}
            <div>
              <label htmlFor="description">Description:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                title="description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>

            {/* id section   */}
            <div>
              <label htmlFor="id"></label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                // placeholder="Add categoryName"
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

export default AdminCategoryEdit;

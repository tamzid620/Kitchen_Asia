import Swal from "sweetalert2";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../../Layout/Loading";

const AdminFoodItem = () => {
  const [loading,setLoading] =useState(false);
  const [adminFoodItem, setAdminFoodItem] = useState({ foodItem: [] });

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const foodItemPerPage = 20;

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
      // get foodItem data ---------------
      setLoading(true)
      axios
        .get(`https://backend.ap.loclx.io/api/food-item-list`, {
          headers: headers,
        })
        .then((res) => {
          setAdminFoodItem({ foodItem: res.data.foodItem });
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);

  console.log(adminFoodItem);

  // delete section
  const handleDelete = (foodItemId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    axios
      .delete(
        `https://backend.ap.loclx.io/api/food-item-delete/${foodItemId}`,
        {
          headers: headers,
        }
      )
      .then(() => {
        setAdminFoodItem((prevFoodItem) =>
          prevFoodItem.filter((foodItem) => foodItem.id !== foodItemId)
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "foodItem data deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
        navigate("/adminFoodItem");
      });
  };

  // pagination section -----------
  const indexOfLastFoodItem = currentPage * foodItemPerPage;
  const indexOfFirstFoodItem = indexOfLastFoodItem - foodItemPerPage;

  const currentFoodItem =
    adminFoodItem.foodItem &&
    adminFoodItem.foodItem.slice(indexOfFirstFoodItem, indexOfLastFoodItem);

  const totalFoodItems =
    adminFoodItem.foodItem && adminFoodItem.foodItem.length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            Food Item
          </h1>
          <hr className="mt-1 border border-black " />
          {/* table section  */}
          {!loading &&<div className="overflow-x-auto  mt-10 mx-2 text-black">
            {/* search and add field  */}
            <div className="flex justify-between items-center mx-3 mt-5 ">
              {/* search input  */}
              <div className="form-control ms-3 my-3">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered"
                  />
                  <button className="btn btn-square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* add button  */}
              <div>
                <Link to="/adminFoodItemAdd">
                  <button className="btn-sm bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white">
                    Add
                  </button>
                </Link>
              </div>
            </div>

            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th>index</th>
                  <th>Categoty</th>
                  <th>Sub Categoty</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentFoodItem &&
                  currentFoodItem.map((foodItem, index) => (
                    <tr key={foodItem.id}>
                      <th>{index + 1}</th>
                      <td>{foodItem.categoryId}</td>
                      <td>{foodItem.subCategoryId}</td>
                      <td>{foodItem.foodName}</td>
                      <td>{foodItem.price}</td>
                      <td className="w-1/4 flex justify-center py-2">
                        <div className="flex gap-2">
                          {/* Edit button  */}
                          <Link to={`/adminFoodItemEdit/${foodItem.id}`}>
                            <button className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white">
                              Edit
                            </button>
                          </Link>
                          {/* Delete button   */}
                          <button
                            onClick={() => handleDelete(foodItem.id)}
                            className="btn-xs bg-red-500 rounded-lg font-semibold uppercase hover:bg-red-800 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* pagination array section ------------- */}
            <div className="pagination my-10 flex justify-center">
              {totalFoodItems &&
                Array.from(
                  { length: Math.ceil(totalFoodItems / foodItemPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm ${
                        currentPage === index + 1
                          ? "bg-gray-800 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
            </div>

          </div>}
          {loading && <Loading/>}
        </div>
      </div>
    </div>
  );
};

export default AdminFoodItem;

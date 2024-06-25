import Swal from "sweetalert2";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../../Layout/Loading";

const AdminSubCategory = () => {
  const [loading,setLoading] =useState(false);
  const [adminSubCaterory, setAdminSubCaterory] = useState({ subCategory: [] });

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const subCategoryPerPage = 20;

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
      // get subCategory data ---------------
      setLoading(true)
      axios
        .get(`https://backend.ap.loclx.io/api/sub-category-list`, {
          headers: headers,
        })
        .then((res) => {
          setAdminSubCaterory({ subCategory: res.data.subCategory });
          setLoading(false)
        })
        .catch((error) => {
          setAdminSubCaterory(error);
        });
    }
  }, [navigate]);

  console.log(adminSubCaterory);

  // delete section
  const handleDelete = (subCategoryId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };
    axios
      .delete(`https://backend.ap.loclx.io/api/sub-category-delete/${subCategoryId}`, {
        headers: headers,
      })
      .then(() => {
        setAdminSubCaterory((prevSubCategory) =>
          prevSubCategory.filter((subCategory) => subCategory.id !== subCategoryId)
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "SubCategory data deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload()
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
        navigate("/adminSubCategory");
      });
  };

  // pagination section -----------
  const indexOfLastSubCategory = currentPage * subCategoryPerPage;
  const indexOfFirstSubCategory = indexOfLastSubCategory - subCategoryPerPage;
  
  const currentSubCategory =
    adminSubCaterory.subCategory &&
    adminSubCaterory.subCategory.slice(
      indexOfFirstSubCategory,
      indexOfLastSubCategory
    );
  
  const totalSubCategories =
    adminSubCaterory.subCategory && adminSubCaterory.subCategory.length;
  
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
           Sub Category
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
                <Link to="/adminSubCategoryAdd">
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
                  <th>Sub Categoty Code</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {currentSubCategory &&
            currentSubCategory.map((subCategory, index) => (
                  <tr key={subCategory.id}>
                    <th>{index + 1}</th>
                    <td>{subCategory.categoryId}</td>
                    <td>{subCategory.subCategoryName}</td>
                    <td>{subCategory.subCategoryCode}</td>
                    <td>{subCategory.description}</td>
                    <td className="w-1/4 flex justify-center py-2">
                      <div className="flex gap-2">
                        {/* Edit button  */}
                        <Link to={`/adminSubCategoryEdit/${subCategory.id}`}>
                          <button className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white">
                            Edit
                          </button>
                        </Link>
                        {/* Delete button   */}
                        <button
                          onClick={() => handleDelete(subCategory.id)}
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
            {/* pagination section ------------- */}
            <div className="pagination my-10 flex justify-center">
    {totalSubCategories &&
      Array.from(
        { length: Math.ceil(totalSubCategories / subCategoryPerPage) },
        (_, index) => (
          <button
            key={index}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "bg-gray-800 text-white" : "bg-white"
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

export default AdminSubCategory;

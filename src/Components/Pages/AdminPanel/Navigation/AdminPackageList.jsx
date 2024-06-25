import { useState } from "react";
import SearchPanel from "../Dashboard/SearchPanel/SearchPanel";
import { useEffect } from "react";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../Layout/Loading";

const AdminPackageList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState({ packageItem: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const packageItemPerPage = 20;

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
      // get packageItem data ---------------
      setLoading(true);
      axios
        .get(`https://backend.ap.loclx.io/api/package-list`, {
          headers: headers,
        })
        .then((res) => {
          setPackages({ packageItem: res.data.packages });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);
  console.log(packages);

  // delete section----------------
  const handleDelete = (packageId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      accept: "application/json",
      Authorization: "Bearer " + user.token,
    };

    axios
      .delete(`https://backend.ap.loclx.io/api/package-delete/${packageId}`, {
        headers: headers,
      })
      .then((res) => {
        setPackages((prevpackages) =>
          prevpackages.filter((packageItem) => packageItem.id !== packageId)
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting packages",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };
  // pagination section -----------
  const indexOfLastPackageItem = currentPage * packageItemPerPage;
  const indexOfFirstPackageItem = indexOfLastPackageItem - packageItemPerPage;

  const currentPackageItem =
    packages.packageItem &&
    packages.packageItem.slice(indexOfFirstPackageItem, indexOfLastPackageItem);

  const totalPackageItems = packages.packageItem && packages.packageItem.length;

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
        <div className="mt-24 w-full ">
          <h1 className="text-3xl flex justify-center text-black uppercase">
            Package List
          </h1>
          <hr className="mt-1 border border-black mb-10" />
          {/* table section  */}
          {!loading && (
            <div className="overflow-x-auto text-black">
              <div className="flex justify-between ms-2 me-2">
                <div>{/* "" */}</div>
                {/* add button  */}
                <div>
                  <Link to="/adminPackageAdd">
                    <button className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white">
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
                    <th>Package Name</th>
                    <th>items</th>
                    <th>Number Of People</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPackageItem &&
                    currentPackageItem.map((packageItem, index) => (
                      <tr key={packageItem.id}>
                        <th>{index + 1}</th>
                        <td>{packageItem.packageName}</td>
                        {/* <td>{packageItem.packageItems.join(",")}</td> */}
                        <td>
                          {Array.isArray(packageItem.foodItems)
                            ? packageItem.foodItems.join(",")
                            : ""}
                        </td>
                        <td>{packageItem.numOfPeople}</td>
                        <td>{packageItem.price}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            {/* Edit button  */}
                            <Link to={`/adminPackageEdit/${packageItem.id}`}>
                              <button className="btn-xs bg-green-500 rounded-lg font-semibold uppercase hover:bg-green-800 hover:text-white">
                                Edit
                              </button>
                            </Link>
                            {/* Delete button   */}
                            <button
                              onClick={() => handleDelete(packageItem.id)}
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
                {totalPackageItems &&
                  Array.from(
                    {
                      length: Math.ceil(totalPackageItems / packageItemPerPage),
                    },
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
            </div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default AdminPackageList;

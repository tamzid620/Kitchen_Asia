import axios from "axios";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const RatingModal = ({ closeModal, id }) => {
  const [review, setReview] = useState(0);

  const reviewChanged = (newReview) => {
    setReview(newReview);
  };

  const handleSubmit = async () => {
    axios
      .post("https://backend.ap.loclx.io/api/add-review", {
        review,
        id,
      })
      .then((res) => {
        if (res.data.status === "201") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: true,
          });
        }
        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[500px] h-[250px] bg-black text-white p-5 rounded">
        <h1
          style={{ fontFamily: "Montserrat, sans-serif " }}
          className=" text-2xl font-bold mb-4 text-center"
        >
          Order Review
        </h1>
        {/* hidden input field ----- */}
        <div className="flex justify-center">
          <input className="text-black" name="id" value={id} />
        </div>

        {/* --------------review option -------------- */}
        <div className="flex justify-center mb-4">
          <ReactStars
            name="review"
            count={5}
            onChange={reviewChanged}
            size={40}
            activeColor="#f9941e"
            value={review}
          />
        </div>
        <div className="flex justify-center gap-2 mt-10">
          <button
            onClick={handleSubmit}
            className=" mt-4 border-2 border-[#f9941e] text-sm text-[#f9941e] hover:text-white hover:border-[#bc161c] font-semibold px-1 py-1 rounded"
          >
            Submit
          </button>
          <button
            className="mt-4 border-2 rounded border-[#f9941e] text-[#f9941e] hover:text-white hover:border-[#bc161c] font-semibold px-1.5 py-1"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;

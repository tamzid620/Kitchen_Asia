import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const RatingModal = ({ closeModal }) => {
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };

  const handleSubmit = async () => {
    try {
      // Replace the URL with your server's endpoint
      const res = await fetch(
        "https://restaurantbackend.softplatoon.com/api/ratings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating }),
        }
      );

      if (res.ok) {
        console.log("Rating submitted successfully!");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Rating submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        closeModal();
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting Teacher",
          text: "Failed to submit rating",
          showConfirmButton: true,
        });
        console.error("Failed to submit rating");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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

        <div className="flex justify-center mb-4">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            activeColor="#f9941e"
            value={rating}
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

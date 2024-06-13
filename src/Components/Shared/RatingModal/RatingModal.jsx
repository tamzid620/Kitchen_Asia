// eslint-disable-next-line react/prop-types
const RatingModal = ({ closeModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[500px] h-[300px] bg-white text-black p-5 rounded">
        <h1 className="text-2xl font-bold mb-4">Order Review</h1>
        {/* Add your rating form or content here */}
        <button
          className=" mt-4 border-4 border-yellow-500 bg-yellow-100 hover:bg-yellow-500 font-semibold px-4 py-2 rounded uppercase"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RatingModal;

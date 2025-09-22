import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchSingleProductByIdQuery } from "../../redux/features/products/productsApi";

const PostReview = ({ isOpen, handleCloseModal }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchSingleProductByIdQuery(id, { skip: id });
  const handleRating = (value) => {
    setRating(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Rating: ${rating}, Comment: ${comment}`);
  };
  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-bold mb-4">Post a Review</h2>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="cursor-pointer text-yellow-500 text-xl">
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>

        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          name="comment"
          id="comment"
          rows="4"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          placeholder="Write your comment here..."
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
          >
            <i className="ri-close-line"></i> Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2"
          >
            <i className="ri-check-line"></i> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;

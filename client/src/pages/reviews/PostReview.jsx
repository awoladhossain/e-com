import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleProductByIdQuery } from "../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../redux/features/reviews/reviewsApi";

const PostReview = ({ isOpen, handleCloseModal }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const { refetch } = useFetchSingleProductByIdQuery(id, {
    skip: !id || id === undefined,
  });
  const handleRating = (value) => {
    setRating(value);
  };
  const [postReview] = usePostReviewMutation();
  // console.log(postReview);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Guard: Don't proceed if ID invalid
    if (!id || id === "undefined") {
      console.error("Invalid product ID. Cannot post review.");
      // Optionally show UI error: alert('Invalid product. Please try again.');
      handleCloseModal();
      return;
    }
    const newReview = {
      comment: comment,
      rating: rating,
      userId: user?.id,
      productId: id,
    };
    console.log(newReview);
    if (!user) {
      alert("You must be logged in to post a review.");
      handleCloseModal();
      navigate("/login");
      return;
    }
    try {
      const response = await postReview(newReview).unwrap();
      console.log("Review posted successfully:", response);
      setRating(0);
      setComment("");
      refetch();
    } catch (error) {
      console.error("Error posting review:", error);
    }
    handleCloseModal();
  };
  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } bg-black/90 flex items-center justify-center z-40 px-2`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-bold mb-4">Post a Review</h2>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-xl"
            >
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

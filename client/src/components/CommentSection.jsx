import "../styles/CommentSection.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function CommentSection({ blogId }) {

  const userId = localStorage.getItem("userId");

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {

      const response = await API.get(`/comments/${blogId}`);

      setComments(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
        try {

        await API.post(`/comments/${blogId}`, {
            text,
        });

        setText("");

        fetchComments();

        } catch (error) {
        console.log(error);
        }

    
    };

    const deleteComment = async (id) => {
        try {

            await API.delete(`/comments/${id}`);

            fetchComments();

        } catch (error) {

            console.log(error);
            alert("Error deleting comment");

        }
    };

  return (
        <div className="comment-section">

            <h4>Comments</h4>

            {comments.length === 0 ? (
            <p>No comments yet.</p>
            ) : (
            comments.map((comment) => (
                <div className="comment" key={comment._id}>

                    <strong>{comment.user?.name}</strong>

                    <p>{comment.text}</p>

                    <button
                        onClick={() => deleteComment(comment._id)}
                    >
                        Delete
                    </button>

                </div>
            ))
            )}

            <div className="comment-input">
            <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={addComment}>
                Add
            </button>
            </div>

        </div>
    );
}

export default CommentSection;
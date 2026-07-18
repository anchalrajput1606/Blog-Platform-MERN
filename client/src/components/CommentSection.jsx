import { useEffect, useState } from "react";
import API from "../services/api";

function CommentSection({ blogId }) {

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

  return (
    <div>

      <h4>Comments</h4>

      {comments.map((comment) => (

        <div key={comment._id}>

          <b>{comment.user?.name}</b>

          <p>{comment.text}</p>

        </div>

      ))}

      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addComment}>
        Add Comment
      </button>

    </div>
  );
}

export default CommentSection;
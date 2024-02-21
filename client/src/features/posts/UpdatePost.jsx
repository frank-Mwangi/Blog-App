import { useState } from "react";
import { useUpdatePostMutation } from "./postsApi";

const UpdatePost = ({ onClose, post }) => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const [editedPost, setEditedPost] = useState({
    ...post,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => {
      return { ...prevPost, [name]: value };
    });
  };
  // console.log(" post (in update post ) -> " + JSON.stringify(post));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value === "" || e.target[1].value === "") {
      alert("Please fill in both fields");
    } else {
      updatePost({
        ...editedPost,
      });
      e.target.reset();
    }
  };
  return (
    <section>
      <h2> Edit your Post </h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-input" htmlFor="postTitle">
          Title:
          <input
            type="text"
            id="postTitle"
            name="post_title"
            value={editedPost.post_title}
            onChange={handleChange}
          />
        </label>
        <label className="form-input" htmlFor="postContent">
          Content:
          <textarea
            id="postContent"
            name="post_content"
            value={editedPost.post_content}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{isLoading ? "Loading" : "Save Post"}</button>
        <button onClick={onClose}>Close Modal</button>
      </form>
    </section>
  );
};

export default UpdatePost;

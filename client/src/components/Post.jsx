import { useState } from "react";
import { createPortal } from "react-dom";
// import { useParams } from "react-router-dom";

import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../features/posts/postsApi";
import UpdatePost from "../features/posts/UpdatePost";

const Post = ({ post }) => {
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPostData, setUpdatedPostData] = useState({
    post_title: post.post_title,
    post_content: post.post_content,
  });

  // const { id } = useParams();

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setUpdatedPostData({
      ...updatedPostData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    updatePost({ id: post.id, ...updatedPostData });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  return (
    <article className="card" key={post._id}>
      <h3>{post.post_title}</h3>
      <p>{post.post_content.substring(0, 100)}</p>
      <p>Author: {post.author_id}</p>
      <button onClick={() => setIsEditing(true)} disabled={isEditing}>
        Update
      </button>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {isEditing &&
        createPortal(
          <UpdatePost post={post} onClose={() => setIsEditing(false)} />,
          document.body
        )}
    </article>
  );
};

/* {isEditing && (
<EditPostModal
  post={post}
  updatedPostData={updatedPostData}
  handleEdit={handleEdit}
  handleUpdate={handleUpdate}
  closeModal={() => setIsEditing(false)}
/>
)} */

// const EditPostModal = ({
//   post,
//   updatedPostData,
//   handleEdit,
//   handleUpdate,
//   closeModal,
// }) => {
//   return createPortal(
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Edit Post</h2>
//         <input
//           type="text"
//           name="post_title"
//           value={updatedPostData.post_title}
//           onChange={handleEdit}
//         />
//         <textarea
//           name="post_content"
//           value={updatedPostData.post_content}
//           onChange={handleEdit}
//         />
//         <button onClick={handleUpdate}>Update</button>
//         <button onClick={closeModal}>Cancel</button>
//       </div>
//     </div>,
//     document.getElementById("modal-root")
//   );
// };
export default Post;

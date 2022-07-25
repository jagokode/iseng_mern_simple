import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const api_url = "http://localhost:5000/api/posts";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [show, setShow] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatePost((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleShow = () => setShow(!show);

  const fetchAllPosts = async () => {
    const response = await axios.get(`${api_url}`);
    console.log(response.data);
    if (response.status !== 200) console.log(response.error);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const editPost = (id, title, description) => {
    setUpdatePost((prevState) => {
      return {
        ...prevState,
        id,
        title,
        description,
      };
    });
    handleShow();
  };

  const saveEditPost = async () => {
    const response = await axios.patch(
      `${api_url}/${updatePost.id}`,
      updatePost
    );
    if (response.status !== 200) console.log(response.error);
    handleShow();
    window.location.reload();
  };

  const removePost = async (id) => {
    const response = await axios.delete(`/${id}`);
    if (response.status !== 200) console.log(response.error);
    window.location.reload();
  };

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1>Post</h1>
      <Button
        variant="outline-dark"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Title"
            name="title"
            value={updatePost.title ? updatePost.title : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleInputChange}
          />
          <Form.Control
            placeholder="description"
            name="description"
            value={updatePost.description ? updatePost.description : ""}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={saveEditPost}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {posts ? (
        <>
          {posts.map((post) => {
            return (
              <div
                style={{
                  marginBottom: "1rem",
                  border: "solid ligthgray 1px",
                  borderRadius: "8px",
                }}
                key={post._id}
              >
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "1rem",
                  }}
                >
                  <Button
                    variant="outline-info"
                    onClick={() =>
                      editPost(post._id, post.title, post.description)
                    }
                    style={{ width: "100%", marginRight: "1rem" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ widht: "100%" }}
                    onClick={() => removePost(post._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Posts;

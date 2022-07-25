import { Form, Button } from "react-bootstrap";
import Alert from "./Alert";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api_url = "http://localhost:5000/api/posts";

const AddPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [alert, setAlert] = useState(false);

  const handleAlert = () => setAlert(!alert);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmitPost = async (e) => {
    e.preventDefault();

    if (post.title === "" || post.description === "") {
      setAlert(!alert);
      return;
    }

    const response = await axios.post(`${api_url}`, post);
    console.log(response.data);
    if (response.status !== 201) {
      console.log(response.error);
    }

    navigate("/posts");
  };

  return (
    <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      <h1>Add Post</h1>
      <Form>
        <Form.Control
          placeholder="Title"
          name="title"
          style={{ marginBottom: "1rem" }}
          value={post.title}
          onChange={handleInputChange}
        />
        <Form.Control
          placeholder="Description"
          name="description"
          style={{ marginBottom: "1rem" }}
          value={post.description}
          onChange={handleInputChange}
        />
        <Button
          variant="outline-success"
          style={{ width: "100%", marginBottom: "1rem" }}
          onClick={onSubmitPost}
        >
          Submit
        </Button>
      </Form>
      <Button
        variant="outline-success"
        sytle={{ width: "100%" }}
        onClick={() => navigate("/")}
      >
        Back Home
      </Button>
      {alert && <Alert handleAlert={handleAlert} />}
    </div>
  );
};

export default AddPost;

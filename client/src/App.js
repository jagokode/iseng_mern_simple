import "./App.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Home</h1>
      <Button
        variant="outline-success"
        style={{ width: "90%", marginBottom: "1rem" }}
        onClick={() => navigate("/add")}
      >
        Add Post
      </Button>
      <Button
        variant="outline-success"
        style={{ width: "90%" }}
        onClick={() => navigate("/posts")}
      >
        Posts
      </Button>
    </div>
  );
}

export default App;

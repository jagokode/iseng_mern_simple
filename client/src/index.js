import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from "./components/AddPost";
import Posts from "./components/Posts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

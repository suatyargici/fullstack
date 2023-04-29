import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [content, setContent] = useState("");
  const 

  const addPost = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("http://localhost:5000/api/post", {
        userId: user._id,
        content,
      })
      .then((res) => {
        alert("Post başarıyla eklendi");
        setContent("");
      })
      .catch((err) => {
        alert("Post eklenirken bir hata oluştu");
      });
  };


  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={addPost}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ne düşünüyorsunuz..."
                ></textarea>
              </div>
              <div className="form-group mt-2" style={{ float: "right" }}>
                <button className="btn btn-primary">Share</button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="card mt-2">
          <div className="card-body">
            <h5>suat yargıcı 29.04.2023 21:51</h5>
            <p>sdfsdfsdfdsfsdff</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

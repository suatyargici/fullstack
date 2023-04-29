import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Home = () => {
  const [content, setContent] = useState("");

  const getPost = () => {
    return axios.get("http://localhost:5000/api/post");
  };

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

  const { data } = useQuery("userPost", getPost);
  return (
    <div className="flex justify-center mt-10">
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
        {data?.data?.result?.map((post,index) => (
          <div className="card mt-2" key={post?._id}>
            <div className="card-body">
              <div className="flex justify-between items-center">
              <img src={`http://localhost:5000/` + post.users[0].avatar.path} alt="" className="w-12 h-12 rounded-full object-fill" />
              <h5 className="text-lg font-medium">{post.users[0].name} - {post.createdDate}</h5>
              </div>
          
              <p className="text-lg font-medium">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

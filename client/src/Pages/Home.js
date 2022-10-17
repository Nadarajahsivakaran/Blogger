import React, { useEffect } from "react";
import { useState } from "react";
import AddPost from "../Component/AddPost";
import Post from "../Component/Post";

const Home = () => {
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);

  async function getDatas() {
    const res = await fetch(
      "http://localhost:4000/post/viewPost"
    ).then((response) => response.json());
    setData(res);
  }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      <AddPost getDatas={getDatas} editData={editData} />
      <Post data={data} getDatas={getDatas} seteditData={seteditData} />
    </div>
  );
};

export default Home;

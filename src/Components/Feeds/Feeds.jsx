import "./feeds.css";

// Components...............
import Feed from "./Feed";

// Firebase Data.................
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";
import { useEffect, useState } from "react";

const Feeds = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const data = [];
      const postCollection = collection(db, "posts");
      try {
        const querySnapshot = await getDocs(postCollection);
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setPostData(data); 
        console.log("Post data:", postData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPostData();
  }, []);
  

  return (
    <div className="feeds">
      {postData.map((data) => (
        <Feed data={data} key={data.uid} />
      ))}
    </div>
  );
};

export default Feeds;

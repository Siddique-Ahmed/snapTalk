import "./feeds.css";
import Feed from "./Feed";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";

const Feeds = () => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const unsubscribePosts = onSnapshot(collection(db, "posts"), (snapshot) => {
      const dataArr = snapshot.docs.map((doc) => doc.data());
      setPostsData(dataArr);
    });

    return () => {
      unsubscribePosts();
    };
  }, []);

  return (
    <div className="feeds">
      <Feed postData={postsData} />
    </div>
  );
};

export default Feeds;

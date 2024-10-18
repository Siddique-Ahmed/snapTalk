import "./feeds.css";
import Feed from "./Feed";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";

const Feeds = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const docRef = collection(db, "posts");

    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ id: doc.id, ...doc.data() }); 
      });
      setPostData(dataArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="feeds">
      <Feed postData={postData} />
    </div>
  );
};

export default Feeds;

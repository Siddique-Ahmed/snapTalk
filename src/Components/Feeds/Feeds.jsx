import "./feeds.css";
import Feed from "./Feed";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";

const Feeds = () => {
  const [postData, setPostData] = useState([]);

  // current user profile //
  useEffect(() => {
    const fetchingData = async () => {
      const docRef = collection(db, "posts");
      const querySnapShot =  await getDocs(docRef);
      const dataArr = [];
    querySnapShot.forEach((data)=>{
      dataArr.push(data.data());
      setPostData(dataArr)
    })
    };
    fetchingData();
  }, []);

  return (
    <div className="feeds">
      <Feed postData={postData} />
    </div>
  );
};

export default Feeds;

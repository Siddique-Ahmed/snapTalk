import "./profileFeed.css";
import ProfileFeed from "./ProfileFeed";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const ProfileFeeds = () => {
  const [data, setData] = useState();
  const userID = auth.currentUser.uid;

  useEffect(() => {
    //Get posts Data From Firebase //
    const getUserDataFromFirebase = async () => {
      const docRef = collection(db, "posts");
      const q = query(docRef,where("uid" , "==", userID));
      const dataArr = [];
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((data)=>{
        dataArr.push(data.data());
      })
      setData(dataArr)
    };
    getUserDataFromFirebase();
  }, []);

  return (
    <div className="feeds">
      <ProfileFeed postData={data}/>
    </div>
  );
};

export default ProfileFeeds;

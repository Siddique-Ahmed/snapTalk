import "./profileFeed.css";
import ProfileFeed from "./ProfileFeed";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig/Firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileFeeds = () => {
  const [data, setData] = useState();
  const userID = auth.currentUser.uid;

  useEffect(() => {
    //Get USer Data From Firebase //
    const getUserDataFromFirebase = async () => {
      const docRef = doc(db, "users", userID);
      const dataArr = [];
      await getDoc(docRef).then((data) => {
        dataArr.push(data.data());
        setData(dataArr);
      });
    };

    getUserDataFromFirebase();
  }, []);


  return (
    <div className="feeds">
      <ProfileFeed user={data} />
    </div>
  );
};

export default ProfileFeeds;

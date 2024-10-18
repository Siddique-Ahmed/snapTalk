import "./searchuser.css";
import logo from "../../../public/img/user-dp.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/Firebase";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState([]);
  const currentUserId = auth.currentUser.uid;

  const handleUserSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value.trim();
    if (inputValue) {
      setSearch(inputValue);
    }
  };

  useEffect(() => {
    const getDataForUser = async () => {
      if (search) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", search));
        const querySnapshot = await getDocs(q);

        const userArr = [];
        querySnapshot.forEach((data) => {
          const userData = data.data();
          if (userData.uid !== currentUserId) {
            userArr.push(userData);
          }
        });

        setUserSearch(userArr);
      }
    };
    getDataForUser();
  }, [search]);

  return (
    <main className="user-content">
      <div className="searchbox">
        <form onSubmit={handleUserSearch}>
          <input type="search" placeholder="Find Friend" />
          <button type="submit">Search</button>
        </form>
      </div>
      {userSearch.length > 0 ? (
        userSearch.map((data, ind) => (
          <div key={ind} className="displayuser">
            <Link to={`/otherprofile/${data.uid}`}>
              <div className="users">
                <img src={data.profileImg ? data.profileImg : logo} alt="" />
                <div>
                  <h4>{data.fullName}</h4>
                  <p>{data.bio}</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="no-friends">No friends found</p>
      )}
    </main>
  );
};

export default SearchUser;

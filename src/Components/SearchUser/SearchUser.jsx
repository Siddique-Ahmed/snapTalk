import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig/Firebase";
import "./searchuser.css";
import logo from "../../../public/img/user-dp.jpeg";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get current logged-in user's UID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle search and fetch from Firebase
  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") return;

    setLoading(true);
    try {
      const q = query(
        collection(db, "users"),
        where("username", ">=", searchQuery),
        where("username", "<=", searchQuery + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUserId);

      setFilteredUsers(users);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }

    setLoading(false);
  };

  return (
    <main className="user-content">
      <div className="searchbox">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Find Friend"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="displayuser">
        {loading && <p>Loading...</p>}
        {!loading && filteredUsers.length === 0 && searchQuery && (
          <p>No friends found</p>
        )}

        {!loading &&
          filteredUsers.length > 0 &&
          filteredUsers.map((user, index) => (
            <Link to={`/profile/${user.userId}`}>
              <div className="users" key={index}>
                <img src={user.userProfile || logo} alt={user.username} />
                <div>
                  <h4>{user.username}</h4>
                  <p>{user.bio || ""}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
};

export default SearchUser;

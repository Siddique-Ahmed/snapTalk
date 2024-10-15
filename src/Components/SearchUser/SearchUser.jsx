import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig/Firebase";
import "./searchuser.css";
import logo from "../../../public/img/user-dp.jpeg";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const SearchUser = () => {
  return (
    <main className="user-content">
      <div className="searchbox">
        <form>
          <input
            type="search"
            placeholder="Find Friend"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="displayuser">
          <p>No friends found</p>

            <Link to={`/profile/id`}>
              <div className="users">
                <img src={logo} alt="" />
                <div>
                  <h4>siddique</h4>
                  <p>hello</p>
                </div>
              </div>
            </Link>
      </div>
    </main>
  );
};

export default SearchUser;

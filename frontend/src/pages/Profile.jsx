import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState(); // Start with null to indicate data isn't loaded
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/getuser", {
          headers,
        });
        setProfile(response.data); // Update the profile state with fetched data
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!profile ? (
        // Show loader if profile data is not loaded
        <div className="w-full h-[100%] flex items-center justify-center ">
          <Loader />
        </div>
      ) : (
        // Once profile is loaded, show Sidebar and Outlet
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen ">
            <Sidebar data={profile} />
            <MobileNav/>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

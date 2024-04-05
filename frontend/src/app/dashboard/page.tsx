"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const { data: user } = useSWR("/auth/users/me", fetcher);

  const { logout, removeTokens } = AuthActions();
  console.log(user);
  
  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };
  
  // State for displaying a success message
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type: "", // either 'add' or 'update'
  });
  
  // Check if the user is an admin or a lecteur and display the appropriate dashboard page accordingly
  if (user?.type_utilisateur == "lecteur") {
    console.log("lecteur");
  
    return (
      <>
        <Header />
      
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h1 className="text-2xl font-bold mb-4 text-black">Hi, {user?.username}!</h1>
            <p className="mb-4 text-black">Your account details:</p>
            <ul className="mb-4 text-black">
              <li>Username: {user?.username}</li>
              <li>Email: {user?.email}</li>
              <li>First name: {user?.type_utilisateur}</li>
            </ul>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </>
    );
  }
  else if (user?.type_utilisateur == "bibliothecaire") {
    console.log("bibliothecaire");
    return (
      <>
        <Header />
      
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h1 className="text-2xl font-bold mb-4 text-black">Hi, {user?.username}!</h1>
            <p className="mb-4 text-black">Your account details:</p>
            <ul className="mb-4 text-black">
              <li>Username: {user?.username}</li>
              <li>Email: {user?.email}</li>
              <li>First name: {user?.type_utilisateur}</li>
            </ul>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
            <button className="add-button" onClick={() => router.push("/add")}>
              Add
            </button>
            {displaySuccessMessage.show && (
              <p className="success-message">
                {displaySuccessMessage.type === "add" ? "Added a" : "Modified a"} book
                item.
              </p>
            )}
          </div>
        </div>
      </>
  );
  }
}
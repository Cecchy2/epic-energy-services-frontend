import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/utenti/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="text-center mt-5">
      <h1 className="mb-5">Pagina Utente</h1>
      <img src={user.avatar} alt={`${user.nome} ${user.cognome}`} className="mt-5 mb-3" />
      <h2 className="mb-3">
        {user.nome} {user.cognome}
      </h2>
      <h3>{user.username}</h3>
    </div>
  );
};

export default UserPage;

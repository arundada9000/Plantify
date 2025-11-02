import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

export const useFetchUsers = () => {

     const { user, logout } = useAuth();


     

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/69068736a6dd5098d6ce5f47`
        ); // Your backend API
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        console.log(data)
        // Store in localStorage
        localStorage.setItem("users", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
};

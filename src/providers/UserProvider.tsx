// import { createContext, useContext, useEffect, useState } from "react";

// type UserContextType = {
//   email: string | undefined;
//   role: string | undefined;
// };

// const UserContext = createContext<UserContextType>({} as UserContextType);

// const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<UserContextType | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     try {
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         if (parsedUser.email && parsedUser.role) {
//           setUser(parsedUser);
//         }
//       }
//     } catch (error) {
//       console.error("Error parsing user data from localStorage:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <UserContext.Provider value={{ email: user?.email, role: user?.role }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const userUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// export default UserProvider;

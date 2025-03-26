import { Divide } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
type UserContextType = {
  email: string;
  role: string;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType | undefined>(undefined);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user || "{}"));
  }, []);
  if (!window) {
    return <div>hello</div>;
  }
  return (
    <UserContext.Provider value={{ email: user?.email, role: user?.role }}>
      {user ? children : <div>...loading</div>}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

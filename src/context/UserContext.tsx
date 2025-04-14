import { UserContextType } from "../type";
import { createContext, ReactNode } from "react";

const user = {
  id: 1,
  firstName: "Ken",
  lastName: "Sze",
  thumbnail: "",
  groceryLists: JSON.parse(localStorage.getItem("groceryLists") ?? "[]"),
};

const UserContext = createContext<UserContextType>({
  user: user,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

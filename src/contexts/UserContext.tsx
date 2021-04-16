import { User } from "firebase";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "services";

export const UserContext = createContext<User | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(u => setUser(u ?? undefined));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

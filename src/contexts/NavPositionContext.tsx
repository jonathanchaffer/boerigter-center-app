import React, { createContext, useState } from "react";

interface NavPositionContextValues {
  navPosition: "top" | "bottom";
  toggleNavPosition: () => void;
}

const defaultValues: NavPositionContextValues = {
  navPosition: "top",
  toggleNavPosition: () => {},
};

export const NavPositionContext = createContext<NavPositionContextValues>(defaultValues);

interface NavPositionProviderProps {
  children: React.ReactNode;
}

export function NavPositionProvider({ children }: NavPositionProviderProps): JSX.Element {
  const [navPosition, setNavPosition] = useState<"top" | "bottom">("top");

  function toggleNavPosition() {
    if (navPosition === "top") setNavPosition("bottom");
    else setNavPosition("top");
  }

  return (
    <NavPositionContext.Provider value={{ navPosition, toggleNavPosition }}>
      {children}
    </NavPositionContext.Provider>
  );
}

import { HandshakeCareer } from "models";
import React, { createContext, useEffect, useState } from "react";
import { fetchHandshakeCareers } from "services";

interface HandshakeCareerContextValues {
  careers: HandshakeCareer[];
  isLoading: boolean;
}

export const HandshakeCareersContext = createContext<HandshakeCareerContextValues>({
  careers: [],
  isLoading: false,
});

interface HandshakeCareersProviderProps {
  children: React.ReactNode;
  numPages: number;
}

export function HandshakeCareersProvider({
  children,
  numPages,
}: HandshakeCareersProviderProps): JSX.Element {
  const [careers, setCareers] = useState<HandshakeCareer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData(page: number) {
      return fetchHandshakeCareers(page);
    }

    setIsLoading(true);
    for (let i = 0; i < numPages; i++) {
      setIsLoading(true);
      fetchData(i)
        .then(data => setCareers(c => [...c, ...data]))
        .finally(() => {
          if (i === numPages - 1) setIsLoading(false);
        });
    }
  }, [numPages]);

  return (
    <HandshakeCareersContext.Provider value={{ careers, isLoading }}>
      {children}
    </HandshakeCareersContext.Provider>
  );
}

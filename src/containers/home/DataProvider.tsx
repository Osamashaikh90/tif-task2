import React, { createContext, useContext, useState } from "react";

const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};

type State = typeof initialValues;
type UpdateStateFunction = (updates: Partial<State>) => void;

const DataContext = createContext<{
  state: State;
  updateState: UpdateStateFunction;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialValues);

  const updateState: UpdateStateFunction = (updates) => {
    setState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  return (
    <DataContext.Provider value={{ state, updateState }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  // return useContext(DataContext);
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;

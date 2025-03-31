import { ReactNode, Dispatch, SetStateAction } from "react";

export interface Tab {
  icon: string;
  page: ReactNode;
}

export interface Tabs {
  [Key: string]: Tab;
}

export interface TabContextType {
  tabs: Tabs;
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

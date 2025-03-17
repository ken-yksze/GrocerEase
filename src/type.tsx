import { ReactElement } from "react";

export interface Tab {
  icon: ReactElement;
  page: ReactElement;
}

export interface Tabs {
  [Key: string]: Tab;
}

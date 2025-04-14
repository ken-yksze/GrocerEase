import { Dispatch, SetStateAction, ReactElement } from "react";

export interface Tab {
  icon: string;
  page: ReactElement;
}

export interface Tabs {
  [Key: string]: Tab;
}

export interface TabContextType {
  tabs: Tabs;
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  currentPage: ReactElement;
  setCurrentPage: Dispatch<SetStateAction<ReactElement>>;
  heading: ReactElement;
  setHeading: Dispatch<SetStateAction<ReactElement>>;
}

export enum DiscountUnit {
  DOLLAR = "$",
  PERCENTAGE = "%",
}

export enum PriceType {
  QUANTITY = "quantity",
  WEIGHT = "weight",
}

export interface Store {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Discount {
  value: number;
  unit: DiscountUnit;
}

export interface Price {
  id: number;
  value: number;
  discount: Discount | null;
  store: Store;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Offer {
  id: number;
  category: Category;
  discount: Discount;
  endDate: Date;
  image: string;
}

export interface Grocery {
  id: number;
  name: string;
  fullName: string;
  image: string;
  category: Category;
  prices: Price[];
  priceType: PriceType;
  weight: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  healthScore: number;
  healthFactors: string[];
}

export interface GroceryListItem {
  grocery: Grocery;
  quantity: number;
}

export interface GroceryList {
  name: string;
  items: GroceryListItem[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  thumbnail: string;
  groceryLists: GroceryList[];
}

export interface UserContextType {
  user: User;
}

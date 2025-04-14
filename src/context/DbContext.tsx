import data from "../data.json";
import {
  Store,
  Category,
  Offer,
  Grocery,
  DbContextType,
  Discount,
  DiscountUnit,
  Price,
  PriceType,
} from "../type";
import { createContext, ReactNode, useEffect } from "react";

const user = {
  id: 1,
  firstName: "User",
  lastName: "",
  thumbnail: "thumbnail.png",
  groceryLists: JSON.parse(localStorage.getItem("groceryLists") ?? "[]"),
};

const stores: Store[] = data.stores;
const categories: Category[] = data.categories;

const offers: Offer[] = data.offers.map((offer): Offer => {
  const category: Category = data.categories.find(
    (c) => c.id === offer.categoryId
  ) ?? {
    id: 0,
    name: "",
    image: "",
  };

  const discount: Discount = {
    value: offer.discount.value,
    unit: offer.discount.unit as DiscountUnit,
  };

  return {
    id: offer.id,
    category: category,
    discount: discount,
    endDate: new Date(offer.endDate),
    image: offer.image,
  };
});

const groceries: Grocery[] = data.groceries.map((grocery): Grocery => {
  const category: Category = data.categories.find(
    (c) => c.id === grocery.categoryId
  ) ?? {
    id: 0,
    name: "",
    image: "",
  };

  const prices: Price[] = data.prices
    .filter((price) => price.groceryId === grocery.id)
    .map((price): Price => {
      const discount: Discount | null =
        price.discount === null
          ? null
          : {
              value: price.discount["value"],
              unit: price.discount["unit"] as DiscountUnit,
            };

      const store: Store = data.stores.find(
        (store) => store.id === price.storeId
      ) ?? {
        id: 0,
        name: "",
        address: "",
        lat: 0,
        lng: 0,
      };

      return {
        id: price.id,
        value: price.value,
        discount: discount,
        store: store,
      };
    });

  return {
    id: grocery.id,
    name: grocery.name,
    fullName: grocery.fullName,
    image: grocery.image,
    category: category,
    prices: prices,
    priceType: grocery.priceType as PriceType,
    weight: grocery.weight,
    calories: grocery.calories,
    protein: grocery.protein,
    carbohydrates: grocery.carbohydrates,
    fat: grocery.fat,
    healthScore: grocery.healthScore,
    healthFactors: grocery.healthFactors,
  };
});

const DbContext = createContext<DbContextType>({
  user: user,
  stores: stores,
  categories: categories,
  offers: offers,
  groceries: groceries,
});

const DbContextProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    console.log("User:");
    console.log(user);
    console.log("Stores:");
    stores.forEach((store) => console.log(store));
    console.log("Categories:");
    categories.forEach((category) => console.log(category));
    console.log("Offers:");
    offers.forEach((offer) => console.log(offer));
    console.log("Groceries:");
    groceries.forEach((grocery) => console.log(grocery));
  }, []);

  return (
    <DbContext.Provider value={{ user, stores, categories, offers, groceries }}>
      {children}
    </DbContext.Provider>
  );
};

export { DbContext, DbContextProvider };

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
  GroceryListItem,
} from "../type";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import { TabContext } from "./TabContext";

const getDefaultIfNaN = (value: number, defaultValue: number) => {
  return isNaN(value) ? defaultValue : value;
};

const defaultUser = {
  id: 1,
  firstName: "User",
  lastName: "",
  thumbnail: "thumbnail.png",
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
        image: "",
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
  user: defaultUser,
  setUser: () => null,
  stores: stores,
  categories: categories,
  offers: offers,
  groceries: groceries,
  groceryList: [],
  addToGroceryList: () => null,
  removeFromGroceryList: () => null,
  newItems: 0,
  setNewItems: () => null,
});

const DbContextProvider = ({ children }: { children: ReactNode }) => {
  const { setMessage } = useContext(TabContext);
  const [groceryList, setGroceryList] = useState<GroceryListItem[]>(
    JSON.parse(localStorage.getItem("groceryList") ?? "[]")
  );

  const [newItems, setNewItems] = useState(
    getDefaultIfNaN(parseInt(localStorage.getItem("newItems") ?? "0"), 0)
  );

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(groceryList)]);

  useEffect(() => {
    localStorage.setItem("newItems", newItems.toString());
  }, [newItems]);

  const addToGroceryList = (grocery: Grocery, count: boolean = true) => {
    const index = groceryList.findIndex(
      (item) => item.grocery.id === grocery.id
    );

    if (index === -1) {
      grocery.prices.sort((a, b) => {
        const aFinalValue =
          a.discount === null
            ? a.value
            : a.discount.unit === DiscountUnit.DOLLAR
            ? a.value - a.discount.value
            : a.value * ((100 - a.discount.value) / 100);

        const bFinalValue =
          b.discount === null
            ? b.value
            : b.discount.unit === DiscountUnit.DOLLAR
            ? b.value - b.discount.value
            : b.value * ((100 - b.discount.value) / 100);

        return aFinalValue - bFinalValue;
      });

      setGroceryList([...groceryList, { grocery: grocery, quantity: 1 }]);
    } else {
      setGroceryList(
        groceryList.map((item, i) => {
          if (i === index) {
            item.quantity++;
          }

          return item;
        })
      );
    }

    setMessage("Added to List");

    if (count) {
      setNewItems(newItems + 1);
    }

    return null;
  };

  const removeFromGroceryList = (grocery: Grocery) => {
    const index = groceryList.findIndex(
      (item) => item.grocery.id === grocery.id
    );

    if (index === -1) return null;

    if (groceryList[index].quantity === 1) {
      setGroceryList(
        groceryList.filter((item) => item.grocery.id !== grocery.id)
      );
    } else {
      setGroceryList(
        groceryList.map((item, i) => {
          if (i === index) {
            item.quantity--;
          }

          return item;
        })
      );
    }

    return null;
  };

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") ?? JSON.stringify(defaultUser))
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user)]);

  return (
    <DbContext.Provider
      value={{
        user,
        setUser,
        stores,
        categories,
        offers,
        groceries,
        groceryList,
        addToGroceryList,
        removeFromGroceryList,
        newItems,
        setNewItems,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export { DbContext, DbContextProvider };

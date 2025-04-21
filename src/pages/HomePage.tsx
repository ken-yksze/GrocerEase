import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { TabContext } from "../context/TabContext";
import { DbContext } from "../context/DbContext";
import SearchPage from "./SearchPage";
import { Icon } from "@iconify/react";
import { DiscountUnit, Grocery } from "../type";
import ProductPage from "./ProductPage";

const HomePage = () => {
  const { setHeading, setCurrentPage } = useContext(TabContext);
  const { offers, groceries, categories, addToGroceryList } =
    useContext(DbContext);
  const [searchInput, setSearchInput] = useState("");

  groceries.forEach((grocery) =>
    grocery.prices.sort((a, b) => {
      const aDiscountPercent =
        a.discount === null
          ? 0
          : a.discount.unit === DiscountUnit.PERCENTAGE
          ? a.discount.value
          : (a.discount.value / a.value) * 100;

      const bDiscountPercent =
        b.discount === null
          ? 0
          : b.discount.unit === DiscountUnit.PERCENTAGE
          ? b.discount.value
          : (b.discount.value / b.value) * 100;

      return bDiscountPercent - aDiscountPercent;
    })
  );

  groceries.sort((a, b) => {
    const aDiscountPercent =
      a.prices[0].discount === null
        ? 0
        : a.prices[0].discount.unit === DiscountUnit.PERCENTAGE
        ? a.prices[0].discount.value
        : (a.prices[0].discount.value / a.prices[0].value) * 100;

    const bDiscountPercent =
      b.prices[0].discount === null
        ? 0
        : b.prices[0].discount.unit === DiscountUnit.PERCENTAGE
        ? b.prices[0].discount.value
        : (b.prices[0].discount.value / b.prices[0].value) * 100;

    return bDiscountPercent - aDiscountPercent;
  });

  useEffect(() => {
    const HomeHeading = () => {
      const { user } = useContext(DbContext);

      return (
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "0.5rem",
            }}
          >
            <Box sx={{ width: "3rem", height: "3rem" }}>
              <img width="100%" src={user.thumbnail} alt="Thumbnail" />
            </Box>
            <Typography sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
              Hello, {user.firstName}!
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "1rem", color: "#7F807E" }}>
            Lets order some food and have a delicious day
          </Typography>
        </Box>
      );
    };

    setHeading(<HomeHeading />);
  }, [setHeading]);

  const searchHandler = (search: string) => {
    if (search === "") return;
    setCurrentPage(<SearchPage search={search} category={""} />);
  };

  const searchIconHandler = () => {
    searchHandler(searchInput);
  };

  const searchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const searchEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchHandler(searchInput);
    }
  };

  const categoryHandler = (category: string) => {
    setCurrentPage(<SearchPage search={""} category={category} />);
  };

  const switchProduct = (grocery: Grocery) => {
    setCurrentPage(<ProductPage grocery={grocery} />);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <TextField
        variant="outlined"
        sx={{
          width: "100%",
          height: "4.58333333333em",
          borderRadius: "1rem",
          "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "4.58333333333em",
            backgroundColor: "white",
          },
        }}
        placeholder="Search"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={searchIconHandler}>
                  <Icon
                    icon="clarity:search-line"
                    width="1.5em"
                    height="1.5em"
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        onKeyDown={searchEnterHandler}
        value={searchInput}
        onChange={searchInputHandler}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "700" }}>
          Offers
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "#ABABAB" }}>
          View All
        </Typography>
      </Box>
      {offers.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "16.4166666667rem",
            height: "13.75rem",
            borderRadius: "1.25rem",
            backgroundColor: "#0F5E12",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <Box
            component="img"
            src={offers[0].image}
            sx={{ borderRadius: "0.41666666666rem" }}
          />
          <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
            <Typography
              sx={{ fontSize: "1.25rem", fontWeight: "500", color: "white" }}
            >
              {`${offers[0].discount.value}${offers[0].discount.unit} Off Fresh ${offers[0].category.name}`}
            </Typography>
            <Typography
              sx={{ fontSize: "0.66666666666rem", color: "white" }}
            >{`Valid until ${offers[0].endDate.toLocaleDateString("en-CA", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}`}</Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "700" }}>
          Best Deals
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "#ABABAB" }}>
          View All
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {groceries.slice(0, 2).map((grocery, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
              cursor: "pointer",
            }}
            onClick={() => {
              switchProduct(grocery);
            }}
          >
            <Box
              component="img"
              src={grocery.image}
              sx={{ borderRadius: "1.25rem" }}
              alt={grocery.name}
            />
            <Typography
              sx={{ fontSize: "1.33333333333rem", fontWeight: "500" }}
            >
              {grocery.name}
            </Typography>
            <Typography
              sx={{ fontSize: "1.08333333333rem", fontWeight: "300" }}
            >
              $
              {(grocery.prices[0].discount === null
                ? grocery.prices[0].value
                : grocery.prices[0].discount.unit === DiscountUnit.DOLLAR
                ? grocery.prices[0].value - grocery.prices[0].discount.value
                : grocery.prices[0].value *
                  ((100 - grocery.prices[0].discount.value) / 100)
              ).toFixed(2)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  height: "1.66666666667rem",
                  borderRadius: "2.5rem",
                  backgroundColor: "black",
                  color: "white",
                  lineHeight: "1.66666666667rem",
                  textAlign: "center",
                  paddingX: "0.5rem",
                }}
              >
                Save{" "}
                {(grocery.prices[0].discount === null
                  ? 0
                  : grocery.prices[0].discount.unit === DiscountUnit.DOLLAR
                  ? grocery.prices[0].discount.value
                  : grocery.prices[0].value *
                    (grocery.prices[0].discount.value / 100)
                ).toFixed(2)}
                $
              </Typography>
              <Button
                variant="contained"
                sx={{
                  ":hover": { boxShadow: "none" },
                  width: "6.16666666667rem",
                  height: "1.66666666667rem",
                  borderRadius: "0.41666666666rem",
                  backgroundColor: "#E53935",
                  fontWeight: "600",
                  fontSize: "0.83333333333rem",
                  padding: 0,
                  lineHeight: "1.66666666667rem",
                  textAlign: "center",
                  boxShadow: "none",
                }}
                disableRipple
                onClick={(event) => {
                  event.stopPropagation();
                  addToGroceryList(grocery);
                }}
              >
                ADD TO LIST
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "700" }}>
          Categories
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "#ABABAB" }}>
          View All
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {categories.map((category, i) => (
          <Box
            sx={{
              width: "5.83333333333rem",
              height: "5.83333333333rem",
              backgroundColor: "#FCF1B4",
              borderRadius: "1.25rem",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => categoryHandler(category.name)}
            key={i}
          >
            <Box
              component="img"
              src={category.image}
              sx={{
                width: "3.41666666667rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
              }}
            />
            <Typography
              sx={{
                position: "absolute",
                fontSize: "0.83333333333rem",
                fontWeight: "500",
                left: "50%",
                bottom: "5%",
                translate: "-50%",
              }}
            >
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;

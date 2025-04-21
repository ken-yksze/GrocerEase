import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
} from "react";
import { TabContext } from "../context/TabContext";
import { Icon } from "@iconify/react";
import { Grocery, DiscountUnit } from "../type";
import { DbContext } from "../context/DbContext";
import ProductPage from "./ProductPage";

const SearchPage = ({
  search,
  category,
}: {
  search: string;
  category: string;
}) => {
  const {
    setHeading,
    setCurrentPage,
    setCurrentTab,
    tabClicked,
    setTabClicked,
  } = useContext(TabContext);
  const [displayedGroceries, setDisplayedGroceries] = useState<Grocery[]>([]);
  const { groceries, addToGroceryList } = useContext(DbContext);

  useEffect(() => {
    const SearchPageHeading = () => {
      const { setCurrentPage } = useContext(TabContext);
      const [searchInput, setSearchInput] = useState(search);

      const searchHandler = (search: string) => {
        if (search === "" && category === "") return;
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

      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <IconButton
            sx={{
              ":focus": { outline: "none" },
              padding: 0,
            }}
            disableRipple
            onClick={() => {
              setCurrentTab("Home");
              setTabClicked(!tabClicked);
            }}
          >
            <Icon
              icon="material-symbols:keyboard-arrow-left"
              width="2rem"
              height="2rem"
            ></Icon>
          </IconButton>
          <TextField
            variant="outlined"
            sx={{
              width: "22rem",
              height: "3.33333333333rem",
              borderRadius: "1rem",
              "& .MuiOutlinedInput-root": {
                width: "22rem",
                height: "3.33333333333rem",
                paddingLeft: "0.25rem",
                backgroundColor: "white",
              },
            }}
            placeholder="Search"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small" onClick={searchIconHandler}>
                      <Icon
                        icon="clarity:search-line"
                        width="1.16666666667rem"
                        height="1.16666666667rem"
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
        </Box>
      );
    };

    setHeading(<SearchPageHeading />);
  }, [search, category, setHeading, setCurrentTab, tabClicked, setTabClicked]);

  useEffect(() => {
    if (search === "" && category === "") return;

    const filteredGroceries =
      category === ""
        ? groceries.filter(
            (grocery) =>
              grocery.name.toLowerCase().includes(search.toLowerCase()) ||
              grocery.fullName.toLowerCase().includes(search.toLowerCase())
          )
        : groceries.filter((grocery) =>
            grocery.category.name.toLowerCase().includes(category.toLowerCase())
          );

    filteredGroceries.forEach((filteredGrocery) =>
      filteredGrocery.prices.sort((a, b) => {
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
      })
    );

    filteredGroceries.sort((a, b) => a.prices[0].value - b.prices[0].value);

    setDisplayedGroceries(filteredGroceries);
  }, [search, category, groceries]);

  const switchProduct = (grocery: Grocery) => {
    setCurrentPage(<ProductPage grocery={grocery} />);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <Typography
        sx={{
          marginTop: "1rem",
          fontSize: "1.66666666667rem",
          fontWeight: "700",
        }}
      >
        Results for "
        <span style={{ fontWeight: "500" }}>
          {search === "" ? category : search}
        </span>
        "{" "}
        <sub style={{ fontWeight: "300" }}>
          {"(" + displayedGroceries.length + ")"}
        </sub>
      </Typography>
      {displayedGroceries.map((displayedGrocery, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1.25rem",
            padding: "1rem",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={() => {
            switchProduct(displayedGrocery);
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyItems: "center",
              gap: "1rem",
            }}
          >
            <Box sx={{ width: "35%", height: "100%", position: "relative" }}>
              <img src={displayedGrocery.image} width="100%"></img>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  gap: "0.25rem",
                }}
              >
                <Typography
                  sx={{
                    width: "3.25rem",
                    height: "0.83333333333rem",
                    lineHeight: "0.83333333333rem",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "0.66666666666rem",
                    backgroundColor: "#2C73D5",
                    color: "white",
                    paddingX: "0.25rem",
                    textAlign: "center",
                  }}
                >
                  {displayedGrocery.prices[0].store.name}
                </Typography>
                {i === 0 && (
                  <Typography
                    sx={{
                      fontSize: "0.5rem",
                      fontWeight: "700",
                      color: "#0D8C50",
                    }}
                  >
                    Best Deal
                  </Typography>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: "65%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.33333333333rem",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {displayedGrocery.name}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.16666666667rem", fontWeight: "700" }}
                >
                  $
                  {(displayedGrocery.prices[0].discount === null
                    ? displayedGrocery.prices[0].value
                    : displayedGrocery.prices[0].discount.unit ===
                      DiscountUnit.DOLLAR
                    ? displayedGrocery.prices[0].value -
                      displayedGrocery.prices[0].discount.value
                    : displayedGrocery.prices[0].value *
                      ((100 - displayedGrocery.prices[0].discount.value) / 100)
                  ).toFixed(2)}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  lineHeight: "1.25rem",
                }}
              >
                {displayedGrocery.fullName}, {displayedGrocery.weight}g
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                ":hover": { boxShadow: "none" },
                width: "6.16666666667rem",
                height: "1.66666666667rem",
                borderRadius: "0.41666666666rem",
                backgroundColor: "black",
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
                addToGroceryList(displayedGrocery);
              }}
            >
              ADD TO LIST
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SearchPage;

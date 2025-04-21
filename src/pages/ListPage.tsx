import { useContext, useEffect, useState } from "react";
import { DbContext } from "../context/DbContext";
import {
  Box,
  IconButton,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { TabContext } from "../context/TabContext";
import { Icon } from "@iconify/react";
import { DiscountUnit } from "../type";

const ListPage = () => {
  const {
    setNewItems,
    groceryList,
    addToGroceryList,
    removeFromGroceryList,
    stores,
  } = useContext(DbContext);
  const { setHeading, setCurrentTab, tabClicked, setTabClicked } =
    useContext(TabContext);

  useEffect(() => {
    setNewItems(0);
  }, [setNewItems]);

  useEffect(() => {
    const ListPageHeading = () => {
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
          <Typography sx={{ fontWeight: "700", fontSize: "1.66666666667rem" }}>
            Grocery List
          </Typography>
        </Box>
      );
    };

    setHeading(<ListPageHeading />);
  }, [setHeading, setCurrentTab, tabClicked, setTabClicked]);

  const [totalPrices, setTotalPrices] = useState<number[][]>([]);

  const computeTotals = () => {
    let storeToItemCount: { [Key: string]: number } = {};

    groceryList.forEach((item) =>
      item.grocery.prices.forEach((price) => {
        if (price.store.id in storeToItemCount) {
          storeToItemCount[price.store.id.toString()]++;
        } else {
          storeToItemCount[price.store.id.toString()] = 1;
        }
      })
    );

    storeToItemCount = Object.fromEntries(
      Object.entries(storeToItemCount).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value === groceryList.length
      )
    );

    const storeToPrice: { [Key: string]: number } = {};

    Object.keys(storeToItemCount).forEach((storeId) => {
      if (!(storeId in storeToPrice)) {
        storeToPrice[storeId] = 0;
      }

      groceryList.forEach((item) => {
        const price = item.grocery.prices.find(
          (price) => price.store.id === parseInt(storeId)
        );

        if (price === undefined) return;

        const finalPrice =
          price.discount === null
            ? price.value
            : price.discount.unit === DiscountUnit.DOLLAR
            ? price.value - price.discount.value
            : price.value * ((100 - price.discount.value) / 100);

        storeToPrice[storeId] += finalPrice * item.quantity;
      });
    });

    const prices = Object.entries(storeToPrice).map(([storeId, price]) => [
      parseInt(storeId),
      price,
    ]);

    prices.sort((a, b) => a[1] - b[1]);
    setTotalPrices(prices);
  };

  useEffect(() => {
    computeTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(groceryList)]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          border: "1px solid black",
          borderRadius: "0.83333333333rem",
          padding: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: "700",
            fontSize: "1rem",
            backgroundColor: "#43A047",
            color: "white",
            paddingX: "0.75rem",
            paddingY: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          My List
        </Typography>
        {groceryList.length > 0 ? (
          <TableContainer>
            <Table
              sx={{
                width: "100%",
                backgroundColor: "transparent",
                marginTop: "1rem",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      padding: 0,
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: "700",
                      fontSize: "1rem",
                      border: "none",
                    }}
                  >
                    Items
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "5rem",
                      padding: 0,
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: "700",
                      fontSize: "1rem",
                      border: "none",
                    }}
                    align="center"
                  >
                    Qty
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: 0,
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: "700",
                      fontSize: "1rem",
                      border: "none",
                    }}
                    align="right"
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groceryList
                  .sort((a, b) => a.grocery.id - b.grocery.id)
                  .map((item, i) => (
                    <TableRow key={i}>
                      <TableCell
                        sx={{
                          height: "3rem",
                          padding: 0,
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "1rem",
                        }}
                      >
                        {item.grocery.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: "5rem",
                          height: "3rem",
                          padding: 0,
                          fontFamily: '"Inter", sans-serif',
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            ":hover": { backgroundColor: "#7F807E" },
                            height: "1.16666666667rem",
                            width: "1.16666666667rem",
                            borderRadius: "50%",
                            backgroundColor: "#7F807E",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "0.91666666666rem",
                            textAlign: "center",
                            lineHeight: "1.16666666667rem",
                            color: "white",
                          }}
                          disableRipple
                          onClick={(event) => {
                            event.stopPropagation();
                            removeFromGroceryList(item.grocery);
                          }}
                        >
                          -
                        </IconButton>
                        {item.quantity}
                        <IconButton
                          sx={{
                            ":hover": { backgroundColor: "#7F807E" },
                            height: "1.16666666667rem",
                            width: "1.16666666667rem",
                            borderRadius: "50%",
                            backgroundColor: "#7F807E",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "0.91666666666rem",
                            textAlign: "center",
                            lineHeight: "1.16666666667rem",
                            color: "white",
                          }}
                          disableRipple
                          onClick={(event) => {
                            event.stopPropagation();
                            addToGroceryList(item.grocery, false);
                          }}
                        >
                          +
                        </IconButton>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          height: "3rem",
                          padding: 0,
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "1rem",
                        }}
                      >
                        $
                        {(item.grocery.prices[0].discount === null
                          ? item.grocery.prices[0].value
                          : item.grocery.prices[0].discount.unit ===
                            DiscountUnit.DOLLAR
                          ? item.grocery.prices[0].value -
                            item.grocery.prices[0].discount.value
                          : item.grocery.prices[0].value *
                            ((100 - item.grocery.prices[0].discount.value) /
                              100)
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "700",
              fontFamily: '"Inter", sans-serif',
              marginTop: "1rem",
            }}
          >
            No Item
          </Typography>
        )}
        {totalPrices.length > 0 ? (
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "1.5rem",
              alignSelf: "flex-end",
              marginTop: "3rem",
            }}
          >
            <strong>
              {stores.find((store) => store.id === totalPrices[0][0])?.name}{" "}
              Total
            </strong>{" "}
            ${totalPrices[0][1].toFixed(2)}
          </Typography>
        ) : groceryList.length > 0 ? (
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "1.5rem",
              alignSelf: "flex-end",
              marginTop: "3rem",
            }}
          >
            Can't buy in one store
          </Typography>
        ) : (
          <></>
        )}
      </Box>
      {totalPrices.length > 0 ? (
        <>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "1.5rem",
              fontWeight: "700",
            }}
          >
            Price Comparison
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {totalPrices.map((totalPrice, i) => (
              <Box
                sx={{
                  padding: "1rem",
                  borderRadius: "0.41666666666rem",
                  backgroundColor: i === 0 ? "#43A047" : "#FFFFFF",
                  position: "relative",
                }}
                key={i}
              >
                {i === 0 ? (
                  <Typography
                    sx={{
                      backgroundColor: "#D9D9D9",
                      border: "1px solid black",
                      boxSizing: "border-box",
                      textAlign: "center",
                      position: "absolute",
                      top: "-10%",
                      left: "-5%",
                      paddingX: "0.5rem",
                    }}
                  >
                    Best Deal
                  </Typography>
                ) : (
                  <></>
                )}
                <Typography
                  sx={{ fontFamily: '"Inter", sans-serif', fontSize: "1rem" }}
                >
                  {stores.find((store) => store.id === totalPrice[0])?.name}
                </Typography>
                <Typography
                  sx={{ fontFamily: '"Inter", sans-serif', fontSize: "1rem" }}
                >
                  Total ${totalPrice[1].toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ListPage;

import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { DiscountUnit, Grocery } from "../type";
import { useContext, useEffect } from "react";
import { TabContext } from "../context/TabContext";
import { Icon } from "@iconify/react";

const ProductPage = ({ grocery }: { grocery: Grocery }) => {
  grocery.prices.sort((a, b) => {
    const aFinalValue =
      a.discount === null
        ? a.value
        : a.discount.unit === DiscountUnit.DOLLAR
        ? a.value - a.discount.value
        : a.value * (1 - a.discount.value);

    const bFinalValue =
      b.discount === null
        ? b.value
        : b.discount.unit === DiscountUnit.DOLLAR
        ? b.value - b.discount.value
        : b.value * (1 - b.discount.value);

    return aFinalValue - bFinalValue;
  });

  const { setHeading } = useContext(TabContext);

  const ProductPageHeading = () => {
    return (
      <Box>
        <Typography sx={{ fontWeight: "700", fontSize: "1.66666666667em" }}>
          Search
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    setHeading(ProductPageHeading);
  }, [setHeading]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <TextField
        variant="outlined"
        sx={{
          width: "100%",
          height: "4.58333333333em",
          backgroundColor: "white",
          marginBottom: "2.39583333333em",
          borderRadius: "1em",
        }}
        placeholder="Search"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Icon icon="clarity:search-line" width="1.5em" height="1.5em" />
              </InputAdornment>
            ),
          },
        }}
      />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: "700", fontSize: "1.33333333333em" }}>
          {grocery.name}
        </Typography>
        <Typography sx={{ fontSize: "1em" }}>
          {grocery.fullName}, {grocery.weight}g
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Box
            component="img"
            src={grocery.image}
            alt={grocery.name}
            height="10.8333333333em"
          ></Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <Typography sx={{ fontWeight: "700", fontSize: "1.25em" }}>
            ${grocery.prices[0].value.toFixed(2)}
          </Typography>
          <Typography
            sx={{
              color: "#0D8C50",
              backgroundColor: "#B4B4B4",
              fontWeight: "700",
              fontSize: "0.83333333333em",
              paddingX: "0.5em",
            }}
          >
            Best Deal
          </Typography>
        </Box>
      </Box>
      {grocery.prices.length > 1 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          {grocery.prices.slice(1).map((price, i) => (
            <Box
              sx={{
                paddingX: "0.41666666666em",
                backgroundColor: "#B4B4B4",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={i}
            >
              <Typography sx={{ fontSize: "1.16666666667em" }}>
                {price.store.name}
              </Typography>
              <Typography
                sx={{ fontWeight: "700", fontSize: "1.16666666667em" }}
              >
                ${price.value.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <></>
      )}
      <Box>
        <Typography sx={{ fontWeight: "700", fontSize: "1.25em" }}>
          Health Factor
        </Typography>
        <Box
          sx={{
            marginTop: "0.5em",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1em",
          }}
        >
          {grocery.healthFactors.map((healthFactor, i) => (
            <Typography
              sx={{
                fontSize: "1em",
                paddingX: "0.5em",
                borderRadius: "1.66666666667em",
                backgroundColor: "#D8D8D8",
              }}
              key={i}
            >
              {healthFactor}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "700", fontSize: "1.25em" }}>
          Nutritional Facts
        </Typography>
        <Box sx={{ marginTop: "0.5em" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: "0.41666666666em",
              backgroundColor: "#D8D8D8",
            }}
          >
            <Typography sx={{ fontSize: "1.16666666667em" }}>
              Serving Size
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.16666666667em",
              }}
            >
              {grocery.weight}g
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: "0.41666666666em",
              backgroundColor: "white",
            }}
          >
            <Typography sx={{ fontSize: "1.16666666667em" }}>
              Calories
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.16666666667em",
              }}
            >
              {grocery.calories}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: "0.41666666666em",
              backgroundColor: "#D8D8D8",
            }}
          >
            <Typography sx={{ fontSize: "1.16666666667em" }}>
              Protein
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.16666666667em",
              }}
            >
              {grocery.protein}g
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: "0.41666666666em",
              backgroundColor: "white",
            }}
          >
            <Typography sx={{ fontSize: "1.16666666667em" }}>
              Carbohydrates
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.16666666667em",
              }}
            >
              {grocery.carbohydrates}g
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: "0.41666666666em",
              backgroundColor: "#D8D8D8",
            }}
          >
            <Typography sx={{ fontSize: "1.16666666667em" }}>Fat</Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.16666666667em",
              }}
            >
              {grocery.fat}g
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          width: "12.1666666667em",
          height: "2.58333333333em",
          borderRadius: "0.64583333333em",
          backgroundColor: "black",
          alignSelf: "flex-end",
        }}
      >
        ADD TO LIST
      </Button>
    </Box>
  );
};

export default ProductPage;

import { Box, Typography, IconButton, Link } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TabContext } from "../context/TabContext";
import { DbContext } from "../context/DbContext";
import { DiscountUnit, Store } from "../type";
import { DistanceMatrixService, useJsApiLoader } from "@react-google-maps/api";
import { Icon } from "@iconify/react";

const StorePage = () => {
  const { setHeading } = useContext(TabContext);
  const { groceryList, stores } = useContext(DbContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCxMVctXUtlYOdQDAyiq02oeXZLOd3BxeY",
  });

  useEffect(() => {
    const StorePageHeading = () => {
      return (
        <Typography sx={{ fontWeight: "700", fontSize: "1.66666666667rem" }}>
          Smart Recommendation
        </Typography>
      );
    };
    setHeading(<StorePageHeading />);
  }, [setHeading]);

  const [totalPrices, setTotalPrices] = useState<number[][]>([]);
  const [storeModeDurations, setStoreModeDurations] = useState<{
    [storeId: number]: { [mode: string]: number };
  }>({});
  const [quickestStoreId, setQuickestStoreId] = useState<number | null>(null);
  const [quickestMode, setQuickestMode] = useState<TravelMode | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const computeTotals = async () => {
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

    computeTotals();
  }, [groceryList]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  enum TravelMode {
    DRIVING = "DRIVING",
    TRANSIT = "TRANSIT",
    BICYCLING = "BICYCLING",
    WALKING = "WALKING",
  }

  const modeIcons: { [Key: string]: string } = {
    DRIVING: "bitcoin-icons:car-outline",
    TRANSIT: "arcticons:calgary-transit-my-fare",
    BICYCLING: "ion:bicycle-outline",
    WALKING: "tabler:walk",
  };

  // Fetch travel durations for all stores and modes
  useEffect(() => {
    if (!isLoaded || position === null || stores.length === 0) return;

    const service = new window.google.maps.DistanceMatrixService();

    const promises = Object.values(TravelMode).map((mode) => {
      return new Promise((resolve) => {
        service.getDistanceMatrix(
          {
            origins: [position],
            destinations: stores.map((store) => store.address),
            travelMode: mode,
          },
          (response, status) => {
            if (status === "OK" && response) {
              const durations = response.rows[0].elements.map(
                (element) => element.duration.value
              );
              resolve({ mode, durations });
            } else {
              resolve(null);
            }
          }
        );
      });
    });

    Promise.all(promises).then((results) => {
      const newStoreModeDurations: {
        [storeId: number]: { [mode: string]: number };
      } = {};
      results.forEach((result) => {
        if (result) {
          const { mode, durations } = result as {
            mode: string;
            durations: number[];
          };
          stores.forEach((store, index) => {
            if (!newStoreModeDurations[store.id]) {
              newStoreModeDurations[store.id] = {};
            }
            newStoreModeDurations[store.id][mode] = durations[index];
          });
        }
      });
      setStoreModeDurations(newStoreModeDurations);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, position, stores]);

  // Determine the quickest store and mode
  useEffect(() => {
    if (Object.keys(storeModeDurations).length === 0) return;

    let quickestStoreId: number | null = null;
    let quickestMode: TravelMode | null = null;
    let minDuration = Infinity;

    totalPrices.forEach((totalPrice) => {
      const store = stores.find((store) => store.id === totalPrice[0]);

      if (store === undefined) return;

      const modes = storeModeDurations[store.id];
      if (modes) {
        Object.entries(modes).forEach(([mode, duration]) => {
          if (duration < minDuration) {
            minDuration = duration;
            quickestStoreId = store.id;
            quickestMode = mode as TravelMode;
          }
        });
      }
    });

    setQuickestStoreId(quickestStoreId);
    setQuickestMode(quickestMode);
  }, [storeModeDurations, totalPrices, stores]);

  const ModeIcon = ({
    mode,
    store,
    position,
    setTime,
    currentMode,
    setCurrentMode,
  }: {
    mode: TravelMode;
    store: Store;
    position: { lat: number; lng: number };
    setTime: Dispatch<SetStateAction<string>>;
    currentMode: TravelMode;
    setCurrentMode: Dispatch<SetStateAction<TravelMode>>;
  }) => {
    const [duration, setDuration] = useState<{
      text: string;
      value: number;
    }>({ text: "", value: 0 });
    const [loaded, setLoaded] = useState(false);

    return (
      <IconButton
        onClick={() => {
          setTime(duration.text);
          setCurrentMode(mode);
        }}
        sx={{
          ":hover": {
            backgroundColor: mode === currentMode ? "#D4F4D4" : "transparent",
          },
          padding: 0,
          backgroundColor: mode === currentMode ? "#D4F4D4" : "transparent",
          borderRadius: 0,
        }}
        disableRipple
      >
        <Icon icon={modeIcons[mode]} width="2rem" height="2rem" />
        {!loaded && (
          <DistanceMatrixService
            options={{
              destinations: [store.address],
              origins: [position],
              travelMode: mode,
            }}
            callback={(response) => {
              setLoaded(true);
              if (response) {
                setDuration(response.rows[0].elements[0].duration);
                if (currentMode === mode) {
                  setTime(response.rows[0].elements[0].duration.text);
                }
              }
            }}
          />
        )}
      </IconButton>
    );
  };

  const StoreCard = ({
    storeId,
    initialMode,
  }: {
    storeId: number;
    initialMode?: TravelMode;
  }) => {
    const [time, setTime] = useState("");
    const store = stores.find((store) => store.id === storeId);
    const totalPrice = totalPrices.find(([id]) => id === storeId)?.[1] || 0;
    const [currentMode, setCurrentMode] = useState<TravelMode>(
      initialMode || TravelMode.DRIVING
    );

    if (!store || !position) return null;

    return (
      <Box
        sx={{
          width: "100%",
          borderRadius: "3.33333333333rem",
          border: "3px solid black",
          boxSizing: "border-box",
          padding: "2rem",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <Box component="img" src={store.image} sx={{ width: "5.5rem" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Icon
                icon="clarity:wallet-line"
                width="1.66666666667rem"
                height="1.66666666667rem"
              />
              <Typography
                sx={{
                  fontSize: "0.83333333333rem",
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "700",
                }}
              >
                List Total
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontFamily: '"Inter", sans-serif',
                fontWeight: "700",
              }}
            >
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Icon
                icon="hugeicons:clock-01"
                width="1.66666666667rem"
                height="1.66666666667rem"
              />
              <Typography
                sx={{
                  fontSize: "0.83333333333rem",
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "700",
                }}
              >
                Time to reach
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontFamily: '"Inter", sans-serif',
                fontWeight: "700",
              }}
            >
              {time}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {Object.values(TravelMode).map((travelMode) => (
                <ModeIcon
                  key={travelMode}
                  mode={travelMode}
                  store={store}
                  position={position}
                  setTime={setTime}
                  currentMode={currentMode}
                  setCurrentMode={setCurrentMode}
                />
              ))}
            </Box>
            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                store.address
              )}`}
              target="_blank"
              sx={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#0C8E51",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "700",
                fontSize: "0.83333333333rem",
                padding: "0.5rem",
                borderRadius: "1rem",
              }}
            >
              <Icon icon="ri:direction-line" width="1.25rem" height="1.25rem" />
              Direction
            </Link>
          </Box>
        </Box>
      </Box>
    );
  };

  return isLoaded && position !== null && totalPrices.length > 0 ? (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <Typography sx={{ fontWeight: "700", fontSize: "1.16666666667rem" }}>
        Affordable Option
      </Typography>
      {totalPrices.length > 0 && <StoreCard storeId={totalPrices[0][0]} />}
      <Typography
        sx={{
          marginTop: "1rem",
          fontWeight: "700",
          fontSize: "1.16666666667rem",
        }}
      >
        Quick Option
      </Typography>
      {quickestStoreId !== null && quickestMode !== null ? (
        <StoreCard storeId={quickestStoreId} initialMode={quickestMode} />
      ) : (
        <Typography>Loading quickest option...</Typography>
      )}
    </Box>
  ) : (
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
          fontWeight: "700",
          fontSize: "1.16666666667rem",
        }}
      >
        List Empty
      </Typography>
    </Box>
  );
};

export default StorePage;

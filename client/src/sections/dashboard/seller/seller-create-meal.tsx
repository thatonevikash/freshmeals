import { MouseEvent, useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { createMealApi, createMealPlateApi, useGetMeals } from "@/actions/meal";
import type { Meal } from "@/types/meal.type";

// -------------------------------------------------------------

type CreateMode = "meal" | "plate";

export function SellerCreateMeal() {
  const [mode, setMode] = useState<CreateMode>("meal");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data } = useGetMeals();
  const meals: Meal[] = data ?? [];

  const submitLabel = mode === "meal" ? "Create Meal" : "Create Plate";
  const title = mode === "meal" ? "Create New Meal" : "Create New Plate";

  const description =
    mode === "meal"
      ? "Add a new menu item with pricing and image URL so customers can discover your latest dish."
      : "Bundle one or more of your existing meals into a plate and set a dedicated plate price.";

  const handleModeChange = (
    _: MouseEvent<HTMLElement>,
    value: CreateMode | null,
  ) => {
    if (!value) return;

    setMode(value);
    setSuccessMessage("");
    setErrorMessage("");
    setSelectedMeals([]);
  };

  const toggleMealSelection = (meal: Meal) => {
    setSelectedMeals((prev) => {
      const isSelected = prev.some((item) => item.id === meal.id);

      if (isSelected) {
        return prev.filter((item) => item.id !== meal.id);
      }

      return [...prev, meal];
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (mode === "meal") {
        await createMealApi({
          meal_name: name,
          meal_price: price,
          meal_img_url: imgUrl,
        });

        setSuccessMessage("Meal created successfully.");
      } else {
        await createMealPlateApi({
          plate_name: name,
          plate_price: price,
          plate_img_url: imgUrl,
          plate_items: selectedMeals.map((meal) => meal.id),
        });

        setSuccessMessage("Plate created successfully.");
      }

      setName("");
      setPrice("");
      setImgUrl("");
      setSelectedMeals([]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : `Unable to create ${mode === "meal" ? "meal" : "plate"}`;
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled =
    isLoading ||
    !name.trim() ||
    !price.trim() ||
    !imgUrl.trim() ||
    (mode === "plate" && selectedMeals.length === 0);

  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
          <RestaurantMenuIcon color="primary" fontSize="large" />
          <Typography variant="h4">{title}</Typography>
        </Stack>

        <ToggleButtonGroup
          color="primary"
          exclusive
          value={mode}
          onChange={handleModeChange}
          sx={{ alignSelf: "flex-start" }}
        >
          <ToggleButton value="meal">Meal</ToggleButton>
          <ToggleButton value="plate">Plate</ToggleButton>
        </ToggleButtonGroup>

        <Typography color="text.secondary">{description}</Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          <TextField
            value={name}
            label={mode === "meal" ? "Meal name" : "Plate name"}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            value={price}
            label="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
        </Box>

        <TextField
          value={imgUrl}
          label="Image URL"
          onChange={(e) => setImgUrl(e.target.value)}
          fullWidth
        />

        {mode === "plate" && (
          <Stack spacing={1.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Pick meals ({selectedMeals.length} selected)
            </Typography>

            {meals.length === 0 ? (
              <Alert severity="info">
                Create meals first to build a plate.
              </Alert>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(5, minmax(0, 1fr))",
                  },
                }}
              >
                {meals.map((meal) => {
                  const isSelected = selectedMeals.some(
                    (item) => item.id === meal.id,
                  );

                  return (
                    <Card
                      key={meal.id}
                      variant="outlined"
                      sx={{
                        borderColor: isSelected ? "primary.main" : "divider",
                        borderWidth: isSelected ? 2 : 1,
                        position: "relative",
                      }}
                    >
                      <CardActionArea onClick={() => toggleMealSelection(meal)}>
                        <Box
                          component="img"
                          src={meal.meal_img_url}
                          alt={meal.meal_name}
                          sx={{
                            width: "100%",
                            height: 140,
                            objectFit: "cover",
                          }}
                        />

                        {isSelected && (
                          <CheckCircleIcon
                            color="primary"
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              bgcolor: "background.paper",
                              borderRadius: "50%",
                            }}
                          />
                        )}

                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {meal.meal_name}
                            </Typography>
                            <Chip label={`$${meal.meal_price}`} size="small" />
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </Box>
            )}
          </Stack>
        )}

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isSubmitDisabled}
          >
            {submitLabel}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

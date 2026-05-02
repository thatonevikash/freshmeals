import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { createMealApi } from "@/actions/meal";

// -------------------------------------------------------------

export function SellerCreateMeal() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await createMealApi({
        meal_name: name,
        meal_price: price,
        meal_img_url: imgUrl,
      });

      setSuccessMessage("Meal created successfully.");
      setName("");
      setPrice("");
      setImgUrl("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create meal";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
          <RestaurantMenuIcon color="primary" fontSize="large" />
          <Typography variant="h4">Create New Meal</Typography>
        </Stack>

        <Typography color="text.secondary">
          Add a new menu item with pricing and image URL so customers can
          discover your latest dish.
        </Typography>

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
            label="Meal name"
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

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            loading={isLoading}
            // startIcon={<AddCircleOutlineIcon />}
          >
            Create Meal
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

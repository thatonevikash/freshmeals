import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { createMealApi } from "@/actions/meal";

// -------------------------------------------------------------

export function SellerCreateMeal() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = async () => {
    const res = await createMealApi({
      meal_name: name,
      meal_price: price,
      meal_img_url: imgUrl,
    });

    console.log(res);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h2">Create new meal</Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
        <TextField
          value={name}
          label="name"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          value={price}
          label="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          value={imgUrl}
          fullWidth
          label="image url"
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </Box>
    </Card>
  );
}

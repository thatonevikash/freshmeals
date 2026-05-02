import Image from "next/image";
import Box from "@mui/material/Box";
import type { Meal } from "@/types/meal.type";

import {
  Avatar,
  Card,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

// -----------------------------------------------------------------------

export function SellerCollectionMeals({ meals = [] }: { meals: Meal[] }) {
  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 3 }} variant="outlined">
      <Grid container spacing={2}>
        {meals.map((meal) => (
          <Grid key={meal.id} size={{ xs: 6, md: 4, lg: 3 }}>
            <Card sx={{ p: 1 }}>
              <CardMedia>
                <Image
                  src={meal.meal_img_url}
                  alt="meal image"
                  width={200}
                  height={200}
                />
              </CardMedia>

              <Typography variant="h6">{meal.meal_name}</Typography>

              <Typography variant="subtitle1">{meal.meal_price}</Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Avatar
                  src={meal.seller_information.seller.avatar_url}
                  alt="seller image"
                  sx={{ height: 24, width: 24 }}
                />
                <Typography variant="body2" sx={{ color: "text.disabled" }}>
                  {meal.seller_information.seller.name}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

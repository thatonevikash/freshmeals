import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import type { Meal } from "@/types/meal.type";

// -----------------------------------------------------------------------

export function SellerCollectionMeals({ meals = [] }: { meals: Meal[] }) {
  return (
    <>
      <Grid container spacing={2.5}>
        {meals.map((meal) => (
          <Grid key={meal.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: (theme) => theme.shadows[3],
                },
              }}
            >
              <CardActionArea LinkComponent={Link} href={`/dashboard/meal/${meal.id}`} sx={{ borderRadius: 2.5, p: 0.5 }}>
              <CardMedia sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Image
                  src={meal.meal_img_url}
                  alt={meal.meal_name}
                  width={360}
                  height={220}
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />
              </CardMedia>

              <Stack spacing={1.2} sx={{ pt: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                  {meal.meal_name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ${meal.meal_price}
                  </Typography>
                  <Chip
                    label="Meal"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Divider />

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Avatar
                    src={meal.seller_information.seller.avatar_url}
                    alt={meal.seller_information.seller.name}
                    sx={{ height: 28, width: 28 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {meal.seller_information.seller.name}
                  </Typography>
                </Box>
              </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

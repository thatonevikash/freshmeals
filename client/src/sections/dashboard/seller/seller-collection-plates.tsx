"use client";

import { useEffect, useMemo, useState } from "react";
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

import type { MealPlate } from "@/types/meal.type";

// -----------------------------------------------------------------------

function PlateThumbnailCarousel({ plate }: { plate: MealPlate }) {
  const images = useMemo(
    () => [
      plate.plate_img_url,
      ...plate.plate_items.map((item) => item.meal_img_url),
    ],
    [plate.plate_img_url, plate.plate_items],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <CardMedia
      sx={{ borderRadius: 2, overflow: "hidden", position: "relative" }}
    >
      <Image
        src={images[index]}
        alt={`${plate.plate_name} preview ${index + 1}`}
        width={360}
        height={220}
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 0.6,
        }}
      >
        {images.map((img, idx) => (
          <Box
            key={`${img}-${idx}`}
            sx={{
              width: idx === index ? 14 : 6,
              height: 6,
              borderRadius: 6,
              bgcolor: idx === index ? "common.white" : "rgba(255,255,255,0.5)",
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </Box>
    </CardMedia>
  );
}

// -------------------------------------------------------------

export function SellerCollectionPlates({
  plates = [],
}: {
  plates: MealPlate[];
}) {
  return (
    <>
      <Grid container spacing={2.5}>
        {plates.map((plate) => (
          <Grid key={plate.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
              <CardActionArea LinkComponent={Link} href={`/dashboard/plate/${plate.id}`} sx={{ borderRadius: 2.5, p: 0.5 }}>
              <PlateThumbnailCarousel plate={plate} />

              <Stack spacing={1.2} sx={{ pt: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                  {plate.plate_name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ${plate.plate_price}
                  </Typography>
                  <Chip
                    label={`${plate.plate_items.length} meals`}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Box>

                <Divider />

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Avatar
                    src={plate.seller_information.seller.avatar_url}
                    alt={plate.seller_information.seller.name}
                    sx={{ height: 28, width: 28 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {plate.seller_information.seller.name}
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

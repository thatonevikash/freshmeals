import Image from "next/image";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// -------------------------------------------------------------

interface DetailHeroProps {
  imageUrl: string;
  title: string;
  price: string;
  chipLabel: string;
  sellerName: string;
  sellerAvatar: string;
  subtitle?: string;
  isOwner: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

// -------------------------------------------------------------

export function DetailHero({
  imageUrl,
  title,
  price,
  chipLabel,
  sellerName,
  sellerAvatar,
  subtitle,
  isOwner,
  onDelete,
  onEdit,
}: DetailHeroProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Box sx={{ position: "relative", height: { xs: 240, md: 360 } }}>
        <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
      </Box>

      <Stack spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ justifyContent: "space-between" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Chip label={chipLabel} color="primary" variant="outlined" />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              ${price}
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack
          spacing={2}
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.2}>
            <Avatar src={sellerAvatar} alt={sellerName} />
            <Typography variant="body2" color="text.secondary">
              Owned by {sellerName}
            </Typography>
          </Stack>

          {isOwner && (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={onEdit}>
                Edit
              </Button>
              <Button color="error" variant="contained" onClick={onDelete}>
                Delete
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}

import { Flame, Leaf, Salad, Users } from "lucide-react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RouterLink } from "@/lib/router-link";

const categories = [
  {
    name: "Protein Bowls",
    desc: "High-protein meals for fitness and busy schedules.",
    icon: Flame,
  },
  {
    name: "Vegan Plates",
    desc: "Plant-forward dishes crafted with rich textures and flavor.",
    icon: Leaf,
  },
  {
    name: "Family Packs",
    desc: "Portion-friendly bundles made for shared dining.",
    icon: Users,
  },
  {
    name: "Low-Calorie",
    desc: "Calorie-conscious options with full taste profile.",
    icon: Salad,
  },
];

export function HomeCategories() {
  return (
    <Box
      component="section"
      id="categories"
      sx={{ px: { xs: 2, md: 4 }, pb: { xs: 8, md: 10 } }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Shop by taste and lifestyle
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Explore curated meal categories and find the plan that matches your
          goals.
        </Typography>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Grid key={cat.name} size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "inline-flex", mb: 1.5 }}>
                    <Icon size={18} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cat.desc}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Button
          component={RouterLink}
          href="/#categories"
          variant="contained"
          color="primary"
        >
          Browse meals
        </Button>
      </Box>
    </Box>
  );
}

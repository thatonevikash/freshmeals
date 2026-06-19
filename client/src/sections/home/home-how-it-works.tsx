import { CookingPot, HandPlatter, CalendarCheck2 } from "lucide-react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "01",
    title: "Pick your meals",
    desc: "Choose from rotating chef-curated menus each week.",
    icon: HandPlatter,
  },
  {
    label: "02",
    title: "Set your schedule",
    desc: "Select delivery days and time windows that suit your routine.",
    icon: CalendarCheck2,
  },
  {
    label: "03",
    title: "Heat & enjoy",
    desc: "Freshly prepared meals arrive ready to eat in minutes.",
    icon: CookingPot,
  },
];

export function HomeHowItWorks() {
  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{ px: { xs: 2, md: 4 }, pb: { xs: 10, md: 12 } }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          How it works
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          From selection to doorstep in three simple steps.
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Box
                key={step.label}
                sx={{
                  flex: 1,
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "primary.main",
                    fontWeight: 700,
                    letterSpacing: 1,
                    mb: 1.5,
                  }}
                >
                  {step.label}
                </Typography>
                <Box sx={{ display: "inline-flex", mb: 1 }}>
                  <Icon size={18} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography color="text.secondary">{step.desc}</Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}

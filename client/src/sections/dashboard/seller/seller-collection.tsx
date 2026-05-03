import { useState } from "react";

import { Divider, Paper, Tab, Tabs } from "@mui/material";

import { Meal, MealPlate } from "@/types/meal.type";

import { SellerCollectionMeals } from "./seller-collection-meals";
import { SellerCollectionPlates } from "./seller-collection-plates";

// -------------------------------------------------------------

export function SellerCollection({
  collection,
}: {
  collection: {
    meals: Meal[];
    plates: MealPlate[];
  };
}) {
  const [tab, setTab] = useState("meals");

  const tabs = [
    { value: "meals", label: "Meals" },
    { value: "plates", label: "Plates" },
  ];

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mt: 3,
        borderRadius: 4,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Tabs value={tab} onChange={(_, tab) => setTab(tab)}>
        {tabs.map((t) => (
          <Tab key={t.value} value={t.value} label={t.label} />
        ))}
      </Tabs>

      <Divider sx={{ mb: 2 }} />

      {tab === "meals" && <SellerCollectionMeals meals={collection.meals} />}

      {tab === "plates" && (
        <SellerCollectionPlates plates={collection.plates} />
      )}
    </Paper>
  );
}

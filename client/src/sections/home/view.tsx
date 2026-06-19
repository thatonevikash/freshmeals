"use client";

import { HomeHero } from "./home-hero";
import { HomeHighlights } from "./home-highlights";
import { HomeCategories } from "./home-categories";
import { HomeHowItWorks } from "./home-how-it-works";

export function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeHighlights />
      <HomeCategories />
      <HomeHowItWorks />
    </>
  );
}

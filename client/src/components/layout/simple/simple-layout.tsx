import { Main } from "../main";
import { Header } from "../header";

// -----------------------------------------------------------------------

export function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <Main sx={{ minWidth: "100%", justifyContent: "center" }}>
        {children}
      </Main>
    </div>
  );
}

import { Main } from "../main";
import { Header } from "../../layout/header";

// -----------------------------------------------------------------------

export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <Main>{children}</Main>
    </>
  );
}

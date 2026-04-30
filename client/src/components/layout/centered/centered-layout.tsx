import { Main } from "../main";
import { Header } from "../../layout/header";

// -----------------------------------------------------------------------

export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <Main className="bg-[#FAFAF7]">{children}</Main>
    </div>
  );
}

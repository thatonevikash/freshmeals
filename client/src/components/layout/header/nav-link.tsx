import Link from "next/link";

// -----------------------------------------------------------------------

export function NavLink({ href, value }: { href: string; value: string }) {
  return <Link href={href}> {value} </Link>;
}

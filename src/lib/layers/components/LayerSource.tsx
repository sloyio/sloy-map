import { ILayer } from "@/types";
import { Link, LinkSize } from "sloy-ui";

export function LayerSource({ link }: { link: ILayer["link"] }) {
  if (!link) return null;

  return (
    <Link size={LinkSize.SMALL} href={link.href}>
      {link.label || link.href}
    </Link>
  );
}

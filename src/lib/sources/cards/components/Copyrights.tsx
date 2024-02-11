import { Link, LinkSize } from "sloy-ui";
import { ICopyright } from "@/types";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export function Copyrights({ items = [] }: { items: ICopyright[] }) {
  return (
    <List>
      {items.map(({ url, shortName, fullName }) => (
        <div>
          <Link key={url} href={url} size={LinkSize.SMALL}>
            {fullName || shortName}
          </Link>
        </div>
      ))}
    </List>
  );
}

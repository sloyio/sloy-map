import { Link, LinkSize } from "sloy-ui";
import styles from "./Copyrights.module.css";

export function Copyrights({
  sources,
}: {
  sources: { name: string; link: string }[];
}) {
  return (
    <div className={styles.sources}>
      <ul className={styles.sources__list}>
        {sources.map(({ link, name }) => {
          return (
            <li key={link} className={styles.sources__listItem}>
              <Link href={link} size={LinkSize.SMALL}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

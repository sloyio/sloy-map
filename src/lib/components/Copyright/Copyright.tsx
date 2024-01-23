import { useAppSelector } from "@/state";
import styles from "./Copyright.module.css";

export function Copyright() {
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);

  return (
    <div className={styles.copyright} hidden={!isAppLoaded}>
      <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
        OpenStreetMap
      </a>
    </div>
  );
}

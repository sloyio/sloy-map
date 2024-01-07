import { useSelector } from "react-redux";
import { isAppLoadedSelector } from "@/state/selectors";
import styles from "./Copyright.module.css";

export function Copyright() {
  const isAppLoaded = useSelector(isAppLoadedSelector);

  return (
    <div className={styles.copyright} hidden={!isAppLoaded}>
      <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
        OpenStreetMap
      </a>
    </div>
  );
}

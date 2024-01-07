import { ReactNode } from "react";
import { Close } from "@/components/Close";
import styles from "./DesktopCard.module.css";

interface Props {
  children: ReactNode;
  closePopup: () => void;
}

export function DesktopCard({ children, closePopup }: Props) {
  return (
    <div className={styles.DesktopCard}>
      <div className={styles.DesktopCard__header}>
        <Close close={closePopup} />
      </div>
      {children}
    </div>
  );
}

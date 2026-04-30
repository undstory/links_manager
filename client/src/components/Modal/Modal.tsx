import React from "react";
import type { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";

interface ModalProps {
  // movie: Movie;
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {/* */}
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
}

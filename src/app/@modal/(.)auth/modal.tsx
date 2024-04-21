"use client";

import { type ElementRef, useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export const Modal = ({ children }: { children: ReactNode }) => {
  const { back } = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <div className="relative">
      <dialog
        ref={dialogRef}
        className="fixed inset-0 bg-black/80"
        onClose={back}
      >
        {children}
      </dialog>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};

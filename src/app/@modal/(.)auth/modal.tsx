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
    <div className="absolute inset-0 bg-black/80 flex items-start justify-center z-10 backdrop-blur-sm">
      <dialog ref={dialogRef} onClose={back}>
        {children}
      </dialog>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};

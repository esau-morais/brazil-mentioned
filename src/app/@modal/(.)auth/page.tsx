import { UsernameForm } from "@/components/username-form";
import { Modal } from "./modal";
import { Suspense } from "react";

const ParallelUsernameModal = () => {
  return (
    <Modal>
      <Suspense>
        <UsernameForm />
      </Suspense>
    </Modal>
  );
};

export default ParallelUsernameModal;

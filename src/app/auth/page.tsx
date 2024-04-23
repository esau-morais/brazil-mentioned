import { UsernameForm } from "@/components/username-form";
import { Suspense } from "react";

const UsernamePage = () => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center overflow-y-hidden">
      <Suspense>
        <UsernameForm />
      </Suspense>
    </div>
  );
};

export default UsernamePage;

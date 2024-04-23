import { RoomTabs } from "@/components/room-tabs";
import { Suspense } from "react";

const Home = () => {
  return (
    <section className="container max-w-screen-sm min-h-dvh flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center mb-8">
        olá{" "}
        <span className="inline-block animate-wave origin-[70%_70%]">
          &#128075;
        </span>
      </h1>

      <Suspense>
        <RoomTabs />
      </Suspense>
    </section>
  );
};

export default Home;

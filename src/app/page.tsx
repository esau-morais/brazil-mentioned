import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const TABS = [
  {
    label: "Create room",
    value: "create-room",
    content: (
      <Card>
        <CardHeader>Create room</CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input id="room-name" placeholder="Enter room name" />
            <Button className="self-center" size="icon">
              <ArrowRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    label: "Join room",
    value: "join-room",
    content: (
      <Card>
        <CardHeader>Join room</CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input id="room-code" placeholder="Enter room code" />
            <Button className="self-center" size="icon">
              <ArrowRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
  },
] as const;

const Home = () => {
  return (
    <section className="container max-w-screen-sm min-h-dvh flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center mb-8">
        olá{" "}
        <span className="inline-block animate-wave origin-[70%_70%]">
          &#128075;
        </span>
      </h1>
      <Tabs defaultValue={TABS[0].value} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Home;

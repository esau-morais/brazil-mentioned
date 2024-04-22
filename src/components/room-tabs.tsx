"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { joinRoom } from "@/lib/actions/room.actions";
import { useFormState } from "react-dom";

const initialState = {
  errors: {
    "room-code": [],
  },
};

export const RoomTabs = () => {
  const searchParams = useSearchParams();
  const [state, formAction] = useFormState(joinRoom, initialState);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const TABS = [
    {
      label: "Create room",
      value: "create-room",
      content: (
        <Card>
          <CardContent>
            <Link
              className={cn("w-full space-x-1", buttonVariants())}
              href={`/auth?${createQueryString("room", "create")}`}
            >
              <span>Create new room</span>
              <ArrowRight />
            </Link>
          </CardContent>
        </Card>
      ),
    },
    {
      label: "Join room",
      value: "join-room",
      content: (
        <Card>
          <CardContent>
            <form action={formAction}>
              <div className="flex items-center space-x-2">
                <Input
                  id="room-code"
                  name="room-code"
                  placeholder="Enter room code"
                />
                <Button type="submit" size="icon">
                  <ArrowRight />
                </Button>
              </div>
              {state?.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {state?.errors["room-code"]?.[0]}
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>
      ),
    },
  ] as const;

  return (
    <Tabs defaultValue={TABS[0].value} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {TABS.map(({ value, label }) => (
          <TabsTrigger key={value} value={value}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

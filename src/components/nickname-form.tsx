"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, ChevronLeft, X } from "lucide-react";

export const NickanameForm = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="inline-flex items-center space-x-1">
          <Button
            className="size-fit"
            size="icon"
            variant="ghost"
            onClick={() => router.back()}
          >
            <ChevronLeft size={20} />
          </Button>
          <span>Room</span>
        </CardTitle>
        <CardDescription>
          Before continuing, make sure to set a nickname
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 sm:max-w-[425px]">
        <Label htmlFor="username" className="text-right">
          nickanme
        </Label>
        <Input id="username" placeholder="@_3morais" />
      </CardContent>
      <CardFooter>
        <Button type="submit">Save changes</Button>
      </CardFooter>
    </Card>
  );
};

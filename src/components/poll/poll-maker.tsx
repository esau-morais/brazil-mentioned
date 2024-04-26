"use client";

import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { createPoll } from "@/lib/actions/room.actions";
import { useFormState } from "react-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MAX_OPTIONS = 8;
// TODO: let the user add custom duration
export const DURATIONS = [
  {
    label: "1 hour",
    value: "1h",
  },
  {
    label: "4 hours",
    value: "4h",
  },
  {
    label: "8 hours",
    value: "8h",
  },
  {
    label: "24 hours",
    value: "24h",
  },
  {
    label: "3 days",
    value: "3d",
  },
  {
    label: "1 week",
    value: "1w",
  },
];

export const PollMaker = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const newOptionRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useFormState(createPoll, {
    errors: { title: [] },
  });

  const addNewOption = () => {
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setNewOption("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create poll</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <form action={formAction}>
          <div className="mb-4">
            <Label htmlFor="title">title (max 300 characters)</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {state?.errors ? (
              <p className="text-[0.8rem] font-medium text-destructive">
                {state?.errors.title?.[0]}
              </p>
            ) : null}
          </div>

          <Label htmlFor="new-option">responses (min 2, max 8)</Label>
          <ul className="flex flex-col space-y-2 mb-4">
            {options.map((option, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex items-center justify-between space-x-2">
                  <Input name={`option-${index}`} defaultValue={option} />
                  <Button
                    size="icon"
                    type="button"
                    onClick={() =>
                      setOptions(options.filter((_, idx) => idx != index))
                    }
                  >
                    <Trash />
                  </Button>
                </div>
                {state?.errors ? (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {state?.errors.options?.[0]}
                  </p>
                ) : null}
              </div>
            ))}

            {options.length < MAX_OPTIONS ? (
              <li className="flex items-center justify-between space-x-2">
                <Input
                  ref={newOptionRef}
                  id="new-option"
                  name="new-option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <Button type="button" size="icon" onClick={addNewOption}>
                  <Plus />
                </Button>
              </li>
            ) : null}
          </ul>

          <Label>duration</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="choose" />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((dur) => (
                <SelectItem key={dur.value} value={dur.value}>
                  {dur.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="mt-6" type="submit" disabled={!state.errors}>
            Start poll
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

"use client";

import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { createPoll } from "@/lib/actions/room.actions";

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 8;

export const PollMaker = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const newOptionRef = useRef<HTMLInputElement>(null);

  const canSubmit =
    question.length &&
    options.length >= MIN_OPTIONS &&
    !options.filter((option) => !option.trim().length).length;

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
        <form action={createPoll}>
          <Label htmlFor="question">question (max 300 characters)</Label>
          <Input
            className="mb-4"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Label htmlFor="new-option">responses (min 2, max 8)</Label>
          <ul className="flex flex-col space-y-2">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-2"
              >
                <Input name={`option-${index}`} defaultValue={option} />
                <Button
                  disabled={options.length <= MIN_OPTIONS}
                  size="icon"
                  type="button"
                  onClick={() =>
                    setOptions(options.filter((_, idx) => idx != index))
                  }
                >
                  <Trash />
                </Button>
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
                <Button
                  disabled={!newOption?.trim().length}
                  type="button"
                  size="icon"
                  onClick={addNewOption}
                >
                  <Plus />
                </Button>
              </li>
            ) : null}
          </ul>

          <Button className="mt-6" type="submit" disabled={!canSubmit}>
            Start poll
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

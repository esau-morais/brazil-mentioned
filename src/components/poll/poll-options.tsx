import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export const PollOptions = ({
  options,
  votes,
  vote,
  setVote,
}: {
  options: string[];
  votes: number[];
  vote: number | null;
  setVote: (option: number) => void;
}) => {
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  const mostVotes = Math.max(...votes);
  const voted = vote === null || vote === undefined;

  return (
    <Card>
      <CardContent>
        <ul className="flex flex-col space-y-4">
          {options.map((opt, idx) => (
            <li key={idx}>
              <div className="relative w-full border rounded-md border-border flex">
                <div
                  className={cn(
                    "absolute top-0 left-0 bottom-0 w-full rounded-md transition-all duration-500 z-10",
                    votes[idx] === mostVotes
                      ? "bg-primary"
                      : vote === idx
                        ? "bg-secondary"
                        : "bg-muted",
                  )}
                  style={{
                    width: voted ? 0 : `${(votes[idx] / totalVotes) * 100}%`,
                  }}
                />

                <Button
                  className={cn(
                    "select-none inline-flex justify-between items-center flex-1 space-x-2 z-20",
                    voted ? "" : votes[idx] === mostVotes ? "font-bold" : "",
                  )}
                  disabled={!voted}
                  variant="ghost"
                  onClick={() => setVote(idx)}
                >
                  {vote === idx ? <span>&#127880;</span> : null}
                  <span>{opt}</span>
                  {!voted ? <span>{votes[idx]}</span> : null}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

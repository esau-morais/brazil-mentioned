"use client";

import { useEffect, useState } from "react";
import usePartySocket from "partysocket/react";
import { PollOptions } from "./poll-options";
import { Poll } from "@/lib/types";
import { useCookie } from "@/lib/hooks/use-cookie";
import { PARTYKIT_URL } from "@/lib/env";

export const PollVoting = ({
  id,
  options,
  initialVotes,
}: {
  id: string;
  options: string[];
  initialVotes?: number[];
}) => {
  const [votes, setVotes] = useState<number[]>(initialVotes ?? []);
  const [vote, setVote] = useState<number | null>(null);

  const [voted, setVoted] = useCookie(`voted_${id}`);

  const socket = usePartySocket({
    host: PARTYKIT_URL,
    room: id,
    onMessage: (event) => {
      const message = JSON.parse(event.data) as Poll;
      if (message.votes) {
        setVotes(message.votes);
      }
    },
  });

  const castVote = (option: number) => {
    socket.send(JSON.stringify({ type: "vote", option }));
    setVote(option);
  };

  useEffect(() => {
    if (vote === null || vote === undefined) {
      if (voted) setVote(+voted);
    } else {
      setVoted(vote.toString());
    }
  }, [id, setVoted, vote, voted]);

  return (
    <PollOptions
      options={options}
      votes={votes}
      vote={vote}
      setVote={castVote}
    />
  );
};

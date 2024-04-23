"use client";

import { useEffect, useState } from "react";
import usePartySocket from "partysocket/react";
import { PollOptions } from "./poll-options";

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

  const socket = usePartySocket({
    host: "http://127.0.0.1:1999",
    room: id,
    onMessage: (event) => {
      const message = JSON.parse(event.data);
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
    const voted = document.cookie.includes("voted_" + id);
    if (!vote && voted) {
      setVote(+voted);
    } else if (vote && !voted) {
      document.cookie = `voted_${id}=${vote}`;
    }
  }, [id, vote]);

  return (
    <PollOptions
      options={options}
      votes={votes}
      vote={vote}
      setVote={castVote}
    />
  );
};

import { PollVoting } from "@/components/poll/poll-voting";
import { Poll } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";

const PollPage = async ({ params }: { params: { pollId: string } }) => {
  const pollId = params.pollId;

  const req = await fetch(`http://127.0.0.1:1999/party/${pollId}`, {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });

  if (!req.ok) {
    if (req.status === 404) {
      notFound();
    } else {
      throw new Error("Something went wrong.");
    }
  }

  const poll = (await req.json()) as Poll;

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center">
      <h1 className="text-2xl text-center mb-8">{poll.title}</h1>
      <PollVoting
        id={pollId}
        options={poll.options}
        initialVotes={poll.votes}
      />
    </div>
  );
};

export default PollPage;

import { Poll } from "@/lib/types";
import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly party: Party.Room) {}

  poll: Poll | undefined;
  pollTimeout: NodeJS.Timeout | undefined;

  async onMessage(message: string) {
    if (!this.poll) return;

    const event = JSON.parse(message);
    if (event.type === "vote") {
      this.poll.votes![event.option] += 1;
      this.party.broadcast(JSON.stringify(this.poll));
      this.savePoll();
    }
  }

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      const poll = (await req.json()) as Poll;
      this.poll = { ...poll, votes: poll.options.map(() => 0) };
      this.savePoll();
    }

    if (this.poll) {
      return new Response(JSON.stringify(this.poll), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  }

  async savePoll() {
    if (this.poll) {
      await this.party.storage.put("poll", this.poll);
    }
  }

  async endPoll() {
    if (this.pollTimeout) {
      clearTimeout(this.pollTimeout);
    }
    this.poll = undefined;
    await this.party.storage.delete("poll");
  }

  async onStart() {
    this.poll = await this.party.storage.get("poll");
    if (this.poll && this.poll.duration) {
      this.pollTimeout = setTimeout(async () => {
        await this.endPoll();
        this.party.broadcast("poll ended");
      }, this.poll.duration);
    }
  }
}

Server satisfies Party.Worker;

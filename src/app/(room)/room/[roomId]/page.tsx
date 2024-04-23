import { PollMaker } from "@/components/poll/poll-maker";

const Room = ({ params }: { params: { roomId: string } }) => {
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <PollMaker />
    </div>
  );
};

export default Room;

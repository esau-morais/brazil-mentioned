import { Poll } from "@/components/poll";

const Room = ({ params }: { params: { roomId: string } }) => {
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <Poll />
    </div>
  );
};

export default Room;

const Room = ({ params }: { params: { roomId: string } }) => {
  return <div>{params.roomId}</div>;
};

export default Room;

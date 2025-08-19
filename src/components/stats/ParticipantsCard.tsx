interface IParticipantsCardProps {
  totalParticipants: number;
}

const ParticipantsCard = ({ totalParticipants }: IParticipantsCardProps) => {
  return (
    <div className='card p-8 text-center mb-8'>
      <h2 className='text-xl font-semibold text-gray-700 mb-2'>총 참여자 수</h2>
      <div className='text-4xl md:text-5xl font-bold text-primary-500 mb-2'>
        {totalParticipants.toLocaleString()}명
      </div>
      <p className='text-gray-500'>RunVibe와 함께한 러너들</p>
    </div>
  );
};

export default ParticipantsCard;

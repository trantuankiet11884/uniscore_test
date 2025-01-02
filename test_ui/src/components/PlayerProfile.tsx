import { Avatar, Image } from 'antd';
import dayjs from 'dayjs';
import { Age, Foot, Football, Height, Jersey, Star } from '~/assets/svg';
import { Player } from '~/types';

interface PlayerProfileProps {
  player: Player;
}

const formatDate = (timestamp: number): string => {
  return dayjs(timestamp * 1000)
    .format('DD MMM YYYY')
    .toUpperCase();
};

const getAge = (birthTimestamp: number): string => {
  const years = dayjs().diff(dayjs(birthTimestamp * 1000), 'year');
  return `${years} years old`;
};

const PlayerProfile: React.FC<PlayerProfileProps> = ({ player }) => {
  const contractUntil = `Contract until ${dayjs(player.contractUntilTimestamp * 1000).format('DD MMM YYYY')}`;
  const dateOfBirth = formatDate(player.dateOfBirthTimestamp);
  const age = getAge(player.dateOfBirthTimestamp);

  return (
    <div className='max-w-6xl mx-auto  w-full bg-[#020733] text-white rounded-md'>
      <div className='flex flex-col lg:grid lg:grid-cols-2 bg-[#0F1230] rounded-lg shadow-md gap-4'>
        <div className='relative'>
          <div className='absolute top-4 right-4'>
            <Star className='text-white cursor-pointer' />
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-4 pt-16 px-4'>
            <Avatar className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shrink-0'>
              <Image
                src={`https://img.uniscore.com/football/player/${player.id}/image/medium`}
                alt={player.name}
                className='w-full h-full rounded-full object-contain'
                preview={false}
              />
            </Avatar>

            <div className='text-center sm:text-left'>
              <h1 className='text-xl sm:text-2xl font-bold text-white'>{player.name}</h1>
              <div className='flex flex-col sm:flex-row items-center gap-2 mt-2'>
                <Image
                  src={`https://img.uniscore.com/football/team/${player.team.id}/image/small`}
                  alt={player.team.name}
                  className='w-10 h-10'
                  preview={false}
                />
                <div className='flex flex-col text-white'>
                  <p>{player?.team?.name}</p>
                  <p className='text-sm text-gray-400'>{contractUntil}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 border-t lg:border-t-0 lg:border-l border-[#171B2E]'>
          <div className='space-y-0 grid grid-rows-3'>
            <div className='border-[#171B2E] border-r border-b h-full flex flex-col justify-center gap-1 px-4 py-2'>
              <div className='text-[#AAAAAA] text-sm'>Nationality</div>
              <div className='flex items-center gap-2'>
                <Image
                  src={`https://img.uniscore.com/football/country/${player?.nationality?.id}/image/small`}
                  alt={player.nationality.name}
                  className='w-full h-full rounded-full object-cover'
                  preview={false}
                />
                {player.nationality.name}
              </div>
            </div>

            <div className='border-[#171B2E] border-r border-b h-full flex flex-col justify-center gap-1 px-4 py-2'>
              <div className='text-[#AAAAAA] text-sm'>Height</div>
              <p className='flex items-center gap-2'>
                <Height />
                {player.height} cm
              </p>
            </div>

            <div className='border-[#171B2E] border-r border-b h-full flex flex-col justify-center gap-1 px-4 py-2'>
              <div className='text-[#AAAAAA] text-sm'>Jersey number</div>
              <p className='flex items-center gap-2'>
                <Jersey />-
              </p>
            </div>
          </div>

          <div className='space-y-0 grid grid-rows-3'>
            <div className='border-[#171B2E] border-b h-full flex flex-col justify-center gap-1 px-4 py-2'>
              <p className='text-[#AAAAAA] text-sm mb-1'>Date of birth</p>
              <div className='flex gap-2'>
                <Age />
                <div>
                  <p>{dateOfBirth}</p>
                  <p className='text-[#AAAAAA] text-sm'>{age}</p>
                </div>
              </div>
            </div>

            <div className='border-[#171B2E] border-b h-full flex flex-col justify-center gap-1 px-4 py-2'>
              <div className='text-[#AAAAAA] text-sm'>Preferred foot</div>
              <div className='flex items-center gap-2'>
                <Foot />
                {player.preferredFoot || '-'}
              </div>
            </div>

            <div className='border-[#171B2E] border-b h-full flex flex-col justify-center gap-1 px-4 py-2'>
              <div className='text-[#AAAAAA] text-sm'>Position</div>
              <div className='flex items-center gap-2'>
                <Football />
                {player.position}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;

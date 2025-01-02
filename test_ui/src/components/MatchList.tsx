import { Flex, Image } from 'antd';
import { matchList } from '~/mocks/matchList';
import { Match } from '~/types';

const MatchList = () => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const getScoreStyle = (homeScore: number, awayScore: number, isHome: boolean) => {
    if (isHome) {
      return homeScore >= awayScore ? 'bg-[#2187E5]' : 'bg-gradient-to-b from-[#091557] via-[#001F7B] to-[#00289F]';
    }
    return awayScore >= homeScore ? 'bg-[#2187E5]' : 'bg-gradient-to-b from-[#091557] via-[#001F7B] to-[#00289F]';
  };

  const matches = matchList.data.events;

  return (
    <div className='max-w-6xl mx-auto  w-full bg-[#0F1230] text-white rounded-md px-4 py-2'>
      <h1 className='text-xl font-bold mb-4 '>MATCHES</h1>
      <div className='space-y-2'>
        {matches.map((match: Match) => (
          <div
            key={match.id}
            className='bg-custom-gradient-matchList px-2 rounded hover:bg-[#102a45] transition-colors'
          >
            <Flex justify='space-between' align='center'>
              <div className='flex  items-center justify-between gap-4 flex-1'>
                <Flex align='center' gap={8}>
                  <Flex vertical gap={4}>
                    <div className='text-sm text-gray-400'>{formatDate(match.startTimestamp)}</div>
                    <div className='text-xs text-gray-400 uppercase'>{match.status.type}</div>
                  </Flex>
                  <div className='flex-1'>
                    <div className='font-medium flex items-center'>
                      <Image
                        src={`https://img.uniscore.com/football/team/${match.homeTeam.id}/image/small`}
                        preview={false}
                      />
                      {match.homeTeam.name}
                    </div>
                    <div className='font-medium mt-2 flex items-center'>
                      <Image
                        src={`https://img.uniscore.com/football/team/${match.awayTeam.id}/image/small`}
                        preview={false}
                      />
                      {match.awayTeam.name}
                    </div>
                  </div>
                </Flex>

                <Flex gap={4} align='center' className='my-2'>
                  <div className='flex flex-col items-end'>
                    <div
                      className={`px-2 py-1 rounded min-w-[24px] text-center ${getScoreStyle(match.homeScore.current, match.awayScore.current, true)}`}
                    >
                      {match.homeScore.current}
                    </div>
                    <div
                      className={`px-2 py-1 rounded mt-2 min-w-[24px] text-center ${getScoreStyle(match.homeScore.current, match.awayScore.current, false)}`}
                    >
                      {match.awayScore.current}
                    </div>
                  </div>
                </Flex>
              </div>
              {parseFloat(match.homeScore.corner + '.' + match.awayScore.corner) > 7 && (
                <div className='ml-4 px-3 py-1 rounded text-sm bg-[#2EA76F]'>
                  {`${match.homeScore.corner}.${match.awayScore.corner}`}
                </div>
              )}

              {parseFloat(match.homeScore.corner + '.' + match.awayScore.corner) <= 7 && (
                <div className='ml-4 px-3 py-1 rounded text-sm bg-[#DA6900]'>
                  {`${match.homeScore.corner}.${match.awayScore.corner}`}
                </div>
              )}
            </Flex>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;

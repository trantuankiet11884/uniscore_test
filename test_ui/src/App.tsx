import MatchList from './components/MatchList';
import PlayerProfile from './components/PlayerProfile';
import TransferValueHistory from './components/TransferValue';
import Header from './layout/Header';
import { playerInfo } from './mocks/playerInfo';

const App = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Header />
      <main className=''>
        <section className='flex flex-col gap-4'>
          <PlayerProfile player={playerInfo?.data?.player} />
          <TransferValueHistory />
          <MatchList />
        </section>
      </main>
    </div>
  );
};

export default App;

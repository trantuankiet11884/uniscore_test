import { Button, Card, Form, Input, message, Table } from 'antd';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

interface Technique {
  name: string;
  difficulty: number;
}

interface Player {
  id: number;
  name: string;
  number: number;
  defenseScore: number;
  techniques: Technique[];
  score: number;
  penaltyOrder: number | null;
  firstPenaltyOrder: number | null;
}

interface GameState {
  players: Player[];
  currentPenalizedPlayer: Player | null;
  gameHistory: string[];
  techniquesUsed: { [key: string]: number };
  round: number;
  isGameOver: boolean;
  penalizedCount: number;
}

const TECHNIQUES: Technique[] = [
  { name: 'Neymar Rainbow Flick', difficulty: 6 },
  { name: 'El Tornado', difficulty: 6 },
  { name: 'Waka Waka', difficulty: 5 },
  { name: 'Sombrero Flick', difficulty: 5 },
  { name: 'Okocha Sombrero Flick', difficulty: 4 },
  { name: 'Bolasie Flick', difficulty: 4 },
  { name: 'Fake Pass', difficulty: 3 },
  { name: 'Ball Roll Chop', difficulty: 3 },
  { name: 'Ball Roll Cut', difficulty: 3 },
  { name: 'Ball Hop', difficulty: 2 },
  { name: 'Simple Rainbow', difficulty: 2 },
];

const getRandomTechniques = () => {
  const shuffled = [...TECHNIQUES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};

const checkPassing = (techniqueScore: number, defenseScore: number): boolean => {
  const defensiveRatio = defenseScore / (techniqueScore + defenseScore);
  return Math.random() < defensiveRatio;
};

const GhostFootball = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPenalizedPlayer: null,
    gameHistory: [],
    techniquesUsed: {},
    round: 0,
    isGameOver: false,
    penalizedCount: 0,
  });

  const [initialPlayers, setInitialPlayers] = useState<{ name: string; number: string }[]>([]);

  const initializeGame = (values: { players: { name: string; number: string }[] }) => {
    setInitialPlayers(values.players);
    startNewRound(values.players);
  };

  const startNewRound = (players: { name: string; number: string }[]) => {
    const initialPlayers: Player[] = players.map((p, index) => ({
      id: index,
      name: p.name,
      number: parseInt(p.number),
      defenseScore: Math.floor(Math.random() * 5) + 1,
      techniques: getRandomTechniques(),
      score: 0,
      penaltyOrder: null,
      firstPenaltyOrder: null,
    }));

    setGameState({
      players: initialPlayers,
      currentPenalizedPlayer: null,
      gameHistory: [],
      techniquesUsed: {},
      round: 1,
      isGameOver: false,
      penalizedCount: 0,
    });
  };

  const resetGame = () => {
    if (initialPlayers.length === 0) {
      message.error('Không có dữ liệu người chơi để khởi tạo lại!');
      return;
    }

    startNewRound(initialPlayers);

    message.success('Đã khởi tạo lại trò chơi!');
  };
  const calculateScore = (player: Player, techniquePoints: number = 0): number => {
    if (player.firstPenaltyOrder === null) return 0;

    const orderPoints = 10 - player.firstPenaltyOrder;
    return orderPoints + techniquePoints;
  };

  const playRound = () => {
    const { players } = gameState;
    const availablePlayers = players.filter((player) => player.penaltyOrder === null);
    const penalizedPlayers = players.filter((player) => player.penaltyOrder !== null);

    if (availablePlayers.length === 1 && penalizedPlayers.length === players.length - 1) {
      setGameState((prev) => ({ ...prev, isGameOver: true }));
      message.info('Trò chơi đã kết thúc!');
      return;
    }

    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    const randomTechnique = randomPlayer.techniques[Math.floor(Math.random() * randomPlayer.techniques.length)];

    const isSuccessful = checkPassing(randomTechnique.difficulty, randomPlayer.defenseScore);
    const resultText = isSuccessful ? 'thành công' : 'thất bại';

    setGameState((prev) => {
      const newPenalizedCount = isSuccessful ? prev.penalizedCount : prev.penalizedCount + 1;

      return {
        ...prev,
        penalizedCount: newPenalizedCount,
        techniquesUsed: {
          ...prev.techniquesUsed,
          [randomTechnique.name]: (prev.techniquesUsed[randomTechnique.name] || 0) + 1,
        },
        currentPenalizedPlayer: randomPlayer,
        players: prev.players.map((p) => {
          if (p.id === randomPlayer.id) {
            if (!isSuccessful) {
              const firstPenaltyOrder = p.firstPenaltyOrder === null ? newPenalizedCount : p.firstPenaltyOrder;
              return {
                ...p,
                penaltyOrder: newPenalizedCount,
                firstPenaltyOrder,
                score: calculateScore(p, randomTechnique.difficulty),
              };
            } else {
              return {
                ...p,
                score: p.score + randomTechnique.difficulty,
              };
            }
          }
          return p;
        }),
        round: prev.round + 1,
        gameHistory: [
          ...prev.gameHistory,
          `${randomPlayer.name} (${randomPlayer.number}) sử dụng kỹ thuật ${randomTechnique.name} - ${resultText}${
            isSuccessful ? ` (+${randomTechnique.difficulty} điểm)` : ` (thứ tự bị phạt: ${newPenalizedCount})`
          }`,
        ],
      };
    });
  };

  const columns = [
    {
      title: 'Hạng',
      key: 'rank',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên cầu thủ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số áo',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      key: 'score',
      sorter: (a: Player, b: Player) => b.score - a.score,
    },
    {
      title: 'Thứ tự bị phạt',
      dataIndex: 'penaltyOrder',
      key: 'penaltyOrder',
    },
  ];

  return (
    <div className='p-8'>
      <Card title='Ghost Football Game' className='mb-8'>
        {gameState.players.length === 0 ? (
          <>
            <Form onFinish={initializeGame} className='flex flex-wrap gap-4' layout='vertical'>
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className='flex gap-4 mb-4'>
                  <Form.Item
                    name={['players', index, 'name']}
                    label={`Tên cầu thủ thứ ${index + 1}`}
                    rules={[
                      { required: true, message: 'Vui lòng nhập tên cầu thủ!' },
                      { pattern: /^[a-zA-Z0-9\s]+$/, message: 'Tên chỉ được chứa chữ cái, số và khoảng trắng!' },
                    ]}
                  >
                    <Input placeholder={`Player ${index + 1} Name`} />
                  </Form.Item>
                  <Form.Item
                    name={['players', index, 'number']}
                    label={`Số áo cầu thủ thứ ${index + 1}`}
                    rules={[
                      { required: true, message: 'Vui lòng nhập số áo!' },
                      { pattern: /^[1-9][0-9]?$/, message: 'Số áo phải từ 1-99!' },
                    ]}
                  >
                    <Input placeholder={`Number player ${index + 1}`} type='number' />
                  </Form.Item>
                </div>
              ))}
              <Button type='primary' htmlType='submit' className='mt-7'>
                Bắt đầu trò chơi
              </Button>
            </Form>
          </>
        ) : (
          <div>
            <div className='flex gap-4 mb-4'>
              <Button onClick={playRound} disabled={gameState.isGameOver} type='primary'>
                Chơi vòng đấu {gameState.round}
              </Button>
              <Button onClick={resetGame} danger>
                Chơi lại
              </Button>
            </div>

            <Table
              dataSource={[...gameState.players].sort((a, b) => b.score - a.score)}
              columns={columns}
              rowClassName={(_, index) => (index < 3 ? 'font-bold bg-yellow-100' : '')}
            />

            <div className='mt-8 flex items-center justify-between'>
              <div>
                <h3>Thống kê kỹ thuật được sử dụng</h3>
                <BarChart
                  width={500}
                  height={300}
                  data={Object.entries(gameState.techniquesUsed).map(([name, count]) => ({
                    name,
                    count,
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='count' fill='#8884d8' />
                </BarChart>
              </div>

              <div className=''>
                <h3>Lịch sử thi đấu</h3>
                <ul>
                  {gameState.gameHistory.map((event, index) => (
                    <li key={index}>
                      {`Vòng đấu ${index + 1}`}: {event}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GhostFootball;

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Spain } from '~/assets/svg';

const SpainChart = () => {
  const data = [
    { minutes: '', value: 0 },
    { minutes: "'10", value: 0 },
    { minutes: "'13", value: 0 },
    { minutes: "'14", value: 30 },
    { minutes: "'16", value: 35 },
    { minutes: "'17", value: 48 },
    { minutes: "'19", value: 10 },
    { minutes: "'20", value: 1 },
    { minutes: '', value: 66 },
    { minutes: '', value: 10 },
    { minutes: "'22", value: 1 },
    { minutes: '', value: 0 },
  ];

  const SpainFlag = () => (
    <div className='flex lg:gap-8 gap-4 md:gap-16 mb-5 justify-center'>
      {[...Array(8)].map((_, index) => (
        <Spain className='w-4 h-4 md:w-6 md:h-6' key={index} />
      ))}
    </div>
  );

  const customizeDot = (props: any): JSX.Element => {
    const { cx, cy, value } = props;

    const isValidValue = Array.isArray(value) && value.length === 2;
    const isZero = isValidValue && value.every((v) => v === 0);

    return (
      <>
        {isValidValue && (
          <circle
            cx={cx || 0}
            cy={cy || 0}
            r={isZero ? 0 : 5}
            stroke='#2187E5'
            strokeWidth={isZero ? 0 : 2}
            fill='#fff'
            fillOpacity={isZero ? 0 : 1}
          />
        )}
      </>
    );
  };

  return (
    <div className='bg-custom-gradient-chart md:max-w-3xl border-[#09379447] border rounded-md p-2 lg:max-w-md flex flex-col items-center justify-center'>
      <SpainFlag />
      <div className='w-full h-32 md:h-48 lg:w-[450px] lg:h-[200px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data} className='ml-2'>
            <CartesianGrid strokeDasharray='3 3' stroke='#444' vertical={false} />
            <XAxis dataKey='minutes' axisLine={false} tickLine={false} stroke='#fff' />
            <YAxis
              ticks={[22, 44, 66]}
              domain={[66]}
              orientation='right'
              axisLine={false}
              tickLine={false}
              stroke='#fff'
              tickFormatter={(tick) => `${tick} M`}
            />
            <Tooltip />
            <Area type='linear' dataKey='value' dot={customizeDot} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpainChart;

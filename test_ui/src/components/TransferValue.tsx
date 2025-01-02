import { Chelse, Lines, Rectangle } from '~/assets/svg';
import SpainChart from './Chart';

interface LoanData {
  team: string;
  date: string;
  status: string;
}

const loanHistory: LoanData[] = [
  { team: 'Chelsea', date: '30 Jun 2020', status: 'End of loan' },
  { team: 'Chelsea', date: '30 Jun 2020', status: 'End of loan' },
  { team: 'Chelsea', date: '30 Jun 2020', status: 'End of loan' },
  { team: 'Chelsea', date: '30 Jun 2020', status: 'End of loan' },
  { team: 'Chelsea', date: '30 Jun 2020', status: 'End of loan' },
];

const TransferValueHistory = () => {
  return (
    <div className='max-w-6xl mx-auto w-full bg-[#0F1230] text-white rounded-md'>
      <div className='grid grid-cols-1 lg:grid-cols-2  gap-4'>
        <div className='p-4'>
          <h2 className='text-lg font-semibold mb-4'>TRANSFER VALUE</h2>

          <SpainChart />

          <div className='flex flex-col gap-6 text-sm text-gray-400 p-2'>
            <div className='flex items-center justify-between gap-2'>
              <p className='flex items-center gap-1'>
                <Lines className='w-4 h-4 md:w-5 md:h-5' />
                Current player value
              </p>
              <span className='text-[#AAAAAA]'>11.6M $</span>
            </div>
            <div className='flex items-center justify-between gap-2'>
              <p className='flex items-center gap-1'>
                <Rectangle className='w-4 h-4 md:w-5 md:h-5' />
                Transfer fee
              </p>
              <span className='text-[#AAAAAA]'>(Highest) 66M</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center border-t md:border-l md:border-t-0 border-[#171B2E] space-y-4 p-4'>
          {loanHistory.map((loan, index) => (
            <div key={index} className='w-full flex items-center justify-between border-b border-[#171B2E] pb-4'>
              <div className='w-full flex items-center gap-3'>
                <div className='w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0'>
                  <Chelse className='w-full h-full object-cover' />
                </div>
                <div className='w-full min-w-0'>
                  <div className='w-full font-medium flex items-center justify-between text-sm md:text-base'>
                    <span className='truncate'>{loan.team}</span>
                    <span className='text-green-500 ml-2'>-</span>
                  </div>
                  <div className='w-full text-xs md:text-sm text-[#AAAAAA] flex items-center justify-between'>
                    <span className='truncate'>{loan.date}</span>
                    <span className='text-green-500 ml-2 truncate'>{loan.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferValueHistory;

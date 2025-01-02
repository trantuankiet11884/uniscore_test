import { Avatar } from 'antd';
import { Logo, Sport, User } from '~/assets/svg';

const Header = () => {
  return (
    <header className='bg-custom-gradient w-full'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center justify-between h-14'>
          <div className='flex items-center space-x-6'>
            <Logo className='cursor-pointer' />

            <div className='hidden md:flex items-center space-x-1'>
              <Sport className='cursor-pointer' />
            </div>
          </div>

          <Avatar src={<User />} className='cursor-pointer w-9 h-9 bg-[#02020F26]' />
        </div>
      </div>
    </header>
  );
};

export default Header;

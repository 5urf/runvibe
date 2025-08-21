import Link from "next/link";

const Header = () => {
  return (
    <header className='px-6 py-4 bg-white/40 backdrop-blur-md shadow-sm'>
      <div className='max-w-4xl mx-auto'>
        <Link
          href='/'
          className='text-2xl font-bold bg-gradient-to-r from-primary-500 to-pink-500 bg-clip-text text-transparent hover:from-primary-600 hover:to-pink-600 transition-all duration-200'
        >
          🏃‍♂️ RunVibe
        </Link>
      </div>
    </header>
  );
};

export default Header;

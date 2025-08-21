const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white/30 backdrop-blur-md shadow-sm mt-auto'>
      <div className='max-w-4xl mx-auto px-6 py-6'>
        <div className='text-center text-sm text-gray-600/80 space-y-2'>
          <p className='font-medium'>
            © {currentYear} RunVibe. All Rights Reserved.
          </p>
          <p className='text-gray-500/70'>
            Built by{" "}
            <span className='font-semibold bg-gradient-to-r from-primary-500 to-pink-500 bg-clip-text text-transparent'>
              5urf
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

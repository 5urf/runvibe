const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-50 border-t border-gray-200 mt-auto'>
      <div className='max-w-4xl mx-auto px-6 py-6'>
        <div className='text-center text-sm text-gray-500 space-y-2'>
          <p>© {currentYear} RunVibe. All Rights Reserved.</p>
          <p>Built by 5urf</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

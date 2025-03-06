import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="absolute bottom-2 w-full text-center text-sm text-gray-400" suppressHydrationWarning={true}>
      © {new Date().getFullYear()} By{' '}
      <Button variant="link" className="p-0 text-white">
        <a href="https://github.com/yashksaini-coder" target='_blank' className='hover:bg-violet-600 hover:text-black rounded-none'>Yash K. Saini</a>
      </Button>
    </footer>
  );
};
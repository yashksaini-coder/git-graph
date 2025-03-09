import { Github, Twitter, Linkedin, Coffee } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full py-4 sm:py-6 mt-auto text-center text-xs sm:text-sm text-gray-400 border-t border-gray-800" suppressHydrationWarning={true}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <a 
              href="https://github.com/yashksaini-coder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={16} className="sm:size-[18px]" />
            </a>
            <a 
              href="https://x.com/yash_k_saini" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-slate-800 transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter size={16} className="sm:size-[18px]" />
            </a>
            <a 
              href="https://www.linkedin.com/in/yashksaini/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} className="sm:size-[18px]" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center items-center text-gray-400 text-xs sm:text-sm">
            <span>© {new Date().getFullYear()}</span>
            <span className="mx-1">·</span>
            <span className="flex items-center flex-wrap justify-center">
              Made with <Coffee size={10} className="text-red-500 mx-1 sm:size-[12px]" fill="currentColor" /> by 
              <div className='ml-1 sm:ml-2 hover:bg-violet-600 hover:text-white px-1 rounded transition-colors'>Yash K. Saini</div>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
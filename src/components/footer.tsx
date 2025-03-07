import { Github, Twitter, Linkedin, Coffee } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto text-center text-sm text-gray-400" suppressHydrationWarning={true}>
      <div className="mb-12 flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://github.com/yashksaini-coder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://x.com/yash_k_saini" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-slate-800 transition-colors"
            aria-label="Twitter Profile"
          >
            <Twitter size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/yashksaini/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
        </div>
        <div className="flex items-center text-gray-400 text-xs sm:text-sm">
          <span>© {new Date().getFullYear()}</span>
          <span className="mx-1">·</span>
          <span className="flex items-center">
            Made with <Coffee size={12} className="text-red-500 mx-1" fill="currentColor" /> by 
            <div className='ml-2 hover:bg-violet-600 hover:text-white'>Yash K. Saini</div>
          </span>
        </div>
      </div>
    </footer>
  );
};
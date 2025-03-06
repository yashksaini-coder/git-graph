import { Github, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full text-center text-sm" suppressHydrationWarning={true}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://github.com/yashksaini-coder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={18} />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Twitter size={18} />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>
        <div className="flex items-center text-gray-400 text-xs sm:text-sm">
          <span>© {new Date().getFullYear()}</span>
          <span className="mx-1">·</span>
          <span className="flex items-center">
            Made with <Heart size={12} className="text-red-500 mx-1" /> by 
            <a 
              href="https://github.com/yashksaini-coder" 
              target="_blank" 
              className="text-purple-400 hover:text-white ml-1 hover:underline font-medium"
            >
              Yash K. Saini
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
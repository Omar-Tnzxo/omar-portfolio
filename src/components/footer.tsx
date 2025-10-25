import { SOCIALS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Footer
const Footer = () => {
  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-6 sm:py-8 bg-primary border-t border-t-secondary/5"
      )}
    >
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 max-w-7xl mx-auto">
        {/* Copyright Text */}
        <p className="text-white text-xs sm:text-sm md:text-md font-bold text-center sm:text-left order-2 sm:order-1">
          &copy; Omar Hassan {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Social Links - Visible on all screen sizes */}
        <ul className="list-none flex flex-row gap-4 sm:gap-6 md:gap-10 order-1 sm:order-2">
          {SOCIALS.map((social) => (
            <li
              key={social.name}
              className="text-secondary font-poppins font-medium cursor-pointer text-[16px] opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <a 
                href={social.link} 
                target="_blank" 
                rel="noreferrer noopener"
                aria-label={social.name}
              >
                <img 
                  src={social.icon} 
                  alt={social.name} 
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" 
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Footer;

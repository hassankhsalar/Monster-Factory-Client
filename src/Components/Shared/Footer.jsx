import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';
import logo from '/logo.png'
import { Link } from 'react-router-dom';
const Footer = () => {

    const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <footer className="px-4 divide-y bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-slate-400">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-24 h-12 rounded-full dark:bg-white">
              <img src={logo} alt="" />
            </div>
            <span className="self-center text-2xl font-semibold">
              Monster Factory
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-slate-400">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <button onClick={() => scrollToSection("featured")}>
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("integrations")}>
                Integrations
                </button>
              </li>
              <li>
                <Link to='/bookedtrainer'>
                Pricing
                </Link>
              </li>
              <li>
                <Link to='/jobs'>
                jobs
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-slate-400">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="https://github.com/hassankhsalar/Monster-Factory-Client">
                  Privacy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="https://github.com/hassankhsalar/Monster-Factory-Client">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-slate-400">Developers</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="https://github.com/hassankhsalar/Monster_Factory-Server">
                  Public API
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="https://github.com/hassankhsalar/Monster-Factory-Client">
                  Documentation
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="https://github.com/hassankhsalar/Monster-Factory-Client">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-slate-400">Social media</div>
            <div className="flex justify-start space-x-3">
              <a
                rel="noopener noreferrer"
                href="https://www.facebook.com/protyasha.alixy.5/"
                title="Facebook"
                className="flex items-center p-1"
              >
                <FaFacebook className="w-5 h-5 fill-current"></FaFacebook>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://x.com/?lang=en&mx=2"
                title="Twitter"
                className="flex items-center p-1"
              >
                <FaTwitter className="w-5 h-5 fill-current"></FaTwitter>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.instagram.com/hassan_kh_salar/"
                title="Instagram"
                className="flex items-center p-1"
              >
                <FaInstagram className="w-5 h-5 fill-current"></FaInstagram>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-600">
        © 2025 Company Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

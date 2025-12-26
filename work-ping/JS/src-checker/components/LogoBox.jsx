import { Link } from 'react-router-dom';
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';
import logoSm from '../assets/images/logo-sm.png';

const LogoBox = ({
  containerClassName = '',
  squareLogo = {},
  textLogo = {},
}) => {
  return (
    <div className={containerClassName}>
      {/* Dark Mode */}
      <Link to="/" className="logo-dark d-flex align-items-center justify-content-center">
        <img
          src={logoSm}
          alt="logo-sm"
          height={squareLogo.height || 30}
          width={squareLogo.width || 20}
          className={squareLogo.className || 'me-1'}
        />
        <img
          src={logoDark}
          alt="logo-dark"
          height={textLogo.height || 22}
          width={textLogo.width || 70}
          className={textLogo.className || ''}
        />
      </Link>

      {/* Light Mode */}
      <Link to="/" className="logo-light d-flex align-items-center justify-content-center">
        <img
          src={logoSm}
          alt="logo-sm"
          height={squareLogo.height || 30}
          width={squareLogo.width || 20}
          className={squareLogo.className || 'me-1'}
        />
        <img
          src={logoLight}
          alt="logo-light"
          height={textLogo.height || 22}
          width={textLogo.width || 70}
          className={textLogo.className || ''}
        />
      </Link>
    </div>
  );
};

export default LogoBox;

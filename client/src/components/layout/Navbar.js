import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  const { fetchUser, auth } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const renderLoginLogoutProfileLink = () => {
    switch (auth) {
      case null:
        return '-';
      case false:
        return <a href="/auth/google">Login with Google</a>;
      default:
        return <a href="/auth/logout">{auth.email}</a>;
    }
  };

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>{renderLoginLogoutProfileLink()}</li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'MemBox',
  icon: 'fas fa-box-open'
};

export default Navbar;

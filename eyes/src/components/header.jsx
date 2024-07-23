import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css'; // Ensure this file exists and contains the necessary styles

function Header({ newReportCount, unsolvedReportCount }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/reports');
  };

  return (
    <div>
      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <div className="logo-wrapper">
                  <a href="/" className="log">SafeEyes</a>
                </div>
                <ul className="nav">
                  <li><a href="/" className="active">Objects</a></li>
                  <li><a href="/courses">Employees</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                  <li className="notification-item">
                    <button onClick={handleButtonClick} className="main-white-button notification-button">
                      Show Reports
                      {newReportCount > 0 && <span className="notification-badge new-reports">{newReportCount}</span>}
                      {newReportCount === 0 && unsolvedReportCount > 0 && <span className="notification-badge unsolved-reports">{unsolvedReportCount}</span>}
                    </button>
                  </li>
                </ul>
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

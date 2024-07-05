import React from 'react';

function Header({ onButtonClick }) {
  return (
    <div>
      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="index.html" className="logo"></a>
                <ul className="nav">
                  <li><a href="index.html" className="active">Objects</a></li>
                  <li><a href="category.html">Employees</a></li>
                  <li><a href="contact.html">Contact Us</a></li>
                  <li>
                    <button onClick={onButtonClick} className="main-white-button">
                      <i className="fa fa-plus"></i> Show Items
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

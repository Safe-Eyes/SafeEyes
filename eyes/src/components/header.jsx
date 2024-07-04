import React from 'react'

function header() {
  return (
    <div>
        <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            {/* ***** Logo Start ***** */}
            <a href="index.html" className="logo">
            </a>
            {/* ***** Logo End ***** */}
            {/* ***** Menu Start ***** */}
            <ul className="nav">
              <li><a href="index.html" className="active">Objects</a></li>
              <li><a href="category.html">Employees</a></li>
              <li><a href="contact.html">Contact Us</a></li> 
              {/*<li><div className="main-white-button"><a href="#"><i className="fa fa-plus"></i> Add Your Listing</a></div></li> */}
            </ul>        
            <a className='menu-trigger'>
                <span>Menu</span>
            </a>
            {/* ***** Menu End ***** */}
          </nav>
        </div>
      </div>
    </div>
    </header>
    </div>
  )
}

export default header
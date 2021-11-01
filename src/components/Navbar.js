import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#9867C5'}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Students System</a>
                <div className="d-flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Students List</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Home</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
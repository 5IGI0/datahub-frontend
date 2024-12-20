import { NavLink } from "react-router-dom"

function MainNavbar({ }) {
    return <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink className="navbar-brand ms-3" to="/">Datahub</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/http_services">HTTP Services</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/subdomains">Subdomains</NavLink>
                </li>
            </ul>
        </div>
    </nav>
}

export default MainNavbar
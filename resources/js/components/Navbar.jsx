import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate('')
    const handleLogout = async (e) => {
        try {
        const response = await axios.post('api/logout', null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
          });

          if (response.status === 200) {
            console.log(response.data.message);

            localStorage.clear()

          navigate('/login');
        }} catch (error) {
          console.error('Logout failed:', error);
        }
      };
      
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="#" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <b className="text-light">Hostelator</b>
        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
          <use xlinkHref="#bootstrap"></use>
        </svg>
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" className="nav-link px-2 link-light">Home</a></li>
        <li><a href="#" className="nav-link px-2 link-light">Apartments</a></li>
        <li><a href="#" className="nav-link px-2 link-light">Pricing</a></li>
      </ul>

      <div className="col-md-3 text-end">
      <Link to="/logout"><button type="button" className="btn btn-outline-light me-2" onClick={() => handleLogout()}>Sign out</button></Link>
        {/* <button type="submit" className="btn btn-primary">Sign-up</button> */}
      </div>
    </header>
  );
}

export default NavBar;

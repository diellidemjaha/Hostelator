import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function RegisterForm() {

    const navigate = useNavigate('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/registerUser', formData);

            if (response.status === 201) {
                console.log('Registration successful');

                navigate('/login');

            }
        } catch (error) {
            console.error('Login error:', error);
            console.log('Error response data:', error.response?.data); }
    };

  return (
    <section className="vh-100" style={{ backgroundColor: "blueviolet" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={(e) => handleSubmit(e)} method="POST" action="/registerUser">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0 login-title">Hostelator</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                        Register to use Hostelator
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          name="name" // Add name attribute
                          onChange={(e) => { handleChange(e) }}
                        />
                        <label className="form-label">Name</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          name="email" // Add name attribute
                          onChange={(e) => { handleChange(e) }}
                        />
                        <label className="form-label">Email address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          name="password" // Add name attribute
                          onChange={(e) => { handleChange(e) }}
                        />
                        <label className="form-label">Password</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-primary btn-lg btn-block" type="submit">
                          Sign up
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Already have an account? <Link to="/login" style={{ color: "#393f81" }}> Sign in here</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;

import { useState } from 'react';
import { adminLogin , adminRegister } from '../apiCall';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(); // Check for errors before submission

    if (Object.keys(errors).length === 0) {

      adminLogin(formData);
     
      // adminRegister(formData)
      // Submit form data (e.g., send to server using fetch or axios)
      console.log('Submitting form data:', formData);
      // Clear form or redirect to success page
    } else {
      setValidationErrors(errors); // Display validation errors
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Invalid email format")

      errors.email = 'Invalid email format';
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters")
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  };

  return (
    <section className="h-100 mt-5">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Admin Login</h1>

                <form
                  method="POST"
                  className="needs-validation"
                  noValidate=""
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">
                      E-Mail Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                    {validationErrors.email && (
                      <div className="invalid-feedback">{validationErrors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.password && (
                      <div className="invalid-feedback">{validationErrors.password}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn btn-primary px-4">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-center mt-5 text-muted">
              Copyright &copy; 2024 &mdash; Ensure safe consultancy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

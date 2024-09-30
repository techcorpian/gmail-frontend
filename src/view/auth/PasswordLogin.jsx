import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomInput from '../shared/components/CustomInput';
import AuthLayout from '../shared/UIElements/AuthLayout';

const PasswordLogin = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(email, password).then(
      () => {
        navigate('/');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 ">

              <AuthLayout handleNext={handleLogin} header='Sign in' content='to continue to Gmail' message={message}>
                {/* <CustomInput type='text' label='Email or Phone' id='email' value={email} setValue={setEmail} /> */}
                <CustomInput type='password' label='Password' id='password' value={password} setValue={setPassword} />
              </AuthLayout>

    </div>
  );
};

export default PasswordLogin;

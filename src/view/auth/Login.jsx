import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../shared/components/CustomInput';
import AuthLayout from '../shared/UIElements/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (email) {
        navigate('/password', { state: { email } });
        setEmail(email);
    }
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);
    }
};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 ">

              <AuthLayout handleNext={handleNext} header='Sign in' content='to continue to Gmail' message={message} button2="Create Account">
                <CustomInput type='text' label='Email or Phone' id='email' value={email} setValue={setEmail} />
                {/* <CustomInput type='password' label='Password' id='password' value={password} setValue={setPassword} /> */}
              </AuthLayout>

    </div>
  );
};

export default Login;

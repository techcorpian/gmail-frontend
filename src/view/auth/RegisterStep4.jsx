import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomInput from '../shared/components/CustomInput';
import AuthLayout from '../shared/UIElements/AuthLayout';
import Slider from '../shared/UIElements/Slider';
import axios from 'axios'; // Ensure axios is imported

const RegisterStep3 = () => {
    const [password, setPassword] = useState('');
    const [conpassword, setConPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { firstname, lastname, gender, month, day, year, email } = location.state || {};

    const handleFinish = async () => { // Added async keyword here
        try {
            const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/register`, {
                firstname,
                lastname,
                gender,
                month,
                day,
                year,
                email,
                password
            });
            console.log(res.data); // Handle registration success
            navigate('/success'); // Redirect to a success page (replace with your route)
        } catch (err) {
            console.error(err.response?.data || err.message); // Handle error and null-safe access to response data
        }
    };

    return (
        <Slider>
            <div key="step4" className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <AuthLayout handleNext={handleFinish} header='Create a strong password' content='Create a strong password with a mix of letters, numbers and symbols'>
                    {/* <CustomInput id='firstname' type='text' label='First Name' value={firstname} setValue={setFirstname} />
                    <CustomInput id='lastname' type='text' label='Last Name (optional)' value={lastname} setValue={setLastname} /> */}
                    <CustomInput id='password' type='password' label='Password' value={password} setValue={setPassword} />
                    <CustomInput id='conpassword' type='password' label='Confirm Password' value={conpassword} setValue={setConPassword} />
                </AuthLayout>
            </div>
        </Slider>
    );
};

export default RegisterStep3;

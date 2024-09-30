import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomInput from '../shared/components/CustomInput';
import AuthLayout from '../shared/UIElements/AuthLayout';
import Slider from '../shared/UIElements/Slider';

const RegisterStep3 = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { firstname, lastname, gender, month, day, year } = location.state || {};

    const handleNext = () => {
        if (email) {
            navigate('/step4', { state: { firstname, lastname, gender, month, day, year, email } });
            setEmail(email);
        }
    };

    return (
        <Slider>
            <div key="step3" className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <AuthLayout handleNext={handleNext} header='Choose your Gmail address' content='Pick a Gmail address or create your own'>
                    {/* <CustomInput id='firstname' type='text' label='First Name' value={firstname} setValue={setFirstname} />
                    <CustomInput id='lastname' type='text' label='Last Name (optional)' value={lastname} setValue={setLastname} /> */}
                    <div className='flex gap-4 text-xl items-center'>
                        <input type='radio' className='w-5 h-5' checked/> {/* Adjust the width and height */}
                        <span>Create your own Gmail address</span>
                    </div>
                    <hr className='border border-gray-300'/>
                    <CustomInput id='email' type='email' label='Create a Gmail address' value={email} setValue={setEmail} />
                </AuthLayout>
            </div>
        </Slider>
    );
};

export default RegisterStep3;

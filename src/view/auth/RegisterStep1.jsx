import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../shared/components/CustomInput';
import AuthLayout from '../shared/UIElements/AuthLayout';
import Slider from '../shared/UIElements/Slider';

const RegisterStep1 = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        if (firstname, lastname) {
            navigate('/step2', { state: { firstname, lastname } });
            setFirstname(firstname);
            setLastname(lastname)
        }else{
            const error = "Enter The Details";
        }
    };

    return (
        <Slider>
            <div key="step1" className="flex flex-col justify-center items-center min-h-screen bg-gray-100 ">
                <AuthLayout handleNext={handleNext} header='Create a Google Account' content='Enter Your Name'>
                    <CustomInput id='firstname' type='text' label='First Name' value={firstname} setValue={setFirstname} />
                    <CustomInput id='lastname' type='text' label='Last Name (optional)' value={lastname} setValue={setLastname} />
                    <label className={`hidden ${firstname ? 'hidden' : 'block text-red-300'}`}>asdsadsadsadasdsad</label>
                </AuthLayout>
            </div>
        </Slider>
    );
};

export default RegisterStep1;

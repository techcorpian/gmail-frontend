import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from '../shared/UIElements/Slider';
import CustomDropdown from '../shared/components/CustomDropdown';
import CustomInput from '../shared/components/CustomInput';
import AuthLayout from '../shared/UIElements/AuthLayout';

const RegisterStep2 = () => {
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')
    const monthOpt = [
        { value: '', label: '' },
        { value: '1', label: 'January' },
        { value: '2', label: 'Febraury' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    const [gender, setGender] = useState('')
    const genderOpt = [
        { value: '', label: '' },
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
        { value: 'rathernotsay', label: 'Rather Not Say' }
    ];

    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { firstname, lastname } = location.state || {};

    const handleNext = () => {
        if ( gender, month, day, year) {
            navigate('/step3', { state: { firstname, lastname, gender, month, day, year } });
        }
    };

    return (
        <Slider>
            <div key="step2" className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <AuthLayout handleNext={handleNext} header='Basic Information' content='Enter Your Birthday and Gender'>
                    <div className='flex flex-col gap-5'>
                    <div className='flex justify-end gap-6 items-center'>
                        <CustomDropdown options={monthOpt} label='Month' value={month} setValue={setMonth}/>
                        <CustomInput id='firstname' type='text' label='Day' value={day} setValue={setDay} />
                        <CustomInput id='lastname' type='text' label='Year' value={year} setValue={setYear} />
                    </div>
                    <CustomDropdown options={genderOpt} label='Gender' value={gender} setValue={setGender}/>
                    </div>
                </AuthLayout>
            </div>
        </Slider>
    );
};

export default RegisterStep2;

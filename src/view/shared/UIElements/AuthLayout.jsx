import React from 'react'
import { Link } from 'react-router-dom'
import GoogleLogo from '../components/GoogleLogo';

const AuthLayout = ({ children, handleNext, header, content, message, button2 }) => {
    return (
        <>
            <div className="w-full max-w-5xl p-8 bg-white rounded-3xl">
                <GoogleLogo />
                <div className='flex justify-between mt-3 items-start'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='text-4xl'>{header}</div>
                        <div>{content}</div>
                    </div>
                    <div className='flex flex-col gap-3 w-full justify-end'>
                        {children}
                        {message && (
                            <div className="text-center text-red-400 p-1">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <div className='flex mt-16 float-right'>
                    {button2 ? <Link to='/register' className='py-3 px-6 text-sm'>{button2}</Link> : ''}
                    <button className='py-3 px-6 text-sm bg-blue-800 rounded-full text-white font-semibold' onClick={handleNext}>Next</button>
                </div>
            </div>
            <div className='flex justify-between w-full max-w-5xl p-4 text-xs'>
                <div>English (United States)</div>
                <div className='flex gap-9'>
                    <div>Help</div>
                    <div>Privacy</div>
                    <div>Terms</div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout
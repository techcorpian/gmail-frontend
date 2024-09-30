import React from 'react';
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
    <div className="flex flex-col items-center w-full max-w-sm p-8 bg-white rounded shadow gap-4">
        <h2 className="text-6xl font-semibold text-center mb-4">Error 404!</h2>
        {/* <p className="text-center">Please Try Again</p> */}
        <Link to='/' className='bg-gray-300 px-6 py-1 rounded-full text-lg'>Go to Homepage</Link>
    </div>
</div>
  );
};

export default NotFoundPage;
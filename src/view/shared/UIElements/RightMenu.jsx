import React from 'react'

const RightMenu = () => {
    const RightMenuImg = [
        {
            url: 'https://www.gstatic.com/companion/icon_assets/calendar_2020q4_2x.png',
            link: ''
        },
        {
            url: 'https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png',
            link: ''
        },
        {
            url: 'https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png',
            link: ''
        },
        {
            url: 'https://www.gstatic.com/companion/icon_assets/contacts_2022_2x.png',
            link: ''
        },

        
    ]
    return (
        <div className='flex flex-col'>
            {RightMenuImg.map((image) => (
                <div className='p-3 m-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <img src={image.url} alt="" className=' w-[1.5rem]' />
                </div>
            ))}

        </div>
    )
}

export default RightMenu
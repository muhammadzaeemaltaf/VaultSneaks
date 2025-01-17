import React from 'react'
import Left from './Left'
import Right from './Right'

const Checkout = () => {
  return (
    <div className='py-10 mb-8'>
            <div className="max-w-[880px] mx-auto">
                <div className="flex flex-col px-2 gap-6 lg:flex-row lg:gap-0 lg:px-0">
                    <Left />
                    <Right />
                </div>
            </div>
    </div>
  )
}

export default Checkout
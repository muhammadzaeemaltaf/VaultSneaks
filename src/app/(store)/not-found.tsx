import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className='py-10'>
            <div className="container">
                <div className="flex flex-col items-center gap-4">
                <Info className='h-[100px] w-[100px]'/>
                    <h1 className='font-bold text-4xl text-center'>Page Not Found</h1>
                    <p className='text-lg text-[#8D8D8D] text-center'>Oops! The page you are looking for doesn't exist or has been moved.</p>
                    <Button className='bg-black rounded-full h-[56px] max-w-[280px] w-full'>
                        <Link href={"/"}>
                        Back to Homepage
                        </Link>
                    </Button>
                </div>
            </div>
    </div>
  )
}

export default notFound
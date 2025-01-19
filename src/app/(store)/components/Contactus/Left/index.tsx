import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DislikeIcon, LikeIcon } from '@/app/data'

const Left = () => {
  return (
    <div className="px-6 text-[#111111] max-w-[939.75px]">
    <h1 className="text-[28px] font-[500] mb-6">WHAT PAYMENT OPTIONS CAN I USE ON NIKE ORDERS?</h1>
    <p className="text-[15px] mb-4">
      We want to make buying your favorite Nike shoes and gear online fast and easy, and we accept the following
      payment options:
    </p>
    <ul className="mb-4 space-y-4 pl-8">
      <li>Visa, Mastercard, Diners Club, Discover, American Express, Visa Electron, Maestro</li>
      <li>
        If you enter your PAN information at checkout, you’ll be able to pay after with PayTM or a local credit or
        debit card.
      </li>
      <li>Apple Pay</li>
    </ul>
    <p className="text-base mb-4">
      <span className='font-[500] underline'>Nike Members</span> can store multiple debit or credit cards in their profile for faster checkout. If you’re not
      already a Member, <Link href="#" className="font-[500] underline">join us</Link>{" "}today.
    </p>
    <div className="flex gap-4 mb-8">
      <Button className="bg-black text-white w-[106.13px] h-[39px] py-2 rounded-full">JOIN US</Button>
      <Button className="bg-black text-white w-[129.84px] h-[39px] py-2 rounded-full">SHOP NIKE</Button>
    </div>
    <h2 className="text-xl font-[500] mb-4">FAQs</h2>
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-base mb-2">Does my card need international purchases enabled?</h3>
        <p className='text-base'>
          Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at
          checkout if international purchases need to be enabled.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-base mb-2">Can I pay for my order with multiple credit or debit cards?</h3>
        <p className='text-base'>
          No, payments can’t be split between multiple payment methods.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-base mb-2">What payment methods are accepted for SNKRS orders?</h3>
        <p className='text-base'>
          We use the same payment methods accepted on Nike orders.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-base mb-2">Why can’t I see Apple Pay as an option?</h3>
        <p className='text-base'>
          To use Apple Pay as an option in the Nike App or on Nike.com, you’ll need to use a compatible Apple device
          running the latest version of iOS or macOS and have a supported card in your Wallet. Additionally, you need
          to use Safari to use Apple Pay on Nike.com.
        </p>
      </div>
    </div>
    <div className="space-y-2 mt-8">
        <h2 className='text-[15px]'>Was this answer helpful?</h2>
        <div className='flex gap-2'>
            <span>{LikeIcon}</span>
            <span>{DislikeIcon}</span>
        </div>
    </div>
    <div className="mt-8 space-y-2">
      <h3 className="text-base font-[500] text-[#757575]">RELATED</h3>
      <ul className=" underline pl-8 space-y-4">
        <li><a href="#" className='text-base font-medium text-black'>WHAT ARE NIKE’S DELIVERY OPTIONS?</a></li>
        <li><a href="#" className='text-base font-medium text-black'>HOW DO I GET FREE DELIVERY ON NIKE ORDERS?</a></li>
      </ul>
    </div>
  </div>  )
}

export default Left
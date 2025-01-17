import Link from "next/link"
import { FacebookIcon, InstagramIcon, LocationIcon, TwitterIcon, YoutubeIcon } from "@/app/data"

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="container lg:h-[375px] mx-auto px-4 py-12">
       <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between lg:h-[213px] pt-10">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
          {/* First Column */}
          <div className="space-y-4">
            <Link className="block hover:text-gray-300" href="/stores">
              FIND A STORE
            </Link>
            <Link className="block hover:text-gray-300" href="/membership">
              BECOME A MEMBER
            </Link>
            <Link className="block hover:text-gray-300" href="/signup">
              SIGN UP FOR EMAIL
            </Link>
            <Link className="block hover:text-gray-300" href="/feedback">
              Send Us Feedback
            </Link>
            <Link className="block hover:text-gray-300" href="/student-discounts">
              STUDENT DISCOUNTS
            </Link>
          </div>

          {/* Second Column */}
          <div className="text-xs">
            <h3 className="font-bold mb-4">GET HELP</h3>
            <div className="space-y-4 text-gray-400">
              <Link className="block hover:text-white" href="/order-status">
                Order Status
              </Link>
              <Link className="block hover:text-white" href="/delivery">
                Delivery
              </Link>
              <Link className="block hover:text-white" href="/returns">
                Returns
              </Link>
              <Link className="block hover:text-white" href="/payment">
                Payment Options
              </Link>
              <Link className="block hover:text-white" href="/contact">
                Contact Us On Nike.com Inquiries
              </Link>
              <Link className="block hover:text-white" href="/contact-other">
                Contact Us On All Other Inquiries
              </Link>
            </div>
          </div>

          {/* Third Column */}
          <div className="text-xs">
            <h3 className="font-bold mb-4">ABOUT NIKE</h3>
            <div className="space-y-4 text-gray-400">
              <Link className="block hover:text-white" href="/news">
                News
              </Link>
              <Link className="block hover:text-white" href="/careers">
                Careers
              </Link>
              <Link className="block hover:text-white" href="/investors">
                Investors
              </Link>
              <Link className="block hover:text-white" href="/sustainability">
                Sustainability
              </Link>
            </div>
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="flex lg:justify-end gap-4">
          <Link href="https://twitter.com/nike" className="text-gray-400 hover:text-white">
            {TwitterIcon}
          </Link>
          <Link href="https://facebook.com/nike" className="text-gray-400 hover:text-white">
            {FacebookIcon}
          </Link>
          <Link href="https://youtube.com/nike" className="text-gray-400 hover:text-white">
            {YoutubeIcon}
          </Link>
          <Link href="https://instagram.com/nike" className="text-gray-400 hover:text-white">
            {InstagramIcon}
          </Link>
        </div>
       </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 flex flex-col lg:flex-row h-[85px] lg:h-[62px] justify-between items-start lg:items-center text-gray-400 text-[11px]">
          <div className="flex items-center gap-2">
            <span>{LocationIcon}</span>
            <span className="text-white text-[12px]">India</span>
            <span>© 2023 Nike, Inc. All Rights Reserved</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 lg:mt-0 text-[12px]">
            <Link className="hover:text-white whitespace-nowrap" href="/guides">
              Guides
            </Link>
            <Link className="hover:text-white whitespace-nowrap" href="/terms-of-sale">
              Terms of Sale
            </Link>
            <Link className="hover:text-white whitespace-nowrap" href="/terms-of-use">
              Terms of Use
            </Link>
            <Link className="hover:text-white whitespace-nowrap" href="/privacy-policy">
              Nike Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


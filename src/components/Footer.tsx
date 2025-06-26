import { NavLink } from "react-router"
import Container from "./Container"

const Footer = () => {
  return (
    <footer className="bg-accent px-4 py-[40px] lg:px-[160px]">
      <Container className="flex flex-col gap-y-[60px] text-white">
        <section className="grid gap-12 sm:grid-cols-3 md:grid-cols-4 md:gap-2">
          <div className="flex flex-col gap-[12px] text-body text-[11px]">
            <NavLink to={'#'}>Shop Home Collection</NavLink>
            <NavLink to={'#'}>Gift Cards</NavLink>
            <NavLink to={'#'}>Wynn Stories</NavLink>
            <NavLink to={'#'}>Wynn Slots App</NavLink>
            <NavLink to={'#'}>Mobile App</NavLink>
            <NavLink to={'#'}>Responsible Gaming</NavLink>
          </div>
          <div className="flex flex-col gap-[12px] text-body text-[11px]">
            <NavLink to={'#'}>About Us</NavLink>
            <NavLink to={'#'}>Careers</NavLink>
            <NavLink to={'#'}>Investor Relations</NavLink>
            <NavLink to={'#'}>Privacy Notice</NavLink>
            <NavLink to={'#'}>Cookie Notice</NavLink>
            <NavLink to={'#'}>Terms of Use</NavLink>
            <NavLink to={'#'}>Hotel Information & Directory</NavLink>
          </div>
          <div className="flex flex-col gap-[12px] text-body text-[11px]">
            <NavLink to={'#'}>Wynn Palace Cotai</NavLink>
            <NavLink to={'#'}>Encore Boston Harbor</NavLink>
            <NavLink to={'#'}>Wynn Macau</NavLink>
          </div>
          <div className="flex flex-col gap-[12px] text-body text-[11px]">
            <NavLink to={'#'}>Wynn and Encore Las Vegas</NavLink>
            <NavLink to={'#'}>3131 Las Vegas Blvd. Las Vegas, NV 89109</NavLink>
            <NavLink to={'#'}>+1 (702) 770-7000</NavLink>

            <div className="flex flex-col gap-[6px] mt-[8px]">
              <span>Connect with us.</span>
              <ul className="flex items-center justify-between w-2/3 sm:w-full">
                <li>
                  <NavLink to={'#facebook'} className="rounded-full h-[27px] w-[27px] bg-white flex items-center justify-center">
                    <img src="/assets/facebook-icon.svg" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'#android'} className="rounded-full h-[27px] w-[27px] bg-white flex items-center justify-center">
                    <img src="/assets/android-icon.svg" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'#apple'} className="rounded-full h-[27px] w-[27px] bg-white flex items-center justify-center">
                    <img src="/assets/apple-icon.svg" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'#instagram'} className="rounded-full h-[27px] w-[27px] bg-white flex items-center justify-center">
                    <img src="/assets/instagram-icon.svg" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'#x'} className="rounded-full h-[27px] w-[27px] bg-white flex items-center justify-center">
                    <img src="/assets/x-icon.svg" />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="text-center flex flex-col gap-[10px] text-body">
          <p className="text[12px]">Do Not Sell Or Share My Data</p>
          <p className="text-[11px]">&copy;2024 Wynn Resorts Holdings, LLC. All rights reserved.</p>
        </section>
      </Container>
    </footer>
  )
}

export default Footer
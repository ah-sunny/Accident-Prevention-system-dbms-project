import Banner from "../component/home-Component/Banner"
import ContactUs from "../component/home-Component/ContactUs"
import Faq from "../component/home-Component/Faq"
import Features from "../component/home-Component/Features"
import Testimonial from "../component/home-Component/Testimonial"


export const Home = () => {
  return (
    <div className="container mx-auto space-y-16 mb-10 ">

<div>
        <Banner></Banner>
      </div>
      <div>
        <Features></Features>
      </div>
      <div>
        <Testimonial></Testimonial>
      </div>
      <div>
        <Faq></Faq>
      </div>
      <div>
        <ContactUs></ContactUs>
      </div>

    </div>
  )
}

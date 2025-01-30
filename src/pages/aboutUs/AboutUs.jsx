
const AboutUs = () => {
    return (
        <div className="my-10">
            {/* <div className="text-center mx-auto mb-12 lg:w-[50%]">
        <h1 className="font-bold text-xl lg:text-4xl  mb-3" >About Us</h1>

      </div> */}



            <div className="flex justify-between flex-col lg:flex-row gap-5  shadow-2xl rounded-xl w-[80%] mx-auto">

                {/*  */}
                <div className="lg:w-1/2">
                    <img src="https://i.ibb.co.com/qjffdgL/aboutUs.jpg" alt="" className="" />
                </div>
                {/*  */}
                <div className="text-left lg:w-1/2  p-2 pr-5">

                    <h1 className="font-bold text-xl lg:text-4xl border-b-2 border-dashed border-black pb-2  mb-5" >About Us</h1>
                    <p className="tracking-wide leading-7 ">At Accident Prevention, we’re dedicated to making roads safer by empowering drivers with real-time insights to prevent accidents. Our system identifies high-risk zones, sharp turns, and accident hotspots on your route, displaying historical incident data to heighten awareness. Through GPS technology and dynamic analytics, drivers receive proactive alerts and safety tips—like speed adjustments or weather warnings—to navigate challenges confidently. By merging data-driven intelligence with user-friendly tools, we aim to reduce collisions, foster vigilant driving, and ensure every journey ends safely. Together, let’s transform roads into smarter, safer spaces for all.</p>
                </div>

            </div>

        </div>
    );
};

export default AboutUs;
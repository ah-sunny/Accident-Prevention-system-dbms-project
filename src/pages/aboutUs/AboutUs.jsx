import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Meshbah",
            role: "Full Stack Developer",
            image: "../../../public/meshba.png",
            social: {
                facebook: "#",
                github: "#",
                linkedin: "#",
            }
        },
        {
            name: "Imo",
            role: "Full Stack Developer",
            image: "../../../public/imo.png",
            social: {
                facebook: "#",
                github: "#",
                linkedin: "#",
            }
        },
        {
            name: "Sovnom",
            role: "Full Stack Developer",
            image: "../../../public/sovnom.png",
            social: {
                facebook: "#",
                github: "#",
                linkedin: "#",
            }
        },
    ]
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="rounded-lg overflow-hidden shadow-2xl">
                        <img src="https://i.ibb.co.com/qjffdgL/aboutUs.jpg" alt="About Us" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Our Mission</h2>
                        <p className="mt-4 text-gray-600 text-lg">At Accident Prevention, we’re dedicated to making roads safer by empowering drivers with real-time insights to prevent accidents. Our system identifies high-risk zones, sharp turns, and accident hotspots on your route, displaying historical incident data to heighten awareness. Through GPS technology and dynamic analytics, drivers receive proactive alerts and safety tips—like speed adjustments or weather warnings—to navigate challenges confidently. By merging data-driven intelligence with user-friendly tools, we aim to reduce collisions, foster vigilant driving, and ensure every journey ends safely. Together, let’s transform roads into smarter, safer spaces for all.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Team</h2>
                        <p className="mt-4 text-lg text-gray-600">We are a team of passionate developers dedicated to making a difference.</p>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <div className="text-center p-8 bg-gray-50 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full md:w-1/2">
                            <img src="../../../public/meTransparent.png" alt="Sani" className="w-36 h-40 rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">Sani</h3>
                            <p className="text-gray-600">Full Stack Developer & SQA Developer</p>
                            <div className="mt-4 flex justify-center space-x-4">
                                <a href="#" className="text-gray-400 hover:text-blue-600"><FaFacebook size={24} /></a>
                                <a href="#" className="text-gray-400 hover:text-gray-900"><FaGithub size={24} /></a>
                                <a href="#" className="text-gray-400 hover:text-blue-700"><FaLinkedin size={24} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center p-8 bg-gray-50 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                                <div className="mt-4 flex justify-center space-x-4">
                                    <a href={member.social.facebook} className="text-gray-400 hover:text-blue-600"><FaFacebook size={24} /></a>
                                    <a href={member.social.github} className="text-gray-400 hover:text-gray-900"><FaGithub size={24} /></a>
                                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-700"><FaLinkedin size={24} /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

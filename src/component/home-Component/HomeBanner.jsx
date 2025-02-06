import { Link } from "react-router-dom"

export const HomeBanner = () => {
  return (
    <div
      className="hero h-[500px] bg-center bg-cover rounded-2xl"
      style={{
        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}>
      <div className="hero-overlay bg-opacity-75 rounded-2xl"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-full">
          <h1 className="mb-5 text-5xl font-extrabold">Welcome </h1>
          <p className="mb-5 text-4xl font-semibold">
            Road Accident Survey and prevention system
          </p>
          <p className="w-1/2 mx-auto text-center mt-12 pb-4">Monitor high-speed accident data and identify dangerous zones.
            Take preventive measures to reduce risks and ensure safer roads.
            Drive smart, stay safe, and make every journey secure.</p>
          <Link to="/login" className="btn btn-primary">
            <button className="btn btn-primary">Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

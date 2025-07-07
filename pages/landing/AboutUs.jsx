import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="">
      {/* Section 1 */}
      <section className="flex flex-col px-4 md:px-0 py-8 mt-24">
        <div className="text-center md:text-left mx-4 md:mx-0">
          <h1 className="text-3xl md:text-3xl lg:text-8xl text-black leading-tight font-bold">
            Helping People
            <br />
            Help Each Other
          </h1>
          <Link to="/partner/signup">
            <button className="mt-6 md:mt-12 bg-[#e17153] text-white rounded-3xl px-6 py-3 text-xl">
              Register Now
            </button>
          </Link>
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col lg:flex-row items-center gap-8 px-4 lg:px-0 py-8">
        <div className="text-xl md:text-3xl font-mono leading-relaxed text-black mx-4 lg:mx-0 lg:w-1/2">
          <h2 className="text-black font-bold mb-4">Welcome to CareMate!</h2>
          <p className="text-base md:text-lg text-justify lg:text-left">
            A platform bridging compassionate donors and trusted foundations to
            bring lasting change to the lives of underprivileged children. Our
            partner institutions, including orphanages and child-focused
            foundations, create campaigns to support infrastructure, operational
            needs, and educational aid. By making it easy for donors to select
            and contribute to the campaigns that resonate with them, CareMate
            fosters a community-driven approach to social impact. We recognize
            the importance of transparency and are committed to ensuring that
            every donation goes directly toward meaningful transformation in
            children’s lives.
            <br />
            <br />
            To further engage our donors, CareMate offers a point system where 1
            point is earned for every 10,000 rupiahs donated, with 200 points
            redeemable for tree donations supporting reforestation in Indonesia.
            This unique initiative allows our donors to make a positive
            environmental impact alongside their support for children in need.
            Through CareMate, we aspire to significantly expand access to
            quality education and empower children across Indonesia, helping
            them step into brighter futures while contributing to a greener,
            more sustainable world.
          </p>
        </div>
        <img
          className="w-full lg:w-1/2 rounded-lg"
          src="../src/assets/about us.png"
          alt="About Us Image 1"
        />
      </section>

      {/* Section 3 */}
      <section className="flex flex-col lg:flex-row-reverse items-center gap-8 px-4 md:px-0 py-8">
        <div className="text-xl md:text-3xl leading-relaxed text-left lg:text-right text-black mx-4 lg:mx-0 lg:w-1/2">
          <h2 className="text-black font-bold">How We’re Different</h2>
          <p className="text-base md:text-lg text-justify lg:text-right">
            What sets CareMate apart is our commitment to creating a dual-impact
            donation experience. Beyond traditional giving, we offer a unique
            feature that allows donors to make a lasting environmental impact
            through tree donations. This unique feature allows each contribution
            to benefit both children in need and the environment, transforming
            every donation into a catalyst for positive social and ecological
            change.
          </p>
        </div>
        <img
          className="w-full lg:mt-40 lg:w-1/2 rounded-lg"
          src="../src/assets/about us 1.png"
          alt="About Us Image 2"
        />
      </section>
    </div>
  );
};

export default AboutUs;

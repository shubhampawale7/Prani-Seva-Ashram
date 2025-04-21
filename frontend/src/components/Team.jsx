// src/components/Team.jsx
import Slider from "react-slick";
import teamMembers from "../data/teamData";

const Team = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-amber-700 mb-8 text-center">
        Meet Our Team
      </h2>
      <Slider {...settings}>
        {teamMembers.map((member, idx) => (
          <div key={idx} className="px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-amber-300"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-amber-600 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Team;

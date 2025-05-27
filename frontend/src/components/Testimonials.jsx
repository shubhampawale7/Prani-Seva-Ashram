import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Volunteering at Prani Seva Ashram has been life-changing. Seeing the direct impact on these dogs’ lives is truly inspiring.",
      author: "Riya Sharma, Volunteer",
    },
    {
      quote:
        "The love and care shown at the ashram moved me deeply. It’s a sanctuary not just for animals, but for the soul.",
      author: "Aarav Patel, Donor",
    },
    {
      quote:
        "An incredible experience! The staff is dedicated and every animal is treated with compassion.",
      author: "Neha Verma, Visitor",
    },
    {
      quote:
        "Prani Seva Ashram restored my faith in kindness. A safe haven for all living beings.",
      author: "Kabir Joshi, Supporter",
    },
  ];

  return (
    <div className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-amber-600 mb-5">
        What Our Supporters Say
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        className="custom-swiper"
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-amber-50 p-6 rounded-xl shadow-md mx-4 h-full flex flex-col justify-between">
              <blockquote className="text-gray-700 italic mb-4">
                “{testimonial.quote}”
              </blockquote>
              <footer className="mt-auto font-semibold text-rose-600">
                — {testimonial.author}
              </footer>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;

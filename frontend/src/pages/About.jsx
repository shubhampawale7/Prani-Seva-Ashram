/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import FacebookFeed from "../components/FacebookFeed";

const About = () => {
  const aboutRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  useEffect(() => {
    gsap.from(aboutRef.current, {
      x: -50,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(missionRef.current, {
      x: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from(visionRef.current, {
      y: 60,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="text-gray-800 bg-amber-50 min-h-screen py-16 px-6  lg:px-20  ">
      <div className="max-w-7xl mx-auto grid gap-16">
        {/* About Section */}
        <div
          ref={aboutRef}
          className="border-l-8  border-amber-400 bg-white shadow-xl p-6 sm:p-10 rounded-3xl"
        >
          <h2 className="text-3xl sm:text-4xl  font-bold text-amber-700 mb-6">
            About Us – A Vision Born from Compassion
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            Prani Seva Ashram was founded by Mr. Bharat Gidwani, an Industrial
            Engineer, research scholar, and a passionate innovator dedicated to
            improving the quality of life for both people and animals.
            Throughout his career, Mr. Gidwani has developed groundbreaking
            products designed to uplift the common man, with special emphasis on
            green and eco-friendly products, always striving to make meaningful
            contributions to society.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            However, his most profound innovation may not be technological—it is
            the creation of a haven for the voiceless animals in need.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            His journey toward animal welfare began unexpectedly, yet fatefully,
            on a quiet street where a bruised, abandoned puppy lay, suffering in
            pain, unnoticed by passersby. Something in that moment sparked a
            deep sense of responsibility—he couldn't turn away. With care and
            determination, he rescued the puppy, nurtured it back to health, and
            realized the overwhelming need for a safe space where injured,
            neglected, and homeless animals could receive love and protection.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            From that single act of compassion, Prani Seva Ashram was born—a
            sanctuary that now shelters over 60 rescued animals, offering them
            medical aid, food, and a second chance at life.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            Mr. Gidwani’s vision extends beyond rescue; his mission is systemic
            change, advocating for animal welfare, promoting ethical treatment,
            and creating a compassionate ecosystem where animals are not just
            saved but cherished.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            Today, Prani Seva Ashram stands as a testament to how one act of
            kindness can ignite a movement, proving that innovation isn't only
            about inventions—it’s also about humanity, responsibility, and the
            courage to make a difference.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            Through corporate partnerships and community support, the shelter
            aims to expand its outreach, enhance facilities, and ensure that no
            animal is left behind. With your support, this dream can grow into a
            movement where compassion becomes action.
          </p>
        </div>

        {/* Mission Section */}
        <div
          ref={missionRef}
          className="border-l-8 border-rose-400 bg-white shadow-xl p-6 sm:p-10 rounded-3xl "
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-4 ">
            Our Mission: Compassion in Action
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 mr-5">
            At Prani Seva Ashram, we believe that every life—human or
            animal—deserves dignity, care, and protection. Our mission is to
            rescue, rehabilitate, and provide a safe sanctuary for animals in
            need, ensuring they receive the medical care, nourishment, and love
            they deserve.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            Beyond rescue, we advocate for systemic change in animal welfare,
            promoting ethical treatment and responsible guardianship through
            awareness and community engagement. We strive to build a future
            where no animal suffers in silence, and where kindness transforms
            lives.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            With the support of compassionate individuals and corporate
            partners, we aim to expand our shelter, improve facilities, and
            strengthen our outreach, creating a world where every animal finds
            safety and every act of generosity leaves a lasting impact.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            Together, let’s turn compassion into action and make a difference—
            one life at a time.
          </p>
        </div>

        {/* Vision Section */}
        <div
          ref={visionRef}
          className="border-l-8 border-teal-400 bg-white shadow-xl p-6 sm:p-10 rounded-3xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-4">
            Our Vision: A World of Compassion and Dignity for Every Life
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            Prani Seva Ashram envisions a future where no animal suffers from
            neglect, cruelty, or abandonment—where every life is valued and
            cared for with dignity. Our goal is to create a thriving sanctuary
            that not only provides rescue and rehabilitation but also fosters a
            culture of compassion, awareness, and responsible guardianship.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            We aspire to be a beacon of hope, a model shelter that sets new
            standards for animal welfare through holistic care, ethical
            treatment, and sustainable solutions. Beyond individual rescues, we
            aim to influence communities, corporations, and policymakers to
            build a more humane world—one where kindness is a shared
            responsibility and every act of generosity strengthens the fabric of
            life.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            Through innovative initiatives, strategic partnerships, and
            unwavering dedication, Prani Seva Ashram seeks to expand its impact,
            ensuring that animals not only survive but truly thrive in an
            environment of love and protection.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
            Together, let’s create a future where compassion is not just a
            choice—it is a way of life.
          </p>
        </div>

        {/* Facebook Feed */}
        <FacebookFeed />
      </div>
    </section>
  );
};

export default About;

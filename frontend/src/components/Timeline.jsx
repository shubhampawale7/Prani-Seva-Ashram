// src/components/Timeline.jsx
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaPaw, FaHeart, FaClinicMedical } from "react-icons/fa";

const Timeline = () => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-amber-700 text-center mb-8">
        Our Journey
      </h2>
      <VerticalTimeline lineColor="#F87171">
        <VerticalTimelineElement
          contentStyle={{ background: "#FEF3C7", color: "#92400E" }}
          contentArrowStyle={{ borderRight: "7px solid #FEF3C7" }}
          iconStyle={{ background: "#F87171", color: "#fff" }}
          icon={<FaPaw />}
          date="2018"
        >
          <h3 className="font-bold text-xl">Founded</h3>
          <p>
            Prani Seva Ashram was founded with a mission to rescue and care for
            stray dogs.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          contentStyle={{ background: "#FFEDD5", color: "#7C2D12" }}
          contentArrowStyle={{ borderRight: "7px solid #FFEDD5" }}
          iconStyle={{ background: "#FBBF24", color: "#fff" }}
          icon={<FaClinicMedical />}
          date="2020"
        >
          <h3 className="font-bold text-xl">Clinic Partnership</h3>
          <p>
            We partnered with veterinary clinics to ensure timely medical
            treatment.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          contentStyle={{ background: "#FDE68A", color: "#78350F" }}
          contentArrowStyle={{ borderRight: "7px solid #FDE68A" }}
          iconStyle={{ background: "#F472B6", color: "#fff" }}
          icon={<FaHeart />}
          date="2023"
        >
          <h3 className="font-bold text-xl">100+ Adoptions</h3>
          <p>We celebrated 100+ successful dog adoptions and forever homes.</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </section>
  );
};

export default Timeline;

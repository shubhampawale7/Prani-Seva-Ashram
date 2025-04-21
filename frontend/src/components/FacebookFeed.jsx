// components/FacebookFeed.jsx
import { FaFacebookF } from "react-icons/fa";

const FacebookFeed = () => {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FaFacebookF className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Follow Us on Facebook
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest rescue stories, events, and adoption
          drives. Join our growing family!
        </p>
        <a
          href="https://www.facebook.com/profile.php?id=100072011817133"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Visit Our Facebook Page
        </a>
      </div>
    </div>
  );
};

export default FacebookFeed;

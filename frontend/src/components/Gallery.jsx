import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import story1 from "/rescues/story1.jpg";
import story2 from "/rescues/story2.jpg";
import story3 from "/rescues/story3.jpg";

const images = [story1, story2, story3];

const Gallery = () => {
  return (
    <section className="my-16 px-4">
      <h2 className="text-3xl font-bold text-amber-700 text-center mb-8">
        Our Rescue Stories
      </h2>
      <PhotoProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.map((src, index) => (
            <PhotoView key={index} src={src}>
              <img
                src={src}
                alt={`Rescue story ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg cursor-pointer shadow"
              />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </section>
  );
};

export default Gallery;

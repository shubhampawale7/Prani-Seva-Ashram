import { useEffect, useState } from "react";
import axios from "axios";
import AdoptionIntro from "../components/AdoptionIntro";
import DogCard from "../components/DogCard";
import DogModal from "../components/DogModal";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const Rescue = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showOnlyAdoptable, setShowOnlyAdoptable] = useState(false);

  const dogsPerPage = 6;

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const { data } = await axios.get(`/api/dogs?page=${currentPage + 1}`);

        // Sort dogs: non-adopted first, adopted last
        const sortedDogs = data.dogs.sort((a, b) => {
          return a.adopted === b.adopted ? 0 : a.adopted ? 1 : -1;
        });

        setDogs(sortedDogs);
        setPageCount(data.totalPages);
      } catch (err) {
        console.error("Failed to load dogs:", err);
      }
    };
    fetchDogs();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Helmet>
        <title>
          Your New Best Friend Awaits | Adopt a Dog from Prani Seva Ashram
        </title>
        <meta
          name="description"
          content="Explore adoptable dogs at Prani Seva Ashram. Fully vaccinated, cared for, and waiting for loving homes. Find your new best friend today."
        />
        <meta
          name="keywords"
          content="dog adoption, adopt a dog, vaccinated dogs, dog shelter, animal rescue, Prani Seva Ashram, pet adoption, adoptable dogs"
        />
        <meta name="author" content="Prani Seva Ashram" />
        <link rel="canonical" href="https://www.praniseva.org/rescue" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Your New Best Friend Awaits | Adopt a Dog from Prani Seva Ashram"
        />
        <meta
          property="og:description"
          content="Discover loving dogs ready for adoption at Prani Seva Ashram. Fully vaccinated and waiting for a forever home."
        />
        <meta property="og:url" content="https://www.praniseva.org/rescue" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.praniseva.org/assets/images/rescue-page-hero.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Your New Best Friend Awaits | Adopt a Dog from Prani Seva Ashram"
        />
        <meta
          name="twitter:description"
          content="Explore adoptable dogs, fully vaccinated and cared for, at Prani Seva Ashram shelter."
        />
        <meta
          name="twitter:image"
          content="https://www.praniseva.org/assets/images/rescue-page-hero.jpg"
        />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AnimalShelter",
            name: "Prani Seva Ashram",
            url: "https://www.praniseva.org/rescue",
            logo: "https://www.praniseva.org/assets/images/logo.png",
            description:
              "Prani Seva Ashram provides rescue, care, and adoption services for abandoned and injured dogs, ensuring they find loving forever homes.",
            pets: dogs
              .filter((dog) => !dog.adopted) // List only adoptable dogs in structured data
              .map((dog) => ({
                "@type": "Dog",
                name: dog.name,
                breed: dog.breed,
                gender: dog.gender,
                age: dog.age,
                image: dog.image,
                description: dog.description,
                url: `https://www.praniseva.org/dogs/${dog._id}`,
              })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 text-black">
        {/* Emotional Header Section */}
        <section
          className="text-center py-16 bg-amber-600 text-white rounded-lg shadow-lg"
          aria-labelledby="rescue-header"
        >
          <h1
            id="rescue-header"
            className="text-5xl font-bold mb-6"
            tabIndex={0}
          >
            Your New Best Friend is Waiting for You!
          </h1>
          <p className="text-lg mb-6 max-w-4xl mx-auto px-4" tabIndex={0}>
            Every dog in our shelter is ready to be your companion. All of our
            dogs are fully vaccinated, loved, and waiting for the perfect family
            to welcome them home. They’ve been through tough times, but their
            spirits remain strong. By adopting one of them, you’re giving them a
            chance to experience love, joy, and security once again.
          </p>
          <p className="text-xl italic mb-8" tabIndex={0}>
            "A dog is not just a pet. They are family. They will forever be your
            companion, your protector, and your best friend."
          </p>
        </section>

        <AdoptionIntro />

        <div
          className="flex justify-center items-center my-6 gap-4"
          aria-label="Filter dogs by adoptability"
        >
          <span className="text-lg font-medium text-amber-700" tabIndex={0}>
            Show Only Adoptable Dogs
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showOnlyAdoptable}
              onChange={() => setShowOnlyAdoptable(!showOnlyAdoptable)}
              aria-checked={showOnlyAdoptable}
              aria-label="Toggle to show only adoptable dogs"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-amber-600 transition-all duration-300"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all duration-300"></div>
          </label>
        </div>

        {/* Dog Cards Section */}
        <section
          aria-label="List of dogs available for adoption"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto"
        >
          {dogs
            .filter((dog) => !showOnlyAdoptable || !dog.adopted)
            .map((dog) => (
              <DogCard
                key={dog._id}
                dog={dog}
                onClick={() => setSelectedDog(dog)}
                className="transition-transform transform hover:scale-105 hover:shadow-2xl"
              />
            ))}
        </section>

        {/* Pagination */}
        <nav
          aria-label="Dog list pagination"
          className="flex justify-center mt-10 p-5 cursor-pointer "
        >
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex gap-2 items-center"
            pageClassName="border border-gray-300 rounded hover:bg-amber-100"
            pageLinkClassName="px-3 py-1 text-gray-700 font-medium"
            previousClassName="border border-gray-300 rounded hover:bg-amber-100"
            previousLinkClassName="px-3 py-1 text-gray-700 font-medium"
            nextClassName="border border-gray-300 rounded hover:bg-amber-100"
            nextLinkClassName="px-3 py-1 text-gray-700 font-medium"
            activeClassName="bg-amber-500 text-white"
          />
        </nav>

        {/* Modal for Dog Details */}
        {selectedDog && (
          <DogModal dog={selectedDog} onClose={() => setSelectedDog(null)} />
        )}
      </div>
    </>
  );
};

export default Rescue;

import { useEffect, useState } from "react";
import axios from "axios";
import AdoptionIntro from "../components/AdoptionIntro";
import DogCard from "../components/DogCard";
import DogModal from "../components/DogModal";
import ReactPaginate from "react-paginate";

const Rescue = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const dogsPerPage = 6;

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const { data } = await axios.get(`/api/dogs?page=${currentPage + 1}`);
        setDogs(data.dogs);
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 text-black">
      {/* Emotional Header Section */}
      <section className="text-center py-16 bg-amber-600 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-6">
          Your New Best Friend is Waiting for You!
        </h1>
        <p className="text-lg mb-6 max-w-4xl mx-auto px-4">
          Every dog in our shelter is ready to be your companion. All of our
          dogs are fully vaccinated, loved, and waiting for the perfect family
          to welcome them home. They’ve been through tough times, but their
          spirits remain strong. By adopting one of them, you’re giving them a
          chance to experience love, joy, and security once again.
        </p>
        <p className="text-xl italic mb-8">
          "A dog is not just a pet. They are family. They will forever be your
          companion, your protector, and your best friend."
        </p>
      </section>

      <AdoptionIntro />

      {/* Dog Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {dogs.map((dog) => (
          <DogCard
            key={dog._id}
            dog={dog}
            onClick={() => setSelectedDog(dog)}
            className="transition-transform transform hover:scale-105 hover:shadow-2xl"
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 p-5 cursor-pointer ">
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
      </div>

      {/* Modal for Dog Details */}
      {selectedDog && (
        <DogModal dog={selectedDog} onClose={() => setSelectedDog(null)} />
      )}
    </div>
  );
};

export default Rescue;

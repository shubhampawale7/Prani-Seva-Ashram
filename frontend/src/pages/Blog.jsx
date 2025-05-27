import volunteerSpotlight from "../assets/images/blog/volunteer-spotlight.jpg";
import bellaBefore from "../assets/images/blog/bella-before.jpg"; // If you're using 'before' image for a story
import bellaAfter from "../assets/images/blog/bella-after.jpg"; // If you're using 'after' image for a story
import strayDogBehavior from "../assets/images/blog/stray-dog-behavior.jpg";
import spayNeuter from "../assets/images/blog/spay-neuter.jpg";
// -------------------------

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogPostModal from "../components/BlogPostModal";

const blogPosts = [
  {
    id: "1",
    title: "The Unsung Heroes: Meet Our Dedicated Volunteers",
    date: "May 20, 2025",
    excerpt:
      "Discover the selfless dedication of our volunteers whose hands bring comfort and hope to every animal at Prani Seva Ashram. Their commitment is truly inspiring.",
    fullContent: `Behind every wagging tail and happy purr at Prani Seva Ashram are the incredible hands of our dedicated volunteers. These unsung heroes contribute countless hours, their unwavering passion transforming the lives of abandoned, injured, and neglected animals. From the earliest morning feeding routines to providing comforting cuddles during rehabilitation, their presence is invaluable. Each volunteer brings unique skills – be it gentle nursing for recovery animals, meticulous organization of donation drives, or simply offering a warm, reassuring presence. Their selfless efforts are the very heart of our mission, enabling us to provide continuous care and create countless second chances. This month, we shine a spotlight on their tireless work and the profound impact they have on our furry residents.`,
    image: volunteerSpotlight,
    category: "Volunteer Spotlight",
  },
  {
    id: "2",
    title: "From Street to Sanctuary: Bella's Remarkable Journey",
    date: "May 15, 2025",
    excerpt:
      "Witness the incredible transformation of Bella, a resilient stray who found love and a forever home after being rescued by Prani Seva Ashram.",
    fullContent: `Bella's journey is a powerful testament to resilience, compassion, and the life-changing impact of a second chance. Found wandering the bustling streets of Pune, severely emaciated and bearing the pain of a broken leg, her future seemed bleak. Our vigilant rescue team swiftly brought her into the Ashram, where she immediately received comprehensive veterinary care. Weeks turned into months of dedicated rehabilitation, including surgery, physiotherapy, and countless hours of patient, loving attention from our staff and volunteers. Throughout her recovery, Bella's gentle spirit shone through, gradually learning to trust and embrace affection. The heartwarming culmination of her journey came when the compassionate Sharma family met her. Enchanted by her calm demeanor and quiet strength, they opened their hearts and home. Today, Bella is not just a pet, but a cherished member of their family, enjoying sunlit naps, playful walks in the park, and endless belly rubs. Her vibrant life is a beautiful reminder of the happy endings made possible by your support.`,
    image: bellaAfter,
    beforeImage: bellaBefore, //if you want to use it in modal too.
    category: "Success Story",
  },
  {
    id: "3",
    title: "Understanding Stray Dog Behavior: A Guide for Communities",
    date: "May 10, 2025",
    excerpt:
      "Demystifying the common behaviors of street dogs and providing insights for fostering harmonious coexistence within our urban communities.",
    fullContent: `Fostering a harmonious coexistence between humans and urban canines begins with understanding. Many behaviors exhibited by street dogs, often misinterpreted as aggression, are frequently rooted in fear, hunger, or past negative experiences. This guide aims to demystify common stray dog behaviors, helping community members recognize subtle cues like tail position, ear movements, and vocalizations that indicate a dog's emotional state. We emphasize safe observation from a distance, understanding their needs, and promoting responsible practices. Educating ourselves on basic canine body language can prevent misunderstandings and reduce fear, leading to safer interactions for both humans and animals. Prani Seva Ashram advocates for comprehensive community awareness programs, alongside sterilization initiatives, to ensure a compassionate environment where street animals can thrive without conflict.`,
    image: strayDogBehavior,
    category: "Animal Care",
  },
  {
    id: "4",
    title: "The Importance of Spay/Neuter: Controlling Pet Overpopulation",
    date: "May 05, 2025",
    excerpt:
      "Explore why spaying and neutering are crucial for reducing pet overpopulation and enhancing the overall health and well-being of our beloved companion animals.",
    fullContent: `Pet overpopulation remains a pressing crisis, leading to countless animals facing homelessness, suffering, or euthanasia in overcrowded shelters. Spaying and neutering are not merely methods of population control; they are foundational pillars of responsible pet ownership and compassionate animal welfare. These simple, routine procedures offer profound health benefits for your pets, significantly reducing the risk of certain cancers, infections, and unwanted behavioral issues like roaming or aggression. By preventing unplanned litters, we actively alleviate the strain on animal rescue organizations and ensure that every animal has a chance at a loving, permanent home. At Prani Seva Ashram, we passionately champion and facilitate spay/neuter programs as a vital step towards creating healthier, happier communities for both animals and humans. It's a single, powerful decision that reverberates with positive impact across the animal kingdom.`,
    image: spayNeuter,
    category: "Animal Care",
  },
];

const Blog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-amber-800 text-center mb-10"
      >
        Our Blog
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * post.id }}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-amber-100 transform hover:scale-103 transition-transform duration-300 flex flex-col"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-fit"
            />
            <div className="p-6 flex-grow flex flex-col">
              <span className="text-sm text-gray-500 mb-2 block">
                {post.date} &bull; {post.category}
              </span>
              <h2 className="text-xl font-semibold text-amber-900 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-700 text-base mb-4 flex-grow">
                {post.excerpt}
              </p>
              <button
                onClick={() => openModal(post)}
                className="mt-auto text-orange-500 hover:text-orange-600 font-semibold flex items-center justify-end"
              >
                Read More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Basic Pagination (add actual logic later) */}
      <div className="text-center mt-12">
        <Link
          to="/blog?page=2"
          className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
        >
          Load More Posts
        </Link>
      </div>

      <BlogPostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        post={selectedPost}
      />
    </div>
  );
};

export default Blog;

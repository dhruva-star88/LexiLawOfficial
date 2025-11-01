import React, { useState } from "react";
import { Search, Filter, Scale, X } from "lucide-react";
import Navbar from "../components/Navbar";
import LawyerCard from "../components/LawyerCard";

export default function BookLawyerSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  const specializations = [
    "All",
    "Corporate Law",
    "Family Law",
    "Criminal Law",
    "Intellectual Property",
    "Real Estate",
    "Immigration",
  ];

  const lawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      specialization: "Corporate Law",
      experience: "12 years",
      rating: 4.8,
      reviews: 127,
      price: "$150",
      availability: ["Mon", "Tue", "Thu"],
      description:
        "Specializing in corporate governance, mergers & acquisitions, and business contracts with experience serving Fortune 500 clients.",
    },
    {
      id: 2,
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&w=256&q=80",
      specialization: "Intellectual Property",
      experience: "8 years",
      rating: 4.7,
      reviews: 93,
      price: "$175",
      availability: ["Mon", "Wed", "Fri"],
      description:
        "Expert in patent law, copyright protection, and IP litigation with a background in computer science and engineering.",
    },
    {
      id: 3,
      name: "Amara Rodriguez",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=256&q=80",
      specialization: "Family Law",
      experience: "15 years",
      rating: 4.9,
      reviews: 215,
      price: "$130",
      availability: ["Tue", "Wed", "Thu", "Fri"],
      description:
        "Compassionate advocate specializing in divorce, child custody, and domestic relations with a client-centered approach.",
    },
    {
      id: 4,
      name: "David Wilson",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
      specialization: "Criminal Law",
      experience: "20 years",
      rating: 4.6,
      reviews: 178,
      price: "$200",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      description:
        "Former prosecutor with extensive trial experience in criminal defense, white-collar crime, and federal investigations.",
    },
    {
      id: 5,
      name: "Priya Patel",
      image:
        "https://images.unsplash.com/photo-1619280837358-d951db74cdb7?auto=format&fit=crop&w=256&q=80",
      specialization: "Immigration",
      experience: "7 years",
      rating: 4.8,
      reviews: 86,
      price: "$125",
      availability: ["Mon", "Wed", "Fri"],
      description:
        "Dedicated to helping individuals and families navigate the complex immigration system with expertise in visas and citizenship.",
    },
    {
      id: 6,
      name: "Robert Thompson",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      specialization: "Real Estate",
      experience: "10 years",
      rating: 4.5,
      reviews: 112,
      price: "$140",
      availability: ["Tue", "Thu", "Fri"],
      description:
        "Expert in commercial and residential real estate transactions, land use, and property disputes with a background in urban planning.",
    },
  ];

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      selectedSpecialization === "All" ||
      lawyer.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col p-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Scale size={40} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Find the Right Legal Expert
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Search, filter, and connect with qualified lawyers ready to assist
            you with your legal needs.
          </p>
        </div>

        {/* Search + Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 flex-1 w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, specialization, or keyword..."
              className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>

          <div className="relative w-full md:w-64">
            <select
              className="w-full py-2 px-4 appearance-none border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <Filter
              className="absolute right-3 top-3 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Lawyers Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-inner">
              <p className="text-gray-500 text-lg">
                No lawyers found matching your criteria. Try adjusting your
                filters or search keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

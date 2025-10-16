import React, { useState } from 'react';
import LawyerCard from './LawyerCard';
import { SearchIcon, FilterIcon } from 'lucide-react';
const BookLawyerSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const specializations = ['All', 'Corporate Law', 'Family Law', 'Criminal Law', 'Intellectual Property', 'Real Estate', 'Immigration'];
  const lawyers = [{
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    specialization: 'Corporate Law',
    experience: '12 years',
    rating: 4.8,
    reviews: 127,
    price: '$150',
    availability: ['Mon', 'Tue', 'Thu'],
    description: 'Specializing in corporate governance, mergers & acquisitions, and business contracts with experience serving Fortune 500 clients.'
  }, {
    id: 2,
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    specialization: 'Intellectual Property',
    experience: '8 years',
    rating: 4.7,
    reviews: 93,
    price: '$175',
    availability: ['Mon', 'Wed', 'Fri'],
    description: 'Expert in patent law, copyright protection, and IP litigation with a background in computer science and engineering.'
  }, {
    id: 3,
    name: 'Amara Rodriguez',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    specialization: 'Family Law',
    experience: '15 years',
    rating: 4.9,
    reviews: 215,
    price: '$130',
    availability: ['Tue', 'Wed', 'Thu', 'Fri'],
    description: 'Compassionate advocate specializing in divorce, child custody, and domestic relations with a client-centered approach.'
  }, {
    id: 4,
    name: 'David Wilson',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    specialization: 'Criminal Law',
    experience: '20 years',
    rating: 4.6,
    reviews: 178,
    price: '$200',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    description: 'Former prosecutor with extensive trial experience in criminal defense, white-collar crime, and federal investigations.'
  }, {
    id: 5,
    name: 'Priya Patel',
    image: 'https://images.unsplash.com/photo-1619280837358-d951db74cdb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    specialization: 'Immigration',
    experience: '7 years',
    rating: 4.8,
    reviews: 86,
    price: '$125',
    availability: ['Mon', 'Wed', 'Fri'],
    description: 'Dedicated to helping individuals and families navigate the complex immigration system with expertise in visas and citizenship.'
  }, {
    id: 6,
    name: 'Robert Thompson',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    specialization: 'Real Estate',
    experience: '10 years',
    rating: 4.5,
    reviews: 112,
    price: '$140',
    availability: ['Tue', 'Thu', 'Fri'],
    description: 'Expert in commercial and residential real estate transactions, land use, and property disputes with a background in urban planning.'
  }];
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) || lawyer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'All' || lawyer.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Find the Right Legal Expert</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our network of qualified lawyers, filter by specialization, and book a consultation at your convenience
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input type="text" placeholder="Search by name, specialization, or keyword..." className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <SearchIcon className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
            </div>
            <div className="md:w-64">
              <div className="relative">
                <select className="w-full appearance-none py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={selectedSpecialization} onChange={e => setSelectedSpecialization(e.target.value)}>
                  {specializations.map(spec => <option key={spec} value={spec}>
                      {spec}
                    </option>)}
                </select>
                <FilterIcon className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.length > 0 ? filteredLawyers.map(lawyer => <LawyerCard key={lawyer.id} lawyer={lawyer} />) : <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">No lawyers found matching your criteria. Please try a different search.</p>
            </div>}
        </div>
      </div>
    </section>;
};
export default BookLawyerSection;
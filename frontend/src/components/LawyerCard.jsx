import React, { useState } from 'react';
import { StarIcon, CalendarIcon, ClockIcon, CheckIcon } from 'lucide-react';
const LawyerCard = ({
  lawyer
}) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', {
        weekday: 'short'
      });
      // Only include days when the lawyer is available
      if (lawyer.availability.includes(dayName)) {
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
        dates.push({
          value: formattedDate,
          display: formattedDate,
          day: dayName
        });
      }
    }
    return dates;
  };
  const availableDates = generateDates();
  const handleBooking = () => {
    // In a real application, this would send the booking request to a server
    alert(`Booking confirmed with ${lawyer.name} on ${selectedDate} at ${selectedTime}`);
    setIsBookingOpen(false);
    setSelectedDate('');
    setSelectedTime('');
  };
  return <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start">
          <img src={lawyer.image} alt={lawyer.name} className="w-20 h-20 rounded-full object-cover mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{lawyer.name}</h3>
            <p className="text-blue-600 font-medium">{lawyer.specialization}</p>
            <div className="flex items-center mt-1">
              <StarIcon className="text-yellow-400 fill-current" size={16} />
              <span className="text-gray-700 ml-1">{lawyer.rating}</span>
              <span className="text-gray-500 ml-1">({lawyer.reviews} reviews)</span>
            </div>
            <p className="text-gray-600 mt-1">{lawyer.experience} experience</p>
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-sm">{lawyer.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">Consultation fee</span>
            <p className="text-gray-800 font-semibold">{lawyer.price}/hour</p>
          </div>
          <button onClick={() => setIsBookingOpen(!isBookingOpen)} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Book Consultation
          </button>
        </div>
        {isBookingOpen && <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">Schedule a Consultation</h4>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <CalendarIcon className="inline mr-1" size={16} /> Select Date
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableDates.slice(0, 6).map(date => <button key={date.value} onClick={() => setSelectedDate(date.value)} className={`p-2 text-sm rounded-md border ${selectedDate === date.value ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}>
                    {date.display}
                  </button>)}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <ClockIcon className="inline mr-1" size={16} /> Select Time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.slice(0, 8).map(time => <button key={time} onClick={() => setSelectedTime(time)} className={`p-2 text-sm rounded-md border ${selectedTime === time ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}>
                    {time}
                  </button>)}
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsBookingOpen(false)} className="text-gray-600 hover:text-gray-800 font-medium mr-4">
                Cancel
              </button>
              <button onClick={handleBooking} disabled={!selectedDate || !selectedTime} className={`flex items-center ${selectedDate && selectedTime ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white font-medium py-2 px-4 rounded-md transition-colors`}>
                <CheckIcon size={16} className="mr-1" />
                Confirm Booking
              </button>
            </div>
          </div>}
      </div>
    </div>;
};
export default LawyerCard;
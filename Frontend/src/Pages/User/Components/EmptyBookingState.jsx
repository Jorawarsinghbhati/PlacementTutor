const EmptyBookingState = ({ onAction }) => {
    return (
      <div className="flex flex-col items-center justify-center mt-24">
        <div className="w-24 h-24 rounded-full bg-indigo-600/20 flex items-center justify-center mb-6">
          ▶️
        </div>
  
        <h3 className="text-lg font-semibold">
          No bookings yet
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Book your first mentorship session today!
        </p>
  
        <button
          onClick={onAction}
          className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-700"
        >
          Book a Session
        </button>
      </div>
    );
  };
  
  export default EmptyBookingState;
  
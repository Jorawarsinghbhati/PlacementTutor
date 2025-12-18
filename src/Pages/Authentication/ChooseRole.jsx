import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const navigate = useNavigate();

  const chooseUser = () => {
    navigate("/set-username");
  };

  const chooseMentor = () => {
    navigate("/mentor/apply");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg w-100 text-center">
        <h2 className="text-2xl font-bold mb-6">
          How do you want to continue?
        </h2>

        <button
          onClick={chooseUser}
          className="w-full bg-white text-black py-3 rounded mb-4 font-semibold"
        >
          Continue as User
        </button>

        <button
          onClick={chooseMentor}
          className="w-full bg-[#c97b4a] text-black py-3 rounded font-semibold"
        >
          Apply as Mentor
        </button>
      </div>
    </div>
  );
};

export default ChooseRole;

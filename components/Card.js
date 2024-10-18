export default function Card({ title, icon }) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 text-center cursor-pointer hover:bg-gray-100">

        <img src={icon} alt={`${title} Icon`} className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 mt-2">Щелкните</p>
      </div>
    );
  }
  
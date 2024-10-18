import Header from '../../components/Header';
import Card from '../../components/Card';
import cardData from '../../data/cards.json'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col items-center">
      <Header />
      
      <div className="text-center mt-8">
      <img src="/logo.png" alt="DoctAi Logo" className="h-16 w-16 mx-auto my-10" />
        <h1 className="text-2xl font-semibold">Могу я тебе чем-нибудь помочь?</h1>
        <div className="flex justify-center mt-6 gap-4">
  {cardData.map((card, index) => {
    return (
      <Card key={index} title={card.title} icon={card.icon} />
    );
  })}
</div>

      </div>

      <div className="mt-12 w-full">
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.55 2.27M4.27 8.27L5 10m0 0L2.27 4.27M4.27 15.73L5 14m0 0l-4.55 2.27M5 14l6.23 3.12m0 0l3.76 1.88M5 14v5m6.23-1.88L5 14m6.23 1.88L8 18.12M8 9m-3.77 6m2.27 1L12 15m5.23 2.12m2.27 1M8 15V9M12 9v6m5.23 2.12L17 15m0-6v4.55m0 0L8 9M5.23 9m0-2.12v5m2.77 2L7 14m3.76 1.88m0-2.77m3.76 1.88m-4.77 1.77m2.5-3.27L7 8.12"></path>
          </svg>
          <input
            type="text"
            placeholder="Спрашивай, что хочешь..."
            className="flex-grow ml-4 text-gray-700 focus:outline-none"
          />
          <p className="text-gray-400">0/1000</p>
          <button className="ml-4 text-white bg-pink-400 rounded-full px-4 py-2 hover:bg-pink-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0V9a2 2 0 112 2h-2zM6 16v-1l5-2 5 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

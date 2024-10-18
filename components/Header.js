import SwitchButton from "./SwitchButton";

export default function Header() {
    return (
      <div className="w-full py-4 bg-transparent flex justify-between items-center px-8">
        <div className="flex items-center">
          <img src="/logo.png" alt="DoctAi Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">DoctAi</h1>
        </div>

        <img src="/eye.png" alt="DoctAi Logo" className="h-8 w-8 mr-2" />


        <SwitchButton />
      </div>
    );
  }
  
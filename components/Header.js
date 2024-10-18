import SwitchButton from "./SwitchButton";
import Image from "next/image";

export default function Header() {
    return (
      <div className="w-full py-4 bg-transparent flex justify-between items-center px-20">
        <div className="flex items-center">
          <Image src="/logo.png" alt="DoctAi Logo" className="h-8 w-8 mr-2" width={42} height={42}/>
          <h1 className="text-xl font-bold">DoctAi</h1>
        </div>

        <img src="/eye.png" alt="DoctAi Logo" className="h-8 w-8 mr-2" />


        <SwitchButton />
      </div>
    );
  }
  
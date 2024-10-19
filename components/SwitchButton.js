"use client";

import { useRouter, usePathname } from "next/navigation";

export default function SwitchButton() {
  const router = useRouter();

  const pathname = usePathname();
  const handleSwitch = () => {
    if (pathname === "/") {
      router.push("/pawPage");
    } else if (pathname === "/pawPage") {
      router.push("/");
    }
  };

  const isPaw = pathname === "/pawPage";

  return (
    <div className="flex items-center justify-center p-4">
      <button
        className={`relative w-20 h-10 rounded-full bg-gray-800 transition-all duration-300 ${
          isPaw ? "bg-paw" : "bg-user"
        }`}
        onClick={handleSwitch}
      >
        <div
          className={`absolute top-1 left-1 w-8 h-8 bg-white flex items-center justify-center rounded-full transform transition-transform duration-300 ${
            isPaw ? "translate-x-10" : ""
          }`}
        >
          {isPaw ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_7_156)">
                <path
                  d="M11.9 8.4C13.2 8.4 14 6.5 14 5.3C14 4.3 13.5 3.1 12.5 3.1C11.2 3.1 10.4 5 10.4 6.2C10.4 7.2 10.9 8.4 11.9 8.4ZM8.10005 8.4C9.10005 8.4 9.60005 7.2 9.60005 6.2C9.60005 4.9 8.80005 3 7.50005 3C6.50005 3 6.00005 4.2 6.00005 5.2C5.90005 6.5 6.70005 8.4 8.10005 8.4ZM15.5 7.4C14.2 7.4 13.3 9.2 13.3 10.5C13.3 11.4 13.7 12.3 14.6 12.3C15.9 12.3 16.8 10.5 16.8 9.2C16.8 8.3 16.3 7.4 15.5 7.4ZM6.80005 10.5C6.80005 9.2 5.80005 7.4 4.60005 7.4C3.70005 7.4 3.30005 8.3 3.30005 9.2C3.30005 10.5 4.30005 12.3 5.50005 12.3C6.40005 12.3 6.80005 11.4 6.80005 10.5ZM10 10.3C8.00005 10.3 5.30005 13.5 5.30005 15.7C5.30005 16.7 6.00005 17 6.80005 17C8.00005 17 8.90005 16.2 10 16.2C11 16.2 11.9 17 13 17C13.8 17 14.7 16.8 14.7 15.7C14.7 13.5 12 10.3 10 10.3Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_7_156">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.25 5C6.25 4.00544 6.64509 3.05161 7.34835 2.34835C8.05161 1.64509 9.00544 1.25 10 1.25C10.9946 1.25 11.9484 1.64509 12.6516 2.34835C13.3549 3.05161 13.75 4.00544 13.75 5C13.75 5.99456 13.3549 6.94839 12.6516 7.65165C11.9484 8.35491 10.9946 8.75 10 8.75C9.00544 8.75 8.05161 8.35491 7.34835 7.65165C6.64509 6.94839 6.25 5.99456 6.25 5ZM3.12583 16.7542C3.15393 14.9496 3.89053 13.2284 5.17663 11.9622C6.46273 10.6959 8.19518 9.98621 10 9.98621C11.8048 9.98621 13.5373 10.6959 14.8234 11.9622C16.1095 13.2284 16.8461 14.9496 16.8742 16.7542C16.8763 16.8757 16.843 16.9951 16.7784 17.098C16.7137 17.2009 16.6204 17.2826 16.51 17.3333C14.4676 18.2698 12.2468 18.753 10 18.75C7.67833 18.75 5.4725 18.2433 3.49 17.3333C3.37957 17.2826 3.28631 17.2009 3.22163 17.098C3.15696 16.9951 3.12366 16.8757 3.12583 16.7542Z"
                fill="black"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

function Component() {
    return (
        <div className="w-full h-64 flex flex-col justify-around items-center">
            <div className="w-full px-4 mb-2 p-2 items-center flex flex-col justify-around">
                <svg
                    className="animate-spin h-28 w-28 text-blue-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <div className="text-xs uppercase mt-4 p-1 px-6 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md">
                    Loading
                </div>
            </div>
        </div>
    );
}
export default Component;

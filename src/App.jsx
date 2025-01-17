import "./App.css";

function App() {
  return (
    <>
      <div className="inline-flex items-center divide-x rounded dark:bg-violet-600 dark:text-gray-100 dark:divide-gray-300 ">
        <button type="button" className="px-8 py-3">
          Caret
        </button>
        <button type="button" title="Toggle dropdown" className="p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}

export default App;

import React from "react";

const QueryPreview = ({ query, isLoading }) => {
  const handleSearch = () => {
    if (query) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded">
      <h3 className="font-bold text-lg mb-2">Generated Query:</h3>
      <p className="my-2 bg-white p-2 rounded border">{query || "Your query will appear here..."}</p>
      <button
        onClick={handleSearch}
        disabled={!query || isLoading}
        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
      >
        Search on Google
      </button>
    </div>
  );
};

export default QueryPreview;
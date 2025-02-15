import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import QueryPreview from "./components/QueryPreview";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/generate-query", searchParams);
      setQuery(response.data.query);
    } catch (error) {
      console.error("Error generating query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Google Dorks Tool</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        {isLoading ? (
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <QueryPreview query={query} />
        )}
      </div>
      <footer className="mt-8 text-center text-gray-500">
        <p>Use this tool responsibly. Do not misuse it for unethical purposes.</p>
      </footer>
    </div>
  );
};

export default App;
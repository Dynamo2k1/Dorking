import React, { useState } from "react";

const templates = [
  { name: "Find PDFs with confidential data", query: { fileType: "pdf", searchText: "confidential" } },
  { name: "Search for login pages", query: { searchText: "login", intitle: "login" } },
  { name: "Find exposed admin pages", query: { inurl: "admin", intitle: "admin" } },
];

const SearchForm = ({ onSearch, isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [fileType, setFileType] = useState("");
  const [site, setSite] = useState("");
  const [intitle, setIntitle] = useState("");
  const [intext, setIntext] = useState("");
  const [andTerm, setAndTerm] = useState("");
  const [orTerm, setOrTerm] = useState("");
  const [notTerm, setNotTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleTemplateChange = (e) => {
    const template = templates.find((t) => t.name === e.target.value);
    if (template) {
      setSearchText(template.query.searchText || "");
      setFileType(template.query.fileType || "");
      setSite(template.query.site || "");
      setIntitle(template.query.intitle || "");
      setSelectedTemplate(template.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchText, fileType, site, intitle, intext, andTerm, orTerm, notTerm });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={selectedTemplate}
        onChange={handleTemplateChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        <option value="">Select a template</option>
        {templates.map((template) => (
          <option key={template.name} value={template.name}>
            {template.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter search intent"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="Site (e.g., example.com)"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="Intitle (e.g., login)"
        value={intitle}
        onChange={(e) => setIntitle(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="Intext (e.g., password)"
        value={intext}
        onChange={(e) => setIntext(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="AND term (e.g., security)"
        value={andTerm}
        onChange={(e) => setAndTerm(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="OR term (e.g., admin)"
        value={orTerm}
        onChange={(e) => setOrTerm(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="NOT term (e.g., test)"
        value={notTerm}
        onChange={(e) => setNotTerm(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        <option value="">Select file type</option>
        <option value="pdf">PDF</option>
        <option value="docx">DOCX</option>
        <option value="xlsx">XLSX</option>
      </select>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? "Generating Query..." : "Generate Query"}
      </button>
    </form>
  );
};

export default SearchForm;
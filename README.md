# Dorking

Dorking is a web-based search tool that helps security professionals perform **Google dorking** (advanced search queries) to find specific information on the internet:contentReference[oaicite:19]{index=19}. It provides a frontend UI for composing search templates and previewing queries, and a Node.js backend to handle search requests.

## Installation

1. **Prerequisites:** Install [Docker](https://www.docker.com) and [Node.js](https://nodejs.org) (v18+).
2. **Clone the repository:** `git clone https://github.com/Dynamo2k1/Dorking.git`
3. **Using Docker:**  
   - Build and run with Docker Compose:  
     ```
     cd Dorking
     docker-compose up --build -d
     ```  
   - This starts the backend server and frontend client in containers.
4. **Local development (alternative):**  
   - Navigate to `backend/node`, run `npm install`, then `node server.js`.  
   - In `frontend`, run `npm install`, then `npm start` to launch the React app.

## Usage

- Open your browser to `http://localhost:3000` (or the port shown by Docker).
- Use the **SearchForm** to enter keywords and select a dork template.
- Click **Search** to generate and preview the query. The app will execute the search and display results.
- Customize templates in **TemplateSelector** or adjust styles in **Tailwind** config as needed.

## Security Considerations

- **HTTPS:** In production, serve Dorking over HTTPS. Use secure cookie flags (`HttpOnly`, `Secure`) and Content Security Policy headers.
- **Input Validation:** The app validates user input on both frontend and backend to prevent injection attacks (see [Node.js Security Cheat Sheet] for best practices:contentReference[oaicite:20]{index=20}:contentReference[oaicite:21]{index=21}).
- **Dependencies:** All Node packages should be kept up-to-date. Use `npm audit` and tools like OWASP Dependency-Check to detect vulnerable components:contentReference[oaicite:22]{index=22}.
- **Configuration:** Do not hardcode secrets or credentials. Use environment variables and Docker secrets for sensitive config.
- **Error Handling:** Errors are logged server-side (without leaking stack traces). The app avoids exposing any internal information to end-users.
- **Network:** The Docker setup runs services on an internal Docker network. Disable any unnecessary external port exposure.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository and create your feature branch (`git checkout -b my-feature`).
2. Commit your changes with clear messages (`git commit -m "Add feature"`).
3. Open a Pull Request describing your changes.
4. Ensure code follows the existing style and passes any tests (if added).

Please open an issue or contact the maintainer (dynamo89247@gmail.com) for any questions or suggestions.


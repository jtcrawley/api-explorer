import Sidebar from "@/components/navigation/Sidebar";

type GlossaryEntry = {
  term: string;
  definition: string;
  example?: string;
};

type GlossarySection = {
  title: string;
  entries: GlossaryEntry[];
};

const glossarySections: GlossarySection[] = [
  {
    title: "API Basics",
    entries: [
      {
        term: "API",
        definition:
          "Application Programming Interface. A contract that lets two pieces of software communicate. You send a request; the server sends a response. Think of it as a waiter: you order from the menu, the kitchen prepares it, the waiter delivers it.",
        example: "PokeAPI lets you request Pikachu's data and get back a JSON object with its name, types, and stats.",
      },
      {
        term: "Client",
        definition:
          "The app or device making the request. Usually a browser, a mobile app, or another server. In this course, your code playground is the client.",
        example: "Your browser is the client when it fetches Pokémon data from PokeAPI.",
      },
      {
        term: "Server",
        definition:
          "A computer that listens for requests and sends back responses. It's the kitchen in the restaurant analogy — it has the data but you can't access it directly.",
        example: "PokeAPI's servers store all the Pokémon data and respond when your app asks for it.",
      },
      {
        term: "Request",
        definition:
          "A message your app sends to an API asking for data or an action. Every request has a URL (where), a method (what action), optional headers (metadata), and sometimes a body (the data you're sending).",
        example: "fetch('https://pokeapi.co/api/v2/pokemon/pikachu') sends a GET request for Pikachu.",
      },
      {
        term: "Response",
        definition:
          "What the server sends back after receiving your request. Includes a status code (success or error), headers, and usually a body containing the data.",
        example: "The PokeAPI response includes a JSON body with Pikachu's name, height, weight, and types.",
      },
      {
        term: "Endpoint",
        definition:
          "A specific URL where an API can be accessed. Each endpoint represents one resource or action. Combine a base URL with a path to get an endpoint.",
        example: "https://pokeapi.co/api/v2/pokemon/25 is the endpoint for Pikachu by ID.",
      },
      {
        term: "Base URL",
        definition:
          "The root address of an API that all endpoints are built on top of. You append paths and parameters to the base URL to form specific requests.",
        example: "https://pokeapi.co/api/v2 is the base URL. You add /pokemon or /type to get specific data.",
      },
      {
        term: "JSON",
        definition:
          "JavaScript Object Notation. The most common data format APIs use. It looks like a JavaScript object: keys in quotes, values of various types, nested objects and arrays allowed.",
        example: '{ "name": "pikachu", "id": 25, "types": ["electric"] }',
      },
      {
        term: "Query Parameters",
        definition:
          "Key-value pairs added to a URL after a ? to customize a request. Multiple parameters are separated by &. Used to filter, paginate, or sort data.",
        example: "/pokemon?limit=20&offset=40 returns 20 Pokémon starting from the 41st.",
      },
      {
        term: "Rate Limit",
        definition:
          "A cap on how many API requests you can make in a given time window. Exists to protect servers from being overwhelmed. Exceeding it returns a 429 Too Many Requests error.",
        example: "PokeAPI allows 100 requests per minute. Sending 200 in one minute will get you blocked temporarily.",
      },
      {
        term: "API Documentation (Docs)",
        definition:
          "The official reference guide for an API. Lists all endpoints, parameters, response shapes, auth requirements, and rate limits. Your first stop when building with any API.",
        example: "pokeapi.co/docs/v2 shows every endpoint, what parameters they accept, and what fields come back.",
      },
    ],
  },
  {
    title: "HTTP",
    entries: [
      {
        term: "HTTP",
        definition:
          "HyperText Transfer Protocol. The standard for how data is exchanged on the web. Defines the format for requests and responses between clients and servers.",
      },
      {
        term: "GET",
        definition:
          "An HTTP method that reads data. The most common method. Does not change any data on the server. Safe to call multiple times with the same result.",
        example: "GET /pokemon/pikachu — fetches Pikachu's data without changing anything.",
      },
      {
        term: "POST",
        definition:
          "An HTTP method that creates new data. Sends a body payload to the server. Calling it twice typically creates two records.",
        example: "POST /saved-pokemon — adds a new Pokémon to your saved collection.",
      },
      {
        term: "PUT",
        definition:
          "An HTTP method that replaces existing data. Sends a new version of a resource to overwrite the current one.",
        example: "PUT /saved-pokemon/25 — updates the saved Pikachu record with new data.",
      },
      {
        term: "DELETE",
        definition:
          "An HTTP method that removes a resource. Usually targeted at a specific ID.",
        example: "DELETE /saved-pokemon/25 — removes Pikachu from your saved collection.",
      },
      {
        term: "Status Code",
        definition:
          "A three-digit number in every API response that tells you what happened. 2xx means success, 4xx means the client did something wrong, 5xx means the server had a problem.",
        example: "200 = OK, 201 = Created, 400 = Bad Request, 401 = Unauthorized, 404 = Not Found, 500 = Server Error",
      },
      {
        term: "Headers",
        definition:
          "Key-value metadata sent alongside a request or response. Used to communicate format, auth credentials, caching rules, and more. Not visible to users but critical to how requests work.",
        example: 'Authorization: Bearer abc123 tells the server who is making the request.',
      },
      {
        term: "Request Body",
        definition:
          "The data payload sent with POST, PUT, or PATCH requests. Usually formatted as JSON. Carries the information you want the server to create or update.",
        example: '{ "name": "pikachu", "nickname": "Sparky" } sent in the body of a POST request.',
      },
    ],
  },
  {
    title: "Authentication",
    entries: [
      {
        term: "Authentication (Auth)",
        definition:
          "The process of proving your identity to an API. Without it, the server doesn't know who is making the request or whether to allow it.",
      },
      {
        term: "API Key",
        definition:
          "A unique secret string tied to your account or app. Sent with each request to identify who's calling the API. Keep it private — treat it like a password.",
        example: 'Authorization: Bearer sk-abc123 in the request header.',
      },
      {
        term: "Bearer Token",
        definition:
          "A type of access token sent in the Authorization header. The name comes from 'whoever bears this token is allowed in.' Usually short-lived and must be refreshed.",
        example: 'fetch(url, { headers: { Authorization: "Bearer your-token-here" } })',
      },
      {
        term: "OAuth",
        definition:
          "An authorization standard that lets users grant your app access to their account on another service without sharing their password. Powers 'Sign in with Google/GitHub' flows.",
        example: "When a user clicks 'Connect GitHub', they approve access on GitHub, and GitHub sends your app a Bearer token to use in future requests.",
      },
      {
        term: "Authorization Header",
        definition:
          "The standard HTTP header for sending auth credentials with a request. The server reads it to decide whether to allow or reject the request.",
        example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    ],
  },
  {
    title: "Databases",
    entries: [
      {
        term: "Database",
        definition:
          "A structured system for storing and retrieving data persistently. Unlike API data (temporary), database data survives when you close the app or restart the server.",
        example: "Your saved Pokémon team lives in a database — it's there next time you open the app.",
      },
      {
        term: "Table",
        definition:
          "A named collection of data organized into rows and columns — like a spreadsheet tab. Each table stores one type of thing.",
        example: "A 'pokemon' table might have columns: id, name, type, trainer_id.",
      },
      {
        term: "Row",
        definition:
          "A single record in a table. Each row represents one instance of the thing the table stores.",
        example: "One row in the pokemon table: { id: 1, name: 'Pikachu', type: 'electric', trainer_id: 5 }",
      },
      {
        term: "Column",
        definition:
          "A named field that all rows in a table share. Defines what type of data that field holds (text, number, date, etc.).",
        example: "The 'name' column in the pokemon table stores text for every Pokémon's name.",
      },
      {
        term: "Primary Key",
        definition:
          "A column (usually 'id') that uniquely identifies each row. No two rows can share the same primary key. Automatically assigned by most databases.",
        example: "id: 25 uniquely identifies Pikachu's row. No other row can have id: 25.",
      },
      {
        term: "Foreign Key",
        definition:
          "A column that stores the primary key of a row in another table. This is how tables connect to each other.",
        example: "trainer_id: 5 in the pokemon table points to the trainer with id: 5 in the trainers table.",
      },
      {
        term: "CRUD",
        definition:
          "The four fundamental database operations: Create, Read, Update, Delete. Every data feature in an app maps to one of these. They correspond to POST, GET, PUT/PATCH, and DELETE in HTTP.",
        example: "A Pokémon collection app: Add a Pokémon (Create), View your team (Read), Rename a Pokémon (Update), Release a Pokémon (Delete).",
      },
      {
        term: "SQL",
        definition:
          "Structured Query Language. The language used to interact with relational databases. You write SELECT, INSERT, UPDATE, and DELETE statements to work with data.",
        example: "SELECT * FROM pokemon WHERE type = 'fire' returns all fire-type Pokémon.",
      },
      {
        term: "SELECT",
        definition: "SQL command for reading data. Corresponds to the Read in CRUD and GET in HTTP.",
        example: "SELECT name, type FROM pokemon WHERE id = 25",
      },
      {
        term: "INSERT",
        definition: "SQL command for adding a new row. Corresponds to the Create in CRUD and POST in HTTP.",
        example: "INSERT INTO pokemon (name, type) VALUES ('pikachu', 'electric')",
      },
      {
        term: "Schema",
        definition:
          "The structure definition for a database — what tables exist, what columns they have, and what types those columns hold. Changing a schema requires a migration.",
        example: "The schema for a 'pokemon' table defines that 'name' is text, 'id' is an integer, and 'types' is a text array.",
      },
    ],
  },
  {
    title: "API Patterns",
    entries: [
      {
        term: "REST",
        definition:
          "Representational State Transfer. The most common API pattern. Each URL is a resource, and you use HTTP methods to act on it. Responses return fixed data shapes regardless of what you need.",
        example: "GET /pokemon/25 always returns all 200+ fields for Pikachu, even if you only need the name.",
      },
      {
        term: "GraphQL",
        definition:
          "An API query language where you specify exactly which fields you want in your request. The server returns only what you asked for — no more, no less. Reduces over-fetching.",
        example: "query { pokemon(name: 'pikachu') { name types } } returns only name and types, not all 200 fields.",
      },
      {
        term: "Webhook",
        definition:
          "A pattern where the server calls your app when something happens, instead of your app polling the server. Event-driven rather than request-driven.",
        example: "Stripe sends a webhook to your app the moment a payment succeeds — no need to keep asking 'did it work?'",
      },
      {
        term: "Polling",
        definition:
          "The practice of repeatedly requesting data on a schedule to check if something changed. A workaround for real-time updates when webhooks aren't available.",
        example: "Checking for new messages every 5 seconds is polling. It works but wastes requests.",
      },
      {
        term: "Mock API",
        definition:
          "A simulated API that returns fake data without a real backend. Used during design sprints to test UI behaviour before the real API is built.",
        example: "A JSON file served locally that returns fake Pokémon data, letting designers test loading, error, and empty states independently.",
      },
      {
        term: "CORS",
        definition:
          "Cross-Origin Resource Sharing. A browser security rule that blocks JavaScript from reading API responses across different domains, unless the server explicitly allows it. A server-side config issue, not a frontend bug.",
        example: "If your app at localhost:3000 calls an API at api.example.com that hasn't added localhost to its allowlist, you get a CORS error.",
      },
    ],
  },
  {
    title: "UX & Data States",
    entries: [
      {
        term: "Loading State",
        definition:
          "The UI state shown while an API request is in flight and no data has arrived yet. Should give users a sense of what's coming, not just a spinner.",
        example: "A skeleton screen that mirrors the layout of the Pokémon cards about to load.",
      },
      {
        term: "Success State",
        definition:
          "The UI state shown when an API call returned data successfully. The 'happy path' — what most designs focus on first.",
        example: "A grid of Pokémon cards displayed after the API returns a 200 with data.",
      },
      {
        term: "Error State",
        definition:
          "The UI state shown when an API call failed. Should explain what went wrong in plain language and offer a path forward (retry, go back, contact support).",
        example: "'Couldn't load your team. Check your connection and try again.' with a Retry button.",
      },
      {
        term: "Empty State",
        definition:
          "The UI state shown when an API call succeeded but returned no data (an empty array, for example). Different from an error — the request worked, there's just nothing there yet.",
        example: "'Your Pokémon team is empty. Search for a Pokémon to add your first one.'",
      },
      {
        term: "Skeleton Screen",
        definition:
          "A loading placeholder that mimics the shape and layout of the content about to appear. Better than spinners because it sets layout expectations and reduces perceived wait time.",
        example: "Gray rounded rectangles in the shape of Pokémon cards while data loads.",
      },
      {
        term: "Optimistic UI",
        definition:
          "A pattern where the UI immediately shows the result of an action before the server confirms it, then reverts if the server returns an error. Makes apps feel faster.",
        example: "Showing a Pokémon as saved the moment you tap the button, before the POST request completes.",
      },
    ],
  },
  {
    title: "Tools",
    entries: [
      {
        term: "Postman",
        definition:
          "The most popular tool for exploring and testing APIs. Lets you make requests, inspect responses, save collections, and share them with teammates — no code required.",
      },
      {
        term: "Postman Collection",
        definition:
          "A saved folder of API requests in Postman. Can be exported and shared with teammates so everyone uses the same endpoints, headers, and parameters.",
        example: "A 'Pokémon Companion' collection with all the API calls for your project, pre-configured and ready to share.",
      },
      {
        term: "Postman Environment",
        definition:
          "A set of variables in Postman (like base URLs, API keys, or IDs) that can be swapped between environments (dev, staging, production) without editing every request.",
        example: "{{baseUrl}} = https://pokeapi.co/api/v2 — change it once and all your requests update.",
      },
      {
        term: "Supabase",
        definition:
          "An open-source backend-as-a-service built on Postgres. Provides a hosted database, auto-generated REST API, authentication, and realtime subscriptions.",
        example: "Instead of writing SQL directly, you can use supabase.from('pokemon').select('*') in JavaScript.",
      },
      {
        term: "DevTools (Browser)",
        definition:
          "Built-in browser developer tools. The Network tab shows every API request your app makes — the URL, method, status code, and full response. One of the most useful tools for understanding live apps.",
        example: "Cmd + Option + I (Mac) opens DevTools. The Network tab shows every fetch() call in real time.",
      },
    ],
  },
];

export default function GlossaryPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="md:ml-72 flex-1 min-h-screen">
        {/* Mobile top bar */}
        <div
          className="md:hidden flex items-center pl-14 pr-4 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Glossary
          </span>
        </div>

        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h1
              className="text-3xl font-bold tracking-tight mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Glossary
            </h1>
            <p className="mb-10" style={{ color: "var(--text-secondary)" }}>
              Every term from the course, defined in plain language.
            </p>

            <div className="space-y-12">
              {glossarySections.map((section) => (
                <section key={section.title}>
                  <h2
                    className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
                    style={{
                      color: "var(--accent)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {section.title}
                  </h2>
                  <dl className="space-y-5">
                    {section.entries.map((entry) => (
                      <div key={entry.term}>
                        <dt
                          className="text-sm font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {entry.term}
                        </dt>
                        <dd
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {entry.definition}
                          {entry.example && (
                            <span
                              className="block mt-1.5 text-xs font-mono px-3 py-2 rounded-lg"
                              style={{
                                backgroundColor: "var(--bg-tertiary)",
                                color: "var(--text-tertiary)",
                              }}
                            >
                              {entry.example}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Resource {
  title: string;
  url: string;
  type: "video" | "article" | "docs" | "interactive";
  description: string;
}

export interface CodeExercise {
  starterCode: string;
  solution: string;
  instructions: string[];
  hint: string;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  readTime: number;
  narrative: string;
  concepts: string[];
  content: string;
  exercise?: CodeExercise;
  quiz?: QuizQuestion[];
  resources: Resource[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  chapters: Chapter[];
}

export const modules: Module[] = [
  {
    id: "1",
    title: "What Even Is an API?",
    description: "Discover how apps talk to servers — no code experience needed.",
    icon: "Zap",
    chapters: [
      {
        id: "1-1",
        title: "The Restaurant Analogy",
        subtitle: "Understanding APIs through everyday life",
        readTime: 4,
        narrative:
          "Welcome to your first day on the team! Before we dive into building, let's understand the invisible conversations happening between every app and server. Think of it like ordering at a restaurant...",
        concepts: ["API", "Client", "Server", "Request", "Response"],
        content: `## What is an API?

**API** stands for **Application Programming Interface**. That sounds technical, but here's the simple version:

An API is a **waiter** at a restaurant.

- **You** (the client) sit at a table and look at the menu
- **The kitchen** (the server) has all the food, but you can't walk in and grab it yourself
- **The waiter** (the API) takes your order to the kitchen and brings back your food

In the digital world:
- **Your browser or app** is the client
- **A remote computer** is the server (it has data, like Pokemon info or your playlists)
- **The API** is the set of rules for how to ask for that data and what you'll get back

### The Request-Response Cycle

Every API interaction follows this pattern:

1. **You send a request** — "I'd like the data for Pikachu, please"
2. **The server processes it** — Looks up Pikachu in its database
3. **You get a response** — Here's Pikachu's name, type, stats, and image

This happens every time you open an app. When you scroll Instagram, your phone sends hundreds of API requests asking for posts, likes, and comments.

### Why Should Designers Care?

As a product designer, APIs define **what's possible** in your designs:
- What data can you show? (The API decides)
- How fast does it load? (The API response time)
- What can users do? (The API endpoints available)

Understanding APIs means you can design **with** the technology, not against it.`,
        exercise: {
          starterCode: `// Let's make your very first API call!
// The PokeAPI is a free API with data about every Pokemon.

// This URL is an "endpoint" — a specific address where data lives
const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

// fetch() is how browsers ask for data from APIs
const response = await fetch(url);

// The response comes as JSON (a data format — we'll learn more soon)
const data = await response.json();

// Let's see what we got!
console.log("Pokemon name:", data.name);
console.log("Pokemon types:", data.types.map(t => t.type.name));
console.log("Sprite URL:", data.sprites.front_default);`,
          solution: `const url = "https://pokeapi.co/api/v2/pokemon/pikachu";
const response = await fetch(url);
const data = await response.json();
console.log("Pokemon name:", data.name);
console.log("Pokemon types:", data.types.map(t => t.type.name));
console.log("Sprite URL:", data.sprites.front_default);`,
          instructions: [
            "Click the Run button to execute your first API call",
            "Look at the output — you just fetched real data from a server!",
            "Try changing 'pikachu' to another Pokemon name like 'charizard' or 'eevee'",
          ],
          hint: "Pokemon names must be lowercase. Try 'bulbasaur', 'charmander', or 'squirtle'.",
        },
        quiz: [
          {
            id: "1-1-q1",
            question: "In the restaurant analogy, what does the API represent?",
            options: ["The menu", "The waiter", "The kitchen", "The table"],
            correctIndex: 1,
            explanation:
              "The API is like the waiter — it takes your request to the server (kitchen) and brings back the response (food).",
          },
          {
            id: "1-1-q2",
            question: "What are the two main parts of an API interaction?",
            options: [
              "Upload and download",
              "Request and response",
              "Input and output",
              "Send and receive",
            ],
            correctIndex: 1,
            explanation:
              "Every API interaction is a request-response cycle: you send a request, and the server sends back a response.",
          },
        ],
        resources: [
          {
            title: "APIs for Beginners — Full Course",
            url: "https://www.youtube.com/watch?v=GZvSYJDk-us",
            type: "video",
            description: "A free 2-hour YouTube course explaining APIs from scratch.",
          },
          {
            title: "What is an API? (MDN Web Docs)",
            url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
            type: "docs",
            description: "Mozilla's beginner-friendly introduction to web APIs.",
          },
        ],
      },
      {
        id: "1-2",
        title: "Your First API Call",
        subtitle: "Fetching real Pokemon data with code",
        readTime: 6,
        narrative:
          "Now that you understand the concept, let's actually do it. We're going to call the PokeAPI and get real data. Don't worry if the code looks unfamiliar — I'll walk you through every line.",
        concepts: ["fetch()", "JSON", "Endpoint", "URL", "async/await"],
        content: `## Making Your First API Call

Let's break down the anatomy of an API call. There are three key pieces:

### 1. The Endpoint (URL)

\`\`\`
https://pokeapi.co/api/v2/pokemon/pikachu
\`\`\`

This is the **address** where the data lives. Let's break it apart:
- \`https://pokeapi.co\` — The server (like a restaurant's address)
- \`/api/v2\` — The version of the API (like a menu edition)
- \`/pokemon\` — The type of data (the section of the menu)
- \`/pikachu\` — The specific item you want

### 2. The Request (fetch)

\`\`\`javascript
const response = await fetch(url);
\`\`\`

\`fetch()\` is a built-in browser function that sends your request. The \`await\` keyword means "wait for the server to respond before continuing."

### 3. The Response (JSON)

\`\`\`javascript
const data = await response.json();
\`\`\`

The server sends back data in **JSON** format. JSON looks like this:

\`\`\`json
{
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [{ "type": { "name": "electric" } }]
}
\`\`\`

JSON is just a way to structure data — think of it like a really organized spreadsheet in text form.

### Pro Tip: Open Your DevTools!

Press **Cmd + Option + I** (Mac) to open your browser's Developer Tools. Click the **Network** tab. Now when you run API calls, you'll see the actual requests flying back and forth. This is one of the most powerful tools for understanding how apps work.`,
        exercise: {
          starterCode: `// TODO: Fetch data for 3 different Pokemon and display their info
// Hint: Use a for...of loop with an array of names

const pokemonNames = ["bulbasaur", "charmander", "squirtle"];

for (const name of pokemonNames) {
  // TODO: Fetch each Pokemon's data
  const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${name}\`);
  const data = await response.json();

  // TODO: Log the name, types, and height
  console.log(\`--- \${data.name.toUpperCase()} ---\`);
  console.log("Types:", data.types.map(t => t.type.name).join(", "));
  console.log("Height:", data.height);
  console.log("Weight:", data.weight);
  console.log("");
}`,
          solution: `const pokemonNames = ["bulbasaur", "charmander", "squirtle"];
for (const name of pokemonNames) {
  const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${name}\`);
  const data = await response.json();
  console.log(\`--- \${data.name.toUpperCase()} ---\`);
  console.log("Types:", data.types.map(t => t.type.name).join(", "));
  console.log("Height:", data.height);
  console.log("Weight:", data.weight);
  console.log("");
}`,
          instructions: [
            "Run the code to fetch data for 3 starter Pokemon",
            "Try adding more Pokemon names to the array",
            "Try accessing different properties — what about data.sprites?",
          ],
          hint: "Add console.log(data) right after the 'const data = ...' line, then hit Run. Look for 'sprites', 'stats', and 'types' in the output — those are all the properties you can use.",
        },
        quiz: [
          {
            id: "1-2-q1",
            question: "What format does API data typically come back in?",
            options: ["HTML", "JSON", "XML", "CSV"],
            correctIndex: 1,
            explanation:
              "Most modern APIs return data in JSON (JavaScript Object Notation) format — it's easy to read and work with.",
          },
          {
            id: "1-2-q2",
            question: "What does an API endpoint represent?",
            options: [
              "A type of data format",
              "A specific URL where data can be accessed",
              "A programming language",
              "A server computer",
            ],
            correctIndex: 1,
            explanation:
              "An endpoint is a specific URL that represents a resource. Different endpoints give you different data.",
          },
        ],
        resources: [
          {
            title: "PokeAPI Documentation",
            url: "https://pokeapi.co/docs/v2",
            type: "docs",
            description: "Explore all the endpoints available in the Pokemon API.",
          },
          {
            title: "JavaScript Fetch API (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
            type: "docs",
            description: "The official reference for the fetch() function.",
          },
        ],
      },
      {
        id: "1-3",
        title: "Reading the Menu (API Docs)",
        subtitle: "How to navigate API documentation like a pro",
        readTime: 5,
        narrative:
          "Every good restaurant has a menu. Every good API has documentation. Let's learn how to read API docs so you always know what data is available and how to ask for it.",
        concepts: [
          "API Documentation",
          "Parameters",
          "Query strings",
          "Base URL",
          "Rate limits",
        ],
        content: `## How to Read API Documentation

API documentation is your **map**. It tells you:
- What data you can ask for
- How to ask for it
- What you'll get back

### Key Sections in API Docs

**1. Base URL** — The root address of the API:
\`\`\`
https://pokeapi.co/api/v2
\`\`\`

**2. Endpoints** — The paths you can add to the base URL:
\`\`\`
/pokemon          → List of Pokemon
/pokemon/{id}     → A specific Pokemon
/type             → List of types
/ability          → List of abilities
\`\`\`

**3. Parameters** — Ways to customize your request:
\`\`\`
/pokemon?limit=10&offset=20
\`\`\`
- \`limit=10\` means "give me 10 results"
- \`offset=20\` means "start from the 20th item"

The \`?\` starts parameters, and \`&\` separates them.

**4. Response Shape** — What the data looks like when it comes back. Good docs show example responses so you know exactly what fields to expect.

### Reading PokeAPI's Docs

Let's look at a real endpoint: \`/pokemon/{id or name}\`

The docs tell us this returns:
- \`name\` — The Pokemon's name
- \`height\` — Height in decimeters
- \`weight\` — Weight in hectograms
- \`types\` — Array of type objects
- \`sprites\` — Object with image URLs
- \`stats\` — Array of stat objects (HP, Attack, etc.)
- \`abilities\` — Array of ability objects

This tells you as a designer: "I can show name, image, types, stats, and abilities on a Pokemon card."

### Rate Limits

Most APIs have a limit on how many requests you can make. PokeAPI is generous (100 requests per minute), but most paid APIs like GitHub or Stripe limit you to a certain number per second. Always check this in the docs!`,
        exercise: {
          starterCode: `// Let's use query parameters to browse Pokemon
// The /pokemon endpoint returns a list, not just one

// First, let's see what the list endpoint looks like
const listResponse = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
);
const listData = await listResponse.json();

console.log("Total Pokemon in API:", listData.count);
console.log("Results returned:", listData.results.length);
console.log("\\nFirst 5 Pokemon:");
listData.results.forEach((p, i) => {
  console.log(\`  \${i + 1}. \${p.name}\`);
});

// TODO: Try changing limit and offset!
// What happens with limit=10&offset=150?`,
          solution: `const listResponse = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
);
const listData = await listResponse.json();
console.log("Total Pokemon in API:", listData.count);
console.log("Results returned:", listData.results.length);
console.log("\\nFirst 5 Pokemon:");
listData.results.forEach((p, i) => {
  console.log(\`  \${i + 1}. \${p.name}\`);
});`,
          instructions: [
            "Run the code to see the list endpoint in action",
            "Change limit=5 to limit=10 to get more results",
            "Change offset=0 to offset=150 to see later Pokemon",
            "Notice how the API gives you 'next' and 'previous' URLs for pagination",
          ],
          hint: "Add console.log(listData) right after the 'const listData = ...' line, then hit Run. Look for a 'next' URL in the output — that's how the API lets you page through all 1350 Pokemon.",
        },
        resources: [
          {
            title: "How to Read API Documentation",
            url: "https://www.youtube.com/watch?v=jCadnlO9xSQ",
            type: "video",
            description: "A practical walkthrough of reading and understanding API docs.",
          },
          {
            title: "PokeAPI Interactive Explorer",
            url: "https://pokeapi.co/",
            type: "interactive",
            description: "Try different endpoints right on the PokeAPI website.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Speaking the Language",
    description: "HTTP methods, headers, status codes — the grammar of APIs.",
    icon: "MessageSquare",
    chapters: [
      {
        id: "2-1",
        title: "GET vs POST — Ordering vs Submitting",
        subtitle: "Understanding HTTP methods",
        readTime: 5,
        narrative:
          "Now that you can read the menu and place orders, let's learn the different ways to talk to a server. Sometimes you're asking for data, sometimes you're sending data. These are called HTTP methods.",
        concepts: [
          "GET",
          "POST",
          "PUT",
          "DELETE",
          "HTTP Methods",
          "Request body",
        ],
        content: `## HTTP Methods — The Verbs of the Web

When you interact with an API, you don't just send a URL — you also specify **what you want to do**. These are HTTP methods:

### GET — "Give me data"
The most common method. You're **reading** information.
\`\`\`javascript
// GET is the default — just fetching data
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
\`\`\`
**Analogy:** Looking at the menu or asking "What do you have?"

### POST — "Here's new data"
Used to **create** something new or send data to the server.
\`\`\`javascript
fetch("/api/save-pokemon", {
  method: "POST",
  body: JSON.stringify({ name: "pikachu", favorite: true }),
  headers: { "Content-Type": "application/json" }
})
\`\`\`
**Analogy:** Placing an order or filling out a form.

### PUT — "Update this data"
Used to **replace** or update existing data.
\`\`\`javascript
fetch("/api/pokemon/1", {
  method: "PUT",
  body: JSON.stringify({ favorite: false }),
  headers: { "Content-Type": "application/json" }
})
\`\`\`
**Analogy:** Changing your order after you've placed it.

### DELETE — "Remove this data"
Used to **delete** something.
\`\`\`javascript
fetch("/api/pokemon/1", { method: "DELETE" })
\`\`\`
**Analogy:** Canceling your order.

### Why This Matters for Designers

Each screen in your app maps to one or more HTTP methods:
- **Listing page** → GET (fetch the list)
- **Create form** → POST (submit new data)
- **Edit form** → PUT (update existing data)
- **Delete button** → DELETE (remove data)

When your engineer says "that's a POST endpoint," you'll know they mean it creates new data.`,
        exercise: {
          starterCode: `// Let's see how different HTTP methods work
// We'll use JSONPlaceholder — a free test API for practicing

// GET — Fetching data (reading)
console.log("=== GET Request ===");
const getResponse = await fetch(
  "https://jsonplaceholder.typicode.com/posts/1"
);
const post = await getResponse.json();
console.log("Title:", post.title);
console.log("");

// POST — Creating new data (writing)
console.log("=== POST Request ===");
const postResponse = await fetch(
  "https://jsonplaceholder.typicode.com/posts",
  {
    method: "POST",
    body: JSON.stringify({
      title: "My First API Post",
      body: "I'm learning APIs!",
      userId: 1,
    }),
    headers: { "Content-Type": "application/json" },
  }
);
const newPost = await postResponse.json();
console.log("Created post with ID:", newPost.id);
console.log("Title:", newPost.title);`,
          solution: `const getResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
const post = await getResponse.json();
console.log("Title:", post.title);

const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "My First API Post",
    body: "I'm learning APIs!",
    userId: 1,
  }),
  headers: { "Content-Type": "application/json" },
});
const newPost = await postResponse.json();
console.log("Created post with ID:", newPost.id);`,
          instructions: [
            "Run the code to see both GET and POST in action",
            "Notice how POST requires a 'body' — that's the data you're sending",
            "Try changing the title and body of the POST request",
          ],
          hint: "JSONPlaceholder doesn't actually save your data — it just pretends to. But the response shows what would be created!",
        },
        resources: [
          {
            title: "HTTP Methods Explained",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
            type: "docs",
            description: "Complete reference for all HTTP methods.",
          },
        ],
      },
      {
        id: "2-2",
        title: "Headers, Auth & API Keys",
        subtitle: "The secret handshake of APIs",
        readTime: 5,
        narrative:
          "Some APIs are open to everyone (like PokeAPI), but most require you to identify yourself. That's where headers and API keys come in — think of it as showing your ID at the door.",
        concepts: [
          "Headers",
          "API Key",
          "Authentication",
          "Authorization",
          "Bearer Token",
        ],
        content: `## Headers — Metadata for Your Requests

Every API request carries **headers** — extra information about the request itself. Think of them as the envelope your letter comes in.

### Common Headers

\`\`\`javascript
fetch(url, {
  headers: {
    "Content-Type": "application/json",    // "I'm sending JSON data"
    "Accept": "application/json",           // "Please send me JSON back"
    "Authorization": "Bearer your-key",     // "Here's my identity"
  }
})
\`\`\`

### Authentication — Proving Who You Are

There are several ways APIs verify your identity:

**1. API Key** — A unique code (like a membership card)
\`\`\`javascript
// Sometimes in the URL
fetch("https://api.example.com/data?api_key=abc123")

// Sometimes in a header
fetch("https://api.example.com/data", {
  headers: { "X-API-Key": "abc123" }
})
\`\`\`

**2. Bearer Token** — A temporary pass (like a concert wristband)
\`\`\`javascript
fetch("https://api.github.com/user", {
  headers: { "Authorization": "Bearer your-token-here" }
})
\`\`\`

**3. OAuth** — Logging in through another service (we'll cover this in Module 4!)

### Why Do APIs Need Auth?

- **Rate limiting** — Track how many requests you make
- **Security** — Only authorized users access data
- **Billing** — Some APIs charge per request
- **Privacy** — Your private data shouldn't be public

### For Designers

When designing features that use authenticated APIs, consider:
- What happens when the token expires? (Show a re-login prompt)
- What if the user hasn't connected their account yet? (Show an empty state with "Connect" CTA)
- What data do we need permission to access? (Consent screens)`,
        exercise: {
          starterCode: `// Let's see how headers work in practice
// We'll inspect what headers look like in a request

// First, a simple request (no special headers)
const simpleResponse = await fetch(
  "https://pokeapi.co/api/v2/pokemon/pikachu"
);
console.log("=== Simple Request ===");
console.log("Status:", simpleResponse.status);
console.log("Content-Type:", simpleResponse.headers.get("content-type"));
console.log("");

// Now let's see what happens when we add headers
// This is how you'd call an authenticated API
console.log("=== Request With Headers ===");
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  // "Authorization": "Bearer your-token-here"  // Uncomment for real APIs
};
console.log("Headers we'd send:", JSON.stringify(headers, null, 2));
console.log("");
console.log("Pro tip: Open DevTools (Cmd+Opt+I) > Network tab");
console.log("to see all headers on every request!");`,
          solution: `const simpleResponse = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
console.log("Status:", simpleResponse.status);
console.log("Content-Type:", simpleResponse.headers.get("content-type"));`,
          instructions: [
            "Run the code to see how response headers work",
            "Open DevTools (Cmd+Option+I) and go to the Network tab",
            "Click on a request to see both request and response headers",
          ],
          hint: "Add console.log(response.headers.get('content-type')) after the fetch line, then hit Run. You should see 'application/json' — that confirms the API is sending JSON, not HTML or plain text.",
        },
        resources: [
          {
            title: "HTTP Headers Reference",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers",
            type: "docs",
            description: "Full list of HTTP headers and what they do.",
          },
        ],
      },
      {
        id: "2-3",
        title: "When Things Go Wrong",
        subtitle: "Understanding error codes and handling failures gracefully",
        readTime: 5,
        narrative:
          "Not every API call succeeds. Sometimes the server is down, sometimes you typed the URL wrong, sometimes you're not authorized. Let's learn to read error codes and handle them gracefully.",
        concepts: [
          "Status codes",
          "200 OK",
          "404 Not Found",
          "500 Server Error",
          "Error handling",
          "try/catch",
        ],
        content: `## Status Codes — The Server's Report Card

Every API response comes with a **status code** — a number that tells you how things went.

### The Good

| Code | Meaning | Analogy |
|------|---------|---------|
| **200** | OK — Everything worked | "Here's your food!" |
| **201** | Created — New thing made | "Your order has been placed!" |
| **204** | No Content — Done, nothing to return | "Your plate has been cleared." |

### The "You Messed Up"

| Code | Meaning | Analogy |
|------|---------|---------|
| **400** | Bad Request — Something wrong with your request | "That's not on the menu" |
| **401** | Unauthorized — Need to log in | "Can I see your ID?" |
| **403** | Forbidden — Logged in but not allowed | "VIP section only" |
| **404** | Not Found — Doesn't exist | "We don't have that dish" |
| **429** | Too Many Requests — Slow down | "One order at a time, please" |

### The "Server Messed Up"

| Code | Meaning | Analogy |
|------|---------|---------|
| **500** | Internal Server Error | "The kitchen is on fire" |
| **502** | Bad Gateway | "The delivery truck broke down" |
| **503** | Service Unavailable | "We're closed for maintenance" |

### Handling Errors in Code

\`\`\`javascript
try {
  const response = await fetch(url);

  if (!response.ok) {
    // response.ok is true for 200-299 status codes
    throw new Error(\`HTTP \${response.status}\`);
  }

  const data = await response.json();
  // Use the data...
} catch (error) {
  // Something went wrong — show a helpful message
  console.error("Failed to fetch:", error.message);
}
\`\`\`

### For Designers: Error States Matter

Every API call can fail. For each feature, design:
- **Loading state** — While waiting for the response
- **Success state** — Data loaded correctly
- **Error state** — Something went wrong (with a clear message and retry option)
- **Empty state** — No data found (different from an error!)`,
        exercise: {
          starterCode: `// Let's intentionally trigger different error codes!

async function fetchPokemon(name) {
  try {
    console.log(\`Fetching "\${name}"...\`);
    const response = await fetch(
      \`https://pokeapi.co/api/v2/pokemon/\${name}\`
    );

    console.log("Status:", response.status, response.ok ? "✓" : "✗");

    if (!response.ok) {
      throw new Error(
        \`Pokemon "\${name}" not found (HTTP \${response.status})\`
      );
    }

    const data = await response.json();
    console.log("Found:", data.name, "— Type:", data.types[0].type.name);
  } catch (error) {
    console.error("Error:", error.message);
  }
  console.log("");
}

// This should work (200 OK)
await fetchPokemon("pikachu");

// This should fail (404 Not Found)
await fetchPokemon("not-a-real-pokemon");

// TODO: Try other Pokemon names — real and fake!
await fetchPokemon("mewtwo");`,
          solution: `async function fetchPokemon(name) {
  try {
    const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${name}\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const data = await response.json();
    console.log("Found:", data.name);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
await fetchPokemon("pikachu");
await fetchPokemon("not-a-real-pokemon");`,
          instructions: [
            "Run the code to see how success and failure look different",
            "Notice the 200 vs 404 status codes",
            "Try typing a real Pokemon name and a fake one",
          ],
          hint: "Try triggering the error on purpose — change 'pikachu' to a random word like 'banana'. The catch block will handle it gracefully and show your error message instead of crashing.",
        },
        quiz: [
          {
            id: "2-3-q1",
            question: "What does a 404 status code mean?",
            options: [
              "Server error",
              "Not found",
              "Unauthorized",
              "Success",
            ],
            correctIndex: 1,
            explanation:
              "404 means the resource you asked for doesn't exist — like searching for a Pokemon that isn't in the database.",
          },
          {
            id: "2-3-q2",
            question:
              "Which status code range means 'the server had a problem'?",
            options: ["200-299", "300-399", "400-499", "500-599"],
            correctIndex: 3,
            explanation:
              "5xx codes mean the server encountered an error. 4xx means the client (you) made a mistake.",
          },
        ],
        resources: [
          {
            title: "HTTP Status Codes Cheat Sheet",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
            type: "docs",
            description: "Quick reference for all HTTP status codes.",
          },
          {
            title: "Designing Error States",
            url: "https://www.youtube.com/watch?v=BU7cj-LCPok",
            type: "video",
            description: "UX best practices for error handling in design.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Databases — Where Data Lives",
    description: "Tables, queries, and CRUD — the foundation of every app.",
    icon: "Database",
    chapters: [
      {
        id: "3-1",
        title: "The Spreadsheet Analogy",
        subtitle: "Databases are just organized spreadsheets",
        readTime: 4,
        narrative:
          "Your PM just asked you to save users' favorite Pokemon. Where does that data go? Not the API — that's someone else's data. You need your own database. And it's simpler than you think.",
        concepts: [
          "Database",
          "Table",
          "Row",
          "Column",
          "Schema",
          "Primary Key",
        ],
        content: `## Databases — Fancy Spreadsheets

If you've ever used Excel or Google Sheets, you already understand databases. Seriously.

### The Analogy

| Spreadsheet | Database | Example |
|------------|----------|---------|
| Workbook | Database | "My Pokemon App" |
| Sheet | Table | "saved_pokemon" |
| Column header | Column/Field | "name", "type", "level" |
| Row | Record | One specific Pokemon |
| Cell | Value | "Pikachu" |

### A Real Example

Imagine a \`saved_pokemon\` table:

| id | name | type | sprite_url | saved_at |
|----|------|------|-----------|----------|
| 1 | Pikachu | electric | https://... | 2024-03-15 |
| 2 | Charizard | fire | https://... | 2024-03-15 |
| 3 | Eevee | normal | https://... | 2024-03-16 |

### Key Concepts

**Primary Key (id)** — Every row needs a unique identifier. It's like a Social Security number for your data. Usually auto-generated.

**Schema** — The structure of your table (column names and their types). You decide this before adding data:
- \`id\` → UUID (auto-generated unique ID)
- \`name\` → Text (string)
- \`type\` → Text
- \`sprite_url\` → Text
- \`saved_at\` → Timestamp (auto-generated)

**Data Types** — Each column has a type:
- **Text** — Words and sentences
- **Integer** — Whole numbers
- **Boolean** — True or false
- **Timestamp** — Date and time
- **UUID** — Unique identifier

### Why Supabase?

We'll use **Supabase** — it gives you a real PostgreSQL database with a beautiful dashboard UI. You can see your tables, edit data visually, and query it with code. It's like Google Sheets that speaks SQL.`,
        exercise: {
          starterCode: `// Let's think about database design!
// No code to run yet — this is a planning exercise.

// Imagine you're designing a "My Pokemon Team" feature.
// What data would you need to store?

const teamTableDesign = {
  tableName: "my_team",
  columns: {
    id: "UUID (auto-generated, primary key)",
    pokemon_id: "Integer (the Pokemon's ID from PokeAPI)",
    name: "Text (Pokemon's name)",
    nickname: "Text (optional — user's custom name)",
    sprite_url: "Text (URL to the Pokemon's image)",
    types: "Text[] (array of type names)",
    position: "Integer (1-6, position in team)",
    added_at: "Timestamp (auto-generated)",
  },
};

console.log("=== My Team Table Design ===");
console.log("Table:", teamTableDesign.tableName);
console.log("\\nColumns:");
Object.entries(teamTableDesign.columns).forEach(([col, type]) => {
  console.log(\`  \${col}: \${type}\`);
});

console.log("\\n💡 In the next chapter, we'll create this table for real!");`,
          solution: `const teamTableDesign = {
  tableName: "my_team",
  columns: {
    id: "UUID",
    pokemon_id: "Integer",
    name: "Text",
    nickname: "Text (optional)",
    sprite_url: "Text",
    types: "Text[]",
    position: "Integer (1-6)",
    added_at: "Timestamp",
  },
};
console.log(JSON.stringify(teamTableDesign, null, 2));`,
          instructions: [
            "Run the code to see our table design",
            "Think: what other columns might be useful?",
            "What if we also wanted to track win/loss records?",
          ],
          hint: "Good schema design starts with the question: 'What data does the UI need to display?'",
        },
        resources: [
          {
            title: "Supabase Getting Started",
            url: "https://supabase.com/docs/guides/getting-started",
            type: "docs",
            description: "Create your free Supabase project and first table.",
          },
          {
            title: "Database Design for Beginners",
            url: "https://www.youtube.com/watch?v=ztHopE5Wnpc",
            type: "video",
            description: "Visual introduction to database tables and relationships.",
          },
        ],
      },
      {
        id: "3-2",
        title: "Your First Database",
        subtitle: "Setting up Supabase and creating tables",
        readTime: 7,
        narrative:
          "Time to get hands-on. We're going to create a real database, define a table, and see it come to life in the Supabase dashboard.",
        concepts: [
          "Supabase",
          "PostgreSQL",
          "CREATE TABLE",
          "SQL",
          "Dashboard",
        ],
        content: `## Setting Up Supabase

### Step 1: Create a Supabase Account
1. Go to [supabase.com](https://supabase.com) and sign up (free!)
2. Create a new project — give it a name like "api-explorer"
3. Save your project URL and anon key (we'll need these)

### Step 2: Create Your First Table

In the Supabase dashboard, go to **Table Editor** and click **New Table**.

Or use SQL — go to **SQL Editor** and run:

\`\`\`sql
CREATE TABLE saved_pokemon (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pokemon_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  sprite_url TEXT,
  types TEXT[],
  saved_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

Let's break this down:
- \`id UUID DEFAULT gen_random_uuid() PRIMARY KEY\` — Auto-generate a unique ID for each row
- \`INTEGER NOT NULL\` — A number that must have a value
- \`TEXT\` — A string of text
- \`TEXT[]\` — An array (list) of text values
- \`DEFAULT NOW()\` — Automatically set to the current time

### Step 3: Connect From Code

\`\`\`javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
\`\`\`

That's it! You now have a database connected to your app.

### The Supabase Dashboard

One of the best things about Supabase is the visual dashboard. You can:
- See all your tables and their data
- Add/edit/delete rows manually
- Run SQL queries
- See real-time changes

It's like having a spreadsheet view of your database.`,
        exercise: {
          starterCode: `// Once you've set up Supabase and added your keys to .env.local,
// uncomment the code below to test your connection!

// For now, let's practice the concepts:

console.log("=== Database Connection Checklist ===");
console.log("1. ✓ Create Supabase account at supabase.com");
console.log("2. ✓ Create a new project");
console.log("3. ✓ Copy your project URL and anon key");
console.log("4. ✓ Add them to .env.local");
console.log("5. ✓ Create the saved_pokemon table");
console.log("");
console.log("Once connected, we'll be able to:");
console.log("  - INSERT new Pokemon (save favorites)");
console.log("  - SELECT Pokemon (read your list)");
console.log("  - UPDATE Pokemon (edit details)");
console.log("  - DELETE Pokemon (remove from favorites)");
console.log("");
console.log("Head to /setup in the app for the full setup guide!");`,
          solution: `console.log("Set up Supabase and add your keys to .env.local");`,
          instructions: [
            "Visit supabase.com and create a free account",
            "Create a new project named 'api-explorer'",
            "Go to the SQL Editor and create the saved_pokemon table",
            "Copy your project URL and anon key to .env.local",
          ],
          hint: "The setup page at /setup has the complete walkthrough with copy-paste commands!",
        },
        resources: [
          {
            title: "Supabase JavaScript Client",
            url: "https://supabase.com/docs/reference/javascript/introduction",
            type: "docs",
            description: "Official reference for the Supabase JS library.",
          },
        ],
      },
      {
        id: "3-3",
        title: "CRUD — The Four Things You Can Do",
        subtitle: "Create, Read, Update, Delete with Supabase",
        readTime: 7,
        narrative:
          "Every app in the world does four things with data: Create it, Read it, Update it, and Delete it. These four operations have a catchy name: CRUD. Let's master each one.",
        concepts: [
          "CRUD",
          "INSERT",
          "SELECT",
          "UPDATE",
          "DELETE",
          "Supabase client",
        ],
        content: `## CRUD Operations

Every feature you'll ever design maps to one of these four operations:

### Create (INSERT)
Adding new data to the database.
\`\`\`javascript
const { data, error } = await supabase
  .from('saved_pokemon')
  .insert({
    pokemon_id: 25,
    name: 'pikachu',
    sprite_url: 'https://...',
    types: ['electric']
  })
  .select()  // Return the newly created row
\`\`\`

### Read (SELECT)
Fetching data from the database.
\`\`\`javascript
// Get all saved Pokemon
const { data } = await supabase
  .from('saved_pokemon')
  .select('*')

// Get one specific Pokemon
const { data } = await supabase
  .from('saved_pokemon')
  .select('*')
  .eq('name', 'pikachu')
  .single()

// Get with ordering
const { data } = await supabase
  .from('saved_pokemon')
  .select('*')
  .order('saved_at', { ascending: false })
\`\`\`

### Update (UPDATE)
Changing existing data.
\`\`\`javascript
const { data, error } = await supabase
  .from('saved_pokemon')
  .update({ nickname: 'Sparky' })
  .eq('pokemon_id', 25)  // Only update Pikachu
  .select()
\`\`\`

### Delete (DELETE)
Removing data from the database.
\`\`\`javascript
const { error } = await supabase
  .from('saved_pokemon')
  .delete()
  .eq('pokemon_id', 25)  // Only delete Pikachu
\`\`\`

### The Pattern

Notice how every Supabase operation follows the same pattern:
1. \`supabase.from('table_name')\` — Pick the table
2. \`.insert()\` / \`.select()\` / \`.update()\` / \`.delete()\` — Pick the operation
3. \`.eq()\` / \`.order()\` / \`.limit()\` — Add filters
4. Check for \`error\` — Always handle errors!

### For Designers

Map your screens to CRUD:
- **"Save to favorites" button** → INSERT
- **"My favorites" list** → SELECT
- **"Edit nickname" form** → UPDATE
- **"Remove from favorites" button** → DELETE`,
        exercise: {
          starterCode: `// CRUD Practice — simulated with in-memory data
// (Connect Supabase in /setup to use a real database!)

let myTeam = [];

// CREATE — Save a Pokemon
function savePokemon(pokemon) {
  const entry = { ...pokemon, id: Date.now(), saved_at: new Date() };
  myTeam.push(entry);
  console.log("Saved:", entry.name);
  return entry;
}

// READ — Get all saved Pokemon
function getTeam() {
  return myTeam;
}

// UPDATE — Rename a Pokemon
function renamePokemon(id, nickname) {
  const pokemon = myTeam.find(p => p.id === id);
  if (pokemon) {
    pokemon.nickname = nickname;
    console.log(\`Renamed \${pokemon.name} to "\${nickname}"\`);
  }
  return pokemon;
}

// DELETE — Remove a Pokemon
function removePokemon(id) {
  const index = myTeam.findIndex(p => p.id === id);
  if (index > -1) {
    const removed = myTeam.splice(index, 1)[0];
    console.log("Removed:", removed.name);
  }
}

// Let's try it!
console.log("=== CRUD Operations ===\\n");

const pikachu = savePokemon({ name: "pikachu", types: ["electric"] });
savePokemon({ name: "charizard", types: ["fire", "flying"] });
savePokemon({ name: "eevee", types: ["normal"] });

console.log("\\nTeam:", getTeam().map(p => p.nickname || p.name));

renamePokemon(pikachu.id, "Sparky");
console.log("\\nTeam:", getTeam().map(p => p.nickname || p.name));

removePokemon(pikachu.id);
console.log("\\nTeam after removal:", getTeam().map(p => p.name));`,
          solution: `// Same as starter — the exercise is about understanding the operations`,
          instructions: [
            "Run the code to see all four CRUD operations in action",
            "Try adding more Pokemon to the team",
            "Try renaming different Pokemon",
          ],
          hint: "Once you set up Supabase, these same operations will persist data in a real database!",
        },
        quiz: [
          {
            id: "3-3-q1",
            question: "Which CRUD operation does a 'Save to Favorites' button use?",
            options: ["Read (SELECT)", "Create (INSERT)", "Update (UPDATE)", "Delete (DELETE)"],
            correctIndex: 1,
            explanation: "Saving something new to the database is a Create/INSERT operation.",
          },
        ],
        resources: [
          {
            title: "Supabase CRUD Operations",
            url: "https://supabase.com/docs/reference/javascript/select",
            type: "docs",
            description: "Official guide to reading and writing data with Supabase.",
          },
        ],
      },
      {
        id: "3-4",
        title: "Relationships — Tables That Talk",
        subtitle: "Connecting tables with foreign keys",
        readTime: 6,
        narrative:
          "Real apps have data that connects to other data. A trainer has Pokemon. A playlist has songs. Let's learn how tables relate to each other.",
        concepts: [
          "Foreign key",
          "One-to-many",
          "JOIN",
          "Related tables",
          "Normalization",
        ],
        content: `## How Tables Relate

In a real app, data is connected. A **Trainer** has many **Pokemon**. A **Playlist** has many **Songs**. These connections are called **relationships**.

### One-to-Many

The most common relationship. One trainer → many Pokemon.

**trainers table:**
| id | name | badge_count |
|----|------|-------------|
| 1 | Ash | 8 |
| 2 | Misty | 4 |

**team_pokemon table:**
| id | trainer_id | pokemon_name | level |
|----|-----------|--------------|-------|
| 1 | 1 | Pikachu | 55 |
| 2 | 1 | Charizard | 50 |
| 3 | 2 | Starmie | 45 |

The \`trainer_id\` column in \`team_pokemon\` is a **foreign key** — it points to the \`id\` in the \`trainers\` table.

### Creating Related Tables in SQL

\`\`\`sql
CREATE TABLE trainers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  badge_count INTEGER DEFAULT 0
);

CREATE TABLE team_pokemon (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID REFERENCES trainers(id),
  pokemon_name TEXT NOT NULL,
  level INTEGER DEFAULT 1
);
\`\`\`

### Querying Related Data with Supabase

\`\`\`javascript
// Get a trainer with all their Pokemon
const { data } = await supabase
  .from('trainers')
  .select(\`
    name,
    badge_count,
    team_pokemon (
      pokemon_name,
      level
    )
  \`)
  .eq('name', 'Ash')
  .single()

// Result:
// {
//   name: "Ash",
//   badge_count: 8,
//   team_pokemon: [
//     { pokemon_name: "Pikachu", level: 55 },
//     { pokemon_name: "Charizard", level: 50 }
//   ]
// }
\`\`\`

### For Designers

Understanding relationships helps you design better:
- **Profile page** → Show the trainer AND their team (one-to-many query)
- **Team builder** → Add/remove Pokemon from a trainer's team (INSERT/DELETE with foreign key)
- **Leaderboard** → Count each trainer's Pokemon (aggregate query)`,
        exercise: {
          starterCode: `// Let's model relationships with our simulated database

const trainers = [
  { id: 1, name: "Ash", badge_count: 8 },
  { id: 2, name: "Misty", badge_count: 4 },
];

const teamPokemon = [
  { id: 1, trainer_id: 1, pokemon_name: "Pikachu", level: 55 },
  { id: 2, trainer_id: 1, pokemon_name: "Charizard", level: 50 },
  { id: 3, trainer_id: 1, pokemon_name: "Bulbasaur", level: 45 },
  { id: 4, trainer_id: 2, pokemon_name: "Starmie", level: 45 },
  { id: 5, trainer_id: 2, pokemon_name: "Psyduck", level: 30 },
];

// "JOIN" — Get a trainer with their Pokemon
function getTrainerWithTeam(trainerName) {
  const trainer = trainers.find(t => t.name === trainerName);
  if (!trainer) return null;

  const team = teamPokemon.filter(p => p.trainer_id === trainer.id);
  return { ...trainer, team };
}

// Let's see it in action
const ash = getTrainerWithTeam("Ash");
console.log(\`=== \${ash.name}'s Profile ===\`);
console.log(\`Badges: \${ash.badge_count}\`);
console.log(\`Team (\${ash.team.length} Pokemon):\`);
ash.team.forEach(p => {
  console.log(\`  - \${p.pokemon_name} (Lv. \${p.level})\`);
});

console.log("");

const misty = getTrainerWithTeam("Misty");
console.log(\`=== \${misty.name}'s Profile ===\`);
console.log(\`Badges: \${misty.badge_count}\`);
console.log(\`Team (\${misty.team.length} Pokemon):\`);
misty.team.forEach(p => {
  console.log(\`  - \${p.pokemon_name} (Lv. \${p.level})\`);
});`,
          solution: `// Same as starter — demonstrates relationship concepts`,
          instructions: [
            "Run the code to see how related data comes together",
            "Notice how trainer_id connects Pokemon to their trainer",
            "This is exactly how Supabase joins work!",
          ],
          hint: "The key insight: foreign keys let you connect rows across different tables.",
        },
        resources: [
          {
            title: "Database Relationships Explained",
            url: "https://www.youtube.com/watch?v=QpdhBUYk7Kk",
            type: "video",
            description: "Visual guide to one-to-many and many-to-many relationships.",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Leveling Up — Real-World APIs",
    description: "OAuth, authentication, and combining APIs with databases.",
    icon: "Rocket",
    chapters: [
      {
        id: "4-1",
        title: "OAuth — Logging In With Another Service",
        subtitle: "How 'Sign in with Google' works",
        readTime: 6,
        narrative:
          "You've seen those 'Sign in with Google' buttons everywhere. That's OAuth. Let's demystify exactly how it works.",
        concepts: [
          "OAuth 2.0",
          "Access token",
          "Refresh token",
          "Authorization code",
          "Scopes",
        ],
        content: `## OAuth — The Fancy Handshake

OAuth lets users grant your app permission to access their data on another service **without sharing their password**.

### The Flow (Simplified)

1. **Your app** → Redirects user to GitHub login page
2. **User** → Logs in and clicks "Allow" (granting permissions)
3. **GitHub** → Redirects back to your app with a **code**
4. **Your app** → Exchanges that code for an **access token**
5. **Your app** → Uses the token to make API calls on behalf of the user

### Real Example: GitHub

\`\`\`
Step 1: Redirect to GitHub
https://github.com/login/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  response_type=code&
  redirect_uri=http://localhost:3000/api/github/callback&
  scope=read:user repo

Step 2: User logs in and approves

Step 3: GitHub redirects to your app
http://localhost:3000/api/github/callback?code=AQB...xyz

Step 4: Exchange code for token (server-side)
POST https://github.com/login/oauth/access_token

Step 5: Use token for API calls
GET https://api.github.com/user/repos
Authorization: Bearer BQC...abc
\`\`\`

### Scopes — What You're Asking Permission For

When you redirect to GitHub, you specify **scopes** — what data you want access to:
- \`read:user\` — Read the user's profile
- \`repo\` — Access repositories
- \`gist\` — Read gists

Users see these scopes on the consent screen — design this carefully!

### For Designers

OAuth introduces several UX moments to design:
1. **"Connect GitHub" button** — The entry point
2. **Redirect to GitHub** — User briefly leaves your app
3. **Consent screen** — GitHub asks "Allow this app to..."
4. **Redirect back** — User returns to your app, now connected
5. **Connected state** — Show their profile, a "Disconnect" option
6. **Token expired** — Graceful re-authentication flow`,
        exercise: {
          starterCode: `// OAuth is a multi-step process that requires a real server.
// Let's understand the flow by simulating it!

const oauthFlow = {
  step1: {
    action: "Redirect user to GitHub",
    url: "https://github.com/login/oauth/authorize",
    params: {
      client_id: "your-client-id",
      response_type: "code",
      redirect_uri: "http://localhost:3000/api/github/callback",
      scope: "read:user repo",
    },
  },
  step2: {
    action: "User approves on GitHub",
    result: "GitHub redirects to your redirect_uri with a code",
  },
  step3: {
    action: "Exchange code for access token",
    method: "POST",
    url: "https://github.com/login/oauth/access_token",
    body: {
      grant_type: "authorization_code",
      code: "the-code-from-step-2",
      redirect_uri: "http://localhost:3000/api/github/callback",
    },
  },
  step4: {
    action: "Use token to call GitHub API",
    method: "GET",
    url: "https://api.github.com/user/repos",
    headers: { Authorization: "Bearer access-token-from-step-3" },
  },
};

console.log("=== OAuth Flow for GitHub ===\\n");
Object.entries(oauthFlow).forEach(([step, details]) => {
  console.log(\`\${step.toUpperCase()}: \${details.action}\`);
  if (details.url) console.log(\`  URL: \${details.url}\`);
  if (details.params) {
    console.log("  Params:", Object.keys(details.params).join(", "));
  }
  console.log("");
});

console.log("With a real OAuth setup,");
console.log("your app handles all these steps automatically!");`,
          solution: `// Conceptual exercise — no changes needed`,
          instructions: [
            "Run the code to see the OAuth flow visualized",
            "Go to github.com/settings/developers to create a free OAuth app",
            "Add your client ID and secret to .env.local",
          ],
          hint: "You'll need a GitHub account (free) to create an OAuth app at github.com/settings/developers.",
        },
        resources: [
          {
            title: "OAuth 2.0 Explained Simply",
            url: "https://www.youtube.com/watch?v=ZV5yTm4pT8g",
            type: "video",
            description: "A clear visual explanation of the OAuth flow.",
          },
          {
            title: "GitHub OAuth Documentation",
            url: "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps",
            type: "docs",
            description: "Official GitHub guide to implementing OAuth.",
          },
        ],
      },
      {
        id: "4-2",
        title: "Authenticated APIs in Practice",
        subtitle: "Using tokens to access protected data",
        readTime: 7,
        narrative:
          "Most real-world APIs require authentication. Let's explore how tokens work in practice using the GitHub API — which you can try right now without any setup.",
        concepts: [
          "GitHub API",
          "Access token",
          "User profile",
          "Bearer token",
          "Personal Access Token",
        ],
        content: `## Authenticated APIs in Practice

Most APIs beyond simple public ones (like PokeAPI) require authentication. The most common method is a **Bearer token** — a string you include in every request header.

### The GitHub API — No OAuth Required

GitHub has a great API that lets you access public data without any auth, and private data with a Personal Access Token (PAT). You already created one earlier in this course!

\`\`\`javascript
// Public data — no auth needed
const response = await fetch("https://api.github.com/users/jtcrawley");
const user = await response.json();
console.log(user.name, user.public_repos);

// Private data — needs a token
const response = await fetch("https://api.github.com/user/repos", {
  headers: {
    Authorization: \`Bearer YOUR_GITHUB_TOKEN\`,
  },
});
const repos = await response.json();
\`\`\`

### What the Token Does

The token tells GitHub: *"This request is coming from a trusted app that the user has authorised."*

Without it: \`401 Unauthorized\`
With it: \`200 OK\` + your data

### The Authorization Header

Every authenticated API uses the same pattern — the format just varies slightly:

| API | Header format |
|-----|--------------|
| GitHub | \`Authorization: Bearer YOUR_TOKEN\` |
| PokeAPI | No auth needed |
| Stripe | \`Authorization: Bearer sk_live_...\` |
| Supabase | \`apikey: YOUR_ANON_KEY\` |

### For Designers

When you see a feature that says *"Connect your account"* — that's OAuth generating one of these tokens behind the scenes. Once connected, every API call the app makes on your behalf includes your token in the header.`,
        exercise: {
          starterCode: `// Let's call the GitHub API!
// Public profile — no auth needed

const username = "jtcrawley"; // change this to any GitHub username

const response = await fetch(\`https://api.github.com/users/\${username}\`);
const user = await response.json();

console.log("=== GitHub Profile ===");
console.log("Name:", user.name);
console.log("Username:", user.login);
console.log("Public repos:", user.public_repos);
console.log("Followers:", user.followers);
console.log("Bio:", user.bio);
console.log("\\nRaw response status:", response.status);`,
          solution: `// Conceptual exercise with example data`,
          instructions: [
            "Run the code to fetch a real GitHub profile",
            "Change the username to your own GitHub username",
            "Notice we're using a GET request with no auth — this is public data",
            "Private data (like private repos) would need an Authorization header",
          ],
          hint: "Try changing the username to 'torvalds' or 'gaearon' — you'll get real data back!",
        },
        resources: [
          {
            title: "GitHub REST API Docs",
            url: "https://docs.github.com/en/rest",
            type: "docs",
            description: "Full reference for the GitHub API — great for exploring.",
          },
          {
            title: "HTTP Authentication — MDN",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication",
            type: "article",
            description: "How Bearer tokens and HTTP auth work under the hood.",
          },
        ],
      },
      {
        id: "4-3",
        title: "Combining APIs + Database",
        subtitle: "Building features that persist",
        readTime: 6,
        narrative:
          "Here's where everything comes together. We'll fetch data from an API, save it to our database, and build something that lasts beyond a single session.",
        concepts: [
          "Data pipeline",
          "API to database",
          "Persistence",
          "Aggregation",
        ],
        content: `## The Full Loop: API → Database → UI

Until now we've done two things separately:
1. Fetch data from APIs (PokeAPI, GitHub)
2. Store data in a database (Supabase)

Now let's combine them: **fetch from an API, then save to the database.**

### The Pattern

\`\`\`javascript
// 1. Fetch from API
const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
const { results: pokemon } = await apiResponse.json();

// 2. Transform the data (pick only what we need)
const pokemonToSave = pokemon.map(p => ({
  name: p.name,
  url: p.url,
  saved_at: new Date().toISOString(),
}));

// 3. Save to database
const { data, error } = await supabase
  .from('saved_pokemon')
  .insert(pokemonToSave)
  .select();

// 4. Now the data persists! Show it in the UI anytime.
\`\`\`

### Why Save API Data?

- **Speed** — Reading from your database is faster than calling the API again
- **Persistence** — Data stays even if the API is down
- **History** — Track changes over time (your top songs this month vs last month)
- **Offline access** — Show cached data without internet

### For Designers

This "fetch → transform → save → display" pattern is behind almost every feature:
- **Instagram**: Fetch posts from API → Save to cache → Display in feed
- **Your app**: Fetch Pokemon → Aggregate by type → Display your collection`,
        exercise: {
          starterCode: `// Let's simulate the full API → Database → UI loop

// Step 1: "Fetch" from API (simulated)
const apiTracks = [
  { id: "t1", name: "Bohemian Rhapsody", artist: "Queen", popularity: 91 },
  { id: "t2", name: "Imagine", artist: "John Lennon", popularity: 82 },
  { id: "t3", name: "Smells Like Teen Spirit", artist: "Nirvana", popularity: 79 },
];

console.log("Step 1: Fetched", apiTracks.length, "tracks from API\\n");

// Step 2: Transform (pick what we need)
const tracksToSave = apiTracks.map(t => ({
  pokemon_id: t.id,
  name: t.name,
  artist: t.artist,
  saved_at: new Date().toISOString(),
}));

console.log("Step 2: Transformed data for database");
console.log(JSON.stringify(tracksToSave[0], null, 2));
console.log("");

// Step 3: "Save" to database (simulated)
const database = [...tracksToSave];
console.log("Step 3: Saved", database.length, "tracks to database\\n");

// Step 4: "Read" from database and display
console.log("Step 4: Reading from database for UI\\n");
console.log("=== My Saved Tracks ===");
database.forEach((track, i) => {
  console.log(\`\${i + 1}. "\${track.name}" by \${track.artist}\`);
});

console.log("\\nThis data now persists in your Supabase database!");`,
          solution: `// Same as starter — demonstrates the concept`,
          instructions: [
            "Run the code to see the full fetch → save → display loop",
            "This is the same pattern used in real apps!",
            "With real Supabase + PokeAPI, this data persists forever",
          ],
          hint: "The key insight: APIs give you data temporarily; databases make it permanent.",
        },
        resources: [
          {
            title: "Building Full-Stack Apps with Supabase",
            url: "https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs",
            type: "docs",
            description: "Official Next.js + Supabase tutorial.",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Capstone Project",
    description: "Put it all together and build something real.",
    icon: "Trophy",
    chapters: [
      {
        id: "5-1",
        title: "Putting It All Together",
        subtitle: "Your final project: Pokemon Explorer Dashboard",
        readTime: 8,
        narrative:
          "You've learned APIs, databases, HTTP methods, OAuth, and CRUD. Now let's combine everything into one project that shows off your new skills.",
        concepts: [
          "Full-stack thinking",
          "Data modeling",
          "API integration",
          "UI data flow",
        ],
        content: `## Capstone: Pokemon Explorer Dashboard

The idea: **Build a personal Pokemon collection app using everything you've learned.**

### How It Works

1. **Fetch Pokemon** → Call PokeAPI for Pokemon data
2. **Filter by type** → Let users browse by Fire, Water, Electric, etc.
3. **Save favourites** → Store their collection in Supabase
4. **Display beautifully** → Show cards with sprites, types, and stats
5. **Track history** → Show when each Pokemon was saved

### The Data Flow

\`\`\`
PokeAPI → Pokemon by Type → User selects favourite
                                      ↓
                            Supabase Database → "My Collection"
                                      ↓
                              Your UI → Beautiful Cards
\`\`\`

This project uses EVERYTHING you've learned:
- **GET requests** to PokeAPI
- **Query parameters** for filtering by type
- **JSON parsing** for API responses
- **Database CRUD** for saving your collection
- **Error handling** for when things go wrong
- **Schema design** for your data model`,
        exercise: {
          starterCode: `// Capstone Step 1: The mood-to-type mapping logic

// Simulated top tracks with energy levels
const myTopTracks = [
  { name: "Thunderstruck", artist: "AC/DC", energy: 0.95 },
  { name: "Bohemian Rhapsody", artist: "Queen", energy: 0.75 },
  { name: "Yesterday", artist: "The Beatles", energy: 0.25 },
  { name: "Creep", artist: "Radiohead", energy: 0.45 },
  { name: "Uptown Funk", artist: "Bruno Mars", energy: 0.93 },
];

// Map energy to Pokemon type
function energyToType(energy) {
  if (energy >= 0.8) return { type: "fire", reason: "High energy!" };
  if (energy >= 0.6) return { type: "electric", reason: "Upbeat vibes" };
  if (energy >= 0.4) return { type: "normal", reason: "Balanced mood" };
  if (energy >= 0.2) return { type: "water", reason: "Chill and calm" };
  return { type: "ghost", reason: "Dark and moody" };
}

console.log("=== Music → Pokemon Type Mapping ===\\n");

const typeCount = {};
myTopTracks.forEach(track => {
  const { type, reason } = energyToType(track.energy);
  typeCount[type] = (typeCount[type] || 0) + 1;
  console.log(\`"\${track.name}" → \${type} (\${reason})\`);
});

console.log("\\n=== Your Dominant Type ===");
const dominantType = Object.entries(typeCount)
  .sort((a, b) => b[1] - a[1])[0][0];
console.log(\`Your spirit type: \${dominantType.toUpperCase()}!\`);

// Now we'd fetch Pokemon of this type from PokeAPI:
const typeResponse = await fetch(
  \`https://pokeapi.co/api/v2/type/\${dominantType}\`
);
const typeData = await typeResponse.json();
const matchedPokemon = typeData.pokemon.slice(0, 3);

console.log(\`\\nMatched \${dominantType}-type Pokemon:\`);
matchedPokemon.forEach(p => {
  console.log(\`  - \${p.pokemon.name}\`);
});`,
          solution: `// Same as starter — this is the guided capstone`,
          instructions: [
            "Run to see how music maps to Pokemon types",
            "The energy values here are simulated — in a real app you'd assign them based on Pokemon base stats",
            "Try adjusting the energy thresholds in energyToType()",
          ],
          hint: "Find the line 'if (energy > 80)' and change 80 to 50. Now more Pokemon count as high-energy. Hit Run again to see how the type mapping changes.",
        },
        resources: [
          {
            title: "PokeAPI Documentation",
            url: "https://pokeapi.co/docs/v2",
            type: "docs",
            description: "Full reference for the PokeAPI — explore all available endpoints.",
          },
        ],
      },
      {
        id: "5-2",
        title: "What's Next",
        subtitle: "Your API & database journey continues",
        readTime: 4,
        narrative:
          "Congratulations! You've gone from 'What's an API?' to building a full-stack feature that fetches, stores, and displays data. Here's where to go from here.",
        concepts: [
          "REST vs GraphQL",
          "Webhooks",
          "Real-time data",
          "API design",
          "LLMs and agents",
        ],
        content: `## You Did It!

Let's recap what you now understand:

- **APIs** — How apps talk to servers (request/response)
- **HTTP Methods** — GET, POST, PUT, DELETE
- **Authentication** — API keys, OAuth, tokens
- **Databases** — Tables, schemas, relationships
- **CRUD** — Create, Read, Update, Delete
- **Full-stack flow** — API → Transform → Database → UI

### What's Next?

**For your design work:**
- You can now read API documentation and understand what's possible
- You can design with real data constraints in mind
- You can prototype with real APIs using the playground
- You can communicate more effectively with engineers

**Topics to explore next:**
- **GraphQL** — An alternative to REST APIs where you specify exactly what data you want
- **Webhooks** — APIs that push data TO you (instead of you pulling it)
- **Real-time** — Live updates using WebSockets (Supabase supports this!)
- **LLMs & Agents** — How AI APIs work (very similar to what you've learned!)

### The LLM Connection

Here's the exciting part: **LLM APIs work exactly like what you've learned.**

\`\`\`javascript
// Calling an LLM is just another POST request!
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your-api-key",
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello!" }],
  }),
});
\`\`\`

That's a POST request with headers and a JSON body — exactly what you learned in Module 2!

### Agentic Design

As a designer working with AI agents, understanding APIs is crucial:
- Agents make API calls to interact with the world
- They read from and write to databases
- They chain multiple API calls together
- They handle errors and retry logic

You now have the mental model to design for all of this.

**Welcome to the API-first world. You belong here.**`,
        exercise: {
          starterCode: `// One last exercise: Call an LLM API!
// (This is just a demonstration of the pattern)

console.log("=== LLM API Call Pattern ===\\n");

const llmRequest = {
  method: "POST",
  url: "https://api.anthropic.com/v1/messages",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your-api-key",
    "anthropic-version": "2023-06-01",
  },
  body: {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      { role: "user", content: "What Pokemon type matches rainy day music?" }
    ],
  },
};

console.log("URL:", llmRequest.url);
console.log("Method:", llmRequest.method);
console.log("Headers:", Object.keys(llmRequest.headers).join(", "));
console.log("\\nBody:");
console.log(JSON.stringify(llmRequest.body, null, 2));

console.log("\\n---");
console.log("This is the SAME pattern you learned:");
console.log("1. URL (endpoint)");
console.log("2. Method (POST)");
console.log("3. Headers (auth + content type)");
console.log("4. Body (the data you're sending)");
console.log("5. Response (the AI's answer as JSON)");
console.log("\\nYou already know how AI APIs work!");`,
          solution: `// Conceptual exercise`,
          instructions: [
            "Run to see how an LLM API call is structured",
            "Notice: same pattern as every other API call!",
            "You now have the knowledge to work with any API",
          ],
          hint: "Every API follows the same pattern: endpoint + method + headers + body = response.",
        },
        resources: [
          {
            title: "Anthropic API Documentation",
            url: "https://docs.anthropic.com/en/api/getting-started",
            type: "docs",
            description: "Learn how Claude's API works — you already know the basics!",
          },
          {
            title: "What are AI Agents?",
            url: "https://www.youtube.com/watch?v=F8NKVhkZZWI",
            type: "video",
            description: "How AI agents use APIs to interact with the world.",
          },
        ],
      },
    ],
  },
];

export function getModule(moduleId: string): Module | undefined {
  return modules.find((m) => m.id === moduleId);
}

export function getChapter(
  moduleId: string,
  chapterId: string
): Chapter | undefined {
  const module = getModule(moduleId);
  return module?.chapters.find((c) => c.id === chapterId);
}

export function getNextChapter(
  moduleId: string,
  chapterId: string
): { moduleId: string; chapterId: string } | null {
  const module = getModule(moduleId);
  if (!module) return null;

  const chapterIndex = module.chapters.findIndex((c) => c.id === chapterId);

  if (chapterIndex < module.chapters.length - 1) {
    return { moduleId, chapterId: module.chapters[chapterIndex + 1].id };
  }

  const moduleIndex = modules.findIndex((m) => m.id === moduleId);
  if (moduleIndex < modules.length - 1) {
    const nextModule = modules[moduleIndex + 1];
    return {
      moduleId: nextModule.id,
      chapterId: nextModule.chapters[0].id,
    };
  }

  return null;
}

export function getPreviousChapter(
  moduleId: string,
  chapterId: string
): { moduleId: string; chapterId: string } | null {
  const module = getModule(moduleId);
  if (!module) return null;

  const chapterIndex = module.chapters.findIndex((c) => c.id === chapterId);

  if (chapterIndex > 0) {
    return { moduleId, chapterId: module.chapters[chapterIndex - 1].id };
  }

  const moduleIndex = modules.findIndex((m) => m.id === moduleId);
  if (moduleIndex > 0) {
    const prevModule = modules[moduleIndex - 1];
    return {
      moduleId: prevModule.id,
      chapterId: prevModule.chapters[prevModule.chapters.length - 1].id,
    };
  }

  return null;
}

export function getTotalChapters(): number {
  return modules.reduce((sum, m) => sum + m.chapters.length, 0);
}

export function getFlatChapterList(): { moduleId: string; chapter: Chapter; moduleTitle: string }[] {
  return modules.flatMap((m) =>
    m.chapters.map((c) => ({
      moduleId: m.id,
      chapter: c,
      moduleTitle: m.title,
    }))
  );
}

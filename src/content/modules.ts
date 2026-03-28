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
    description: "Discover how apps talk to servers. No code experience needed.",
    icon: "Zap",
    chapters: [
      {
        id: "1-0",
        title: "Welcome to API Trainer",
        subtitle: "Your role is evolving. Time to become the very best.",
        readTime: 4,
        narrative:
          "Every great trainer starts somewhere. Before you learn to catch Pokémon, you need to understand the world you're entering. This chapter is your map.",
        concepts: ["Course Overview", "Designer × Engineer", "Agentic Design"],
        content: ``,
        resources: [],
      },
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
- **A remote computer** is the server (it has data, like Pokémon info or your playlists)
- **The API** is the set of rules for how to ask for that data and what you'll get back

### The Request-Response Cycle

Every API interaction follows this pattern:

1. **You send a request:** "I'd like the data for Pikachu, please"
2. **The server processes it:** Looks up Pikachu in its database
3. **You get a response:** Here's Pikachu's name, type, stats, and image

This happens every time you open an app. When you scroll Instagram, your phone sends hundreds of API requests asking for posts, likes, and comments.

### Why Should Designers Care?

As a product designer, APIs define **what's possible** in your designs:
- What data can you show? (The API decides)
- How fast does it load? (The API response time)
- What can users do? (The API endpoints available)

Understanding APIs means you can design **with** the technology, not against it.`,
        exercise: {
          starterCode: `// Let's make your very first API call!
// The PokeAPI is a free API with data about every Pokémon.

// This URL is an "endpoint" — a specific address where data lives
const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

// fetch() is how browsers ask for data from APIs
const response = await fetch(url);

// The response comes as JSON (a data format — we'll learn more soon)
const data = await response.json();

// Let's see what we got!
console.log("Pokémon name:", data.name);
console.log("Pokémon types:", data.types.map(t => t.type.name));
console.log("Sprite URL:", data.sprites.front_default);`,
          solution: `const url = "https://pokeapi.co/api/v2/pokemon/pikachu";
const response = await fetch(url);
const data = await response.json();
console.log("Pokémon name:", data.name);
console.log("Pokémon types:", data.types.map(t => t.type.name));
console.log("Sprite URL:", data.sprites.front_default);`,
          instructions: [
            "Click the Run button to execute your first API call",
            "Look at the output. You just fetched real data from a server!",
            "Try changing 'pikachu' to another Pokémon name like 'charizard' or 'eevee'",
          ],
          hint: "Pokémon names must be lowercase. Try 'bulbasaur', 'charmander', or 'squirtle'.",
        },
        quiz: [
          {
            id: "1-1-q1",
            question: "Your team wants to add a Pokémon search to the app. The designs are ready and the data exists on PokeAPI's servers. What problem does the API solve?",
            options: [
              "It stores Pikachu's data permanently inside the app",
              "It lets your app request specific data from the server and get it back",
              "It converts JSON into something the browser can display visually",
              "It handles the visual design of the Pokémon card",
            ],
            correctIndex: 1,
            explanation:
              "The API is the bridge. Your app can't access the server's database directly — the API receives your request, fetches the right data, and sends it back in a usable format.",
          },
          {
            id: "1-1-q2",
            question: "A user taps 'Search' and 200ms later a Pokémon card appears. What two-part exchange made that happen?",
            options: [
              "Upload and download",
              "Compile and execute",
              "Request and response",
              "Push and pull",
            ],
            correctIndex: 2,
            explanation:
              "Every API interaction is a request-response cycle. The app sent a request ('give me Pikachu'), the server processed it and sent a response ('here's Pikachu's data').",
          },
        ],
        resources: [
          {
            title: "APIs for Beginners: Full Course",
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
        subtitle: "Fetching real Pokémon data with code",
        readTime: 6,
        narrative:
          "Now that you understand the concept, let's actually do it. We're going to call the PokeAPI and get real data. Don't worry if the code looks unfamiliar. I'll walk you through every line.",
        concepts: ["fetch()", "JSON", "Endpoint", "URL", "async/await"],
        content: `## Making Your First API Call

Let's break down the anatomy of an API call. There are three key pieces:

### 1. The Endpoint (URL)

The address for this call is \`https://pokeapi.co/api/v2/pokemon/pikachu\`. Let's break it apart:
- \`https://pokeapi.co\`: The server (like a restaurant's address)
- \`/api/v2\`: The version of the API (like a menu edition)
- \`/pokemon\`: The type of data (the section of the menu)
- \`/pikachu\`: The specific item you want

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

JSON is just a way to structure data. Think of it like a really organized spreadsheet in text form.

### Pro Tip: Open Your DevTools!

Press **Cmd + Option + I** (Mac) to open your browser's Developer Tools. Click the **Network** tab. Now when you run API calls, you'll see the actual requests flying back and forth. This is one of the most powerful tools for understanding how apps work.`,
        exercise: {
          starterCode: `// TODO: Fetch data for 3 different Pokémon and display their info
// Hint: Use a for...of loop with an array of names

const pokemonNames = ["bulbasaur", "charmander", "squirtle"];

for (const name of pokemonNames) {
  // TODO: Fetch each Pokémon's data
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
            "Run the code to fetch data for 3 starter Pokémon",
            "Try adding more Pokémon names to the array",
            "Try accessing different properties. What about data.sprites?",
          ],
          hint: "Add console.log(data) right after the 'const data = ...' line, then hit Run. Look for 'sprites', 'stats', and 'types' in the output. Those are all the properties you can use.",
        },
        quiz: [
          {
            id: "1-2-q1",
            question: "Your engineer shares the raw API response: {\"name\": \"pikachu\", \"id\": 25, \"height\": 4}. You need to show the name in your design component. What format is this, and which key do you read?",
            options: [
              "HTML — use the <name> tag",
              "JSON — use the \"name\" key",
              "XML — use the <name> node",
              "CSV — read the first column",
            ],
            correctIndex: 1,
            explanation:
              "That's JSON (JavaScript Object Notation). To get the name, you read data.name — the key in quotes on the left side of the colon.",
          },
          {
            id: "1-2-q2",
            question: "Your design needs to show Charizard's stats. The base URL is https://pokeapi.co/api/v2/ and Charizard's ID is 6. Which URL fetches the right data?",
            options: [
              "https://pokeapi.co/api/v2/",
              "https://pokeapi.co/api/v2/pokemon",
              "https://pokeapi.co/api/v2/pokemon/6",
              "https://pokeapi.co/api/v2/6",
            ],
            correctIndex: 2,
            explanation:
              "An endpoint is the base URL plus a specific path. /pokemon is the resource type, and /6 is the specific Pokémon. Different IDs give you different Pokémon.",
          },
        ],
        resources: [
          {
            title: "PokeAPI Documentation",
            url: "https://pokeapi.co/docs/v2",
            type: "docs",
            description: "Explore all the endpoints available in the Pokémon API.",
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

**1. Base URL:** The root address of the API — \`https://pokeapi.co/api/v2\`

**2. Endpoints:** The paths you can add to the base URL:

:::endpoints
/pokemon          → List of Pokémon
/pokemon/{id}     → A specific Pokémon
/type             → List of types
/ability          → List of abilities
:::

**3. Parameters:** Ways to customize your request — \`https://pokeapi.co/api/v2/pokemon?limit=10&offset=20\`
- \`limit=10\` means "give me 10 results"
- \`offset=20\` means "start from the 20th item"

The \`?\` starts parameters, and \`&\` separates them.

**4. Response Shape:** What the data looks like when it comes back. Good docs show example responses so you know exactly what fields to expect.

### Reading PokeAPI's Docs

Let's look at a real endpoint: \`/pokemon/{id or name}\`

The docs tell us this returns:
- \`name\`: The Pokémon's name
- \`height\`: Height in decimeters
- \`weight\`: Weight in hectograms
- \`types\`: Array of type objects
- \`sprites\`: Object with image URLs
- \`stats\`: Array of stat objects (HP, Attack, etc.)
- \`abilities\`: Array of ability objects

This tells you as a designer: "I can show name, image, types, stats, and abilities on a Pokémon card."

### Rate Limits

Most APIs have a limit on how many requests you can make. PokeAPI is generous (100 requests per minute), but most paid APIs like GitHub or Stripe limit you to a certain number per second. Always check this in the docs!`,
        exercise: {
          starterCode: `// Let's use query parameters to browse Pokémon
// The /pokemon endpoint returns a list, not just one

// First, let's see what the list endpoint looks like
const listResponse = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
);
const listData = await listResponse.json();

console.log("Total Pokémon in API:", listData.count);
console.log("Results returned:", listData.results.length);
console.log("\\nFirst 5 Pokémon:");
listData.results.forEach((p, i) => {
  console.log(\`  \${i + 1}. \${p.name}\`);
});

// TODO: Try changing limit and offset!
// What happens with limit=10&offset=150?`,
          solution: `const listResponse = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
);
const listData = await listResponse.json();
console.log("Total Pokémon in API:", listData.count);
console.log("Results returned:", listData.results.length);
console.log("\\nFirst 5 Pokémon:");
listData.results.forEach((p, i) => {
  console.log(\`  \${i + 1}. \${p.name}\`);
});`,
          instructions: [
            "Run the code to see the list endpoint in action",
            "Change limit=5 to limit=10 to get more results",
            "Change offset=0 to offset=150 to see later Pokémon",
            "Notice how the API gives you 'next' and 'previous' URLs for pagination",
          ],
          hint: "Add console.log(listData) right after the 'const listData = ...' line, then hit Run. Look for a 'next' URL in the output. That's how the API lets you page through all 1350 Pokémon.",
        },
        quiz: [
          {
            id: "1-3-q1",
            question: "You're designing a Pokédex with pagination — 20 Pokémon per page. Page 2 should start at result #21. Which URL is correct?",
            options: [
              "https://pokeapi.co/api/v2/pokemon/page/2",
              "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20",
              "https://pokeapi.co/api/v2/pokemon&limit=20&offset=20",
              "https://pokeapi.co/api/v2/pokemon/20/20",
            ],
            correctIndex: 1,
            explanation:
              "Query parameters start with ? and are separated by &. limit=20 means 'give me 20 results', offset=20 means 'skip the first 20 and start there' — giving you results 21-40.",
          },
          {
            id: "1-3-q2",
            question: "Your Pokédex prototype fetches all 1,000 Pokémon on page load — one request each. After a few test runs, the API stops responding with errors. No code changed. What's the most likely cause?",
            options: [
              "The PokeAPI server went down for maintenance",
              "Your internet connection dropped",
              "You exceeded the API's rate limit by sending too many requests too quickly",
              "The Pokémon database has a corrupted record",
            ],
            correctIndex: 2,
            explanation:
              "Rate limits cap how many requests you can send in a time window. Sending 1,000 requests at once will trigger that limit. The fix: fetch fewer at a time, or cache results so you're not re-fetching.",
          },
        ],
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
      {
        id: "1-4",
        title: "The Designer's API Toolkit",
        subtitle: "Exploring APIs visually with Postman",
        readTime: 6,
        narrative:
          "Your PM just asked you to design a new Pokémon detail page and wants to know exactly what data is available. Instead of pinging the dev team, you open Postman, type in the API URL, and in 30 seconds you have the full picture. This is how designers work at API-first companies.",
        concepts: ["Postman", "API clients", "Collections", "Environments", "Variables"],
        content: `## What is Postman?

Postman is the most popular tool for exploring and testing APIs. Think of it as a browser built specifically for APIs. Instead of navigating to a URL and seeing a webpage, you send requests and see raw data come back.

Every developer you work with uses it. Learning Postman means you can explore APIs yourself, without writing a single line of code.

## Why Designers Should Know Postman

At an API-first company, Postman changes what you can do as a designer:

- **Explore independently:** see exactly what data exists before designing a feature
- **Speak confidently:** know what's technically possible without asking engineering
- **Design with real data:** use actual API responses to inform your layouts and copy
- **Share intent:** export a collection that shows devs exactly what API calls your feature needs

## Getting Started

1. Go to **postman.com** and create a free account
2. Open the web app at **web.postman.co**
3. Click **New → HTTP Request**

That's it. No install required.

## Making Your First Request

Let's make the same call you wrote in code, fetching Pikachu.

**Step 1:** Make sure the method dropdown says **GET**

**Step 2:** Paste this URL into the address bar: \`https://pokeapi.co/api/v2/pokemon/pikachu\`

**Step 3:** Hit **Send**

You'll see Pikachu's full JSON response: 200+ fields including stats, sprites, abilities, moves, and types. This is the real data your designs would be working with.

## Reading the Response

Postman breaks the response into three tabs:

- **Body:** the actual JSON data (what you've been using in code)
- **Headers:** metadata about the response (content-type, cache settings, server)
- **Status:** the status code (200 = success, 404 = not found, 500 = server error)

As a designer, Body is your goldmine. You can see exactly what fields exist and what format they're in before designing the UI.

## Building a Collection

A **Collection** is a folder for saving API requests. Create one called **"Pokémon Companion App"** and save your requests there.

Collections are how teams share API knowledge. When you export yours, devs know exactly what endpoints your feature needs, with no guesswork.

**To save a request:** After sending it, click the **Save** button and choose your collection.

## Using Variables

Instead of hardcoding \`pikachu\` in every URL, Postman lets you use variables: \`https://pokeapi.co/api/v2/pokemon/{{pokemonName}}\`

Set \`pokemonName = charizard\` in your environment and all your requests update at once. This mirrors how real apps work: the Pokémon name comes from user input, not the code.

## The Designer Workflow

Here's how Postman fits into your process:

1. **Discover:** explore the API to understand what data exists
2. **Design:** make UI decisions based on real fields and real values
3. **Specify:** export your collection so devs know exactly what to build
4. **Validate:** when devs ship, test the endpoints yourself without asking for a build

## Download the Course Collection

We've pre-built a Postman collection with every API request from this course, organised by module. Import it once and every endpoint is ready to explore.`,
        exercise: {
          starterCode: `// You've been exploring in Postman — now let's use what you found.
// Postman showed you Pikachu's full data object.
// Let's pull out some fields you might not have known existed.

const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
const pikachu = await response.json();

// Fields you found in Postman:
console.log("Name:", pikachu.name);
console.log("Base Experience:", pikachu.base_experience);
console.log("Height:", pikachu.height, "(in decimetres)");
console.log("Weight:", pikachu.weight, "(in hectograms)");
console.log("Order (Pokedex number):", pikachu.order);

// TODO: Add one more field you spotted in Postman
// Try: pikachu.abilities[0].ability.name`,
          solution: `const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
const pikachu = await response.json();
console.log("Name:", pikachu.name);
console.log("Base Experience:", pikachu.base_experience);
console.log("Height:", pikachu.height);
console.log("Weight:", pikachu.weight);
console.log("First Ability:", pikachu.abilities[0].ability.name);`,
          instructions: [
            "Hit Run to see the fields Postman helped you discover",
            "Uncomment the TODO line and change it to pikachu.abilities[0].ability.name",
            "Try swapping 'pikachu' for another Pokémon you searched in Postman",
            "Notice how knowing the field names from Postman makes writing code much faster",
          ],
          hint: "Open Postman, search for pikachu, then click into the 'abilities' array in the response. You'll see ability.name right there. Then type it into the code.",
        },
        quiz: [
          {
            id: "1-4-1",
            question: "A new designer joins the team and needs the same PokeAPI setup you've been using — 12 saved requests with custom headers and variables. What's the fastest way to share it?",
            options: [
              "Send them the base URL and let them rebuild the requests",
              "Screen-share your Postman window while they watch",
              "Export and share your Postman Collection so they have everything ready to use",
              "Write all the URLs and headers in a Slack message",
            ],
            correctIndex: 2,
            explanation:
              "Collections bundle all your saved requests, headers, and variables into one exportable file. Your teammate imports it once and has your entire setup instantly — no rebuilding required.",
          },
          {
            id: "1-4-2",
            question: "What does {{pokemonName}} mean in a Postman URL?",
            options: [
              "A broken URL that needs fixing",
              "A required field that Postman fills in automatically",
              "An environment variable you can change in one place to update all requests",
              "A comment telling you what to type",
            ],
            correctIndex: 2,
            explanation: "Double curly braces are Postman variables. Set pokemonName = 'charizard' in your environment and every request using {{pokemonName}} updates at once.",
          },
        ],
        resources: [
          {
            title: "Postman Beginner's Course",
            url: "https://www.youtube.com/watch?v=VywxIQ2ZXw4",
            type: "video",
            description: "A full walkthrough of Postman from scratch, and a great companion to this chapter.",
          },
          {
            title: "Download the Pokémon Companion Collection",
            url: "/downloads/pokemon-companion.postman_collection.json",
            type: "interactive",
            description: "Import this into Postman to get every API request from this course, pre-organised by module.",
          },
          {
            title: "Postman Learning Center",
            url: "https://learning.postman.com/docs/getting-started/overview/",
            type: "docs",
            description: "Official Postman docs, covering everything from basics to advanced testing.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Speaking the Language",
    description: "HTTP methods, headers, status codes: the grammar of APIs.",
    icon: "MessageSquare",
    chapters: [
      {
        id: "2-1",
        title: "GET vs POST: Ordering vs Submitting",
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
        content: `## HTTP Methods: The Verbs of the Web

When you interact with an API, you don't just send a URL. You also specify **what you want to do**. These are HTTP methods:

### GET: "Give me data"
The most common method. You're **reading** information.
\`\`\`javascript
// GET is the default — just fetching data
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
\`\`\`
**Analogy:** Looking at the menu or asking "What do you have?"

### POST: "Here's new data"
Used to **create** something new or send data to the server.
\`\`\`javascript
fetch("/api/save-pokemon", {
  method: "POST",
  body: JSON.stringify({ name: "pikachu", favorite: true }),
  headers: { "Content-Type": "application/json" }
})
\`\`\`
**Analogy:** Placing an order or filling out a form.

### PUT: "Update this data"
Used to **replace** or update existing data.
\`\`\`javascript
fetch("/api/pokemon/1", {
  method: "PUT",
  body: JSON.stringify({ favorite: false }),
  headers: { "Content-Type": "application/json" }
})
\`\`\`
**Analogy:** Changing your order after you've placed it.

### DELETE: "Remove this data"
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
            "Notice how POST requires a 'body'. That's the data you're sending.",
            "Try changing the title and body of the POST request",
          ],
          hint: "JSONPlaceholder doesn't actually save your data. It just pretends to. But the response shows what would be created!",
        },
        quiz: [
          {
            id: "2-1-q1",
            question: "A 'Save to Favorites' button that stores a Pokémon in your database would use which HTTP method?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctIndex: 1,
            explanation:
              "POST creates new data. Saving a favourite for the first time is a create operation, meaning you're adding a new record to the database.",
          },
          {
            id: "2-1-q2",
            question: "Which HTTP method would you use to rename a saved Pokémon's nickname?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctIndex: 2,
            explanation:
              "PUT updates existing data. Changing a nickname means editing a record that already exists, and you're replacing it with new values.",
          },
        ],
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
          "Some APIs are open to everyone (like PokeAPI), but most require you to identify yourself. That's where headers and API keys come in. Think of it as showing your ID at the door.",
        concepts: [
          "Headers",
          "API Key",
          "Authentication",
          "Authorization",
          "Bearer Token",
        ],
        content: `## Headers: Metadata for Your Requests

Every API request carries **headers:** extra information about the request itself. Think of them as the envelope your letter comes in.

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

### Authentication: Proving Who You Are

There are several ways APIs verify your identity:

**1. API Key:** A unique code (like a membership card)
\`\`\`javascript
// Sometimes in the URL
fetch("https://api.example.com/data?api_key=abc123")

// Sometimes in a header
fetch("https://api.example.com/data", {
  headers: { "X-API-Key": "abc123" }
})
\`\`\`

**2. Bearer Token:** A temporary pass (like a concert wristband)
\`\`\`javascript
fetch("https://api.github.com/user", {
  headers: { "Authorization": "Bearer your-token-here" }
})
\`\`\`

**3. OAuth:** Logging in through another service (we'll cover this in Module 4!)

### Why Do APIs Need Auth?

- **Rate limiting:** Track how many requests you make
- **Security:** Only authorized users access data
- **Billing:** Some APIs charge per request
- **Privacy:** Your private data shouldn't be public

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
          hint: "Add console.log(response.headers.get('content-type')) after the fetch line, then hit Run. You should see 'application/json', which confirms the API is sending JSON, not HTML or plain text.",
        },
        quiz: [
          {
            id: "2-2-q1",
            question: "You're spec-ing a 'My Saved Pokémon' feature. The API only returns results for the logged-in user. How does the server know which user is making the request?",
            options: [
              "The user's email is included in the URL as a query parameter",
              "The server looks up the user by their IP address",
              "A token in the Authorization header tells the server which user is authenticated",
              "The frontend sends the user's ID in the request body",
            ],
            correctIndex: 2,
            explanation:
              "The Authorization header carries a token (API key or Bearer token) that proves who's making the request. The server validates it and returns only that user's data.",
          },
          {
            id: "2-2-q2",
            question: "You're designing a 'Connect GitHub' feature. What type of auth would the app use to access a user's private repositories on their behalf?",
            options: [
              "API Key in the URL",
              "No auth needed; repos are public",
              "Bearer token obtained via OAuth",
              "Basic username/password",
            ],
            correctIndex: 2,
            explanation:
              "OAuth grants your app a Bearer token that represents the user's permission. The user never shares their GitHub password. They approve access on GitHub's consent screen.",
          },
        ],
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
        content: `## Status Codes: The Server's Report Card

Every API response comes with a **status code:** a number that tells you how things went.

### The Good

| Code | Meaning | Analogy |
|------|---------|---------|
| **200** | OK. Everything worked | "Here's your food!" |
| **201** | Created. New thing made | "Your order has been placed!" |
| **204** | No Content. Nothing to return | "Your plate has been cleared." |

### The "You Messed Up"

| Code | Meaning | Analogy |
|------|---------|---------|
| **400** | Bad Request. Something wrong with your request | "That's not on the menu" |
| **401** | Unauthorized. You need to log in | "Can I see your ID?" |
| **403** | Forbidden. Logged in but not allowed | "VIP section only" |
| **404** | Not Found. It doesn't exist | "We don't have that dish" |
| **429** | Too Many Requests. Slow down | "One order at a time, please" |

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

### The CORS Error

One of the most common (and confusing) browser errors you'll encounter when building or prototyping with APIs is **CORS**.

:::warning
**Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' has been blocked by CORS policy.**

This is a server-side setting, not a frontend bug. The API server needs to add your app's URL to its allowlist — it's a backend config change, not something fixable in the browser.
:::

CORS (Cross-Origin Resource Sharing) is a browser security rule that blocks JavaScript on one domain from reading responses from a different domain unless the server explicitly allows it.

**When you'll hit it:**
- Building a prototype that calls a private or internal API directly from the browser
- Testing against a staging API that hasn't been configured for your local URL
- Working with third-party APIs that only allow server-to-server calls

**As a designer:** If your engineer says "CORS is blocking it," they mean the API isn't set up to accept requests from your app's URL. Flag it early — it's a quick fix on the backend but can block a demo if discovered at the last minute.

Public APIs like PokeAPI are CORS-friendly by default. Most internal APIs are not.

---

### For Designers: Error States Matter

Every API call can fail. For each feature, design:
- **Loading state:** While waiting for the response
- **Success state:** Data loaded correctly
- **Error state:** Something went wrong (with a clear message and retry option)
- **Empty state:** No data found (different from an error!)`,
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
        \`Pokémon "\${name}" not found (HTTP \${response.status})\`
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

// TODO: Try other Pokémon names — real and fake!
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
            "Try typing a real Pokémon name and a fake one",
          ],
          hint: "Try triggering the error on purpose. Change 'pikachu' to a random word like 'banana'. The catch block will handle it gracefully and show your error message instead of crashing.",
        },
        quiz: [
          {
            id: "2-3-q1",
            question: "A user searches for 'Pikachuuu' (typo). Your error handling shows a generic message. The engineer wants a more specific one. Which status code tells you the Pokémon simply doesn't exist?",
            options: [
              "200 — the request succeeded",
              "401 — the user needs to log in",
              "404 — the resource wasn't found",
              "500 — the server crashed",
            ],
            correctIndex: 2,
            explanation:
              "404 means the resource doesn't exist at that URL. A typo in the Pokémon name will always return 404 because there's no matching entry. Design a message like 'No Pokémon found for that name — try again.'",
          },
          {
            id: "2-3-q2",
            question: "Your team ships a new feature on Friday. Users immediately report it's broken. The engineer says 'the API is returning 5xx errors.' What does that tell you about where the problem is?",
            options: [
              "The frontend has a bug — fix the JavaScript",
              "Users need to log out and back in — it's an auth issue",
              "The server itself has a problem — it's not a frontend or user error",
              "The database query returned too many results",
            ],
            correctIndex: 2,
            explanation:
              "5xx codes mean the server encountered an error. It's not a bug in your frontend code and it's not the user's fault. The team needs to look at server logs. Design your error state to say 'Something went wrong on our end' rather than blaming the user.",
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
            title: "Designing Error & Empty States",
            url: "https://uxdesign.cc/empty-state-the-most-underrated-screen-in-the-app-design-77e0a65dcd0a",
            type: "article",
            description: "UX best practices for designing error and empty states in your product.",
          },
        ],
      },
      {
        id: "2-4",
        title: "Designing for Data States",
        subtitle: "Every API call has four outcomes. Design all of them.",
        readTime: 5,
        narrative:
          "Your PM just signed off on the Pokémon search feature. You've designed the happy path: a beautiful grid of results. But your engineer asks: 'What do I show while it's loading? What if it returns zero results? What if the server is down?' This is where most design specs fall short. Let's fix that.",
        concepts: [
          "Loading state",
          "Success state",
          "Error state",
          "Empty state",
          "Skeleton screens",
          "Optimistic UI",
        ],
        content: `## The Four States Every Feature Needs

Every screen that fetches API data can be in one of four states. You need to design all of them, not just the success state.

### 1. Loading State
The request has been sent but no response yet.

**What to design:**
- **Skeleton screens:** placeholder shapes that mimic the layout of the loaded content. Much better than spinners because they set layout expectations.
- **Progress indicators:** for operations the user deliberately triggers (a button loading state, a progress bar)
- **Disable interactive elements:** prevent double-submits by disabling buttons while a request is in flight

:::tip
Design a skeleton that mirrors your card layout — same number of lines, same proportions. A blank rectangle that matches nothing feels just as jarring as a spinner.
:::

### 2. Success State
The request returned data. This is the screen you usually design first.

**What to design:**
- The happy path layout with real data
- Edge cases: very long names, missing optional fields, max results

### 3. Error State
Something went wrong: network failure, 500, timeout, or 403.

**What to design:**
- A clear, human-readable message (not "Error 500")
- A **retry action:** most errors are transient
- Context-sensitive copy: "Couldn't load your team" is better than "Something went wrong"

:::compare
✗ "An error occurred."
✓ "Couldn't load Pokémon — check your connection and try again." [Retry]
:::

### 4. Empty State
The request succeeded but returned zero results. This is **not** the same as an error.

**What to design:**
- Explain *why* it's empty (no results for this search vs. you haven't saved anything yet)
- A **call to action** that gets the user out of the empty state
- Avoid dead ends

:::compare
✗ (blank screen — user has no idea what happened)
✓ "No Pokémon match 'zzzz'. Try a different name."
✓ "Your team is empty. Search for a Pokémon to add your first one." [Search]
:::

### Mapping to HTTP Status Codes

| State | Triggers |
|---|---|
| Loading | Request in flight |
| Success | 200, 201, 204 |
| Error | 400, 401, 403, 404, 429, 500, 502, 503, network failure |
| Empty | 200 with \`data.length === 0\` |

Note: **empty is a 200**. The API succeeded. There just wasn't any data. Never show an error message for an empty state.

### The Designer's Checklist

For every feature that calls an API, ask:
- [ ] What does the skeleton/loading state look like?
- [ ] What if the data takes 5 seconds? 30 seconds?
- [ ] What's the error message and is there a retry?
- [ ] What does zero results look like, and how does the user get out of it?
- [ ] What if only some fields are missing (e.g. a Pokémon with no sprite)?`,
        exercise: {
          starterCode: `// You're designing a Pokémon search feature.
// For each state, write the copy and actions you'd design.
// This is a spec exercise — no right answer, but think it through!

const searchFeatureSpec = {
  // LOADING: User typed "pikachu" and hit Search
  loading: {
    showSkeleton: true,
    skeletonLayout: "TODO: describe the skeleton shape",
    // e.g. "3 card placeholders, each with a circular image and 2 text lines"
    disableSearchButton: true,
    copy: "TODO: loading message (or none?)",
  },

  // SUCCESS: API returned results
  success: {
    copy: "TODO: result count copy",
    // e.g. "Showing 3 Pokémon matching 'pika'"
  },

  // ERROR: Fetch threw a network error (no internet)
  error: {
    copy: "TODO: human-readable error message",
    // e.g. "Couldn't reach the Pokémon database. Check your connection."
    primaryAction: "TODO: button label",
    // e.g. "Try again"
  },

  // EMPTY: API returned 200 but results array is empty
  empty: {
    copy: "TODO: explain why it's empty",
    // e.g. "No Pokémon found for 'zzzzzz'. Try a different name."
    primaryAction: "TODO: CTA to get out of the empty state",
  },
};

console.log("=== Your Feature Spec ===\\n");
Object.entries(searchFeatureSpec).forEach(([state, spec]) => {
  console.log(\`[\${state.toUpperCase()}]\`);
  Object.entries(spec).forEach(([key, val]) => {
    console.log(\`  \${key}: \${val}\`);
  });
  console.log("");
});`,
          solution: `const searchFeatureSpec = {
  loading: {
    showSkeleton: true,
    skeletonLayout: "3 card placeholders: circular image + 2 text lines each",
    disableSearchButton: true,
    copy: null,
  },
  success: {
    copy: "Showing {count} Pokémon matching '{query}'",
  },
  error: {
    copy: "Couldn't reach the Pokémon database. Check your connection and try again.",
    primaryAction: "Try again",
  },
  empty: {
    copy: "No Pokémon found for '{query}'. Try a different name.",
    primaryAction: "Clear search",
  },
};
Object.entries(searchFeatureSpec).forEach(([state, spec]) => {
  console.log(\`[\${state.toUpperCase()}]\`, JSON.stringify(spec, null, 2));
});`,
          instructions: [
            "Fill in the TODO values with your own design decisions",
            "Think about the loading state first. What skeleton layout matches the success state?",
            "Write the error copy as if you're talking to a non-technical user",
            "Make sure the empty state has a way out: a CTA or a clear next step",
          ],
          hint: "The best error messages say what went wrong AND what to do next. 'Couldn't load Pokémon, check your connection and try again.' beats 'Something went wrong.' every time.",
        },
        quiz: [
          {
            id: "2-4-q1",
            question: "The API returns a 200 status with an empty array. What state should the UI show?",
            options: [
              "Error state: something went wrong",
              "Loading state: wait for more data",
              "Empty state: request succeeded but no results",
              "Success state: hide the content area",
            ],
            correctIndex: 2,
            explanation:
              "An empty array is a successful response. The API worked perfectly. Show an empty state with a helpful message and a way to take action. Never show an error for a 200.",
          },
          {
            id: "2-4-q2",
            question: "Why are skeleton screens generally better than spinners for loading states?",
            options: [
              "They are faster to implement",
              "They set layout expectations and reduce perceived load time",
              "They work without JavaScript",
              "They are required by WCAG accessibility standards",
            ],
            correctIndex: 1,
            explanation:
              "Skeletons mimic the shape of the content about to appear, so the layout doesn't 'jump' when data loads. This reduces perceived wait time and feels more polished than a generic spinner.",
          },
        ],
        resources: [
          {
            title: "The Four UI States Every Designer Should Know",
            url: "https://uxdesign.cc/empty-state-the-most-underrated-screen-in-the-app-design-77e0a65dcd0a",
            type: "article",
            description: "Deep dive into empty states and why they're often the most important screen in your app.",
          },
          {
            title: "Skeleton Screens (UX Collective)",
            url: "https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a",
            type: "article",
            description: "When and how to use skeleton screens effectively.",
          },
        ],
      },
      {
        id: "2-5",
        title: "REST, GraphQL, and Webhooks",
        subtitle: "Not all APIs speak the same language",
        readTime: 6,
        narrative:
          "You've been working with REST APIs this whole time — but they're not the only option. GraphQL and Webhooks solve different problems. As a designer, you don't need to build these. But you do need to know what to ask for, and why your engineer might push back if you pick the wrong one.",
        concepts: [
          "REST",
          "GraphQL",
          "Webhooks",
          "Polling",
          "Real-time data",
          "API patterns",
        ],
        content: `## Three Ways APIs Communicate

Not all APIs work the same way. The three patterns you'll encounter most are REST, GraphQL, and Webhooks. Each solves a different problem.

---

## REST: The Most Common Pattern

REST (Representational State Transfer) is what you've been using all along. Each URL is a resource, and you use HTTP methods to act on it.

:::endpoints
GET    /pokemon/25       → fetch Pikachu
POST   /pokemon          → create a new Pokémon
PUT    /pokemon/25       → update Pikachu
DELETE /pokemon/25       → delete Pikachu
:::

**The tradeoff:** REST responses return a fixed shape. If you only need the name and sprite, you still get the full object with 30 fields. On slow connections, that extra data adds up.

**Best for:** Most products. Standard CRUD operations. Public APIs. When your team wants something predictable.

---

## GraphQL: Ask for Exactly What You Need

GraphQL is a query language for APIs. Instead of hitting a fixed URL, you send a query describing exactly what you want.

\`\`\`graphql
query {
  pokemon(name: "pikachu") {
    name
    sprite
    types
  }
}
\`\`\`

The server returns only those three fields — nothing more.

**Why designers care:** GraphQL is often faster on mobile because responses are smaller. It also lets frontend teams move faster without waiting for backend changes — if the data exists, you can query it without a new API endpoint.

**The tradeoff:** More complex to set up. Harder to cache. Requires more coordination between design, frontend, and backend.

**Best for:** Large products with complex data needs. Mobile apps where payload size matters. Teams where frontend and backend move at different speeds.

---

## Webhooks: The Server Calls You

REST and GraphQL are both "pull" patterns — your app asks the server for data. Webhooks flip that around. The server calls your app when something happens.

:::compare
✗ Normal API (polling): Your app asks "Any new orders?" every 30 seconds — server says "Not yet" every time.
✓ Webhook (push): Server calls your app the instant a new order arrives — no waiting, no wasted requests.
:::

**Real examples:**
- Stripe sends a webhook when a payment succeeds
- GitHub sends a webhook when someone pushes code
- A delivery service sends a webhook when a package is scanned

**Why designers care:** Webhooks power real-time features. If a design requires instant notifications, live order tracking, or a dashboard that updates without refreshing — you're probably looking at webhooks (or a similar push technology like WebSockets).

**The tradeoff:** Harder to test and debug. The server needs a public URL to send to, which complicates local development.

**Best for:** Event-driven features. Payment confirmations. Status updates. Anything that needs to react to something that happened somewhere else.

---

## Choosing the Right Pattern

| Situation | Best Pattern |
|-----------|-------------|
| Standard app features | REST |
| Complex data, mobile performance matters | GraphQL |
| Real-time updates, event notifications | Webhooks |
| "Refresh every 5 seconds to check for updates" | Webhooks (polling is a workaround, not a solution) |

**As a designer:** You don't need to implement any of these. But if you're speccing a feature that needs real-time updates (live chat, order tracking, collaborative editing), flag it early. "Refresh to see updates" is not a real-time experience — and switching from REST polling to webhooks mid-sprint is a big engineering change.`,
        exercise: {
          starterCode: `// REST gives you the full object every time.
// Let's see what a Pokémon response actually contains.

const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
const pokemon = await response.json();

// This is everything REST sends back:
console.log("All top-level fields:", Object.keys(pokemon));

// If we only needed name, id, and types — we got a lot more than that.
console.log("Fields we actually needed: name, id, types");
console.log("Fields returned:", Object.keys(pokemon).length);

// With GraphQL you'd only get what you asked for.
// That's the core tradeoff.

// TODO: Count how many fields you'd save with GraphQL
const fieldsWeNeed = ["name", "id", "types"];
const extraFields = Object.keys(pokemon).filter(
  (k) => !fieldsWeNeed.includes(k)
);
console.log("Extra fields GraphQL would skip:", extraFields.length);`,
          solution: `const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
const pokemon = await response.json();
const fieldsWeNeed = ["name", "id", "types"];
const extraFields = Object.keys(pokemon).filter(k => !fieldsWeNeed.includes(k));
console.log("Total fields:", Object.keys(pokemon).length);
console.log("Fields we need:", fieldsWeNeed.length);
console.log("Extra fields:", extraFields.length);`,
          instructions: [
            "Run the code to see how many fields the PokeAPI returns",
            "Look at the 'extra fields' count — that's data REST always sends, even if you don't use it",
            "Think: for a mobile app showing just a Pokémon name and image, is that overhead worth it?",
          ],
          hint: "The Object.keys() function returns an array of all the property names on an object. You can use .length to count them and .filter() to separate the ones you need from the ones you don't.",
        },
        quiz: [
          {
            id: "2-5-q1",
            question: "A product feature needs to notify the user the instant a payment is confirmed. Which API pattern is best suited for this?",
            options: [
              "REST — poll the payments endpoint every 5 seconds",
              "GraphQL — query for the latest payment status",
              "Webhook — have the payment service push a notification when it's done",
              "REST DELETE — remove the pending payment and recreate it",
            ],
            correctIndex: 2,
            explanation:
              "Webhooks are event-driven: the server calls your app when something happens. Polling (asking repeatedly) wastes requests and adds latency. For instant payment confirmation, a webhook is the right tool.",
          },
          {
            id: "2-5-q2",
            question: "Your team is building a mobile app where slow load times are a concern. The screen only needs 3 fields from an object that has 40. Which API pattern would help most?",
            options: [
              "REST — it's the most compatible option",
              "GraphQL — you can request only the 3 fields you need",
              "Webhooks — the server pushes data when it changes",
              "REST with caching — store the full object locally",
            ],
            correctIndex: 1,
            explanation:
              "GraphQL lets you specify exactly which fields you want. Instead of receiving all 40 fields and discarding 37, you get a smaller, faster response with just the 3 you need. This matters most on mobile where bandwidth is limited.",
          },
        ],
        resources: [
          {
            title: "REST vs GraphQL vs Webhooks (Postman)",
            url: "https://www.postman.com/api-platform/api-design/",
            type: "article",
            description: "A practical comparison of API patterns with real-world use cases.",
          },
          {
            title: "What is a Webhook? (Zapier)",
            url: "https://zapier.com/blog/what-are-webhooks/",
            type: "article",
            description: "Plain-language explanation of webhooks with examples designers will recognize.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Databases: Where Data Lives",
    description: "Tables, queries, and CRUD: the foundation of every app.",
    icon: "Database",
    chapters: [
      {
        id: "3-1",
        title: "The Spreadsheet Analogy",
        subtitle: "Databases are just organized spreadsheets",
        readTime: 4,
        narrative:
          "Your PM just asked you to save users' favorite Pokémon. Where does that data go? Not the API. That's someone else's data. You need your own database. And it's simpler than you think.",
        concepts: [
          "Database",
          "Table",
          "Row",
          "Column",
          "Schema",
          "Primary Key",
        ],
        content: `## Databases: Fancy Spreadsheets

If you've ever used Excel or Google Sheets, you already understand databases. Seriously.

### The Analogy

| Spreadsheet | Database | Example |
|------------|----------|---------|
| Workbook | Database | "My Pokémon App" |
| Sheet | Table | "saved_pokemon" |
| Column header | Column/Field | "name", "type", "level" |
| Row | Record | One specific Pokémon |
| Cell | Value | "Pikachu" |

### A Real Example

Imagine a \`saved_pokemon\` table:

| id | name | type | sprite_url | saved_at |
|----|------|------|-----------|----------|
| 1 | Pikachu | electric | https://... | 2024-03-15 |
| 2 | Charizard | fire | https://... | 2024-03-15 |
| 3 | Eevee | normal | https://... | 2024-03-16 |

### Key Concepts

**Primary Key (id):** Every row needs a unique identifier. It's like a Social Security number for your data. Usually auto-generated.

**Schema:** The structure of your table (column names and their types). You decide this before adding data:
- \`id\` → UUID (auto-generated unique ID)
- \`name\` → Text (string)
- \`type\` → Text
- \`sprite_url\` → Text
- \`saved_at\` → Timestamp (auto-generated)

**Data Types:** Each column has a type:
- **Text:** Words and sentences
- **Integer:** Whole numbers
- **Boolean:** True or false
- **Timestamp:** Date and time
- **UUID:** Unique identifier

### Why Supabase?

We'll use **Supabase:** it gives you a real PostgreSQL database with a beautiful dashboard UI. You can see your tables, edit data visually, and query it with code. It's like Google Sheets that speaks SQL.`,
        exercise: {
          starterCode: `// Let's think about database design!
// No code to run yet — this is a planning exercise.

// Imagine you're designing a "My Pokémon Team" feature.
// What data would you need to store?

const teamTableDesign = {
  tableName: "my_team",
  columns: {
    id: "UUID (auto-generated, primary key)",
    pokemon_id: "Integer (the Pokémon's ID from PokeAPI)",
    name: "Text (Pokémon's name)",
    nickname: "Text (optional, user's custom name)",
    sprite_url: "Text (URL to the Pokémon's image)",
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
2. Create a new project and give it a name like "api-explorer"
3. Save your project URL and anon key (we'll need these)

### Step 2: Create Your First Table

In the Supabase dashboard, go to **Table Editor** and click **New Table**.

Or use SQL. Go to **SQL Editor** and run:

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
- \`id UUID DEFAULT gen_random_uuid() PRIMARY KEY\`: Auto-generate a unique ID for each row
- \`INTEGER NOT NULL\`: A number that must have a value
- \`TEXT\`: A string of text
- \`TEXT[]\`: An array (list) of text values
- \`DEFAULT NOW()\`: Automatically set to the current time

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
console.log("  - INSERT new Pokémon (save favorites)");
console.log("  - SELECT Pokémon (read your list)");
console.log("  - UPDATE Pokémon (edit details)");
console.log("  - DELETE Pokémon (remove from favorites)");
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
        title: "CRUD: The Four Things You Can Do",
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
// Get all saved Pokémon
const { data } = await supabase
  .from('saved_pokemon')
  .select('*')

// Get one specific Pokémon
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
1. \`supabase.from('table_name')\`: Pick the table
2. \`.insert()\` / \`.select()\` / \`.update()\` / \`.delete()\`: Pick the operation
3. \`.eq()\` / \`.order()\` / \`.limit()\`: Add filters
4. Check for \`error\`: Always handle errors!

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

// CREATE — Save a Pokémon
function savePokemon(pokemon) {
  const entry = { ...pokemon, id: Date.now(), saved_at: new Date() };
  myTeam.push(entry);
  console.log("Saved:", entry.name);
  return entry;
}

// READ — Get all saved Pokémon
function getTeam() {
  return myTeam;
}

// UPDATE — Rename a Pokémon
function renamePokemon(id, nickname) {
  const pokemon = myTeam.find(p => p.id === id);
  if (pokemon) {
    pokemon.nickname = nickname;
    console.log(\`Renamed \${pokemon.name} to "\${nickname}"\`);
  }
  return pokemon;
}

// DELETE — Remove a Pokémon
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
          solution: `let myTeam = [];

function savePokemon(pokemon) {
  const entry = { ...pokemon, id: Date.now(), saved_at: new Date() };
  myTeam.push(entry);
  return entry;
}
function getTeam() { return myTeam; }
function renamePokemon(id, nickname) {
  const p = myTeam.find(p => p.id === id);
  if (p) p.nickname = nickname;
  return p;
}
function removePokemon(id) {
  myTeam = myTeam.filter(p => p.id !== id);
}

// NEW: filter by type — mirrors Supabase's .eq('types', type)
function getByType(type) {
  return myTeam.filter(p => p.types.includes(type));
}

const pikachu = savePokemon({ name: "pikachu", types: ["electric"] });
savePokemon({ name: "charizard", types: ["fire", "flying"] });
savePokemon({ name: "eevee", types: ["normal"] });
savePokemon({ name: "gengar", types: ["ghost", "poison"] });

console.log("Fire types:", getByType("fire").map(p => p.name));
console.log("Electric types:", getByType("electric").map(p => p.name));

renamePokemon(pikachu.id, "Sparky");
removePokemon(pikachu.id);
console.log("\\nFinal team:", getTeam().map(p => p.nickname || p.name));`,
          instructions: [
            "Run the starter code to understand the existing CRUD functions",
            "Add a 4th Pokémon: savePokemon({ name: 'gengar', types: ['ghost', 'poison'] })",
            "Write a getByType(type) function that returns only Pokémon whose types array includes that type",
            "Test it: getByType('fire') should return only Charizard",
          ],
          hint: "getByType should use Array.filter() and Array.includes(). In Supabase, this would be .eq('type', 'fire'), and your function is the in-memory version of that query.",
        },
        quiz: [
          {
            id: "3-3-q1",
            question: "A user taps 'Save to Team' next to Gengar. The Pokémon now appears in their saved list on every device. Which database operation ran?",
            options: [
              "SELECT — it read the existing saved Pokémon list",
              "INSERT — it created a new row in the saved_pokemon table",
              "UPDATE — it modified an existing record",
              "DELETE — it removed the old list and replaced it",
            ],
            correctIndex: 1,
            explanation:
              "Saving something new is a Create/INSERT — a brand-new row is added to the database table. This maps to POST in HTTP. The user didn't edit or remove anything, so UPDATE and DELETE don't apply.",
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
        title: "Relationships: Tables That Talk",
        subtitle: "Connecting tables with foreign keys",
        readTime: 6,
        narrative:
          "Real apps have data that connects to other data. A trainer has Pokémon. A playlist has songs. Let's learn how tables relate to each other.",
        concepts: [
          "Foreign key",
          "One-to-many",
          "JOIN",
          "Related tables",
          "Normalization",
        ],
        content: `## How Tables Relate

In a real app, data is connected. A **Trainer** has many **Pokémon**. A **Playlist** has many **Songs**. These connections are called **relationships**.

### One-to-Many

The most common relationship. One trainer → many Pokémon.

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

The \`trainer_id\` column in \`team_pokemon\` is a **foreign key:** it points to the \`id\` in the \`trainers\` table.

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
// Get a trainer with all their Pokémon
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
- **Team builder** → Add/remove Pokémon from a trainer's team (INSERT/DELETE with foreign key)
- **Leaderboard** → Count each trainer's Pokémon (aggregate query)`,
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

// "JOIN" — Get a trainer with their Pokémon
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
console.log(\`Team (\${ash.team.length} Pokémon):\`);
ash.team.forEach(p => {
  console.log(\`  - \${p.pokemon_name} (Lv. \${p.level})\`);
});

console.log("");

const misty = getTrainerWithTeam("Misty");
console.log(\`=== \${misty.name}'s Profile ===\`);
console.log(\`Badges: \${misty.badge_count}\`);
console.log(\`Team (\${misty.team.length} Pokémon):\`);
misty.team.forEach(p => {
  console.log(\`  - \${p.pokemon_name} (Lv. \${p.level})\`);
});`,
          solution: `const trainers = [
  { id: 1, name: "Ash", badge_count: 8 },
  { id: 2, name: "Misty", badge_count: 4 },
  { id: 3, name: "Brock", badge_count: 9 },
];

const teamPokemon = [
  { id: 1, trainer_id: 1, pokemon_name: "Pikachu", level: 55 },
  { id: 2, trainer_id: 1, pokemon_name: "Charizard", level: 50 },
  { id: 3, trainer_id: 1, pokemon_name: "Bulbasaur", level: 45 },
  { id: 4, trainer_id: 2, pokemon_name: "Starmie", level: 45 },
  { id: 5, trainer_id: 2, pokemon_name: "Psyduck", level: 30 },
  { id: 6, trainer_id: 3, pokemon_name: "Onix", level: 40 },
  { id: 7, trainer_id: 3, pokemon_name: "Geodude", level: 35 },
];

function getTrainerWithTeam(trainerName) {
  const trainer = trainers.find(t => t.name === trainerName);
  if (!trainer) return null;
  return { ...trainer, team: teamPokemon.filter(p => p.trainer_id === trainer.id) };
}

// Leaderboard: trainers sorted by team size, descending
function getLeaderboard() {
  return trainers
    .map(t => ({ ...t, teamSize: teamPokemon.filter(p => p.trainer_id === t.id).length }))
    .sort((a, b) => b.teamSize - a.teamSize);
}

const brock = getTrainerWithTeam("Brock");
console.log(\`=== \${brock.name}'s Profile ===\`);
brock.team.forEach(p => console.log(\`  - \${p.pokemon_name} (Lv. \${p.level})\`));

console.log("\\n=== Leaderboard ===");
getLeaderboard().forEach((t, i) => {
  console.log(\`\${i + 1}. \${t.name} — \${t.teamSize} Pokémon\`);
});`,
          instructions: [
            "Run the existing code to understand how getTrainerWithTeam works",
            "Add trainer Brock (id: 3, badge_count: 9) to the trainers array",
            "Add 2 Pokémon for Brock (trainer_id: 3) to the teamPokemon array",
            "Write a getLeaderboard() function that returns all trainers sorted by team size, largest first",
          ],
          hint: "getLeaderboard should use .map() to attach a teamSize count to each trainer, then .sort() to order them. In Supabase, this would be .select('*, team_pokemon(count)').order('count', { ascending: false }).",
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
    title: "Leveling Up: Real-World APIs",
    description: "OAuth, authentication, and combining APIs with databases.",
    icon: "Rocket",
    chapters: [
      {
        id: "4-1",
        title: "OAuth: Logging In With Another Service",
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
        content: `## OAuth: The Fancy Handshake

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

### Scopes: What You're Asking Permission For

When you redirect to GitHub, you specify **scopes:** what data you want access to:
- \`read:user\`: Read the user's profile
- \`repo\`: Access repositories
- \`gist\`: Read gists

Users see these scopes on the consent screen, so design it carefully!

### For Designers

OAuth introduces several UX moments to design:
1. **"Connect GitHub" button:** The entry point
2. **Redirect to GitHub:** User briefly leaves your app
3. **Consent screen:** GitHub asks "Allow this app to..."
4. **Redirect back:** User returns to your app, now connected
5. **Connected state:** Show their profile, a "Disconnect" option
6. **Token expired:** Graceful re-authentication flow`,
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
          solution: `// OAuth flow with production redirect and email scope added
const oauthFlow = {
  step1: {
    action: "Redirect user to GitHub",
    url: "https://github.com/login/oauth/authorize",
    params: {
      client_id: "your-client-id",
      response_type: "code",
      redirect_uri: "https://myapp.com/api/github/callback",
      scope: "read:user repo read:email",   // added read:email
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
      redirect_uri: "https://myapp.com/api/github/callback",  // must match step1
    },
  },
  step4: {
    action: "Use token to call GitHub API",
    method: "GET",
    url: "https://api.github.com/user/repos",
    headers: { Authorization: "Bearer access-token-from-step-3" },
  },
};`,
          instructions: [
            "Run the code to see the four-step OAuth flow",
            "Add 'read:email' to the scope string in step1.params — this requests email access. Re-run and check the params output changes.",
            "Both step1 and step3 use the same redirect_uri. Change both to 'https://myapp.com/api/github/callback' to simulate a production deploy — they must match or GitHub rejects the exchange.",
            "Look at step4.headers — what does the 'Bearer' prefix tell the server, and which module covered this pattern?",
          ],
          hint: "The redirect_uri in step1 and step3 must be identical — GitHub validates this as a security check. If they differ, step3's code exchange fails with a 400 error.",
        },
        quiz: [
          {
            id: "4-1-q1",
            question: "Your team is building an app that lets users connect their Spotify account. A junior engineer suggests storing the user's Spotify password in your database so the app can log in on their behalf. What's the core problem with this approach?",
            options: [
              "It would work fine as long as the database is encrypted at rest",
              "Passwords are too long to store efficiently in a relational database",
              "If your database is breached, every user's Spotify credentials are exposed. OAuth gives your app a scoped token — not the password — so a breach only affects your app, not the user's entire Spotify account",
              "Spotify's Terms of Service require OAuth for all third-party apps",
            ],
            correctIndex: 2,
            explanation:
              "OAuth exists precisely to solve this problem. Users never share their password with your app. They authenticate directly with Spotify, which issues your app a scoped token. If that token leaks, Spotify can revoke it. A stolen password is much harder to fix.",
          },
          {
            id: "4-1-q2",
            question: "A user clicks 'Connect GitHub' in your app. GitHub redirects them back to /api/github/callback?code=abc123. What must your server do with that code, and why does this have to happen server-side rather than in the browser?",
            options: [
              "Store the code in localStorage and attach it to future API requests as an auth header",
              "Exchange the code for an access token via a server-side POST to GitHub, using your client secret. The secret must never appear in browser code — anyone opening DevTools could steal it",
              "Redirect the user back to GitHub with the code to retrieve their profile data",
              "The code is the access token — pass it directly in Authorization headers going forward",
            ],
            correctIndex: 1,
            explanation:
              "The code-for-token exchange requires your client secret, which must be kept private. Browser JavaScript is visible to anyone with DevTools open. Your server handles the exchange, stores the token securely, and only exposes data the user is allowed to see.",
          },
        ],
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
          "Most real-world APIs require authentication. Let's explore how tokens work in practice using the GitHub API, which you can try right now without any setup.",
        concepts: [
          "GitHub API",
          "Access token",
          "User profile",
          "Bearer token",
          "Personal Access Token",
        ],
        content: `## Authenticated APIs in Practice

Most APIs beyond simple public ones (like PokeAPI) require authentication. The most common method is a **Bearer token:** a string you include in every request header.

### The GitHub API: No OAuth Required

GitHub has a great API that lets you access public data without any auth, and private data with a Personal Access Token (PAT). You can create one in your GitHub settings under Developer Settings → Personal Access Tokens.

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

Every authenticated API uses the same pattern, though the format varies slightly:

| API | Header format |
|-----|--------------|
| GitHub | \`Authorization: Bearer YOUR_TOKEN\` |
| PokeAPI | No auth needed |
| Stripe | \`Authorization: Bearer sk_live_...\` |
| Supabase | \`apikey: YOUR_ANON_KEY\` |

### For Designers

When you see a "Connect your account" feature, that's OAuth generating one of these tokens behind the scenes. Once connected, every API call the app makes on your behalf includes your token in the header.`,
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
            "Notice we're using a GET request with no auth. This is public data.",
            "Private data (like private repos) would need an Authorization header",
          ],
          hint: "Try changing the username to 'torvalds' or 'gaearon'. You'll get real data back!",
        },
        quiz: [
          {
            id: "4-2-q1",
            question: "You're reviewing a design spec that says 'show the user's private repositories on their profile page.' Your engineer flags this as more complex than the public profile call you've been using. Why are they right?",
            options: [
              "Private repos live on a different GitHub API domain that requires special configuration",
              "You need GraphQL instead of REST to access private data on GitHub",
              "Public endpoints return data to anyone with no setup. Private repos require a valid token in the Authorization header — which means your app must have completed OAuth with that user and stored their token",
              "GitHub rate-limits private API calls 10x more aggressively than public ones",
            ],
            correctIndex: 2,
            explanation:
              "The URL structure is the same — what changes is authentication. GET /user/repos (private) needs Authorization: Bearer {token}, while GET /users/{username} (public) works with no header at all. Your app needs to have completed the OAuth flow first so it has a token to send.",
          },
          {
            id: "4-2-q2",
            question: "Your app calls the GitHub API and gets a 401 Unauthorized response. Running through what you know about status codes and auth, what are the two most likely causes?",
            options: [
              "The endpoint URL is wrong — 401 means the resource doesn't exist on that path",
              "Either no Authorization header was sent, or the token is expired or revoked. Check that the header is present and the token is still valid in GitHub's developer settings",
              "The request is using POST instead of GET — GitHub returns 401 for incorrect HTTP methods",
              "GitHub is having an outage — 4xx errors always indicate a server-side problem",
            ],
            correctIndex: 1,
            explanation:
              "401 Unauthorized means the server understood the request but won't fulfil it without valid credentials. The two root causes are: no token was sent, or the token is invalid/expired. A missing resource returns 404, not 401. And 4xx errors are always client-side — 5xx is server-side.",
          },
        ],
        resources: [
          {
            title: "GitHub REST API Docs",
            url: "https://docs.github.com/en/rest",
            type: "docs",
            description: "Full reference for the GitHub API, great for exploring.",
          },
          {
            title: "HTTP Authentication (MDN)",
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

- **Speed:** Reading from your database is faster than calling the API again
- **Persistence:** Data stays even if the API is down
- **History:** Track changes over time (your top songs this month vs last month)
- **Offline access:** Show cached data without internet

### For Designers

This "fetch → transform → save → display" pattern is behind almost every feature:
- **Instagram**: Fetch posts from API → Save to cache → Display in feed
- **Your app**: Fetch Pokémon → Aggregate by type → Display your collection`,
        exercise: {
          starterCode: `// Let's simulate the full API → Database → UI loop

// Step 1: "Fetch" from PokeAPI (simulated response)
const apiPokemon = [
  { id: 25,  name: "pikachu",   types: ["electric"],        sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { id: 6,   name: "charizard", types: ["fire", "flying"],  sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" },
  { id: 133, name: "eevee",     types: ["normal"],          sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" },
];

console.log("Step 1: Fetched", apiPokemon.length, "Pokémon from API\\n");

// Step 2: Transform (pick only the fields our database needs)
const pokemonToSave = apiPokemon.map(p => ({
  pokemon_id: p.id,
  name: p.name,
  types: p.types,
  sprite_url: p.sprite_url,
  saved_at: new Date().toISOString(),
}));

console.log("Step 2: Transformed data for database");
console.log(JSON.stringify(pokemonToSave[0], null, 2));
console.log("");

// Step 3: "Save" to database (simulated)
const database = [...pokemonToSave];
console.log("Step 3: Saved", database.length, "Pokémon to database\\n");

// Step 4: "Read" from database and display in UI
console.log("Step 4: Reading from database for UI\\n");
console.log("=== My Saved Pokémon ===");
database.forEach((p, i) => {
  console.log(\`\${i + 1}. \${p.name} (\${p.types.join(", ")})\`);
});

console.log("\\nThis data now persists in your Supabase database!");`,
          solution: `// Transform step extended with primary_type and saved fields
const pokemonToSave = apiPokemon.map(p => ({
  pokemon_id: p.id,
  name: p.name,
  types: p.types,
  primary_type: p.types[0],        // first type is the primary
  sprite_url: p.sprite_url,
  saved: false,                    // tracks whether user has explicitly saved it
  saved_at: new Date().toISOString(),
}));`,
          instructions: [
            "Run the code and read the Step 2 output — notice which fields are saved",
            "Add a 'primary_type' field to the transform in Step 2: primary_type: p.types[0] — this extracts the first (primary) type for easy filtering. Re-run.",
            "Add a 'saved: false' boolean field to the transform — your UI would flip this to true when the user explicitly saves a Pokémon. Re-run and confirm it appears in the Step 2 output.",
            "Update the Step 4 display loop to also log p.primary_type for each entry",
          ],
          hint: "The transform step is where you shape API data for your own schema. You're not stuck with the API's field names — rename, omit, and add fields that make sense for your app.",
        },
        quiz: [
          {
            id: "4-3-q1",
            question: "Your app fetches a user's top Spotify tracks in real time. A month later Spotify renames the response field track.name to track.title and your UI breaks everywhere. How would the fetch → transform → save pattern have protected you?",
            options: [
              "It wouldn't — if the API response changes, the data saved in your database is also wrong",
              "You control your own schema. The transform step maps track.name to your name column once. Your UI reads from your stable database column and never sees the API field name at all",
              "Databases automatically validate incoming API shapes and reject breaking changes",
              "You'd still need to update both your database schema and your UI regardless",
            ],
            correctIndex: 1,
            explanation:
              "The transform step is a buffer between API instability and your UI. When Spotify changes their field name, you update one line in your transform function. The database column name stays the same, so nothing in your UI breaks.",
          },
          {
            id: "4-3-q2",
            question: "A user opens your app on a flight with no internet. They want to browse their saved Pokémon collection. Which step in the fetch → transform → save → display pipeline makes this work?",
            options: [
              "The fetch step, because fetch() can be configured with a cache: 'force-cache' option for offline use",
              "The transform step, because normalising data removes the need for a network connection",
              "The save step. Once data is in your database, the display step reads from there — not from PokeAPI. No internet needed for data that's already persisted",
              "The display step, because modern browsers automatically cache the last successful API response",
            ],
            correctIndex: 2,
            explanation:
              "This is the core value of persistence. The display step reads from your database, not the API. If you skip the save step and fetch live each time, the app is broken offline. Saving first means the UI always has something to show.",
          },
        ],
        resources: [
          {
            title: "Building Full-Stack Apps with Supabase",
            url: "https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs",
            type: "docs",
            description: "Official Next.js + Supabase tutorial.",
          },
        ],
      },
      {
        id: "4-4",
        title: "API Mocking for Design Sprints",
        subtitle: "Test your UI without waiting for the backend",
        readTime: 6,
        narrative:
          "Your design sprint ends Friday. The backend won't be ready for two weeks. You have two options: wait, or mock it. Mocking lets you build and test a fully interactive UI against fake data right now. By the time the real API is ready, your design has already been tested, iterated, and signed off.",
        concepts: [
          "Mock API",
          "Fake data",
          "MSW",
          "JSON Server",
          "Design sprints",
          "Independent development",
        ],
        content: `## What Is API Mocking?

A **mock API** is a fake version of a real API that returns simulated data. It behaves exactly like the real thing from your frontend's perspective — same endpoints, same JSON shape, same status codes — but nothing is actually stored or fetched from a real server.

Think of it like a film set. The coffee cup on the table is a prop, not real coffee. It looks right, the actors interact with it correctly, and the scene works. That's what a mock API does for your UI.

---

## Why Designers Should Care

Mocking unlocks three things for design work:

**1. Test before the backend exists**
You can wire up your UI to fake endpoints and verify that loading states, empty states, and error states all look right — before a single real API call is possible.

**2. Simulate edge cases you can't trigger with real data**
With a real API, it's hard to deliberately trigger a 500 error or return an empty array. With a mock, you control exactly what comes back.

**3. Hand off with confidence**
A mock that mirrors the agreed API contract gives engineering a clear target. When the real API ships, swapping in the real URL is often a one-line change.

---

## Three Ways to Mock

### Option 1: A Static JSON File

The simplest mock. Serve a local JSON file as if it were an API response.

\`\`\`javascript
// Instead of:
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")

// Use a local file during development:
fetch("/mock-data/pikachu.json")
\`\`\`

**When to use it:** Quick demos, static prototypes, single-screen designs. Not great for dynamic interactions.

### Option 2: JSON Server

A zero-config tool that turns a JSON file into a full REST API with all CRUD endpoints.

\`\`\`bash
npm install -g json-server
\`\`\`

Create a \`db.json\` file:
\`\`\`json
{
  "pokemon": [
    { "id": 25, "name": "pikachu", "type": "electric" },
    { "id": 6, "name": "charizard", "type": "fire" }
  ]
}
\`\`\`

Run it:
\`\`\`bash
json-server --watch db.json --port 3001
\`\`\`

Now you have a working API at \`http://localhost:3001/pokemon\` that supports GET, POST, PUT, and DELETE automatically.

**When to use it:** Testing CRUD flows, multi-screen prototypes, when you want real HTTP behaviour without writing any server code.

### Option 3: Mock Service Worker (MSW)

The most powerful option. MSW intercepts real fetch() calls in the browser and returns mocked responses — without changing a single URL in your code.

\`\`\`javascript
// handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', () => {
    return HttpResponse.json({
      name: 'pikachu',
      id: 25,
      types: [{ type: { name: 'electric' } }]
    })
  }),
]
\`\`\`

Your code calls the real PokeAPI URL. MSW intercepts it and returns your fake data instead. When you're ready for the real API, you just turn off MSW.

**When to use it:** Serious prototyping, testing error states, any situation where you want the mock to be invisible to your code.

---

## The Designer's Mocking Workflow

1. **Agree on the API contract** with your engineer — what endpoints, what fields, what status codes
2. **Build a mock** that returns data in that agreed shape
3. **Design and test all four states:**
   - Loading: delay the mock response by 1–2 seconds
   - Success: return the expected data
   - Error: return a 500 status
   - Empty: return an empty array \`[]\`
4. **Sign off on the design** using real (mocked) interactions
5. **When the real API ships:** swap the mock, QA against real data

---

## Simulating Different States

The real power of mocking is controlling what comes back. Here's how to test all four states deliberately:

\`\`\`javascript
// Success state — normal data
return HttpResponse.json({ pokemon: [...data] })

// Loading state — add artificial delay
await delay(2000)
return HttpResponse.json({ pokemon: [...data] })

// Error state — return a server error
return HttpResponse.error()

// Empty state — return a successful response with no data
return HttpResponse.json({ pokemon: [] })
\`\`\`

Design teams that mock properly never ship with untested empty or error states. They're easy to trigger in a mock — so there's no excuse not to design them.`,
        exercise: {
          starterCode: `// Simulating different API states with fake data
// This is the same pattern a real mock would follow

// Our "mock database" — fake Pokémon data
const mockPokemon = [
  { id: 25,  name: "pikachu",   types: ["electric"] },
  { id: 6,   name: "charizard", types: ["fire", "flying"] },
  { id: 133, name: "eevee",     types: ["normal"] },
];

// Simulate an API call with a delay
function mockFetch(state = "success") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "error") {
        reject(new Error("500 Internal Server Error"));
      } else if (state === "empty") {
        resolve([]);
      } else {
        resolve(mockPokemon);
      }
    }, 500); // 500ms simulated network delay
  });
}

// Test the success state
console.log("Testing success state...");
try {
  const data = await mockFetch("success");
  console.log("Success:", data.length, "Pokémon returned");
  data.forEach(p => console.log(" -", p.name));
} catch (e) {
  console.error("Error:", e.message);
}

// TODO: Change "success" to "empty" and run again
// TODO: Change "success" to "error" and run again
// Each state needs a different UI design!`,
          solution: `const mockPokemon = [
  { id: 25, name: "pikachu", types: ["electric"] },
  { id: 6, name: "charizard", types: ["fire", "flying"] },
  { id: 133, name: "eevee", types: ["normal"] },
];

function mockFetch(state = "success") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "error") reject(new Error("500 Internal Server Error"));
      else if (state === "empty") resolve([]);
      else resolve(mockPokemon);
    }, 500);
  });
}

for (const state of ["success", "empty", "error"]) {
  console.log("\\nTesting", state, "state...");
  try {
    const data = await mockFetch(state);
    if (data.length === 0) {
      console.log("Empty state: show 'No Pokémon found' message");
    } else {
      console.log("Success:", data.length, "Pokémon");
    }
  } catch (e) {
    console.error("Error state:", e.message, "— show retry button");
  }
}`,
          instructions: [
            "Run the code and see the success state output",
            "Change 'success' to 'empty' on the mockFetch line — what should the UI show?",
            "Change it to 'error' — now test your error state",
            "Notice that each state needs a completely different design response",
          ],
          hint: "Each call to mockFetch() can return a different result depending on what string you pass. 'success' returns data, 'empty' returns an empty array, 'error' throws. These match the four states from chapter 2-4.",
        },
        quiz: [
          {
            id: "4-4-q1",
            question: "Your sprint ends Friday and the backend API won't be ready for two more weeks. You need to demonstrate an interactive prototype with loading and error states. What's the right approach?",
            options: [
              "Wait for the real API before testing any UI interactions",
              "Use static screenshots to simulate the different states",
              "Build a mock API that returns fake data so you can test all four states now",
              "Ask engineering to prioritise the API above other work",
            ],
            correctIndex: 2,
            explanation:
              "A mock API lets you develop and test UI independently of the backend. You can trigger loading, success, empty, and error states on demand. When the real API ships, swapping it in is usually a one-line change.",
          },
          {
            id: "4-4-q2",
            question: "You want to test what your Pokémon search looks like when the API returns an empty array. Which approach gives you the most control over this?",
            options: [
              "Search for a real Pokémon name that doesn't exist in the database",
              "Disconnect your internet and reload the page",
              "Configure your mock to return an empty array [] for that endpoint",
              "Delete all Pokémon from the production database temporarily",
            ],
            correctIndex: 2,
            explanation:
              "Mocks let you control exactly what comes back. You can return [], a 500 error, a delayed response, or realistic data — all on demand. This makes testing edge cases trivial instead of hard to reproduce.",
          },
        ],
        resources: [
          {
            title: "Mock Service Worker (MSW)",
            url: "https://mswjs.io/docs/getting-started",
            type: "docs",
            description: "The most powerful browser-based API mocking tool. Intercepts real fetch() calls without changing your code.",
          },
          {
            title: "JSON Server",
            url: "https://github.com/typicode/json-server",
            type: "docs",
            description: "Zero-config REST API from a JSON file. GET, POST, PUT, DELETE all work automatically.",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Capstone Project",
    description: "Wire every concept together into a real feature and see exactly where this knowledge takes you next.",
    icon: "Trophy",
    chapters: [
      {
        id: "5-1",
        title: "Putting It All Together",
        subtitle: "Build a Pokémon collection app from scratch",
        readTime: 10,
        narrative:
          "Here's where everything comes together. We'll fetch data from an API, save it to our database, and build something that lasts beyond a single session.",
        concepts: [
          "Full-stack architecture",
          "Data flow design",
          "API + database",
          "Schema design",
          "Error handling",
        ],
        content: `## The Capstone: Pokémon Collection App

You've learned every piece in isolation. Now we wire them together.

The app: a personal Pokémon collection where users browse by type, view stats, save favourites, and see their history. Every feature maps directly to something you've learned.

### The Full Architecture

Here's how data moves through the whole system:


### Connecting the Concepts

**Module 1 → PokeAPI calls**
Every card in your UI starts with a fetch request. Browse by type? That's \`GET /type/{name}\`. View details? That's \`GET /pokemon/{id}\`.

**Module 2 → HTTP methods + headers**
Reading the collection uses GET. Saving a Pokémon uses POST. Removing one uses DELETE. Your Supabase client sends the right method automatically, but now you understand *why*.

**Module 3 → Database schema**
Your \`saved_pokemon\` table needs a clear schema:

| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| pokemon_id | integer | PokeAPI id |
| name | text | Display name |
| sprite_url | text | Image URL |
| types | text[] | Array of types |
| saved_at | timestamp | When it was added |

**Module 4 → Authentication**
In a production version, OAuth protects your collection so only *you* can see and edit it. The token from login travels in your request headers to Supabase, exactly what you learned.

### The Designer Angle

This is where API fluency pays off most. Instead of asking an engineer "can we filter Pokémon by type?", you already know:
- PokeAPI has a \`/type/{name}\` endpoint that returns every Pokémon of that type
- The response includes a \`pokemon\` array you can map over
- Each item has a \`pokemon.url\` you can follow for full stats

You can spec the *exact* data shape in your designs. That's a genuinely different level of collaboration.

### What's in the Playground

The exercise below builds the core of this app: fetch a type, parse the response, then structure it exactly how you'd pass it into a UI component or save it to the database.

Try changing \`"fire"\` to \`"water"\`, \`"psychic"\`, or \`"dragon"\` and run again.`,
        exercise: {
          starterCode: `// Capstone: Build the data layer for a Pokémon type browser
// This is the exact pattern you'd use in a real app

const TYPE = "fire"; // Try: "water", "dragon", "psychic", "ghost"

// Step 1: Fetch all Pokémon of a given type
console.log(\`Fetching \${TYPE}-type Pokémon...\\n\`);

const typeRes = await fetch(\`https://pokeapi.co/api/v2/type/\${TYPE}\`);
const typeData = await typeRes.json();

// The response has a pokemon array — each item wraps the Pokémon data
const firstFive = typeData.pokemon.slice(0, 5);

// Step 2: Fetch full details for each (name + sprite)
const details = await Promise.all(
  firstFive.map(entry => fetch(entry.pokemon.url).then(r => r.json()))
);

// Step 3: Shape the data the way your UI actually needs it
// This is exactly what you'd insert into your database or pass to a component
const collection = details.map(p => ({
  pokemon_id: p.id,
  name: p.name,
  sprite_url: p.sprites.front_default,
  types: p.types.map(t => t.type.name),
  base_stats: {
    hp:      p.stats[0].base_stat,
    attack:  p.stats[1].base_stat,
    defense: p.stats[2].base_stat,
    speed:   p.stats[5].base_stat,
  },
  // saved_at would be added by the database on insert
}));

console.log(\`Found \${typeData.pokemon.length} \${TYPE}-type Pokémon total\\n\`);
console.log("First 5 — shaped for our database schema:");
collection.forEach(p => {
  console.log(\`  #\${p.pokemon_id} \${p.name} [\${p.types.join(", ")}]  HP:\${p.base_stats.hp}  ATK:\${p.base_stats.attack}\`);
});

console.log("\\nSample database insert (what you'd pass to Supabase):");
console.log(JSON.stringify(collection[0], null, 2));`,
          solution: `// Same as starter — explore by changing the TYPE variable`,
          instructions: [
            "Run to fetch real fire-type Pokémon from PokeAPI",
            "Change the TYPE variable to any type: \"water\", \"psychic\", \"dragon\", \"ghost\"",
            "Notice the data shape. This is exactly what you'd INSERT into a Supabase table.",
            "The base_stats object shows how you'd model game data in a real schema",
          ],
          hint: "Change the TYPE constant at the top to \"dragon\" and run again. Dragon types tend to have much higher attack stats than fire types. That's real data from the API.",
        },
        quiz: [
          {
            id: "5-1-q1",
            question: "You're designing a Pokémon type browser. Selecting 'Dragon' should show 12 dragon-type Pokémon with their stats. Based on how PokeAPI is structured, how many API calls does your engineer actually need to make?",
            options: [
              "One call to /pokemon?type=dragon — a single request returns everything",
              "Twelve calls only — one GET /pokemon/{id} per Pokémon",
              "At least 13: one GET /type/dragon to get the list, then up to 12 parallel calls to each Pokémon's detail URL for stats. Promise.all runs those concurrently.",
              "Two calls: one for the type list and one bulk endpoint that returns all stats at once",
            ],
            correctIndex: 2,
            explanation:
              "PokeAPI doesn't have a bulk-with-stats endpoint. GET /type/dragon returns a list of Pokémon with minimal data (name + URL). To get sprites and stats you follow each URL individually. Promise.all makes this efficient by running them in parallel rather than one-by-one.",
          },
          {
            id: "5-1-q2",
            question: "Your database schema has a primary_type column for filtering. The PokeAPI response gives you p.types as an array like [{slot: 1, type: {name: 'fire'}}, {slot: 2, type: {name: 'flying'}}]. What does the transform step need to extract for primary_type?",
            options: [
              "Save the entire p.types array as a JSON blob — filter it in the UI instead",
              "Ask the backend team to add a primary_type field to PokeAPI",
              "p.types[0].type.name — the first element's type name is the primary type. The transform step maps this to your column before the Supabase insert",
              "p.types.find(t => t.slot === 1).name — though this requires a custom API wrapper",
            ],
            correctIndex: 2,
            explanation:
              "p.types[0].type.name gives you 'fire'. This is exactly what the transform step is for — bridging the gap between the API's shape and your schema's shape. You're not stuck with how PokeAPI structures its response.",
          },
        ],
        resources: [
          {
            title: "PokeAPI: Types endpoint",
            url: "https://pokeapi.co/docs/v2#types",
            type: "docs",
            description: "The /type/{name} endpoint. See what data it returns and how to use it.",
          },
          {
            title: "Supabase: Inserting data",
            url: "https://supabase.com/docs/guides/database/tables",
            type: "docs",
            description: "How to create a table and insert rows from your app.",
          },
          {
            title: "JavaScript Promises In 10 Minutes",
            url: "https://www.youtube.com/watch?v=DHvZLI7Db8E",
            type: "video",
            description: "Covers Promise.all and async patterns, exactly the technique used in the exercise above.",
          },
        ],
      },
      {
        id: "5-2",
        title: "What's Next",
        subtitle: "Where API fluency takes you from here",
        readTime: 5,
        narrative:
          "You started this course asking 'what even is an API?' You're finishing it knowing how to fetch data, authenticate requests, model schemas, and build features that persist. That's a real shift.",
        concepts: [
          "GraphQL",
          "Webhooks",
          "Real-time APIs",
          "LLM APIs",
          "Agentic design",
        ],
        content: `## What You Now Know

Before this course, APIs were a black box. Here's the mental model you've built:

- **APIs** are contracts: they define what you can ask for and what you'll get back
- **HTTP methods** are verbs: GET reads, POST creates, PUT updates, DELETE removes
- **Headers** carry context: authentication, content type, rate limit info
- **Status codes** are signals: 200 means success, 4xx is your fault, 5xx is theirs
- **Databases** are structured storage: tables, rows, relationships, and schemas you design
- **CRUD** maps to HTTP: Create→POST, Read→GET, Update→PUT, Delete→DELETE
- **Auth** protects data: API keys for services, OAuth for user identity, tokens in headers

That's not beginner knowledge. That's the foundation engineers build real systems on.

### How This Changes Your Design Work

**Before:** "Can we show the user's history somewhere?"
**After:** "We could add a \`created_at\` column to the saves table and query it ordered by timestamp. Pretty straightforward."

**Before:** "Why does it take so long to load those results?"
**After:** "We're making one API call per item instead of batching. That's the N+1 problem. We could fetch the list first, then fetch details in parallel with Promise.all."

**Before:** "Can the app update in real time?"
**After:** "Supabase has a WebSocket subscription API. We could listen to inserts on the table and push updates without polling."

The language you now speak is your engineering team's native language.

### Where to Go From Here

**GraphQL:** Instead of calling multiple endpoints, you write a query that specifies exactly the fields you need. The server returns a single response shaped to your request. Great for complex UIs with lots of related data.

**Webhooks:** Flip the request direction. Instead of *you* polling an API, the API calls *your* endpoint when something happens. Stripe uses this to notify you of payments. GitHub uses it to trigger CI builds.

**Real-time:** WebSockets keep a persistent connection open. The server can push data the moment it changes, without the client asking. Supabase's Realtime product is built on this.

**LLM APIs:** Here's the exciting part for you specifically: LLM APIs are just POST requests.

\`\`\`javascript
// This is a real Claude API call — notice the pattern
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your-key",          // API key auth — Module 2
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    messages: [
      { role: "user", content: "Describe Charizard in one sentence." }
    ],
  }),
});

const data = await response.json();
console.log(data.content[0].text); // The AI's response
\`\`\`

POST request, JSON body, API key in the header, JSON response. You know every single piece of this.

### Agentic Design: Why This Matters Now

AI agents are programs that make decisions and take actions in the world. Almost every action they take is an API call:

1. **Retrieve information** → GET request to a search API
2. **Check the user's calendar** → GET request to Google Calendar API
3. **Send a notification** → POST request to a messaging API
4. **Save a result** → INSERT into a database

The designers who understand this will be able to spec agent workflows with precision: which tools an agent needs, what data it reads and writes, where it needs authentication, and what happens when a call fails.

That's the work that matters right now, and you're equipped for it.

**You belong in those conversations.**`,
        exercise: {
          starterCode: `// Final exercise: the LLM API pattern
// LLM calls look exactly like everything else you've learned

console.log("=== How an LLM API works ===\\n");

// This is the real structure of a Claude API request
const request = {
  url: "https://api.anthropic.com/v1/messages",
  method: "POST",                        // POST — you're sending data
  headers: {
    "Content-Type": "application/json",  // JSON body
    "x-api-key": "sk-ant-...",           // API key auth (Module 2!)
    "anthropic-version": "2023-06-01",   // API versioning
  },
  body: {
    model: "claude-sonnet-4-20250514",
    max_tokens: 256,
    messages: [
      { role: "user", content: "Which starter Pokémon has the best design?" }
    ],
  },
};

// Walk through each part
console.log("Endpoint:   ", request.url);
console.log("Method:     ", request.method);
console.log("Auth header:", "x-api-key (same concept as any API key)");
console.log("\\nRequest body:");
console.log(JSON.stringify(request.body, null, 2));

// A real response looks like this:
const simulatedResponse = {
  id: "msg_01XFDUDYJgAACzvnptvVoYEL",
  type: "message",
  role: "assistant",
  content: [
    {
      type: "text",
      text: "Charizard, without a doubt. The combination of fire and flight, the dragon-like silhouette, and the visual evolution arc from Charmander makes it iconic — even if it's technically a Flying type."
    }
  ],
  model: "claude-sonnet-4-20250514",
  stop_reason: "end_turn",
  usage: { input_tokens: 18, output_tokens: 52 }
};

console.log("\\nSimulated response:");
console.log("Text:", simulatedResponse.content[0].text);
console.log("Tokens used:", simulatedResponse.usage.input_tokens + simulatedResponse.usage.output_tokens);
console.log("\\n✓ Same pattern: endpoint + method + headers + body = JSON response");
console.log("✓ You already know how to work with any API, including AI ones.");`,
          solution: `// Extended: multi-turn conversation added to the messages array
const request = {
  url: "https://api.anthropic.com/v1/messages",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "sk-ant-...",
    "anthropic-version": "2023-06-01",
  },
  body: {
    model: "claude-sonnet-4-20250514",
    max_tokens: 256,
    messages: [
      { role: "user",      content: "Which starter Pokémon has the best design for a product designer?" },
      { role: "assistant", content: "Bulbasaur — it's the only starter that doesn't follow the obvious 'cool = good' pattern." },
      { role: "user",      content: "Why does that matter for design?" },
    ],
  },
};`,
          instructions: [
            "Run the code and read the annotated request structure",
            "Change the content string in request.body.messages[0] to ask a different question — anything you like. Re-run and confirm the structure is identical regardless of what you ask.",
            "Add a second message to the messages array with role: 'assistant' and any response text. Then add a third with role: 'user'. This is the exact shape of a multi-turn conversation.",
            "Count the module references in the code comments (// Module 2!, etc.) — how many concepts from this course appear in one API call?",
          ],
          hint: "The messages array is just an array of objects with role and content. 'user' is you, 'assistant' is the AI. Alternate them to build a conversation. The entire history goes in every request — LLMs have no memory between calls.",
        },
        quiz: [
          {
            id: "5-2-q1",
            question: "A PM asks: 'Can we add an AI feature that suggests which Pokémon to catch next based on the user's current team?' You've just seen the Claude API structure. What can you tell them about how hard this is to build?",
            options: [
              "It requires a completely different tech stack — LLM APIs don't work like regular REST APIs",
              "It's a POST request with the user's team data in the messages array. The response.content[0].text is the suggestion. Same auth, same headers, same JSON pattern as every other API in this course",
              "LLM responses are too unpredictable to rely on for product features",
              "You'd need to fine-tune a model on Pokémon data before it could give useful suggestions",
            ],
            correctIndex: 1,
            explanation:
              "LLM APIs are POST requests. You send a JSON body with a messages array, authenticate with an API key header, and parse a JSON response. Every concept is from Module 2. The only new thing is the specific field names — which you learn from the docs, just like any other API.",
          },
          {
            id: "5-2-q2",
            question: "You're spec-ing an AI agent that checks a user's saved team, looks up type weaknesses from PokeAPI, then sends a push notification with a recommendation. What three operation types does this agent need?",
            options: [
              "Three database reads — agents only read data, they don't call external APIs or write",
              "One API call to a combined endpoint that handles all three operations in sequence",
              "A database READ (SELECT saved_pokemon), an API GET (PokeAPI weakness data), and an API POST (notification service). Each one is an operation you've built in this course",
              "OAuth authentication for each individual action — agents require user approval for every API call",
            ],
            correctIndex: 2,
            explanation:
              "Agents chain exactly the operations you've learned: reading from a database, calling an external API, and POSTing to another service. There's nothing fundamentally new — the agent just decides which ones to run and in what order. Understanding each operation is what lets you spec the agent accurately.",
          },
        ],
        resources: [
          {
            title: "Anthropic API: Getting Started",
            url: "https://docs.anthropic.com/en/api/getting-started",
            type: "docs",
            description: "The real Claude API docs. You'll recognise the pattern immediately.",
          },
          {
            title: "What are AI Agents? (Explained simply)",
            url: "https://www.youtube.com/watch?v=F8NKVhkZZWI",
            type: "video",
            description: "How agents chain API calls to take actions in the world.",
          },
          {
            title: "GraphQL vs REST: Key Differences",
            url: "https://www.youtube.com/watch?v=PeAOEAmR0D0",
            type: "video",
            description: "When to use each, and why designers should care.",
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

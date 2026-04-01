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
  playgroundNote?: string;
  errorHint?: string;
  readOnly?: boolean;
}

export interface PostmanStep {
  instruction: string;
  detail?: string;
}

export interface PostmanExercise {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  steps: PostmanStep[];
  expectedOutput?: string;
  body?: string;
  headers?: { key: string; value: string }[];
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
  postmanExercise?: PostmanExercise;
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
    description: "Understand how apps talk to servers and explore real APIs with Postman — no code required.",
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
        content: `This isn't a coding course.

By the end you'll be able to read a ticket, spot what's technically impossible in your own designs, and have informed conversations with your engineering team. No production code required.

Every chapter is built around one question: **how does understanding this change how I design?** That's the only lens that matters here.

:::tip
You're not here to become an engineer. You're here to become the designer that engineers actually want in the room.
:::`,
        resources: [],
      },
      {
        id: "1-1",
        title: "The Restaurant Analogy",
        subtitle: "Understanding APIs through everyday life",
        readTime: 4,
        narrative:
          "Your team is building a Pokémon companion app, and your PM wants you to understand how it talks to servers. Before we dive in, let's make sense of the invisible conversations happening between every app and server. Think of it like ordering at a restaurant...",
        concepts: ["API", "Client", "Server", "Request", "Response"],
        content: `## What is an API?

**API** stands for **Application Programming Interface**. That sounds technical, but here's the simple version:

An API is a **waiter** at a restaurant.

- **You** (the customer) sit at a table and look at the menu
- **The kitchen** (the server) has all the food, but you can't walk in and grab it yourself
- **The waiter** (the API) takes your order to the kitchen and brings back your food

In the digital world:
- **Your browser or app** is the client
- **A remote computer** is the server (it has data, like Pokémon stats or a trainer's battle history)
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

Understanding APIs means you can design **with** the technology, not against it.

:::tip
Next time you're in a design review, ask: does this design account for what the API actually returns — or is it assuming data that may not exist?
:::`,
        quiz: [
          {
            id: "1-1-q1",
            question: "Your team wants to add a Pokémon search to the app. The designs are ready and the data exists on PokeAPI's servers. What problem does the API solve?",
            options: [
              "It stores Pikachu's data permanently inside the app",
              "It converts JSON into something the browser can display visually",
              "It handles the visual design of the Pokémon card",
              "It lets your app request specific data from the server and get it back",
            ],
            correctIndex: 3,
            explanation:
              "The API is the bridge. Your app can't access the server's database directly — the API receives your request, fetches the right data, and sends it back in a usable format.",
          },
          {
            id: "1-1-q2",
            question: "A user taps 'Search' and 200ms later a Pokémon card appears. What two-part exchange made that happen?",
            options: [
              "Request and response",
              "Compile and execute",
              "Upload and download",
              "Push and pull",
            ],
            correctIndex: 0,
            explanation:
              "Every API interaction is a request-response cycle. The app sent a request ('give me Pikachu'), the server processed it and sent a response ('here's Pikachu's data').",
          },
        ],
        resources: [
          {
            title: "What is an API? (Postman)",
            url: "https://www.youtube.com/watch?v=-0MmWEYR2a8",
            type: "video",
            description: "Postman's own short explainer — what an API is and how it works, in plain language.",
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
        title: "The Designer's API Toolkit",
        subtitle: "Exploring APIs visually with Postman",
        readTime: 6,
        narrative:
          "Your PM just asked you to design a new Pokémon detail page and wants to know exactly what data is available. Instead of pinging the dev team, you open Postman, type in the API URL, and in 30 seconds you have the full picture. This chapter is your hands-on introduction to Postman — the tool you'll use throughout this entire course.",
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

Let's fetch Pikachu — the same URL you'll use throughout this course.

1. Make sure the method dropdown says **GET**
2. Paste this URL into the address bar: \`https://pokeapi.co/api/v2/pokemon/pikachu\`
3. Hit **Send**

You'll see Pikachu's full JSON response: 200+ fields including stats, sprites, abilities, moves, and types. This is the real data your designs would be working with.

## Reading the Response

Postman breaks the response into three tabs:

- **Body:** the actual JSON data — this is what your app code reads
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

We've pre-built a Postman collection with every API request from this course, organised by module. Import it once and every endpoint is ready to explore.

:::tip
Before your next feature kickoff, open Postman, hit the relevant endpoint, and look at the real response. You'll catch design assumptions in ten minutes that would otherwise surface two weeks into development.
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/pikachu",
          steps: [
            { instruction: "Create a new Collection called \"Pokémon Companion App\"", detail: "In the left sidebar, click Collections → \"+\" → name it." },
            { instruction: "Send a GET request to https://pokeapi.co/api/v2/pokemon/pikachu" },
            { instruction: "Save the request to your collection", detail: "Click Save (Ctrl/Cmd+S), choose your collection, name it \"Get Pikachu\"." },
            { instruction: "Set up an environment variable", detail: "Click Environments (left sidebar) → Create → add a variable called \"baseUrl\" with value \"https://pokeapi.co/api/v2\"." },
            { instruction: "Update your request URL to use the variable: {{baseUrl}}/pokemon/pikachu", detail: "Select your environment from the dropdown top-right, then replace the hardcoded URL." },
            { instruction: "Send again — same result, but now the base URL is reusable across all requests" },
            { instruction: "Add two more requests to your collection", detail: "Try GET {{baseUrl}}/type/fire and GET {{baseUrl}}/ability/static. Save both." },
          ],
          expectedOutput: "A collection with 3 saved requests, all using the {{baseUrl}} variable. Change the variable once and all requests update.",
        },
        quiz: [
          {
            id: "1-2-q1",
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
            id: "1-2-q2",
            question: "What does {{pokemonName}} mean in a Postman URL?",
            options: [
              "An environment variable you can change in one place to update all requests",
              "A required field that Postman fills in automatically",
              "A broken URL that needs fixing",
              "A comment telling you what to type",
            ],
            correctIndex: 0,
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
      {
        id: "1-3",
        title: "Your First API Call",
        subtitle: "Seeing real Pokémon data come back from a server",
        readTime: 6,
        narrative:
          "Now that you understand the concept, let's actually do it. We're going to call the PokeAPI and get real data. Don't worry if the code looks unfamiliar. You've already explored this data in Postman — now let's see what the code behind it looks like.",
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

:::note
You'll see \`const\` and \`await\` throughout the examples — these are JavaScript keywords, not API concepts. Think of \`const\` as "store this value" and \`await\` as "wait for the result before moving on." You don't need to memorise them; just know they're scaffolding around the part that actually matters: the URL and the data.
:::

### Pro Tip: Open Your DevTools!

Press **Cmd + Option + I** (Mac) to open your browser's Developer Tools. Click the **Network** tab. Now when you run API calls, you'll see the actual requests flying back and forth. This is one of the most powerful tools for understanding how apps work.

:::tip
When an engineer says "that field isn't in the response", you now know exactly what they mean — and you know to check the API docs before designing with that data.
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/bulbasaur",
          steps: [
            { instruction: "Open a new request tab in Postman", detail: "Click the \"+\" tab at the top, or use Ctrl/Cmd+T." },
            { instruction: "Make sure the method is GET" },
            { instruction: "Paste this URL: https://pokeapi.co/api/v2/pokemon/bulbasaur" },
            { instruction: "Click Send" },
            { instruction: "Find the \"types\" field in the response", detail: "Scroll down or use Ctrl/Cmd+F to search. You'll see an array with \"grass\" and \"poison\"." },
            { instruction: "Now try fetching three Pokémon in a row", detail: "Change the name to \"charmander\", send, then \"squirtle\", send. Compare the types and stats between them." },
            { instruction: "Look at the \"sprites\" object", detail: "It contains image URLs. Copy one and paste it in your browser to see the actual sprite." },
          ],
          expectedOutput: "Bulbasaur's full profile — 'grass' and 'poison' types, sprites, stats (HP: 45, Attack: 49, etc.).",
        },
        quiz: [
          {
            id: "1-3-q1",
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
            id: "1-3-q2",
            question: "Your design needs to show Charizard's stats. The base URL is https://pokeapi.co/api/v2/ and Charizard's ID is 6. Which URL fetches the right data?",
            options: [
              "https://pokeapi.co/api/v2/",
              "https://pokeapi.co/api/v2/pokemon",
              "https://pokeapi.co/api/v2/6",
              "https://pokeapi.co/api/v2/pokemon/6",
            ],
            correctIndex: 3,
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
        id: "1-4",
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

Most APIs have a limit on how many requests you can make. PokeAPI is generous (100 requests per minute), but most paid APIs like GitHub or Stripe limit you to a certain number per second. Always check this in the docs!

:::tip
Before speccing a filter, search, or sort feature, check the API docs to confirm the parameters actually exist. If they don't, it's a backend task — flag it before sprint planning.
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0",
          steps: [
            { instruction: "Open a new request tab in Postman" },
            { instruction: "Set the method to GET and paste this URL: https://pokeapi.co/api/v2/pokemon?limit=5&offset=0" },
            { instruction: "Click Send and look at the response", detail: "You'll see a \"count\" field (total Pokémon) and a \"results\" array with 5 names." },
            { instruction: "Find the \"next\" field in the response", detail: "It contains a URL for the next page of results. Copy it, paste it into the URL bar, and send again — that's pagination." },
            { instruction: "Now try changing the parameters", detail: "Edit the URL to limit=10&offset=150 and send. You'll get 10 Pokémon starting from #151 — the Johto region." },
            { instruction: "Check the Params tab below the URL bar", detail: "Postman breaks query parameters into a visual table. You can edit limit and offset here instead of typing in the URL." },
          ],
          expectedOutput: "A list of 5 Pokémon names with a total count of 1302+. The \"next\" field gives you the URL for the next page.",
        },
        quiz: [
          {
            id: "1-4-q1",
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
            id: "1-4-q2",
            question: "Your Pokédex prototype fetches all 1,000 Pokémon on page load — one request each. After a few test runs, the API stops responding with errors. No code changed. What's the most likely cause?",
            options: [
              "You exceeded the API's rate limit by sending too many requests too quickly",
              "Your internet connection dropped",
              "The PokeAPI server went down for maintenance",
              "The Pokémon database has a corrupted record",
            ],
            correctIndex: 0,
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
    ],
  },
  {
    id: "2",
    title: "Speaking the Language",
    description: "Read HTTP methods, headers, and status codes like a pro — and know what they mean for your designs.",
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

When your engineer says "that's a POST endpoint," you'll know they mean it creates new data.

:::note
These four are the most common and the ones you'll encounter most as a designer. There are others (like PATCH for partial updates, HEAD for metadata-only checks, and OPTIONS for CORS preflight) — but GET, POST, PUT, and DELETE will cover 95% of what you'll see in the wild.
:::

:::tip
When writing a design ticket, include the HTTP method your feature needs. "This screen reads data (GET)" or "This form creates a record (POST)" tells an engineer immediately what's needed.
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://jsonplaceholder.typicode.com/posts/1",
          steps: [
            { instruction: "Send a GET request to https://jsonplaceholder.typicode.com/posts/1" },
            { instruction: "Read the response — you just fetched a blog post" },
            { instruction: "Now switch the method to POST and the URL to https://jsonplaceholder.typicode.com/posts" },
            { instruction: "Go to the Body tab → select \"raw\" → choose JSON from the dropdown" },
            { instruction: "Paste this body and hit Send", detail: "{\"title\": \"My First Post\", \"body\": \"Learning APIs!\", \"userId\": 1}" },
            { instruction: "Compare the two responses — GET reads data, POST creates data" },
          ],
          body: "{\n  \"title\": \"My First Post\",\n  \"body\": \"Learning APIs!\",\n  \"userId\": 1\n}",
          expectedOutput: "GET returns an existing post (id: 1). POST returns a new post with id: 101 — the server created it from your body.",
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

:::note
You won't need to write this code yourself — this is just showing you what headers look like in JavaScript. In Postman, you add headers visually in the **Headers** tab without touching any code.
:::

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

:::note
The examples below show what authentication looks like in code — for reference only. In Postman, you set these up in the **Authorization** tab with a dropdown and text field. No code required.
:::

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
- What data do we need permission to access? (Consent screens)

:::tip
If your design has a "Connect your account" flow or shows user-specific data, ask early: is there an authenticated endpoint for this, and what happens when the token expires?
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/pikachu",
          steps: [
            { instruction: "Send a GET to https://pokeapi.co/api/v2/pokemon/pikachu" },
            { instruction: "Click the Headers tab in the response panel", detail: "You'll see headers like Content-Type, Cache-Control, and Server." },
            { instruction: "Find Content-Type — it should say application/json", detail: "This tells you the response is JSON, not HTML or plain text." },
            { instruction: "Now check the request headers — click the Headers tab above the URL bar" },
            { instruction: "Add a custom header: key = Accept, value = application/json", detail: "This tells the server you want JSON back. Most APIs default to JSON, but it's good practice." },
            { instruction: "Send again — same result, but now you're explicitly requesting JSON" },
          ],
          expectedOutput: "The response headers show Content-Type: application/json. Your request headers now include Accept: application/json.",
        },
        quiz: [
          {
            id: "2-2-q1",
            question: "You're spec-ing a 'My Saved Pokémon' feature. The API only returns results for the logged-in user. How does the server know which user is making the request?",
            options: [
              "A token in the Authorization header tells the server which user is authenticated",
              "The server looks up the user by their IP address",
              "The user's email is included in the URL as a query parameter",
              "The frontend sends the user's ID in the request body",
            ],
            correctIndex: 0,
            explanation:
              "The Authorization header carries a token (API key or Bearer token) that proves who's making the request. The server validates it and returns only that user's data.",
          },
          {
            id: "2-2-q2",
            question: "You're designing a 'Connect GitHub' feature. What type of auth would the app use to access a user's private repositories on their behalf?",
            options: [
              "API Key in the URL",
              "No auth needed; repos are public",
              "Basic username/password",
              "Bearer token obtained via OAuth",
            ],
            correctIndex: 3,
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

The diagram above shows the full range of status codes you'll encounter. The key insight: **2xx means it worked, 4xx means you made a mistake, 5xx means the server broke.** Everything else is a variation on these three themes.

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

:::note
This is a simulated error example — not a real broken request. CORS errors look exactly like this in your browser console. Read it as a reference for when you see it in the wild.
:::

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
- **Empty state:** No data found (different from an error!)

:::tip
Every screen you design should have an error state. The status code tells you which kind — a 404 needs different copy than a 500. Design both.
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/pikachu",
          steps: [
            { instruction: "Send a GET to https://pokeapi.co/api/v2/pokemon/pikachu — note the 200 OK status" },
            { instruction: "Change the URL to https://pokeapi.co/api/v2/pokemon/pikachuuu and send" },
            { instruction: "Check the status code — you'll see 404 Not Found", detail: "The orange/red badge next to the response time." },
            { instruction: "Now try https://pokeapi.co/api/v2/pokemon/ (no name) — 404 again, different reason" },
            { instruction: "Try https://pokeapi.co/api/v2/invalidendpoint — this tests a completely wrong path" },
            { instruction: "Note how each error gives a different response body", detail: "Some return JSON, some return \"Not Found\". Your error state designs should handle both." },
          ],
          expectedOutput: "200 for valid Pokémon, 404 for typos and invalid paths. Different errors return different response bodies.",
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
              "The database query returned too many results",
              "The server itself has a problem — it's not a frontend or user error",
            ],
            correctIndex: 3,
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

The diagram above breaks down all four states with what to design for each. The most important takeaway: **every screen you design that touches an API needs all four states, not just the success state.**

The biggest mistake in most design specs is only designing the happy path. If your handoff only shows the populated screen, an engineer has to invent the loading, error, and empty experiences themselves — and they will be ugly.

:::compare
✗ "An error occurred."
✓ "Couldn't load Pokémon — check your connection and try again." [Retry]
:::

:::compare
✗ (blank screen — user has no idea what happened)
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
- [ ] What if only some fields are missing (e.g. a Pokémon with no sprite)?

:::tip
Before your next handoff, run through the four states checklist. If any screen only shows the success state, the design is incomplete — and an engineer will have to make it up.
:::`,
        exercise: {
          playgroundNote: "This is a design spec exercise — fill in the TODO values with your own copy decisions. There's no right answer, just think through each state.",
          errorHint: "Something went wrong parsing the spec object. Make sure all TODO values are wrapped in quotes.",
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
              "Empty state: request succeeded but no results",
              "Loading state: wait for more data",
              "Error state: something went wrong",
              "Success state: hide the content area",
            ],
            correctIndex: 0,
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

The diagram above compares all three patterns side by side — how they work, what the requests and responses look like, when to use each, and the tradeoffs. Refer back to it as you read the detail below.

---

## REST: The Pattern You've Been Using

REST is what you've been working with throughout this course. Every PokeAPI call you've made is REST — a URL, an HTTP method, a predictable response.

:::endpoints
GET    /pokemon/25       → fetch Pikachu
POST   /pokemon          → create a new Pokémon
PUT    /pokemon/25       → update Pikachu
DELETE /pokemon/25       → delete Pikachu
:::

The key limitation: REST always returns the **full object**. If you only need name and sprite, you still get 30+ fields. On mobile connections, that adds up.

---

## GraphQL: Precision Queries

GraphQL lets the client specify exactly which fields it wants:

\`\`\`graphql
query {
  pokemon(name: "pikachu") {
    name
    sprite
    types
  }
}
\`\`\`

Three fields requested, three fields returned. Nothing more.

**Why designers care:** GraphQL lets frontend teams move faster without waiting for new backend endpoints. If the data exists somewhere in the system, you can query it.

---

## Webhooks: The Server Calls You

REST and GraphQL are "pull" — your app asks. Webhooks are "push" — the server tells you when something happens.

:::compare
✗ Polling: Your app asks "Any new orders?" every 30 seconds — server says "Not yet" every time.
✓ Webhook: Server calls your app the instant a new order arrives.
:::

**Real examples:**
- Stripe sends a webhook when a payment succeeds
- GitHub sends a webhook when someone pushes code
- A delivery service sends a webhook when a package is scanned

**Why designers care:** If your design requires instant updates (notifications, live tracking, collaborative editing), it probably needs webhooks. "Refresh to see updates" is not a real-time experience — flag it early.

:::tip
If you're designing a feature that needs real-time updates (live scores, chat, notifications), flag it before sprint planning — it likely needs a Webhook or WebSocket, not a standard REST call.
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/pikachu",
          steps: [
            { instruction: "Send a GET to https://pokeapi.co/api/v2/pokemon/pikachu" },
            { instruction: "Scroll through the response — count how many top-level fields there are", detail: "You'll find around 20+ fields: name, id, types, stats, sprites, abilities, moves, and more." },
            { instruction: "Now think: if your UI only needs name, sprite, and types — that's 3 fields out of 20+" },
            { instruction: "This is the REST tradeoff. GraphQL would let you request just those 3 fields and nothing else." },
            { instruction: "Open the types endpoint: GET https://pokeapi.co/api/v2/type/electric", detail: "This returns every electric-type Pokémon — but only names and URLs, no stats. You'd need to follow each URL for details." },
            { instruction: "That's the N+1 problem: one call for the list, then one call per Pokémon for details" },
          ],
          expectedOutput: "Pikachu's full response with 20+ fields. The type endpoint returns a list but no detail — you need extra calls.",
        },
        quiz: [
          {
            id: "2-5-q1",
            question: "A product feature needs to notify the user the instant a payment is confirmed. Which API pattern is best suited for this?",
            options: [
              "REST — poll the payments endpoint every 5 seconds",
              "GraphQL — query for the latest payment status",
              "REST DELETE — remove the pending payment and recreate it",
              "Webhook — have the payment service push a notification when it's done",
            ],
            correctIndex: 3,
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
    description: "Understand what databases are, how to read an ERD, and what database design means for your UI.",
    icon: "Database",
    chapters: [
      {
        id: "3-1",
        title: "The Spreadsheet Analogy",
        subtitle: "Databases are just organized spreadsheets",
        readTime: 4,
        narrative:
          "Your PM just asked you to save users' favourite Pokémon. Where does that data go? Not the API — that's someone else's data. Understanding what databases are and how they're structured will fundamentally change how you approach every data-heavy design.",
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

### A Designer's Role in Schema Design

You won't usually design the schema yourself — but you'll be in the room when it's discussed. The most useful question you can ask is: **"What data does the UI need to display?"**

That question directly shapes the columns engineers create. Every field on your screen maps to a column in a table. If you design a "trainer level" badge on a profile screen and there's no \`level\` column in the \`trainers\` table, that's a backend task — and it's better to surface it before the sprint starts.

:::tip
When planning a new feature, ask: what table does this data live in? If it doesn't exist yet, that's a schema change — flag it as a backend task before sprint planning.
:::`,
        exercise: {
          playgroundNote: "This is a planning exercise — run it to see the table design, then think about what columns your design would need.",
          errorHint: "Something went wrong with the code. Check for syntax errors in the object definition.",
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

console.log("\\n💡 Every column in this table maps to something visible in your UI.");`,
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
            title: "Database Design for Beginners",
            url: "https://www.youtube.com/watch?v=ztHopE5Wnpc",
            type: "video",
            description: "Visual introduction to database tables and relationships.",
          },
          {
            title: "dbdiagram.io",
            url: "https://dbdiagram.io",
            type: "interactive",
            description: "Free browser-based tool for drawing and reading database schemas. Great for visualising what your engineer shares with you.",
          },
        ],
      },
      {
        id: "3-2",
        title: "Reading an ERD",
        subtitle: "How to read the blueprint of any database",
        readTime: 5,
        narrative:
          "Your engineer sends you a diagram before the sprint. It has boxes, lines, and symbols. That's an ERD — an Entity Relationship Diagram — and it contains everything you need to know about what data exists and how it connects. You don't need to build one. You need to read one.",
        concepts: [
          "ERD",
          "Entity Relationship Diagram",
          "Primary Key",
          "Foreign Key",
          "Table relationships",
          "Schema reading",
        ],
        content: `## What Is an ERD?

An **Entity Relationship Diagram** is a visual blueprint of a database. Engineers draw them to plan data structure before writing a single line of code. As a designer, receiving one before a sprint is a gift — it tells you exactly what data exists and what's possible.

The diagram above shows the ERD for the Pokémon companion app, along with a legend explaining PK, FK, and crow's foot notation. Reading it:

- **trainers** has 4 columns: id (PK), username, avatar_url, created_at
- **team_pokemon** has 6 columns: id (PK), trainer_id (FK), pokemon_id, nickname, position, added_at
- The line from **trainers.id** → **team_pokemon.trainer_id** means: one trainer can have many Pokémon
- The crow's foot on the team_pokemon side shows the "many" end
- **badges** also has a FK pointing back to trainers — one trainer can earn many badges

### What to Look For as a Designer

When you receive an ERD, ask these questions:

**Does the data I need exist?**
If your design shows a trainer's avatar on a profile screen, check: is there an \`avatar_url\` column in the \`trainers\` table? If not, that's a column that needs to be added — a backend task to flag before the sprint.

**What's the shape of related data?**
If you're designing a screen that shows a trainer AND their team together, you're working with data from two tables. That's a join query. Flag it as more complex than a simple data fetch.

**What's impossible given this schema?**
If the schema has no \`wins\` or \`losses\` columns, you cannot design a battle record screen without a schema change. The ERD tells you what's buildable right now.

### Tools for Reading ERDs

Your team might share ERDs in various formats:
- **[dbdiagram.io](https://dbdiagram.io)** — browser-based, interactive, free
- **Lucidchart** — popular in enterprise teams
- **Figma** — some teams diagram databases in Figma alongside their UI
- **A screenshot in Notion** — the most common format in practice

You don't need to create these. You need to receive them, read them, and respond with: *"I see you have X and Y — but my design also needs Z. Is that in scope?"*

:::tip
Ask your engineering team to share the ERD for any feature you're designing. Fifteen minutes reading it will surface more constraints than a week of design review.
:::`,
        exercise: {
          readOnly: true,
          playgroundNote: "Reading exercise — refer to the ERD diagram at the top of this chapter to answer the questions in the Instructions tab.",
          starterCode: `// Refer to the ERD diagram above this chapter.
//
// Three tables: trainers, team_pokemon, badges
//
// Work through the questions in the Instructions tab.
// Click "Show Answers" in the hint when you're ready to check.`,
          solution: `// Answers:
//
// 1. Trainer Profile needs: username, avatar_url (from trainers table)
//    Plus team data from team_pokemon (joined via trainer_id FK)
//
// 2. The trainer_id foreign key in team_pokemon references id in trainers.
//    This is what links a Pokémon slot to its trainer.
//
// 3. Battle history is not in this schema.
//    There's no battles or match_history table.
//    This would require a new table — a backend change to flag before sprint.`,
          instructions: [
            "Study the ERD in the code panel. Find the trainers and team_pokemon tables.",
            "Question 1: A Trainer Profile screen shows username, avatar, bio, and team. Which tables do you need? Which columns?",
            "Question 2: What column connects team_pokemon back to its trainer? What type of key is it?",
            "Question 3: A PM asks for a battle history screen. Is this possible with the current schema? What would you flag?",
          ],
          hint: "For Q3: look for a battles or match_history table in the ERD. If it doesn't exist, that feature requires a new table — a backend change, not a frontend change.",
        },
        quiz: [
          {
            id: "3-2-q1",
            question: "An ERD shows a trainers table with a PK column called id, and a team_pokemon table with a column trainer_id marked FK. What does the FK tell you?",
            options: [
              "trainer_id stores the trainer's display name for reference",
              "trainer_id is automatically generated and doesn't need to be set",
              "team_pokemon rows are linked to a specific trainer — the FK value must match an id in trainers",
              "FK means the column is optional and can be left empty",
            ],
            correctIndex: 2,
            explanation:
              "A Foreign Key (FK) is a column that references the Primary Key of another table. trainer_id in team_pokemon must contain a valid id from the trainers table. This is what links a Pokémon to its trainer — and why deleting a trainer could affect their team data.",
          },
          {
            id: "3-2-q2",
            question: "You're designing a Trainer Profile screen showing username, avatar, and a 6-slot team grid. You receive the ERD. What's the first design question to answer from it?",
            options: [
              "Which database tool does the team use?",
              "Does the trainers table have username and avatar_url columns, and is team_pokemon linked via a FK?",
              "How many rows are currently in the trainers table?",
              "Whether the schema uses UUIDs or integers for primary keys",
            ],
            correctIndex: 1,
            explanation:
              "The first check is always: does the data I need actually exist in the schema? If username or avatar_url aren't columns in trainers, or if there's no FK linking team_pokemon to trainers, those are backend gaps to raise before the sprint starts.",
          },
        ],
        resources: [
          {
            title: "dbdiagram.io",
            url: "https://dbdiagram.io",
            type: "interactive",
            description: "Free browser-based ERD tool. Try creating the Pokémon schema yourself to solidify your reading skills.",
          },
          {
            title: "Entity Relationship Diagrams Explained (Lucidchart)",
            url: "https://www.youtube.com/watch?v=QpdhBUYk7Kk",
            type: "video",
            description: "Visual walkthrough of ERD notation, relationships, and how to read a diagram.",
          },
          {
            title: "What is an ERD? (Lucidchart guide)",
            url: "https://www.lucidchart.com/pages/er-diagrams",
            type: "article",
            description: "Plain-language guide to entity relationship diagrams with visual examples.",
          },
        ],
      },
      {
        id: "3-3",
        title: "CRUD: The Four Things You Can Do",
        subtitle: "How every UI action maps to a database operation",
        readTime: 5,
        narrative:
          "Every app in the world does four things with data: Create it, Read it, Update it, and Delete it. These four operations have a catchy name: CRUD. Understanding which operation your design requires is one of the most useful things you can tell an engineer.",
        concepts: [
          "CRUD",
          "Create",
          "Read",
          "Update",
          "Delete",
          "UI to data mapping",
        ],
        content: `## The Four Operations

Every feature you'll ever design maps to one of these four operations — **Create, Read, Update, Delete**. No exceptions. The diagram above shows each one with its HTTP method, database operation, UI triggers, screens to design, and a Pokémon example.

### Soft Deletes

One nuance worth knowing: not every "delete" actually removes data. In many systems, deletion sets a flag (like \`deleted_at\`) rather than destroying the row. This is a **soft delete** — the data still exists but is hidden. It's what makes "undo" and "restore from trash" possible. If your design includes an undo flow, ask the engineer if the delete is soft or hard.

### Why This Matters for Tickets

When you write a design ticket for an engineer, you can now include the database operation it implies. "This button creates a new saved_pokemon row" is more useful than "this button saves the Pokémon". It tells the engineer exactly what backend work is needed before they've read a line of code.

:::tip
Every button and form in your design maps to a CRUD operation. If you can name which one, your dev ticket is already clearer than most.
:::`,
        exercise: {
          readOnly: true,
          playgroundNote: "This is a mapping exercise — study the screen descriptions below and identify which CRUD operation each one requires.",
          starterCode: `// CRUD Mapping Exercise
// For each screen/action below, identify: Create, Read, Update, or Delete

const screens = [
  {
    screen: "Pokémon Team page — loads when user opens the app",
    action: "Displays all saved Pokémon in the user's team",
    crudOperation: "?",  // What operation is this?
  },
  {
    screen: "'Save to Team' button on a Pokémon detail page",
    action: "Adds this Pokémon to the user's saved team",
    crudOperation: "?",
  },
  {
    screen: "Nickname field — user types a custom name for their Pikachu",
    action: "Changes the nickname column for that specific Pokémon row",
    crudOperation: "?",
  },
  {
    screen: "'Release' button — removes a Pokémon from the team",
    action: "Permanently removes the row from the team_pokemon table",
    crudOperation: "?",
  },
];

// Answers are in the solution — check them after you've mapped each one.
screens.forEach(s => {
  console.log(\`Screen: \${s.screen}\`);
  console.log(\`Operation: \${s.crudOperation}\\n\`);
});`,
          solution: `const screens = [
  {
    screen: "Pokémon Team page — loads when user opens the app",
    action: "Displays all saved Pokémon in the user's team",
    crudOperation: "READ — fetches existing rows from team_pokemon",
  },
  {
    screen: "'Save to Team' button on a Pokémon detail page",
    action: "Adds this Pokémon to the user's saved team",
    crudOperation: "CREATE — inserts a new row into team_pokemon",
  },
  {
    screen: "Nickname field — user types a custom name for their Pikachu",
    action: "Changes the nickname column for that specific Pokémon row",
    crudOperation: "UPDATE — modifies an existing row's nickname column",
  },
  {
    screen: "'Release' button — removes a Pokémon from the team",
    action: "Permanently removes the row from the team_pokemon table",
    crudOperation: "DELETE — removes the row from team_pokemon",
  },
];

screens.forEach(s => {
  console.log(\`Screen: \${s.screen}\`);
  console.log(\`Operation: \${s.crudOperation}\\n\`);
});`,
          instructions: [
            "Study each screen description and decide: which CRUD operation does it require?",
            "Look at the crudOperation field — it currently says '?'. What would you fill in?",
            "Think about each screen's design implications: what states does a READ screen need that a CREATE screen doesn't?",
            "Run the code to see the answers, then check them against your own guesses.",
          ],
          hint: "If the action creates something that didn't exist before → Create. If it loads existing data → Read. If it changes existing data → Update. If it removes data → Delete.",
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
            title: "CRUD Explained (freeCodeCamp)",
            url: "https://www.freecodecamp.org/news/crud-operations-explained/",
            type: "article",
            description: "Clear, developer-friendly explanation of each CRUD operation with examples.",
          },
        ],
      },
      {
        id: "3-4",
        title: "Relationships: Tables That Talk",
        subtitle: "Connecting tables with foreign keys",
        readTime: 6,
        narrative:
          "Real apps have data that connects to other data. A trainer has Pokémon. A Pokémon has moves. Let's learn how tables relate to each other.",
        concepts: [
          "Foreign key",
          "One-to-many",
          "JOIN",
          "Related tables",
          "Normalization",
        ],
        content: `## How Tables Relate

In a real app, data doesn't live in a single table. A **Trainer** has many **Pokémon**. A **Pokémon** has many **moves**. These connections between tables are called **relationships** — and they're visible on the ERD as lines between boxes.

### One-to-Many: The Most Common Relationship

The diagram above shows this: one trainer can have many Pokémon, but each Pokémon belongs to only one trainer. The \`trainer_id\` foreign key in \`team_pokemon\` is what creates the link — it points back to the trainer's \`id\`. Remove it, and the database doesn't know which trainer owns which Pokémon.

### Many-to-Many: Where Design Gets Interesting

Some relationships are more complex. A Pokémon move can belong to many Pokémon, and each Pokémon can know many moves. That's **many-to-many**.

Many-to-many relationships require a **junction table** — a third table that sits between the two and holds the links. The diagram above shows this with \`pokemon_moves\` sitting between \`pokemon\` and \`moves\`.

This creates specific design challenges: how do you display a move that's shared across 50 Pokémon? What happens when a move is updated — do all Pokémon that know it show the new version? These questions belong in your design spec, not just in the backend.

### What This Means When You Design

**Profile pages** pull from multiple tables. A Trainer Profile shows data from \`trainers\` AND from \`team_pokemon\`. That's a join query — more complex than loading a single table, and worth flagging in the ticket.

**Lists and counters** often aggregate. A leaderboard showing "trainer name + number of Pokémon" needs to count rows in \`team_pokemon\` per trainer. If your design includes any kind of count, sum, or aggregated value, the query behind it is more involved.

**Deletions cascade.** If a trainer is deleted, what happens to their team? The database can be set up to automatically delete related rows (a "cascade"), or to block the deletion, or to leave orphaned rows. This is a design decision disguised as a backend concern — flag it when you spec a delete flow.

:::tip
If your design shows data that spans two entities (a trainer and their team, a user and their orders), ask to see the relationship in the ERD before you start designing the screen.
:::`,
        exercise: {
          readOnly: true,
          playgroundNote: "Design analysis exercise — refer to the relationship diagram at the top of this chapter.",
          starterCode: `// Refer to the diagram above this chapter.
//
// It shows two relationship types:
//   - One-to-many: trainers → team_pokemon
//   - Many-to-many: pokemon ↔ pokemon_moves ↔ moves
//
// Work through the questions in the Instructions tab.`,
          solution: `// Answers:
//
// 1. Leaderboard (trainer name + count):
//    - Needs data from both trainers (name) and team_pokemon (count per trainer)
//    - Requires a JOIN on trainer_id + an aggregate COUNT
//    - This is more complex than loading a single table — flag it in the ticket
//    - The query groups team_pokemon rows by trainer_id and counts them
//
// 2. Trainer account deletion:
//    - team_pokemon rows have a FK pointing to trainers
//    - Options: cascade (auto-delete team when trainer deleted),
//               restrict (block deletion if team rows exist),
//               set null (orphan the rows)
//    - Design implication: does your "delete account" flow need a
//      confirmation that shows "this will also delete your 6 saved Pokémon"?
//    - Answer: yes — cascade deletes should be surfaced in the UI
//
// 3. "Which trainers have the same Pokémon?":
//    - Possible with current schema — join team_pokemon rows by pokemon_id
//    - But it requires a more complex query (group by pokemon_id, find overlaps)
//    - Design problem: do you show this per-Pokémon or per-trainer?
//    - A "shared Pokémon" feature might warrant its own table for clarity`,
          instructions: [
            "Study the schema. Note that team_pokemon has a trainer_id FK — this is the link between the two tables.",
            "Question 1: A leaderboard shows trainer name and their Pokémon count. Which tables does this query touch? What makes it more complex than a simple page load?",
            "Question 2: A trainer deletes their account. What happens to their team_pokemon rows? What should your design communicate to the user before they confirm?",
            "Question 3: A PM wants to show 'which trainers have the same Pokémon'. Is this possible with the current schema? What design challenge does it create?",
          ],
          hint: "For Q2: think about cascade deletes. If a trainer row is removed and team_pokemon rows reference it, those rows become 'orphaned'. The database has to decide what to do — and your design should communicate the consequence to the user.",
        },
        quiz: [
          {
            id: "3-4-q1",
            question: "A trainer profile page shows the trainer's name, badge count, and their full Pokémon team. The data lives in two tables: trainers and team_pokemon. What connects them?",
            options: [
              "The trainer's name is stored in both tables so they can be matched",
              "A JOIN query reads both tables simultaneously into a single flat list",
              "The team_pokemon table has a trainer_id foreign key that references the id in trainers",
              "Supabase automatically links tables that share the same column names",
            ],
            correctIndex: 2,
            explanation:
              "A foreign key is a column in one table that points to the primary key of another. trainer_id in team_pokemon creates a permanent, enforced link to the trainers table. This is how the database knows which Pokémon belong to which trainer.",
          },
          {
            id: "3-4-q2",
            question: "You're designing a leaderboard that shows every trainer's name alongside how many Pokémon they've caught. The count lives in team_pokemon, the name lives in trainers. What does your query need to do?",
            options: [
              "Run two separate queries and merge the results in JavaScript",
              "Store the Pokémon count directly on the trainers table so you only need one query",
              "JOIN the two tables on trainer_id and aggregate the team_pokemon rows per trainer",
              "This isn't possible — related data always requires multiple round trips to the database",
            ],
            correctIndex: 2,
            explanation:
              "A JOIN combined with an aggregate (COUNT) is the standard pattern. In Supabase: .select('name, team_pokemon(count)'). One query, one response, no JavaScript merging required.",
          },
        ],
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
    description: "Understand OAuth, authenticated APIs, and how to read a ticket — the skills that make you a better design partner.",
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

1. **Your app** redirects the user to GitHub's login page
2. **User** logs in on GitHub and clicks "Allow" (granting permissions)
3. **GitHub** redirects back to your app with a temporary **code**
4. **Your app** exchanges that code for an **access token** (this happens server-side, invisibly)
5. **Your app** uses the token to make API calls on behalf of the user

The user never gives your app their GitHub password. They authenticate directly with GitHub, which hands you a scoped token instead.

### Scopes: What You're Asking Permission For

When you initiate the flow, you specify **scopes** — what access you need:

| Scope | What it allows |
|-------|---------------|
| \`read:user\` | Read the user's public profile data |
| \`repo\` | Read and write access to repositories |
| \`user:email\` | Read the user's email address |

Users see these scopes on GitHub's consent screen before approving. **Asking for more than you need erodes trust.** Request the minimum scope your feature actually requires.

### The UX Moments to Design

OAuth isn't just a backend concern — it introduces 6 distinct UX moments:

1. **"Connect GitHub" button** — the entry point. Design for trust: show what access you're requesting.
2. **Redirect to GitHub** — the user briefly leaves your app. Show a clear loading/redirect state.
3. **Consent screen** — this is GitHub's UI, but your app's scope request is displayed here.
4. **Redirect back** — the user returns. Show a connecting/loading state during token exchange.
5. **Connected state** — display confirmation (their avatar, username) and a "Disconnect" option.
6. **Token expired** — tokens don't last forever. Design a graceful re-authentication flow.

### Designing the Permission Moment

The consent screen is the most trust-sensitive moment in the OAuth flow. Users are deciding whether your app is worth granting access to. Several design decisions in your app affect whether they approve or abandon:

- **Clarity before the redirect:** Tell users exactly what you're asking for and why, in your own UI, before they hit GitHub's screen. "We need read access to your repos to show you contribution stats" is more trustworthy than a button that just says "Connect GitHub".
- **Minimum viable scope:** Only request what you genuinely need. If you only need to read a user's profile, don't request \`repo\` access — it looks suspicious.
- **The return state:** After OAuth completes, land the user somewhere that feels like progress, not a blank page.
- **The disconnect flow:** Always provide a way to revoke access. Users trust apps that let them leave.

:::tip
Whenever you're designing a "connect your account" or "sign in with X" flow, you're designing an OAuth experience. The consent screen is the most trust-sensitive moment — give it the same attention as your onboarding screens.
:::`,
        exercise: {
          playgroundNote: "This code maps out the OAuth flow as a data structure. Run it to walk through each step — no real OAuth is happening here, just the concept made visible.",
          errorHint: "Something went wrong with the object structure. Check for missing commas or closing brackets.",
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
            "Run the code to see the four-step OAuth flow laid out as a data structure",
            "Find step1.params.scope — this is what your app is requesting access to. What does 'read:user repo' mean?",
            "Find step4.headers — what does the 'Bearer' prefix tell GitHub, and where does this token come from?",
            "Think about the UX: which of the 6 moments listed in the chapter is represented by each step in the flow?",
          ],
          hint: "step3 (token exchange) happens server-side — the user never sees it. step2 (consent) is what users interact with. The Bearer token in step4 is the key that unlocks every subsequent API call.",
        },
        quiz: [
          {
            id: "4-1-q1",
            question: "Your team is building an app that lets users connect their GitHub account. A junior engineer suggests storing the user's GitHub password in your database so the app can log in on their behalf. What's the core problem with this approach?",
            options: [
              "If your database is breached, every user's GitHub credentials are exposed. OAuth gives your app a scoped token — not the password — so a breach only affects your app, not the user's entire GitHub account",
              "Passwords are too long to store efficiently in a relational database",
              "It would work fine as long as the database is encrypted at rest",
              "GitHub's Terms of Service require OAuth for all third-party apps",
            ],
            correctIndex: 0,
            explanation:
              "OAuth exists precisely to solve this problem. Users never share their password with your app. They authenticate directly with GitHub, which issues your app a scoped token. If that token leaks, GitHub can revoke it. A stolen password is much harder to fix.",
          },
          {
            id: "4-1-q2",
            question: "A user clicks 'Connect GitHub' in your app. GitHub redirects them back to /api/github/callback?code=abc123. What must your server do with that code, and why does this have to happen server-side rather than in the browser?",
            options: [
              "Store the code in localStorage and attach it to future API requests as an auth header",
              "The code is the access token — pass it directly in Authorization headers going forward",
              "Redirect the user back to GitHub with the code to retrieve their profile data",
              "Exchange the code for an access token via a server-side POST to GitHub, using your client secret. The secret must never appear in browser code — anyone opening DevTools could steal it",
            ],
            correctIndex: 3,
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

Most APIs beyond simple public ones (like PokeAPI) require authentication. The most common method is a **Bearer token** — a string you include in every request header.

### What a Token Does

A Bearer token tells the API: *"This request is coming from a trusted user who has already been verified."*

Without a token: \`401 Unauthorized\`
With a valid token: \`200 OK\` + your data

Every authenticated API uses the same header pattern, though the exact format varies:

| API | Header format |
|-----|--------------|
| GitHub | \`Authorization: Bearer YOUR_TOKEN\` |
| Stripe | \`Authorization: Bearer sk_live_...\` |
| Supabase | \`apikey: YOUR_ANON_KEY\` |
| PokeAPI | No auth needed (public) |

### Rate Limits: The Design Implication

Authenticated APIs often have different rate limits depending on whether you're logged in:

- **GitHub unauthenticated:** 60 requests/hour
- **GitHub authenticated:** 5,000 requests/hour

This matters for design. If you're building a feature that makes many API calls (a dashboard that fetches 20 repos), you need to be aware of limits. Design patterns like pagination, lazy loading, and caching exist partly to manage rate limits gracefully.

### When Data Needs to Persist

Fetching from an API gives you data for the moment. But what if the user wants to see that data tomorrow, or offline?

The pattern is: **fetch → transform → save → display**.

1. **Fetch** the data from the API (live, network dependent)
2. **Transform** it — pick only the fields your UI needs
3. **Save** it to your own database
4. **Display** from the database (fast, offline-capable, stable)

This is why Instagram can show you posts even when you first open the app on slow connections — they've already fetched and cached the recent feed. The API isn't called every time you scroll.

**For designers:** if a feature needs to work offline, show historical data, or load instantly — it needs persistence. That's a backend conversation to have early.

:::tip
If a feature shows user-specific data, confirm early: is there an authenticated endpoint for it? Who manages the token lifecycle? These questions prevent late-stage blockers.
:::`,
        postmanExercise: {
          method: "GET",
          url: "https://api.github.com/users/octocat",
          steps: [
            { instruction: "Send a GET to https://api.github.com/users/octocat" },
            { instruction: "Explore the response — public repos, followers, avatar URL, bio" },
            { instruction: "Change \"octocat\" to your own GitHub username and send again" },
            { instruction: "Now try: GET https://api.github.com/users/octocat/repos", detail: "This returns their public repositories. Notice each repo has its own fields." },
            { instruction: "Check the response headers for X-RateLimit-Remaining", detail: "GitHub limits unauthenticated requests to 60/hour. With a token it's 5,000/hour." },
          ],
          expectedOutput: "A JSON profile with name, avatar_url, public_repos count, and more. No authentication needed for public data.",
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
        title: "Reading a Ticket as a Designer",
        subtitle: "From Jira ticket to design questions",
        readTime: 5,
        narrative:
          "Engineering has written a ticket. It has an endpoint, a payload, and acceptance criteria. You've been added for design review. Here's how to read it, what to look for, and what to flag before anyone writes a line of code.",
        concepts: [
          "API ticket anatomy",
          "Endpoint",
          "Acceptance criteria",
          "Data states",
          "Design review",
          "Gap analysis",
        ],
        content: `## Reading a Ticket as a Designer

The diagram above breaks down a real API ticket — each part labelled with the design question you should ask. The review checklist at the bottom is your pre-sprint tool. Refer back to it whenever you're added to a ticket.

The ticket in the example is **reasonable but incomplete from a design perspective.** Most tickets are. Your job is to find the gaps before development starts. Here's the thinking:

## The Gaps Most Tickets Miss

### Missing fields

The response has \`name\` and \`sprite\` — but if your design shows a **type badge** (fire, water, electric), that field isn't in the response. Either the API needs updating, or the type must be fetched separately. Compare every field in your design against the response shape.

### Empty state ambiguity

The acceptance criteria says nothing about what happens when \`pokemon\` is an empty array \`[]\`. Does it return a 200 with an empty array, or a 404? Your design's empty state depends on this answer. Flag it.

### Missing data states

If the acceptance criteria only mentions the success case, the loading, error, and empty states are unspecified. That means an engineer will invent them — or skip them entirely.

### The N+1 problem

An N+1 problem is when loading one screen requires one initial request plus N additional requests — one per item.

Example: the endpoint above returns a list of Pokémon. But if your design shows each Pokémon's **full stats** (HP, Attack, Defense), you'd need to call \`GET /pokemon/{id}\` for each one — that's 6 more calls to show a 6-Pokémon team. An engineer might not flag this unless your design surfaces it.

---

Use the checklist in the diagram above as your pre-sprint tool. One design review conversation before development starts is worth ten rounds of revision after.

:::tip
The best time to run a design review on a ticket is before the sprint starts. One hour with the spec, the API response, and the schema is worth ten hours of revision after development begins.
:::`,
        exercise: {
          readOnly: true,
          playgroundNote: "Study the ticket below and answer the design review questions in the Instructions panel.",
          starterCode: `// Engineering Ticket: Trainer Profile Screen
//
// Story: As a user, I can view my trainer profile showing
//        my username, avatar, and saved Pokémon team.
//
// Endpoint: GET /api/trainers/{trainerId}
//
// Response shape:
// {
//   "id": "abc123",
//   "username": "AshKetchum",
//   "pokemon": [
//     {
//       "id": 25,
//       "name": "pikachu",
//       "nickname": "Sparky",
//       "position": 1
//     }
//   ]
// }
//
// Acceptance criteria:
// - Returns trainer data with their saved Pokémon
// - Returns 404 if trainer not found
//
// -------------------------------------------------------
// Design spec shows:
// - Trainer avatar image
// - Username
// - Pokémon type badges (fire, electric, etc.)
// - Pokémon sprites/images
// - Empty state: "Your team is empty. Start exploring!"
// -------------------------------------------------------
//
// Run the code to print the ticket, then answer the
// questions in the Instructions tab.

const ticket = {
  endpoint: "GET /api/trainers/{trainerId}",
  responseFields: ["id", "username", "pokemon[].id", "pokemon[].name", "pokemon[].nickname", "pokemon[].position"],
  acceptanceCriteria: ["Returns trainer data with saved Pokémon", "Returns 404 if trainer not found"],
  designRequires: ["avatar image", "username", "type badges", "sprites", "empty state"],
};

console.log("Ticket fields:", ticket.responseFields.join(", "));
console.log("Design requires:", ticket.designRequires.join(", "));
console.log("\\nWhich design requirements are missing from the response?");`,
          solution: `// Missing from response vs design requirements:
//
// 1. avatar_url — the design shows an avatar image but
//    the response has no avatar_url field.
//    Fix: add avatar_url to the trainers table + response.
//
// 2. sprite (pokemon image) — response has pokemon[].id and name
//    but no sprite URL. The design shows Pokémon images.
//    Fix: add sprite_url to team_pokemon table + response,
//    OR fetch from PokeAPI as a second call per Pokémon.
//
// 3. type badges — response has no types field.
//    Fix: same as sprites — add to DB or fetch from PokeAPI.
//
// 4. Empty state — acceptance criteria says nothing about
//    pokemon[] being empty. Does it return 200 + [] or 404?
//    The empty state copy "Your team is empty. Start exploring!"
//    requires a 200 response to show correctly.
//    Flag: add acceptance criterion for empty team case.
//
// 5. Loading state — no mention in the ticket at all.
//    Flag: confirm loading state is in the design spec.

const gaps = [
  "avatar_url missing from response",
  "sprite URLs missing from response",
  "types/type badges missing from response",
  "empty pokemon[] case not specified in acceptance criteria",
  "loading state not mentioned in ticket",
];

console.log("\\nDesign review gaps found:");
gaps.forEach((gap, i) => console.log(\`  \${i + 1}. \${gap}\`));`,
          instructions: [
            "Read the ticket carefully — note what the response includes and what the design spec requires.",
            "Gap 1: The design shows a trainer avatar. Is avatar_url in the response? What do you flag?",
            "Gap 2: The design shows Pokémon type badges and sprites. Are those fields in the response?",
            "Gap 3: The acceptance criteria covers 404 — but what happens when pokemon[] is empty? What copy shows?",
            "Run the solution to see a complete gap analysis. How many issues would you have caught before sprint?",
          ],
          hint: "Compare each item in 'Design spec shows' against the response fields. Anything in the design that doesn't have a matching field in the response is a gap to raise before development starts.",
        },
        quiz: [
          {
            id: "4-3-q1",
            question: "A ticket says GET /teams/{id} returns { name, pokemon[] }. Your design shows a 'No team yet — start exploring' empty state. What's missing from the ticket?",
            options: [
              "The endpoint URL format is wrong — it should use query params, not path params",
              "The response needs a 'total' field to know if pokemon[] is empty",
              "The acceptance criteria doesn't specify what happens when pokemon[] is empty — does it return 200 + [] or 404? The empty state design depends on this",
              "Empty states are a frontend concern and don't need to be in the ticket",
            ],
            correctIndex: 2,
            explanation:
              "The acceptance criteria only covers the success case and the 404. An empty team (pokemon[] = []) is a valid state that needs explicit handling. If the API returns 404 for an empty team, your empty state design breaks — it'd show an error screen instead. Always specify the empty array behaviour in your design review.",
          },
          {
            id: "4-3-q2",
            question: "A ticket spec says GET /pokemon/{id} returns { name, types, stats }. Your design shows a Pokémon sprite/avatar. What problem do you flag before the sprint?",
            options: [
              "The HTTP method should be POST for fetching individual resources",
              "types is an array and your design can't render arrays",
              "The response doesn't include a sprite URL field — the design requires an image that isn't in the spec. Either the response needs updating or the design needs changing",
              "stats is too much data — the response should be simplified",
            ],
            correctIndex: 2,
            explanation:
              "The response includes name, types, and stats — but no image/sprite URL. Your design shows an avatar. Either the engineer needs to add sprite_url to the response, or your design needs to use something else. Catching this before development starts is worth an entire sprint of rework.",
          },
        ],
        resources: [
          {
            title: "Writing Good Acceptance Criteria (Atlassian)",
            url: "https://www.atlassian.com/agile/project-management/acceptance-criteria",
            type: "article",
            description: "How to write and review acceptance criteria that cover edge cases — useful when reviewing tickets as a designer.",
          },
          {
            title: "The Four States of UI (UX Collective)",
            url: "https://uxdesign.cc/the-four-states-of-ui-84241eddc942",
            type: "article",
            description: "A reminder of all four data states that every API-driven screen needs designed.",
          },
        ],
      },
      {
        id: "4-4",
        title: "API Mocking for Design Sprints",
        subtitle: "Test your UI without waiting for the backend",
        readTime: 6,
        narrative:
          "You've reviewed the ticket, flagged the gaps, and asked your questions. The engineer goes off to build it — and says it'll be ready in two weeks. Your sprint ends Friday. Now what? You mock it. Mocking lets you test a fully interactive UI against fake data right now. By the time the real API is ready, your design has already been tested, iterated, and signed off.",
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

Design teams that mock properly never ship with untested empty or error states. They're easy to trigger in a mock — so there's no excuse not to design them.

:::tip
If you're waiting on the backend to test a design, you don't have to wait. Mock it, test all four states, get sign-off — then swap in the real API when it's ready.
:::`,
        exercise: {
          playgroundNote: "Change 'success' to 'empty' or 'error' on the mockFetch line to test the other states — that's exactly what mocking is for.",
          errorHint: "That error was intentional! Change the state string back to 'success' to see working data again.",
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
              "Build a mock API that returns fake data so you can test all four states now",
              "Use static screenshots to simulate the different states",
              "Wait for the real API before testing any UI interactions",
              "Ask engineering to prioritise the API above other work",
            ],
            correctIndex: 0,
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
    title: "Putting It All Together",
    description: "Apply everything you've learned to audit a real design spec — then see where this fluency takes you next.",
    icon: "Trophy",
    chapters: [
      {
        id: "5-1",
        title: "Design Audit Capstone",
        subtitle: "You've got the spec, the API, and the schema. Spot what's missing.",
        readTime: 8,
        narrative:
          "Real design handoffs don't come with clean, complete specs. They come with partial designs, rough API responses, and database schemas that almost match the UI. Your job is to close the gap before a developer starts building. Let's practice.",
        concepts: [
          "Design audit",
          "Gap analysis",
          "Data states",
          "API response review",
          "Schema review",
          "Pre-sprint checklist",
        ],
        content: `## The Design Audit

This isn't a quiz. It's the kind of thinking your engineering team needs from you before sprint planning.

Real handoffs are messy. The design was done without a confirmed API spec. The schema was roughed in without checking the design. And nobody noticed the gaps — until development started and things didn't fit.

Your job as a design-fluent designer is to catch those gaps first.

---

## The Three Artefacts

Every feature handoff involves three things. Here they are for a "My Team" screen:

### Artefact 1: The Design Spec

The screen shows:
- Trainer name and avatar image at the top
- A 6-slot team grid, each slot showing:
  - Pokémon sprite (image)
  - Pokémon name
  - Type badge (coloured chip: fire = red, water = blue, grass = green)
- An empty state: *"Your team is empty. Find your first Pokémon →"*
- A loading skeleton while the team fetches

### Artefact 2: The API Response

\`GET /api/teams/{trainerId}\` returns:
\`\`\`json
{
  "trainer_id": "abc123",
  "username": "AshKetchum",
  "pokemon": [
    {
      "id": 25,
      "name": "pikachu",
      "nickname": "Sparky",
      "position": 1
    }
  ]
}
\`\`\`

### Artefact 3: The Database Schema

\`\`\`
trainers:      id, username, created_at
team_pokemon:  id, trainer_id (FK), pokemon_id, nickname, position, added_at
\`\`\`

---

## Task 1: Data States Audit

List every state this screen needs designed. Don't just say "loading" and "success" — go through each element.

| State | What triggers it | What the design should show |
|-------|-----------------|----------------------------|
| Loading | Team fetch in progress | Skeleton grid of 6 slots |
| Success (full team) | 1-6 Pokémon returned | Grid with sprites, names, type badges |
| Success (empty team) | pokemon[] returns [] | Empty state message + CTA |
| Success (partial team) | 1-5 Pokémon | Filled slots + empty slot placeholders |
| Error (401) | User not logged in | Redirect to login or auth prompt |
| Error (404) | Trainer ID not found | "Something went wrong" + retry |
| Error (500) | Server failure | Friendly error + retry |

Count how many states there are. Now ask: how many are in the design?

---

## Task 2: Gap Analysis

Compare the design spec against the API response. Find what's missing.

**Gap 1: Avatar image**
The design shows the trainer's avatar at the top. Check the API response — is \`avatar_url\` in there? It isn't. The response has \`username\` but no image. Either the API needs updating, or the design needs to change.

**Gap 2: Pokémon sprites**
Each slot in the team grid shows a Pokémon image. The API response has \`name\` and \`id\` — but no \`sprite_url\`. This means either:
- A second API call to PokeAPI is needed per Pokémon (N+1 problem — flag it)
- Or the \`sprite_url\` should be stored in \`team_pokemon\` and returned in the response

**Gap 3: Type badges**
The design shows coloured type badges. The API response has no \`types\` field at all. Same issue as sprites — types need to come from somewhere.

**Gap 4: Colour mapping**
Even if we get the type name ("fire"), the badge is red. That colour-to-type mapping isn't in the API or the database — it lives in the frontend. This needs to be a frontend data file, not an API call. Worth noting in your design spec.

---

## Task 3: Eng Sync Questions

Write the two questions you'd bring to the next sprint planning session.

Good questions to raise from this audit:

1. *"The design shows trainer avatars and Pokémon sprites — neither are in the current API response. Can we add \`avatar_url\` to the trainers table and \`sprite_url\` to team_pokemon, or are we fetching sprites from PokeAPI per Pokémon?"*

2. *"What does the endpoint return when \`pokemon[]\` is empty — a 200 with an empty array, or a 404? The empty state copy depends on getting a 200."*

---

## The Payoff

You just caught five issues before any code was written:
1. Missing avatar_url in response
2. Missing sprite_url in response
3. Missing types in response
4. N+1 risk if sprites come from PokeAPI
5. Empty team state undefined in the spec

Each of these, found in development, would be a conversation, a ticket, a delay, and potentially a design revision. Found in the audit? It's a 10-minute Slack thread.

**That's what this course was for.**

:::tip
The best time to run a design audit is before the sprint starts. One hour with the spec, the API response, and the schema is worth ten hours of revision after development begins.
:::`,
        exercise: {
          readOnly: true,
          playgroundNote: "Work through the three audit tasks described in the chapter. This exercise shows you the artefacts as structured data.",
          starterCode: `// Design Audit: My Team Screen
//
// The three artefacts:

const apiResponse = {
  trainer_id: "abc123",
  username: "AshKetchum",
  // Note: no avatar_url
  pokemon: [
    { id: 25, name: "pikachu", nickname: "Sparky", position: 1 },
    { id: 6, name: "charizard", nickname: null, position: 2 },
    // Note: no sprite_url, no types
  ]
};

const databaseSchema = {
  trainers: ["id", "username", "created_at"],  // no avatar_url
  team_pokemon: ["id", "trainer_id", "pokemon_id", "nickname", "position", "added_at"]
  // no sprite_url, no types
};

const designRequires = [
  "trainer avatar image",
  "trainer username",
  "pokemon sprite (image)",
  "pokemon name",
  "pokemon type badge",
  "empty state when no pokemon",
  "loading skeleton",
];

// Run this to see the gap analysis:
console.log("=== Gap Analysis ===\\n");
const responseFields = ["trainer_id", "username", "pokemon[].id", "pokemon[].name", "pokemon[].nickname", "pokemon[].position"];

designRequires.forEach(requirement => {
  const covered = responseFields.some(f => requirement.toLowerCase().includes(f.split(".").pop() || ""));
  const status = covered ? "✓ covered" : "✗ MISSING from response";
  console.log(\`\${status}: \${requirement}\`);
});`,
          solution: `// Full gap analysis with questions for eng sync

const gaps = [
  {
    missing: "trainer avatar image",
    where: "Not in API response or schema",
    fix: "Add avatar_url to trainers table + include in GET /teams response",
  },
  {
    missing: "pokemon sprite (image)",
    where: "Not in API response or team_pokemon schema",
    fix: "Option A: add sprite_url to team_pokemon + response. Option B: fetch from PokeAPI per pokemon (N+1 — flag this).",
  },
  {
    missing: "pokemon type badge",
    where: "Not in API response",
    fix: "Option A: add types[] to team_pokemon + response. Option B: fetch types from PokeAPI per pokemon.",
  },
  {
    missing: "empty state when no pokemon",
    where: "Acceptance criteria doesn't define empty array behaviour",
    fix: "Confirm: does empty team return 200 + [] or 404? Empty state copy needs a 200.",
  },
  {
    missing: "type badge colour mapping",
    where: "fire=red, water=blue — not in API or DB",
    fix: "Frontend data file. Not an API concern. Note in design spec.",
  },
];

console.log("=== Pre-Sprint Gap Report ===\\n");
gaps.forEach((g, i) => {
  console.log(\`Gap \${i + 1}: \${g.missing}\`);
  console.log(\`  Where: \${g.where}\`);
  console.log(\`  Fix: \${g.fix}\\n\`);
});

console.log("Questions for eng sync:");
console.log("  1. Can we add avatar_url and sprite_url to the response?");
console.log("  2. Does empty pokemon[] return 200+[] or 404?");`,
          instructions: [
            "Read the three artefacts in the code: the API response, the schema, and what the design requires.",
            "Task 1: Count how many data states the design needs. Is each one mentioned in the artefacts?",
            "Task 2: Compare designRequires against the API response fields. What's in the design that isn't in the response?",
            "Task 3: Write two questions you'd raise in sprint planning based on what you found.",
            "Run the solution to see the full gap analysis — how many did you catch on your own?",
          ],
          hint: "Look at designRequires line by line. For each item, ask: does the API response contain a field that maps to this? If not — that's a gap. Check the schema too: if it's not in the database, it can't be in the response.",
        },
        quiz: [
          {
            id: "5-1-q1",
            question: "The design shows type badges with colour coding (fire = red, water = blue). You check the API response — types[0].type.name returns 'fire' but there's no colour field. Where does the colour come from, and what do you note in your spec?",
            options: [
              "Request a new API endpoint that returns type colours from the backend",
              "Add a type_colour column to the team_pokemon table",
              "The colour mapping lives in the frontend — it's a static file mapping type names to hex codes. Note in the spec that this is a frontend concern, not an API field",
              "Use the type's national Pokédex number modulo 18 to derive a colour deterministically",
            ],
            correctIndex: 2,
            explanation:
              "Type colours are a presentation concern — they map a type name (a string) to a brand colour. This belongs in a frontend constants file, not a database column or API field. Noting this in your design spec prevents a confused engineer from adding an unnecessary column.",
          },
          {
            id: "5-1-q2",
            question: "The design shows a trainer avatar. The API response has username but no avatar_url. The database schema shows trainers(id, username, created_at). What do you raise before the sprint?",
            options: [
              "Nothing — the engineer will notice the missing field themselves during development",
              "Ask the designer to remove the avatar from the design since it's not in the API",
              "Flag that avatar_url needs to be added to the trainers table and included in the API response — note it as a backend change required before this feature can ship",
              "Use the username to generate a letter-based avatar entirely in the frontend",
            ],
            correctIndex: 2,
            explanation:
              "The design requires data that doesn't exist yet. avatar_url needs to be added to the schema and returned in the API response. This is a backend change — and catching it before the sprint means it can be planned properly, not discovered mid-development when design revisions are expensive.",
          },
        ],
        resources: [
          {
            title: "PokeAPI Documentation",
            url: "https://pokeapi.co/docs/v2",
            type: "docs",
            description: "Explore the full PokeAPI response shapes to practice reading real API responses.",
          },
          {
            title: "Designing for the API (Smashing Magazine)",
            url: "https://www.smashingmagazine.com/2012/10/designing-the-be-api/",
            type: "article",
            description: "How designers and engineers can collaborate on API contracts before development starts.",
          },
        ],
      },
      {
        id: "5-2",
        title: "What's Next",
        subtitle: "Where API fluency takes you from here",
        readTime: 5,
        narrative:
          "You started this course asking 'what even is an API?' You're finishing it knowing how to read a response, review a ticket, audit a spec, and have informed conversations with your engineering team. That's a real shift.",
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
- **Databases** are structured storage: tables, rows, relationships, and schemas you can read
- **CRUD** maps to UI: Create→form submit, Read→page load, Update→edit flow, Delete→confirmation
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

**You belong in those conversations.**

:::tip
The concepts you've learned here — requests, responses, schemas, states, auth — are the same concepts behind every AI agent, every API-first product, and every engineering conversation you'll have from here on.
:::`,
        exercise: {
          playgroundNote: "This code shows the structure of a real Claude API request. Run it to see the annotated output — no actual AI call is made, just the pattern made visible.",
          errorHint: "Something went wrong with the object structure. Check for missing brackets or commas in the request body.",
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
              "It's a POST request with the user's team data in the messages array. The response.content[0].text is the suggestion. Same auth, same headers, same JSON pattern as every other API in this course",
              "It requires a completely different tech stack — LLM APIs don't work like regular REST APIs",
              "LLM responses are too unpredictable to rely on for product features",
              "You'd need to fine-tune a model on Pokémon data before it could give useful suggestions",
            ],
            correctIndex: 0,
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

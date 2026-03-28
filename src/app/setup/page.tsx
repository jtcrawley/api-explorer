"use client";

import Sidebar from "@/components/navigation/Sidebar";
import Card from "@/components/ui/Card";

export default function SetupPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="md:ml-72 flex-1 min-h-screen p-12">
        <div className="max-w-3xl mx-auto prose-custom">
          <h1>Setup Guide</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Modules 1–4 work completely offline — no setup needed. When you
            reach Module 3, you can optionally connect Supabase to persist your
            data to a real database.
          </p>

          {/* Supabase */}
          <Card className="my-8">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  backgroundColor: "var(--success-light)",
                  color: "var(--success)",
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2}/>
                  <path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
              </div>
              <div>
                <h2 className="!mt-0 !mb-0">Supabase (PostgreSQL)</h2>
                <p className="text-xs !mb-0" style={{ color: "var(--text-tertiary)" }}>
                  Optional — needed for Module 3 (Databases)
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              <div>
                <h3 className="!mt-0">Step 1: Create Account</h3>
                <p>
                  Go to{" "}
                  <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                    supabase.com
                  </a>{" "}
                  and sign up for a free account.
                </p>
              </div>

              <div>
                <h3>Step 2: Create a Project</h3>
                <p>
                  Click &quot;New Project&quot;, name it &quot;api-explorer&quot;, pick a password, and choose a region close to you.
                </p>
              </div>

              <div>
                <h3>Step 3: Get Your Keys</h3>
                <p>
                  Go to <strong>Settings → API</strong>. Copy the <strong>Project URL</strong> and <strong>anon/public key</strong>.
                </p>
              </div>

              <div>
                <h3>Step 4: Add to Environment</h3>
                <p>Create a file called <code>.env.local</code> in the project root:</p>
                <pre className="code-block"><code className="block p-4">{`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}</code></pre>
              </div>

              <div>
                <h3>Step 5: Create Tables</h3>
                <p>Go to the <strong>SQL Editor</strong> in Supabase and run:</p>
                <pre className="code-block"><code className="block p-4">{`CREATE TABLE saved_pokemon (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pokemon_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  sprite_url TEXT,
  types TEXT[],
  saved_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id TEXT NOT NULL UNIQUE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ
);

CREATE TABLE quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  selected_answer TEXT,
  correct BOOLEAN
);`}</code></pre>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

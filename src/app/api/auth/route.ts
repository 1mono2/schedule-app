import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const app = new Hono();

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Handle both GET and POST requests for auth callback
app.get('/api/auth/callback', async (c) => {
  const requestUrl = new URL(c.req.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    cookies(); // Initialize cookie store for session management
    await supabase.auth.exchangeCodeForSession(code);
    return c.redirect('/');
  }
  
  return c.json({ error: 'No code provided' }, 400);
});

app.post('/api/auth/callback', async (c) => {
  const { code } = await c.req.json();
  
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return c.json({ success: true });
  }
  
  return c.json({ error: 'No code provided' }, 400);
});

export const GET = handle(app);
export const POST = handle(app);

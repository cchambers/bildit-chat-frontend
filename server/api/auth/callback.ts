import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);
  const code = `${query.code}`;
  const next = `${query.next}`;

  const { data } = await client.auth.exchangeCodeForSession(code);
  await sendRedirect(event, next, 302);
});

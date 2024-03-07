import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import { LocalStorage } from "node-localstorage";

let localStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
  localStorage = new LocalStorage("./");
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

// export const User = async (query) => {
//   try {
//     let { data: user, error } = await supabase
//       .from("profiles")
//       .select(`*, metrics (*)`)
//       .eq("discord_id", query)
//       .limit(1)
//       .single();
//     if (error) console.log(error);
//     return user;
//   } catch (error) {
//     console.log("ERROR:", error);
//   }
// };

// export const Histories = async (query, startAt = 0, limit = 100) => {
//   try {
//     const obj = {
//       cid: query,
//       limit_int: limit,
//       offset_int: startAt,
//     };

//     let { data: histories, error } = await supabase.rpc(
//       "get_histories_no_preloads",
//       obj
//     );

//     if (error) console.log(error);

//     let { data: campaign, error: err } = await supabase
//       .from("campaigns")
//       .select(`id, note, thinking, constraints`)
//       .eq("id", query)
//       .single();
//     if (err) console.log(err);
//     return {
//       histories: histories,
//       campaign: campaign,
//     };
//   } catch (err) {
//     console.log("ERROR:", err);
//   }
// };

// export const Campaign = async (query) => {
//   try {
//     let { data: campaign, error } = await supabase
//       .from("campaigns")
//       .select(
//         `
//       *,
//       story (*),
//       outline (*),
//       actors (
//         *,
//         characters (*)
//       )
//     `
//       )
//       .eq("channel", query)
//       .limit(1)
//       .single();
//     if (error) console.log(error);
//     return campaign;
//   } catch (error) {
//     console.log("ERROR:", error);
//   }
// };

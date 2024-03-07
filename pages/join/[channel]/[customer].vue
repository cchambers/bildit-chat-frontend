<script setup>
const route = useRoute();
const { channel, customer } = route.params;
const supabase = inject("supabaseClient");
// check if channel exists

const getData = async () => {
  // see if user exists, if not make one
  let userid;
  const { data: exists, error: cerror } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", customer)
    .single();
  if (cerror) {
    console.log("c", cerror);
  }

  if (!exists) {
    console.log("Customer does not exist");
    // if doesn't exist, create customer
    const { data: newCustomer, error: newError } = await supabase
      .from("customers")
      .insert({
        user_id: customer,
      })
      .select("*")
      .single();

    if (newError) {
      console.log("ne", newError);
      return;
    }
    if (newCustomer) userid = newCustomer.id;
  } else {
    console.log("Customer exists");
    userid = exists.id;
  }

  // see if channel exists
  const { data: ch, error } = await supabase
    .from("channels")
    .select("id")
    .eq("channel", channel)
    .eq("customer", userid)
    .single();
  if (error) {
    console.log("ch", error);
  }
  if (ch) {
    navigateTo(`/chat/${ch.id}`);
  } else {
    const { data: makeChannel, error: cherror } = await supabase
      .from("channels")
      .insert({
        customer: userid,
        channel: channel,
      })
      .select("id")
      .single();

    if (cherror) {
      console.log("make", cherror);
      return;
    }

    if (makeChannel) {
      navigateTo(`/chat/${makeChannel.id}`);
    }
  }
};
getData();
</script>
<template>
  <div></div>
</template>

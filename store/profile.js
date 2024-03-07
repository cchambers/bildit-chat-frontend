import { defineStore } from "pinia";

export const useProfileStore = defineStore("profileStore", () => {
  const data = ref({ name: "test" });

  const updateProfile = async (p) => {
    data.value = { ...p };
  };
  return { updateProfile, data };
});

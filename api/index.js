import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// get the base url from the .env file
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = "http://rest-api.test/api/v1/";

export default function useColumn() {
  const columns = ref([]);
  const column = ref([]);
  const errors = ref({});
  const router = useRouter();

  const getSkills = async () => {
    const response = await axios.get("skills");
    columns.value = response.data.data;
  };

  const getcolumn = async (id) => {
    const response = await axios.get("skills/" + id);
    column.value = response.data.data;
  };

  const storeColumn = async (data) => {
    try {
      await axios.post("skills", data);
      await router.push({ name: "Home" });
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const updateColumn = async (id) => {
    try {
      await axios.put("skills/" + id, column.value);
      await router.push({ name: "Home" });
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const destroySkill = async (id) => {
    if (!window.confirm("Are You Sure?")) {
      return;
    }
    await axios.delete("skills/" + id);
    await getSkills();
  };

  return {
    column,
    columns,
    getcolumn,
    getSkills,
    storeColumn,
    updateColumn,
    destroySkill,
    errors,
  };
}
import { ref } from "vue";
import axios from "axios";

class AsyncData {
    constructor() {
        this.data = ref(null);
        this.isLoaded = ref(false);
        this.isLoading = ref(false);
        this.isError = ref(false);
        this.errorMessage = ref(null);
    }

    static create() {
        return new AsyncData();
    }

    async load(url) {
        this.loading();

        try {
            const response = await axios.get(url);
            this.data.value = response.data;
            this.loaded();

            return response
        } catch (error) {
            this.failed(error);

            return Promise.reject(error);
        }
    }

    loaded() {
        this.isLoaded.value = true;
        this.isLoading.value = false;
        this.isError.value = false;
        this.errorMessage.value = null;
    }

    loading() {
        this.isLoading.value = true;
        this.isLoaded.value = false;
        this.isError.value = false;
        this.errorMessage.value = null;
    }

    failed(error) {
        this.isLoading.value = false;
        this.isLoaded.value = false;
        this.isError.value = true;
        this.errorMessage.value = error.message || "An unknown error occurred";

        throw error;
    }

    refresh() {
        this.loading();

        return this.load();
    }
}

export default AsyncData;

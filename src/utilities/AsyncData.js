import { ref } from "vue";
import axios from "axios";

class AsyncData {
    url = null;

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

        url = url || this.url;

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

    loadFrom(url){
        this.url = url;

        return this;
    }

    async refresh(url) {
        url = url || this.url;

        try {
            const response = await axios.get(url);
            this.data.value = response.data;

            return response
        } catch (error) {
            this.failed(error);

            return Promise.reject(error);
        }
    }

    reload(url){
        this.loading();

        return this.load(url);
    }
}

export default AsyncData;

import {ref} from "vue";
import axios from 'axios'

export default class AutoComplete {
    exclude = null
    inProgress = ref(false)
    abortController = null
    onCompleteCallback = null
    onSelectCallback = null
    options = ref([])
    minimumCharacters = 0

    constructor(path) {
        this.path = path
    }

    static create(path) {
        return new AutoComplete(path)
    }

    toExclude(callback) {
        this.exclude = callback

        return this
    }

    async search(query) {
        if (
            query &&
            this.minimumCharacters &&
            query.length < this.minimumCharacters
        ) {
            this.options.value = []

            return
        }

        // Abort the previous request if it is still in progress
        if (this.abortController) {
            this.abortController.abort()
        }

        this.inProgress.value = true
        this.abortController = new AbortController() // Create a new controller

        const params = {query}

        if (typeof this.exclude === 'function') {
            params.exclude = this.exclude()
        }

        const config = {
            params,
            signal: this.abortController.signal // Attach the signal to Axios config
        }

        // wait 1 second
        await new Promise((resolve) => setTimeout(resolve, 500))

        return axios
            .get(this.path, config)
            .then((response) => {
                if (this.onCompleteCallback) {
                    this.options.value = this.onCompleteCallback(response)
                }

                return response
            })
            .finally(() => {
                this.inProgress.value = false
            })
    }

    onSelected(value) {
        this.onSelectCallback(value)

        // this.options.value.splice(this.options.value.findIndex((item) => item.value === value), 1)
    }

    onSelect(callback) {
        this.onSelectCallback = callback

        return this
    }

    setOptions(callback) {
        this.onCompleteCallback = callback

        return this
    }
}

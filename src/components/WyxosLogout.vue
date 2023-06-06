<template>
    <li>
        <slot :logout="logout">
            <button class="button is-primary" @click="logout()">Sign out</button>
        </slot>
    </li>
</template>

<script>
import axios from 'axios'
import errorHandler from '../utilities/errorHandler'

export default {
    name: 'WyxosLogout',
    props: {
        path: {
            type: String,
            default: '/logout'
        }
    },
    methods: {
        async logout() {
            const {data} = await axios
                .post(this.path)
                .catch((error) => {
                    if (error.response.status === 401) {
                        window.location.href = '/'

                        return
                    }

                    errorHandler(error)
                })
                .catch(errorHandler)

            window.location.href = data?.redirect || '/'
        }
    }
}
</script>
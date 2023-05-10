<script>
export default {
    name: 'WyxosImage',
    props: {
        src: {
            type: [File, String],
            required: true
        },
        resize: {
            type: Object,
            default: null
        }
    },
    emits: ['loaded'],
    data () {
        return {
            instance: null,
            width: 0,
            height: 0
        }
    },
    mounted () {
        this.loadImage()
    },
    unmounted () {
        this.instance.onload = null
    },
    methods: {
        loadImage () {
            if (typeof this.src === 'object') {
                return this.loadFile()
            }

            return this.loadPath()
        },
        loadFile () {
            this.instance = new FileReader()

            this.instance.onload = (event) => {
                const image = event.target.result

                this.$refs.image.src = image

                this.width = this.resize ? this.resize.width : image.width

                this.height = this.resize ? this.resize.height : image.height

                this.$emit('loaded')
            }

            this.instance.readAsDataURL(this.src)
        },
        loadPath () {
            this.instance = new Image()

            this.instance.onload = () => {
                this.$refs.image.src = this.src

                this.width = this.resize ? this.resize.width : this.instance.width

                this.height = this.resize ? this.resize.height : this.instance.height

                this.$emit('loaded')
            }

            this.instance.src = this.src
        }
    }
}
</script>

<template>
    <img ref="image" src="" alt="" :width="width" :height="height"/>
</template>

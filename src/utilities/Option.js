export default class Option {
    static create(value, label = null, tooltip = null) {
        label = label || value

        return {
            value,
            label
        }
    }
}
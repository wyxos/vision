export default class FileRequest {
  constructor(form) {
    this.data = new FormData()

    this.form = form

    this.copy = Object.assign({}, JSON.parse(JSON.stringify(form)))
  }

  static build(form, files) {
    return new this(form).files(files).get()
  }

  static callback(files) {
    return (form) => this.build(form, files).get()
  }

  files(files) {
    files.forEach((attribute) => {
      if (typeof attribute === 'object') {
        this.data.append(attribute.name, attribute.value)

        delete this.copy[attribute.name]
      } else if (this.form[attribute]) {
        this.data.append(attribute, this.form[attribute])

        delete this.copy[attribute]
      }
    })

    return this
  }

  add(key, value) {
    this.data.append(key, value)

    return this
  }

  get() {
    this.data.append('payload', JSON.stringify(this.copy))

    return this.data
  }
}

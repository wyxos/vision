import moment from 'moment'

export const FORMATS = {
  UK_TIME: 'DD/MM/YYYY HH:mm:ss',
  UK: 'DD/MM/YYYY',
  DB_TIME: 'YYYY-MM-DD HH:mm:ss',
  DB: 'YYYY-MM-DD'
}

export default class DateRender {
  static FORMATS = FORMATS

  value = null
  empty = ''
  interval = null

  constructor(date, empty) {
    this.value = date
    this.empty = empty
  }

  static load(date, empty = '') {
    return new this(date, empty)
  }

  static create() {
    return new this()
  }

  format(date, format = FORMATS.UK, empty = '') {
    if (!date) {
      return empty || this.empty
    }

    return moment(date).format(format)
  }

  render(format = FORMATS.UK_TIME, empty = '') {
    return this.format(this.value, format, empty)
  }

  date(format = FORMATS.UK, empty = '') {
    return this.format(this.value, format, empty)
  }

  time(format = FORMATS.UK_TIME, empty = '') {
    return this.format(this.value, format, empty).split(' ')[1]
  }

  ago() {
    return moment(this.value).fromNow()
  }
}

import moment from 'moment'

export const FORMATS = {
  UK_TIME: 'DD/MM/YYYY HH:mm:ss',
  UK: 'DD/MM/YYYY',
  DB_TIME: 'YYYY-MM-DD HH:mm:ss',
  DB: 'YYYY-MM-DD'
}

export default class DateRender {
  static FORMATS = FORMATS

  date = null
  empty = ''

  constructor(date) {
    this.date = date
  }

  static load(date, empty = '') {
    return new this(date, empty)
  }

  format(date, format = FORMATS.UK, empty = '') {
    if (!date) {
      return empty || this.empty
    }

    return moment(date).format(format)
  }

  render(format = FORMATS.UK, empty = '') {
    return this.format(this.date, format, empty)
  }
}

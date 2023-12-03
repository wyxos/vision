import moment from 'moment'

export const FORMATS = {
  UK_TIME: 'DD/MM/YYYY HH:mm:ss',
  UK: 'DD/MM/YYYY',
  DB_TIME: 'YYYY-MM-DD HH:mm:ss',
  DB: 'YYYY-MM-DD'
}

class DateRender {
  FORMATS = FORMATS

  format(date, format, empty = '') {
    if (!date) {
      return empty
    }

    return moment(date).format(format)
  }
}

const formatter = new DateRender()

export default formatter

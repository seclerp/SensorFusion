export default class DateHelper {
  static format(dateFromJson) {
    return new Date(dateFromJson).toLocaleString('en-US', { timeZone: 'UTC' });
  }
}
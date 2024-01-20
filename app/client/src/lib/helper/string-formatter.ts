export default class StringFormatter {
  static format(value: string): string {
    const formatted = value.replace(/\s+/g, "-");

    return formatted;
  }
}

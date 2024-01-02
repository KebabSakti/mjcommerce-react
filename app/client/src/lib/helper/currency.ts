export default class Currency {
  static format(value: number | bigint | string): string {
    const input = typeof value == "string" ? parseInt(value) : value;

    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const formatted = formatter.format(input);

    return formatted;
  }
}

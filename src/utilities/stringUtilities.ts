import * as PNF from "google-libphonenumber";

const phoneUtil = PNF.PhoneNumberUtil.getInstance();
const phoneFormat = PNF.PhoneNumberFormat;

/**
 * Generates a comma-separated list.
 *
 * @param items An array of strings.
 * @returns A comma-separated list based on the items array.
 */
export function commaSeparatedList(items: string[]): string {
  return items.join(", ");
}

/**
 * Generates a full name given a first and last name.
 *
 * @param first The first name (e.g. "Jane").
 * @param last The last name (e.g. "Doe").
 * @returns The full name (e.g. "Jane Doe").
 */
export function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

/**
 * Converts phone number strings to a standardized format.
 *
 * @param phoneNumber A phone number string in any format, e.g. "5555555555".
 * @returns A phone number string in standardized format, e.g. "(555) 555-5555".
 */
export function standardizedPhoneNumber(phoneNumber: string): string {
  return phoneUtil.format(phoneUtil.parse(phoneNumber, "US"), phoneFormat.NATIONAL);
}

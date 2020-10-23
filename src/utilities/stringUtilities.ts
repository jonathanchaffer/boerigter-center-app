import * as PNF from "google-libphonenumber";

const phoneUtil = PNF.PhoneNumberUtil.getInstance();
const phoneFormat = PNF.PhoneNumberFormat;

export function commaSeparatedList(items: string[]): string {
  return items.join(", ");
}

export function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

export function standardizedPhoneNumber(phoneNumber: string): string {
  return phoneUtil.format(phoneUtil.parse(phoneNumber, "US"), phoneFormat.NATIONAL);
}

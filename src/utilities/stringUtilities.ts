export function commaSeparatedList(items: string[]): string {
  return items.join(", ");
}

export function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

export type Selector<T> = {
  header: string;
  value: (item: T) => string;
};

export type CsvOptions<T> = {
  seperator: string;
  selectors: Selector<T>[];
  withHeaders: boolean;
};

export function generateCsv<T>(items: T[], options: CsvOptions<T>) {
  const content = [];
  const headers = options.selectors.map((s) => s.header);
  content.push(headers.join(options.seperator));

  for (const item of items) {
    const row = options.selectors.map((s) => s.value(item));
    content.push(row.join(options.seperator));
  }

  return new Blob([content.join('\n')], { type: 'application/csv' });
}

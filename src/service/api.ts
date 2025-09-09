type BookQueryParams = {
  query: string;
  display?: string;
  start?: string;
};

export class BookAPI {
  constructor() {}

  static book() {
    return new BookAPI();
  }

  async getBooks({ query, display = '10', start = '1' }: BookQueryParams) {
    const params = new URLSearchParams({ display, start, query }).toString();
    const book = await fetch(`/.netlify/functions/search?${params}`) //
      .then((res) => res.json())
      .then((data) => data || []);

    return book;
  }
}

export default class FakeHttp {
  async fetch<T>(): Promise<T> {
    const res = await fetch('/mock/getTodosMockData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch mock data');
        }
        return response.json();
      })
      .catch((error) => console.error('Error fetching mock data:', error));

    return res as T;
  }
}

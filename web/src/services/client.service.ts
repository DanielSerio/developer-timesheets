export abstract class ClientService<
  RecordType,
  CreateType,
  UpdateType
> {
  private _BASE_URL: string = 'http://localhost:3000';
  private _ENDPOINT: string;

  URL: string;

  constructor(endpoint: `/${string}`) {
    this._ENDPOINT = endpoint;
    this.URL = `${this._BASE_URL}${this._ENDPOINT}`;
  }

  protected DEFAULT_OPTIONS: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  protected async list() {
    const response = await fetch(this.URL, this.DEFAULT_OPTIONS);

    return await response.json() as RecordType[];
  }

  protected async find(id: number) {
    const response = await fetch(`${this.URL}/${id}`, this.DEFAULT_OPTIONS);

    return await response.json() as RecordType | null;
  }

  protected async create(body: CreateType) {
    const response = await fetch(`${this.URL}`, {
      ... this.DEFAULT_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body)
    });

    return await response.json() as RecordType;
  }

  protected async update(id: number, body: UpdateType) {
    const response = await fetch(`${this.URL}/${id}`, {
      ... this.DEFAULT_OPTIONS,
      method: 'PATCH',
      body: JSON.stringify(body)
    });

    return await response.json() as RecordType;
  }

  protected async delete(id: number) {
    const response = await fetch(`${this.URL}/${id}`, {
      ...this.DEFAULT_OPTIONS,
      method: 'DELETE'
    });

    return await response.json() as { raw: string; affectedRows: number; };
  }
}
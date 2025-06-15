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

  list = async (mock?: boolean) => {
    const URL = `${this.URL}${mock ? `?mock=true` : ''}`;
    console.info(`FETCHING: ${URL}`);
    const response = await fetch(URL, this.DEFAULT_OPTIONS);

    return await response.json() as RecordType[];
  };

  find = async (id: number, mock?: boolean) => {
    const URL = `${this.URL}/${id}${mock ? `?mock=true` : ''}`;
    const response = await fetch(URL, this.DEFAULT_OPTIONS);

    return await response.json() as RecordType | null;
  };

  create = async (body: CreateType, mock?: boolean) => {
    const URL = `${this.URL}${mock ? `?mock=true` : ''}`;

    const response = await fetch(URL, {
      ... this.DEFAULT_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body)
    });

    return await response.json() as RecordType;
  };

  update = async (id: number, body: UpdateType, mock?: boolean) => {
    const URL = `${this.URL}/${id}${mock ? `?mock=true` : ''}`;

    const response = await fetch(URL, {
      ... this.DEFAULT_OPTIONS,
      method: 'PATCH',
      body: JSON.stringify(body)
    });

    return await response.json() as RecordType;
  };

  delete = async (id: number, mock?: boolean) => {
    const URL = `${this.URL}/${id}${mock ? `?mock=true` : ''}`;

    const response = await fetch(URL, {
      ...this.DEFAULT_OPTIONS,
      method: 'DELETE'
    });

    return await response.json() as { raw: string; affectedRows: number; };
  };
}
export default class HTTP {
  static async get(
    url: string,
    token?: string,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async post(
    url: string,
    data: Object,
    token?: string,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "post",
      cache: "no-store",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async put(
    url: string,
    data: Object,
    token?: string,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "put",
      cache: "no-store",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async delete(
    url: string,
    data?: Object,
    token?: string,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "delete",
      cache: "no-store",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async upload(
    url: string,
    data: FormData,
    token?: string,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "post",
      cache: "no-store",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}

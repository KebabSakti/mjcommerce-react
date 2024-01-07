export default class HTTP {
  static async get(url: string, option?: Request): Promise<Response> {
    const response = await fetch(url, option);

    return response;
  }

  static async post(
    url: string,
    data: Object,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "post",
      cache: "no-store",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async put(
    url: string,
    data: Object,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "put",
      cache: "no-store",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async delete(
    url: string,
    data?: Object,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "delete",
      cache: "no-store",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async upload(
    url: string,
    data: FormData,
    option?: Request
  ): Promise<Response> {
    const response = await fetch(url, {
      ...option,
      method: "POST",
      body: data,
    });

    return response;
  }
}

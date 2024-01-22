import { Empty, HttpRequest } from "./../config/type";

export default class HTTP {
  private static headers(request?: HttpRequest | Empty): Object {
    let headers: any = { "Content-Type": "application/json" };

    if (request?.token) {
      headers = { ...headers, Authorization: `Bearer ${request?.token}` };
    }

    return headers;
  }

  private static urlParser(url: string, query?: Object | Empty): string {
    const target = new URL(url);

    if (query != null) {
      target.search = new URLSearchParams(query as any) as any;
    }

    return target.href;
  }

  static async get(
    url: string,
    request?: HttpRequest | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);
    const headers = this.headers(request);

    const response = await fetch(targetUrl, {
      method: "GET",
      ...headers,
    });

    console.log(response.json().value);

    return response;
  }

  static async post(
    url: string,
    request?: HttpRequest | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);
    const headers = this.headers(request);

    const response = await fetch(targetUrl, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(request?.data),
      ...headers,
    });

    return response;
  }

  static async put(
    url: string,
    request?: HttpRequest | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);
    const headers = this.headers(request);

    const response = await fetch(targetUrl, {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify(request?.data),
      ...headers,
    });

    return response;
  }

  static async delete(
    url: string,
    request?: HttpRequest | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);
    const headers = this.headers(request);

    const response = await fetch(targetUrl, {
      method: "DELETE",
      cache: "no-store",
      body: JSON.stringify(request?.data),
      ...headers,
    });

    return response;
  }

  static async upload(
    url: string,
    request?: HttpRequest<FormData> | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);
    const headers = this.headers(request);

    const response = await fetch(targetUrl, {
      method: "POST",
      cache: "no-store",
      body: request?.data,
      ...headers,
    });

    return response;
  }
}

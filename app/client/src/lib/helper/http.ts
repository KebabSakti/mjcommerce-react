import { Empty, HttpRequest } from "./../config/type";

export default class HTTP {
  static urlParser(url: string, query?: Object | Empty): string {
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

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request?.token}`,
      },
    });

    return response;
  }

  static async post(
    url: string,
    request?: HttpRequest | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);

    const response = await fetch(targetUrl, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(request?.data),
      headers: {
        Authorization: `Bearer ${request?.token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async put(
    url: string,
    request?: HttpRequest | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);

    const response = await fetch(targetUrl, {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify(request?.data),
      headers: {
        Authorization: `Bearer ${request?.token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async delete(
    url: string,
    request?: HttpRequest | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);

    const response = await fetch(targetUrl, {
      method: "DELETE",
      cache: "no-store",
      body: JSON.stringify(request?.data),
      headers: {
        Authorization: `Bearer ${request?.token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async upload(
    url: string,
    request?: HttpRequest<FormData> | Empty
  ): Promise<Response> {
    const targetUrl = this.urlParser(url, request?.query);

    const response = await fetch(targetUrl, {
      method: "POST",
      cache: "no-store",
      body: request?.data,
      headers: {
        Authorization: `Bearer ${request?.token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}

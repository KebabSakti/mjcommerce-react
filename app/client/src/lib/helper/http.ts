import { Empty, HttpRequest } from "./../config/type";
import {
  BadRequest,
  Failure,
  InternalError,
  NotFound,
  Unauthorized,
} from "./failure";

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

  private static async failure(response: Response): Promise<Failure> {
    const message = await response.json();
    let error: InternalError = new InternalError(message);

    if (response.status == 401) {
      error = new Unauthorized(message);
    }

    if (response.status == 404) {
      error = new NotFound(message);
    }

    if (response.status == 400) {
      error = new BadRequest(message);
    }

    return error;
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

    if (response.ok == false) {
      throw await this.failure(response);
    }

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

    if (response.ok == false) {
      throw await this.failure(response);
    }

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

    if (response.ok == false) {
      throw await this.failure(response);
    }

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

    if (response.ok == false) {
      throw await this.failure(response);
    }

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

    if (response.ok == false) {
      throw await this.failure(response);
    }

    return response;
  }
}

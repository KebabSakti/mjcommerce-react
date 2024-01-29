export default function parseQueryString(
  queryString: string
): Record<string, any> {
  // Remove leading '?' if present
  queryString = queryString.replace(/^\?/, "");

  // Split the query string into key-value pairs
  const pairs: string[] = queryString.split("&");

  // Initialize an empty object to store the result
  const result: Record<string, any> = {};

  // Iterate through key-value pairs and populate the result object
  for (let i = 0; i < pairs.length; i++) {
    const pair: string[] = pairs[i].split("=");
    const key: string = decodeURIComponent(pair[0]);
    const value: string = decodeURIComponent(pair[1] || ""); // Handle case where value is empty

    // If the key already exists in the result, convert it to an array
    if (result.hasOwnProperty(key)) {
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value);
      } else {
        result[key] = [result[key] as string, value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

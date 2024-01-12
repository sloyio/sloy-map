export async function fetchAPI(url: string) {
  const response = await fetch(url, { cache: "force-cache" });
  return response.json();
}

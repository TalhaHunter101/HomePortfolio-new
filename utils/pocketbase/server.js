import PocketBase from "pocketbase";

export function createServerClient(cookieStore) {
  if (!process.env.NEXT_PUBLIC_POCKETBASE_API_URL) {
    throw new Error("Pocketbase API url not defined !");
  }

  if (typeof window !== "undefined") {
    throw new Error(
      "This method is only supposed to call from the Server environment"
    );
  }

  const client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL
  );

  if (cookieStore) {
    const authCookie = cookieStore.get("pb_auth");

    console.log("authCookie", authCookie);

    if (authCookie) {
      client.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`)
    }
  }

  console.log("client.authStore", client.authStore);

  return client;
}
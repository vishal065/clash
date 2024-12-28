import { CLASH_URL } from "@/lib/apiEndPoints";

interface ClashResponse {
  data?: any[]; // Replace `any` with the actual structure of your response data.
}

async function ClashFetch(token: string): Promise<any[]> {
  if (!token) {
    throw new Error("Authorization token is required");
  }

  try {
    const res = await fetch(`${CLASH_URL}/getall`, {
      headers: {
        Authorization: token,
      },
      next: {
        revalidate: 60 * 60,
        tags: ["dashboard"], // Adjust tags as needed for caching strategy
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const response: ClashResponse = await res.json();
    console.log("res us ", response);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching Clash data:", error);
    return []; // Return an empty array or rethrow the error based on your use case
  }
}
export default ClashFetch;

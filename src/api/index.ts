const BASE_URL = "https://nomdedomaine/api";

// Helper to handle server response
async function handleResponse(response: Response) {
   if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
   }
   return response.json();
}

// Function for verify user token
export async function verifyToken(headers: Headers) {
   const token = localStorage.getItem("token");
   if (!token) {
      throw new Error("Authentication required");
   }
   headers.append("Authorization", `Bearer ${token}`);
}

export async function get(url: string, needAuthentication: boolean = false) {
   const headers = new Headers({
      "Content-Type": "application/json",
   });

   if (needAuthentication) {
      await verifyToken(headers);
   }

   const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: headers,
   });
   return handleResponse(response);
}

export async function post(
   url: string,
   data: any,
   needAuthentication: boolean = false
) {
   const headers = new Headers({
      "Content-Type": "application/json",
   });

   if (needAuthentication) {
      await verifyToken(headers);
   }

   const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
   });
   return handleResponse(response);
}

export async function postWithoutBody(
   url: string,
   needAuthentication: boolean = false
) {
   const headers = new Headers({
      "Content-Type": "application/json",
   });

   if (needAuthentication) {
      await verifyToken(headers);
   }

   const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: headers,
   });
   return handleResponse(response);
}

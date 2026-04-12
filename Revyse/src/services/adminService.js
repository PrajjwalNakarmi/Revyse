const ADMIN_API_URL = "http://localhost:5000/api/admin";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export async function fetchAdminSummary() {
  const response = await fetch(`${ADMIN_API_URL}/summary`, {
    headers: authHeaders(),
  });
  return parseResponse(response);
}

export async function fetchAdminUsers() {
  const response = await fetch(`${ADMIN_API_URL}/users`, {
    headers: authHeaders(),
  });
  const data = await parseResponse(response);
  return data.users || [];
}

export async function createAdminUser(payload) {
  const response = await fetch(`${ADMIN_API_URL}/users`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(response);
  return data.user;
}

export async function updateAdminUser(id, payload) {
  const response = await fetch(`${ADMIN_API_URL}/users/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(response);
  return data.user;
}

export async function deleteAdminUser(id) {
  const response = await fetch(`${ADMIN_API_URL}/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return parseResponse(response);
}

export async function fetchAdminLogs() {
  const response = await fetch(`${ADMIN_API_URL}/logs`, {
    headers: authHeaders(),
  });
  const data = await parseResponse(response);
  return data.logs || [];
}

export async function fetchAdminCVs() {
  const response = await fetch(`${ADMIN_API_URL}/cvs`, {
    headers: authHeaders(),
  });
  const data = await parseResponse(response);
  return data.cvs || [];
}

export async function fetchAdminJobsStatus() {
  const response = await fetch(`${ADMIN_API_URL}/jobs-status`, {
    headers: authHeaders(),
  });
  return parseResponse(response);
}

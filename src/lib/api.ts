import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  response: any;
  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

async function customFetch(endpoint: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().accessToken;
  const headers = new Headers(options.headers);
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // We only set Content-Type to application/json if there's a body and it's not FormData
  if (options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }
  
  // Include credentials for refresh token cookies
  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include' 
  };

  try {
    let response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Handle 401 Unauthorized (Token Expiration)
    if (response.status === 401 && endpoint !== '/auth/refresh' && endpoint !== '/auth/login') {
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshRes.ok) {
          throw new Error('Refresh failed');
        }

        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);
        headers.set('Authorization', `Bearer ${newAccessToken}`);

        // Retry original request
        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...config,
          headers
        });
      } catch (error) {
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw error;
      }
    }

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(data?.message || 'Something went wrong', { data, status: response.status });
    }

    // Wrap in { data } to mimic Axios API where the consumer uses res.data
    return { data, status: response.status, headers: response.headers };
  } catch (error: any) {
    // If it's not our ApiError, wrap it
    if (!(error instanceof ApiError)) {
      throw new ApiError(error.message, { data: { message: error.message }});
    }
    throw error;
  }
}

const api = {
  get: (url: string, options?: RequestInit) => customFetch(url, { ...options, method: 'GET' }),
  post: (url: string, data?: any, options?: RequestInit) => customFetch(url, { ...options, method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: (url: string, data?: any, options?: RequestInit) => customFetch(url, { ...options, method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
  patch: (url: string, data?: any, options?: RequestInit) => customFetch(url, { ...options, method: 'PATCH', body: data ? JSON.stringify(data) : undefined }),
  delete: (url: string, options?: RequestInit) => customFetch(url, { ...options, method: 'DELETE' }),
};

export default api;

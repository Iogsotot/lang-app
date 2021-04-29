interface AuthFetchOptions {
  url: string;
  options?: RequestInit;
  token: string;
}

export const authFetch = ({ url, options, token }: AuthFetchOptions): Promise<Response> => {
  const authOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = fetch(url, authOptions);

  return response;
};

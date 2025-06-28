import { useState } from "react";

type CreateUserPayload = {
  [key: string]: any;
};

type UseCreateUserResult = {
  createUser: (payload: CreateUserPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
  data: any;
};

export function useCreateUser(): UseCreateUserResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const createUser = async (payload: CreateUserPayload) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("http://demo6610017.mockable.io/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, data };
}

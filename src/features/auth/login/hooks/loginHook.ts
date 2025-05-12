import { useState } from 'react';
import { login } from '../../services/authService';

export const useAuthLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string, onSuccess: () => void) => {
    try {
      setLoading(true);
      setError(null);
      const data = await login(username, password);
      localStorage.setItem("username", data.user.username);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleLogin};
};
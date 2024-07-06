// src/authContext.js
import { createContext, useState, useEffect } from "react";
import supabase from "./supabase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => {
        authListener?.unsubscribe();
      };
    })();
  }, []);

  const value = {
    signUp: (email, password) => supabase.auth.signUp({ email, password }),
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setUser(data?.user);
      return { user: data?.user, error };
    },
    passwordRecovery: (email) =>
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://www.flavourbyte.de/reset_password",
      }),
    signOut: () => supabase.auth.signOut(),
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

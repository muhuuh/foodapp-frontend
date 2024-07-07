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

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data.user) {
      setUser(data.user);
    }
    return { user: data.user, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(data?.user);
    return { user: data?.user, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const passwordRecovery = async (email) =>
    supabase.auth.resetPasswordForEmail(email, {
      //redirectTo: "https://www.flavourbyte.de/reset_password",
      redirectTo: "http://localhost:3000/reset_password",
    });

  const value = {
    signUp,
    signIn,
    passwordRecovery,
    signOut,
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

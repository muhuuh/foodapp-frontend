import { createContext, useState, useEffect } from "react";
import supabase from "./supabase";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/user-slice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        dispatch(setUserId(session.user.id));
      }
      setLoading(false);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
          if (session?.user) {
            dispatch(setUserId(session.user.id));
          } else {
            dispatch(setUserId(null));
          }
          setLoading(false);
        }
      );

      return () => {
        authListener?.unsubscribe();
      };
    })();
  }, [dispatch]);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data.user) {
      setUser(data.user);
      dispatch(setUserId(data.user.id));
    }
    return { user: data.user, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data?.user) {
      setUser(data.user);
      dispatch(setUserId(data.user.id));
    }
    return { user: data?.user, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    dispatch(setUserId(null));
  };

  const passwordRecovery = async (email) =>
    supabase.auth.resetPasswordForEmail(email, {
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

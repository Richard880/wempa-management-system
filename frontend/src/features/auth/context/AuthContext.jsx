// AuthContext.jsx
import { createContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    currentUser: null,
    profile: null,
    role: null,
    permissions: [],
    loading: true, // Securely lock viewport under PageLoader on cold boot
    authenticated: false,
  });

  const initListenerRegistered = useRef(false);
  
  // Track system readiness using mutable references to avoid closure freezing
  const isResolved = useRef(false);

  const fetchProfileData = useCallback(async (uid, reloadFirebase = false) => {
    if (!uid) return null;
    if (reloadFirebase && authService.getCurrentUser()) {
      await authService.reloadCurrentUser();
    }
    const firebaseUser = authService.getCurrentUser();
    if (firebaseUser?.emailVerified && reloadFirebase) {
      await authService.updateEmailVerificationStatus(uid);
    }
    return await authService.getUserProfile(uid);
  }, []);

  const refreshProfile = useCallback(async (uid, reloadFirebase = false) => {
    const profile = await fetchProfileData(uid, reloadFirebase);
    setAuth((previous) => ({
      ...previous,
      profile,
      role: profile?.role ?? null,
      permissions: profile?.permissions ?? [],
    }));
    return profile;
  }, [fetchProfileData]);

  // 1. FORCED COMPILER RESCUE (Completely decoupled dependency array to guarantee execution)
  useEffect(() => {
    let isMounted = true;

    const runForcedNetworkFailsafe = async () => {
      // Allow exactly 1 second for standard local token verification handshakes
      await new Promise((resolve) => setTimeout(resolve, 10000));
      
      if (!isMounted) return;

      // If the runtime event stream is still hanging indefinitely due to network faults
      if (!isResolved.current) {
        console.warn("🚨 CRITICAL: Firebase Network Socket error detected. Failsafe Override Activated.");
        isResolved.current = true;

        const localCachedUser = authService.getCurrentUser();

        if (localCachedUser) {
          console.log("Offline cache match recovered. Synchronizing offline profile parameters...");
          try {
            const profile = await fetchProfileData(localCachedUser.uid);
            setAuth({
              currentUser: localCachedUser,
              profile: profile || null,
              role: profile?.role ?? null,
              permissions: profile?.permissions ?? [],
              loading: false, // 🟢 REMOVES THE LOADER
              authenticated: true,
            });
          } catch {
            setAuth((prev) => ({ ...prev, loading: false }));
          }
        } else {
          //console.log("No offline session discovered. Routing client directly to public login interface.");
          setAuth({
            currentUser: null,
            profile: null,
            role: null,
            permissions: [],
            loading: false, // 🟢 REMOVES THE LOADER
            authenticated: false,
          });
        }
      }
    };

    runForcedNetworkFailsafe();

    return () => {
      isMounted = false;
    };
    // 🟢 FIX: Keep this completely empty so it runs exactly once on mount, unaffected by re-renders
  }, []); 

  // 2. LIVE RUNTIME OBSERVATION PIPELINE
  useEffect(() => {
    console.log("=== AuthProvider Synchronizing Event Routing Pipelines ===");

    if (initListenerRegistered.current) {
      console.log("Skipping duplicate runtime action listener registration for StrictMode");
      return;
    }

    initListenerRegistered.current = true;

    const unsubscribeRuntime = authService.onAuthStateChanged(async (firebaseUser) => {
      console.log("Context runtime stream event successfully capturing token update:", firebaseUser?.uid || "Guest");
      
      // Acknowledge that Firebase successfully responded before the failsafe cutoff passed
      isResolved.current = true;

      try {
        if (!firebaseUser) {
          setAuth({
            currentUser: null,
            profile: null,
            role: null,
            permissions: [],
            loading: false, 
            authenticated: false,
          });
          return;
        }

        console.log("🟢 Processing profile synchronization block...");
        const profile = await fetchProfileData(firebaseUser.uid);

        setAuth({
          currentUser: firebaseUser,
          profile: profile || null,
          role: profile?.role ?? null,
          permissions: profile?.permissions ?? [],
          loading: false, // 🟢 REMOVES THE LOADER
          authenticated: true,
        });

      } catch (error) {
        console.error("Runtime context synchronization fault:", error);
        setAuth({
          currentUser: null,
          profile: null,
          role: null,
          permissions: [],
          loading: false, 
          authenticated: false,
        });
      }
    });

    return () => {
      unsubscribeRuntime();
    };
  }, [fetchProfileData]);

  const login = useCallback(async (credentials) => await authService.login(credentials), []);
  const register = useCallback(async (userData) => await authService.register(userData), []);
  const logout = useCallback(async () => await authService.logout(), []);

  const value = useMemo(() => ({
    auth,
    login,
    register,
    logout,
    refreshProfile,
  }), [auth, login, register, logout, refreshProfile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

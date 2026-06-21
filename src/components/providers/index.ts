export { default as ThemeProvider } from "./ThemeProvider";

// NOTE: AuthProvider/useAuth are intentionally NOT exported here. They pull in
// firebase/auth, and this barrel is re-exported by @/components — exporting them
// would leak Firebase into the public bundle. Admin code imports them directly
// from "@/components/providers/AuthProvider".

// Admin-only components. Deliberately NOT re-exported from @/components so
// Firebase Auth never leaks into the public bundle.
export { default as AdminGate } from "./AdminGate";
export { default as AdminShell } from "./AdminShell";
export { default as LoginScreen } from "./LoginScreen";
export { default as AccessDenied } from "./AccessDenied";
export { default as StatusScreen } from "./StatusScreen";
export { default as AdminChrome } from "./chrome/AdminChrome";
export { default as ProfileEditor } from "./editors/ProfileEditor";
export { default as CollectionEditor } from "./editors/CollectionEditor";
export type { FieldDef } from "./editors/CollectionEditor";
export { default as ProjectEditor } from "./editors/ProjectEditor";
export { default as SettingsEditor } from "./editors/SettingsEditor";

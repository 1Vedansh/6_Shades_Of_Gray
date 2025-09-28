export function setRole(role: "student" | "admin" | null) {
  if (role === null) localStorage.removeItem("demo-auth");
  else localStorage.setItem("demo-auth", JSON.stringify({ role }));
}

export function getRole(): "student" | "admin" | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("demo-auth") ?? "null")?.role ?? null;
  } catch {
    return null;
  }
}
// proxy.ts (Next.js 16+) or middleware.ts (Next.js ≤15)
import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();
// For Next.js 16+, you can also use: export { default as proxy } from './proxy';

// Match against pages that require auth
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

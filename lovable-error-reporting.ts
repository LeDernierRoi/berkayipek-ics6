import { createServerFn } from "@tanstack/react-start";

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) => {
    if (!input || typeof input.password !== "string") {
      throw new Error("Invalid input");
    }
    return { password: input.password };
  })
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD ?? "";
    if (!expected) return { ok: false };

    // Constant-time comparison
    const a = new TextEncoder().encode(data.password);
    const b = new TextEncoder().encode(expected);
    let diff = a.length ^ b.length;
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i++) {
      diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
    }
    // Tiny artificial delay to slow brute force
    await new Promise((r) => setTimeout(r, 120));
    return { ok: diff === 0 };
  });

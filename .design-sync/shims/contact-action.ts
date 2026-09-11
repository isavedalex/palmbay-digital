/** Design-sync shim: the real action is server-only (resend/zod). Previews never submit. */
export type ContactState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string[]> };
export async function submitContact(_prev: ContactState, _formData: FormData): Promise<ContactState> {
  return { error: "Form submission is disabled in design previews." };
}

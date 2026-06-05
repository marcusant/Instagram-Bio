import { z } from "zod";

/** Schema for the subscribe form payload. `website` is a honeypot field. */
export const subscribeSchema = z.object({
  email: z
    .string({ required_error: "Informe seu e-mail." })
    .trim()
    .min(1, "Informe seu e-mail.")
    .max(254, "E-mail muito longo.")
    .email("E-mail inválido."),
  /** Honeypot: must stay empty. Bots tend to fill every field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

/** Convenience guard used on the client before hitting the API. */
export function isValidEmail(value: string): boolean {
  return subscribeSchema.shape.email.safeParse(value).success;
}

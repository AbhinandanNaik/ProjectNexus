import { z } from "zod";

export const ThreatPayloadSchema = z.object({
  id: z.string().uuid(),
  sourceIp: z.string().ip(),
  targetIp: z.string().ip(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  timestamp: z.string().datetime(),
});

export type ThreatPayload = z.infer<typeof ThreatPayloadSchema>;

import { z } from 'zod';
export const inquirySchema = z.object({
 service: z.coerce.number().int().min(0).max(6), title: z.string().trim().min(3).max(160), description: z.string().trim().min(10).max(4000), timeline: z.string().trim().max(150), budget: z.string().trim().max(150), name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(254), website: z.string().max(0), submissionId: z.string().uuid(), confirmed: z.literal(true),
});
export type Inquiry = z.infer<typeof inquirySchema>;

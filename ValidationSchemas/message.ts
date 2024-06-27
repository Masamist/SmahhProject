import {z} from "zod"

export const messageSchema = z.object({
  senderId: z.string().min(1, "userId").max(50).optional(),
  senderName: z.string().min(1, "userName").max(50).optional(),
  comment: z.string().min(1, "Message is required").max(65535),
  read: z.string().array().optional(),
  createdAt: z.string().datetime().optional()
})

export const ticketPatchSchema = z.object({
  comment: z.string().min(1, "Message is required").max(65535),
  createdAt: z.string().datetime().optional()
})
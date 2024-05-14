import {z} from "zod"

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  client: z.string().min(1, "Client").max(255).optional(),
  category: z.string().min(1, "Category").max(10).optional(),
  severity: z.string().min(1, "Severity is required").max(10),
  status: z.string().min(1, "Stasus").max(10),
  owner: z.string().min(1, "Ticket Owner").max(255).optional(),
  description: z.string().min(1, "Description is required").max(65535), 
})

export const ticketPatchSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  client: z.string().min(1, "Client").max(255).optional(),
  category: z.string().min(1, "Category").max(10).optional(),
  severity: z.string().min(1, "Severity is required").max(10),
  status: z.string().min(1, "Stasus").max(10),
  owner: z.string().min(1, "Ticket Owner").max(255).optional(),
  description: z.string().min(1, "Description is required").max(65535), 
})
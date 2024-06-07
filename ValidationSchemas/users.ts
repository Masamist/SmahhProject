import {z} from "zod"

export const userSchema = z.object({
  name: z.string().min(3, "Name is required.").max(225),
  surname: z.string().min(3, "surname is required.").max(225),
  email: z.string().min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  mobile: z.string().min(8, "Mobile number is required.").max(20),
  password: z.string().min(6, "Password must be at leaset 6 characters.")
    .max(255).optional().or(z.literal("")),
  role: z.string().min(3, "Role is required.").max(10),
  company: z.string().min(1, "Company name is required.").max(50).optional(),
  jobTitle: z.string().min(3, "Company name is required.").max(50).optional(),
  createdAt: z.string().datetime().optional()
})

export const userPatchSchema = z.object({
  name: z.string().min(3, "Name is required.").max(225),
  surname: z.string().min(3, "surname is required.").max(225),
  email: z.string().min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  mobile: z.string().min(8, "Mobile number is required.").max(20),
  password: z.string().min(6, "Password must be at leaset 6 characters.")
    .max(255).optional().or(z.literal("")),
  role: z.string().min(3, "Role is required.").max(10),
  company: z.string().min(1, "Company name is required.").max(50).optional(),
  jobTitle: z.string().min(3, "Company name is required.").max(50).optional(),
  updatedAt: z.string().datetime().optional()
})

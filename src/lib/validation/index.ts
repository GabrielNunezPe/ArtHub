import * as z from "zod"

export const SignupValidation = z.object({
  name: z.string().min(2, {message: "Muy corto"}),
  username: z.string().min(2, {message: "Muy corto"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "La contraseña tiene que tener al menos 8 caracteres"}),
})

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "La contraseña tiene que tener al menos 8 caracteres"}),
})

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "El nombre tiene que tener al menos 2 caracteres"}),
  username: z.string().min(2, { message: "El nombre de usuario tiene que tener al menos 2 caracteres"}),
  email: z.string().email(),
  bio: z.string(),
})

export const PostValidation = z.object({
  caption: z.string().min(5, {message: "Escribe al menos 5 caracteres"}).max(220),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
})
  
  
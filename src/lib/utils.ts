import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

//Función Chat GPT
export function formatDate(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now.getTime() - date.getTime(); // Diferencia en milisegundos

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
      return `Hace ${seconds} segundos`;
  } else if (minutes < 60) {
      return `Hace ${minutes} minutos`;
  } else if (hours < 24) {
      return `Hace ${hours} horas`;
  } else if (days < 7) {
      return `Hace ${days} días`;
  } else if (weeks < 4) {
      return `Hace ${weeks} semanas`;
  } else if (months < 12) {
      return `Hace ${months} meses`;
  } else {
      return `Hace ${years} años`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList.includes(userId);
  };
export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string[];

  // Opcionales
  role?: string;
  impact?: string;
  tech: string[];

  contributions?: string[];
  highlights?: string[];
  links?: { demo?: string; repo?: string; case?: string };
  images?: string[];
  video?: string;
  status?: "online" | "offline" | "wip" | string;
  date?: string;           // ISO-YYYY-MM o similar
  featured?: boolean;
  extra?: string;
  thumb?: string;          // preview
}

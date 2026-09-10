import axios, { AxiosError } from 'axios';
import { projects as fallbackProjects } from '../data/projetos';

export const API_URL =
  (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PRIVATE_API_URL ||
    ''
  ).replace(/\/$/, '') || 'http://localhost:3333';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string;
}

export interface ContactResponse {
  ok: boolean;
  id?: number;
  warning?: string;
  error?: string;
}

export interface ProjectItem {
  id: number;
  slug?: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  link?: string | null;
  repoUrl?: string | null;
  featured?: boolean;
  tags: string[];
}

export interface SkillItem {
  id: number;
  category: string;
  title: string;
  level: number;
  logo?: string | null;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  summary: string;
  bullets: string[];
}

export async function postContact(
  input: ContactInput,
): Promise<ContactResponse> {
  try {
    const { data } = await api.post<ContactResponse>('/api/contact', input);
    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error('Falha ao conectar com o servidor. Tente novamente.');
  }
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const { data } = await api.get<{ projects: ProjectItem[] }>(
      '/api/projects',
    );
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    return fallbackProjects;
  } catch {
    // Retorna dados estáticos em caso de erro sem quebrar a tela
    return fallbackProjects;
  }
}

export async function fetchSkills(): Promise<SkillItem[]> {
  try {
    const { data } = await api.get<{ skills: SkillItem[] }>('/api/skills');
    return data.skills;
  } catch (err) {
    console.error('Erro ao buscar skills via Axios:', err);
    return [];
  }
}

export async function fetchSettings(): Promise<Record<string, string>> {
  try {
    const { data } = await api.get<{ settings: Record<string, string> }>(
      '/api/settings',
    );
    return data.settings ?? {};
  } catch {
    return {};
  }
}

export async function fetchExperiences(): Promise<ExperienceItem[]> {
  try {
    const { data } = await api.get<{ experiences: ExperienceItem[] }>(
      '/api/experiences',
    );
    return data.experiences;
  } catch (err) {
    console.error('Erro ao buscar experiências via Axios:', err);
    return [];
  }
}

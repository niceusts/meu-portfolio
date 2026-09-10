import axios from 'axios';

const API_URL =
  (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PRIVATE_API_URL ||
    ''
  ).replace(/\/$/, '') || 'http://localhost:3333';

function getSecret() {
  return typeof window !== 'undefined'
    ? (localStorage.getItem('admin_secret') ?? '')
    : (process.env.NEXT_PRIVATE_ADMIN_SECRET ?? '');
}

const adminApi = axios.create({ baseURL: API_URL });

adminApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${getSecret()}`;
  return config;
});

// ── Projetos ─────────────────────────────────────────────────────────────────
export const getProjects = () =>
  adminApi.get('/api/admin/projects').then((r) => r.data.projects);
export const createProject = (data: any) =>
  adminApi.post('/api/admin/projects', data).then((r) => r.data.project);
export const updateProject = (id: number, data: any) =>
  adminApi.put(`/api/admin/projects/${id}`, data).then((r) => r.data.project);
export const deleteProject = (id: number) =>
  adminApi.delete(`/api/admin/projects/${id}`);

// ── Skills ────────────────────────────────────────────────────────────────────
export const getSkills = () =>
  adminApi.get('/api/admin/skills').then((r) => r.data.skills);
export const createSkill = (data: any) =>
  adminApi.post('/api/admin/skills', data).then((r) => r.data.skill);
export const updateSkill = (id: number, data: any) =>
  adminApi.put(`/api/admin/skills/${id}`, data).then((r) => r.data.skill);
export const deleteSkill = (id: number) =>
  adminApi.delete(`/api/admin/skills/${id}`);

// ── Experiências ──────────────────────────────────────────────────────────────
export const getExperiences = () =>
  adminApi.get('/api/admin/experiences').then((r) => r.data.experiences);
export const createExperience = (data: any) =>
  adminApi.post('/api/admin/experiences', data).then((r) => r.data.experience);
export const updateExperience = (id: number, data: any) =>
  adminApi
    .put(`/api/admin/experiences/${id}`, data)
    .then((r) => r.data.experience);
export const deleteExperience = (id: number) =>
  adminApi.delete(`/api/admin/experiences/${id}`);

// ── Mensagens ─────────────────────────────────────────────────────────────────
export const getMessages = () =>
  adminApi.get('/api/admin/messages').then((r) => r.data.messages);
export const markMessageRead = (id: number) =>
  adminApi.patch(`/api/admin/messages/${id}/read`).then((r) => r.data.message);
export const deleteMessage = (id: number) =>
  adminApi.delete(`/api/admin/messages/${id}`);

// ── Upload ────────────────────────────────────────────────────────────────────
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await adminApi.post('/api/admin/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.url as string;
}

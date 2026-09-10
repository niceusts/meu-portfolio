import axios from 'axios';

// NEXT_PUBLIC_* é a única variável disponível no browser.
// NEXT_PRIVATE_* nunca chega ao client — não usar aqui.
const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '') ||
  'http://localhost:3333';

function getSecret() {
  return typeof window !== 'undefined'
    ? (localStorage.getItem('admin_secret') ?? '')
    : '';
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

// ── Configurações do site ─────────────────────────────────────────────────────
export const getSettings = () =>
  adminApi.get('/api/admin/settings').then((r) => r.data.settings);
export const updateSetting = (key: string, value: string) =>
  adminApi
    .put(`/api/admin/settings/${key}`, { value })
    .then((r) => r.data.setting);

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

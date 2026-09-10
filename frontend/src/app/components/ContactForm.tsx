'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { postContact } from '@/lib/api';

const Schema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome').max(80),
  email: z.string().trim().email('E-mail inválido').max(120),
  subject: z.string().trim().max(140).optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Mensagem muito curta (mín. 10 caracteres)')
    .max(4000),
  website: z.string().max(200).optional(),
});

type FormData = z.infer<typeof Schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>(
    'idle',
  );
  const [feedback, setFeedback] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  async function onSubmit(data: FormData) {
    setStatus('sending');
    setFeedback('');
    try {
      const json = await postContact({
        name: data.name,
        email: data.email,
        subject: data.subject || 'Contato via portfólio',
        message: data.message,
        website: data.website || '',
      });
      if (!json.ok) throw new Error('Falha ao enviar');
      setStatus('ok');
      setFeedback(
        json.warning ||
          'Mensagem enviada! Obrigado pelo contato — retorno em até 1 dia útil.',
      );
      reset();
    } catch (e) {
      setStatus('error');
      setFeedback(
        e instanceof Error ? e.message : 'Erro ao enviar. Tente o WhatsApp.',
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-4"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-zinc-300"
            htmlFor="cf-name"
          >
            Nome *
          </label>
          <input
            id="cf-name"
            className="input-modern"
            placeholder="Seu nome"
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-zinc-300"
            htmlFor="cf-email"
          >
            E-mail *
          </label>
          <input
            id="cf-email"
            type="email"
            className="input-modern"
            placeholder="voce@empresa.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold text-zinc-300"
          htmlFor="cf-subject"
        >
          Assunto
        </label>
        <input
          id="cf-subject"
          className="input-modern"
          placeholder="Proposta CLT, freela, consultoria..."
          {...register('subject')}
        />
      </div>
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold text-zinc-300"
          htmlFor="cf-message"
        >
          Mensagem *
        </label>
        <textarea
          id="cf-message"
          rows={5}
          className="input-modern resize-none"
          placeholder="Olá Niceu, vi seu portfólio e gostaria de conversar sobre..."
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register('website')}
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar mensagem
          </>
        )}
      </button>

      {feedback && (
        <p
          className={`rounded-xl border px-3.5 py-2.5 text-center text-[13px] ${
            status === 'ok'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}

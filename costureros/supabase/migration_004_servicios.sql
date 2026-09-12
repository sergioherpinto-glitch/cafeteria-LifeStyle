-- Confecciones Perú — agrega la tabla "servicios" (talleres que ofrecen
-- servicio de producción — corte, confección, estampado, bordado — a otras
-- empresas, y empresas que buscan un taller). Seguro de correr más de una vez.
-- Pegar en: proyecto de Supabase → SQL Editor → New query → Run.

create table if not exists servicios (
  id text primary key,
  tipo text not null,
  tipos_servicio jsonb not null default '[]',
  prendas jsonb not null default '[]',
  capacidad text not null default '',
  zona text not null,
  precio text not null default '',
  contacto text not null,
  whatsapp text not null,
  descripcion text not null default '',
  urgente boolean not null default false,
  fotos jsonb not null default '[]',
  documento text,
  documento_tipo text,
  fecha bigint not null,
  vence bigint,
  destacado boolean not null default false
);

alter table servicios enable row level security;

drop policy if exists "servicios: acceso público total" on servicios;
create policy "servicios: acceso público total" on servicios
  for all using (true) with check (true);

notify pgrst, 'reload schema';

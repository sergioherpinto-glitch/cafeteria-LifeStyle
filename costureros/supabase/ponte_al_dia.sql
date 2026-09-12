-- Confecciones Perú — "ponte al día": revisa qué falta y lo agrega,
-- sin duplicar lo que ya esté hecho. Seguro de correr más de una vez.
-- Pegar en: proyecto de Supabase → SQL Editor → New query → Run.

-- 1) Columnas de vencimiento/destacado (por si esa migración no se corrió).
alter table empleos add column if not exists vence bigint;
alter table empleos add column if not exists destacado boolean not null default false;
alter table mercaderia add column if not exists vence bigint;
alter table mercaderia add column if not exists destacado boolean not null default false;

-- 2) Modalidad de pago: de texto simple a lista (solo si todavía es texto).
do $$
begin
  if (select data_type from information_schema.columns
      where table_name = 'empleos' and column_name = 'modalidad_pago') = 'text' then
    alter table empleos alter column modalidad_pago drop default;
    alter table empleos alter column modalidad_pago type jsonb using (
      case when modalidad_pago is null or modalidad_pago = '' then '[]'::jsonb
           else jsonb_build_array(modalidad_pago) end
    );
    alter table empleos alter column modalidad_pago set default '[]';
    alter table empleos alter column modalidad_pago set not null;
  end if;
end $$;

-- 3) Tabla "servicios" (talleres que ofrecen servicio de producción a otras
-- empresas, y empresas que buscan taller) — por si esa migración no se corrió.
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

-- 4) Refresca el caché de la API para que vea los cambios de inmediato.
notify pgrst, 'reload schema';

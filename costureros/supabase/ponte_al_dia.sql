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

-- 4) Límite de "un aviso gratis por WhatsApp, por sección, de por vida" (evita
-- publicar avisos ilimitados gratis, o borrar y volver a crear el aviso cada
-- 7 días para no pagar nunca) — por si esa migración no se corrió.
create table if not exists avisos_gratis_usados (
  whatsapp text not null,
  seccion text not null,
  primera_vez bigint not null,
  primary key (whatsapp, seccion)
);
alter table avisos_gratis_usados enable row level security;

create or replace function fn_check_aviso_gratis() returns trigger
security definer set search_path = public
language plpgsql as $$
declare
  ya_existe_id boolean;
  ya_uso_gratis boolean;
begin
  execute format('select exists(select 1 from %I where id = $1)', TG_TABLE_NAME)
    into ya_existe_id using NEW.id;

  if ya_existe_id then
    return NEW;
  end if;

  NEW.destacado := false;

  select exists(
    select 1 from avisos_gratis_usados
    where whatsapp = NEW.whatsapp and seccion = TG_TABLE_NAME
  ) into ya_uso_gratis;

  if not ya_uso_gratis then
    insert into avisos_gratis_usados (whatsapp, seccion, primera_vez)
    values (NEW.whatsapp, TG_TABLE_NAME, (extract(epoch from now())*1000)::bigint)
    on conflict (whatsapp, seccion) do nothing;
    NEW.vence := (extract(epoch from now())*1000)::bigint + 7*24*60*60*1000;
  else
    NEW.vence := (extract(epoch from now())*1000)::bigint - 1;
  end if;

  return NEW;
end;
$$;

drop trigger if exists trg_empleos_gratis on empleos;
create trigger trg_empleos_gratis before insert on empleos
  for each row execute function fn_check_aviso_gratis();

drop trigger if exists trg_mercaderia_gratis on mercaderia;
create trigger trg_mercaderia_gratis before insert on mercaderia
  for each row execute function fn_check_aviso_gratis();

drop trigger if exists trg_servicios_gratis on servicios;
create trigger trg_servicios_gratis before insert on servicios
  for each row execute function fn_check_aviso_gratis();

insert into avisos_gratis_usados (whatsapp, seccion, primera_vez)
select whatsapp, 'empleos', min(fecha) from empleos group by whatsapp
on conflict (whatsapp, seccion) do nothing;

insert into avisos_gratis_usados (whatsapp, seccion, primera_vez)
select whatsapp, 'mercaderia', min(fecha) from mercaderia group by whatsapp
on conflict (whatsapp, seccion) do nothing;

insert into avisos_gratis_usados (whatsapp, seccion, primera_vez)
select whatsapp, 'servicios', min(fecha) from servicios group by whatsapp
on conflict (whatsapp, seccion) do nothing;

-- 5) Video de Mercadería (un solo video por aviso, guardado en un cajón de
-- Storage aparte, no como texto en la tabla) — por si esa migración no se
-- corrió.
alter table mercaderia add column if not exists video text;

insert into storage.buckets (id, name, public)
values ('mercaderia-videos', 'mercaderia-videos', true)
on conflict (id) do nothing;

drop policy if exists "mercaderia-videos: subir" on storage.objects;
create policy "mercaderia-videos: subir" on storage.objects
  for insert to public
  with check (bucket_id = 'mercaderia-videos');

drop policy if exists "mercaderia-videos: ver" on storage.objects;
create policy "mercaderia-videos: ver" on storage.objects
  for select to public
  using (bucket_id = 'mercaderia-videos');

drop policy if exists "mercaderia-videos: actualizar" on storage.objects;
create policy "mercaderia-videos: actualizar" on storage.objects
  for update to public
  using (bucket_id = 'mercaderia-videos');

drop policy if exists "mercaderia-videos: borrar" on storage.objects;
create policy "mercaderia-videos: borrar" on storage.objects
  for delete to public
  using (bucket_id = 'mercaderia-videos');

-- 6) Refresca el caché de la API para que vea los cambios de inmediato.
notify pgrst, 'reload schema';

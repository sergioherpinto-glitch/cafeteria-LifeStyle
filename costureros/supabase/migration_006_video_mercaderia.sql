-- Confecciones Perú — agrega soporte de video (un solo video por aviso) a
-- Mercadería. A diferencia de las fotos, el video no se guarda como texto en
-- la tabla — se sube a un espacio de almacenamiento de archivos aparte
-- ("Storage", ya viene incluido en tu proyecto de Supabase) y en la tabla
-- solo se guarda el link a ese archivo.
--
-- Seguro de correr más de una vez. Pegar en: proyecto de Supabase → SQL
-- Editor → New query → Run.

alter table mercaderia add column if not exists video text;

-- Crea el "cajón" de almacenamiento donde van los videos, público (para que
-- cualquiera pueda verlo sin iniciar sesión, igual que el resto del sitio).
insert into storage.buckets (id, name, public)
values ('mercaderia-videos', 'mercaderia-videos', true)
on conflict (id) do nothing;

-- Mismo criterio de acceso que el resto del sitio (fase 1, sin cuentas de
-- usuario): cualquiera puede subir, ver, reemplazar o borrar un video de
-- este cajón. No es una regla de seguridad real, igual que las tablas.
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

notify pgrst, 'reload schema';

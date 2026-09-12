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

-- 3) Refresca el caché de la API para que vea los cambios de inmediato.
notify pgrst, 'reload schema';

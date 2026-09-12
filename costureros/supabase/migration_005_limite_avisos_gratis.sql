-- Confecciones Perú — límite de "un aviso gratis por WhatsApp, por sección,
-- de por vida". Sin esto, una misma persona podía publicar avisos ilimitados
-- gratis, o borrar su aviso cada 7 días y volver a crearlo para nunca pagar.
--
-- Cómo funciona: se guarda (en una tabla aparte, que nunca se borra aunque el
-- aviso sí se borre) qué números de WhatsApp ya usaron su aviso gratis en cada
-- sección (empleos/mercaderia/servicios). La primera vez que un WhatsApp
-- publica algo nuevo en una sección, queda gratis 7 días como siempre. La
-- segunda vez (así sea con un aviso nuevo, aunque el anterior ya no exista),
-- el aviso se guarda pero llega "vencido" (oculto para el público, pero el
-- dueño sí lo sigue viendo en su celular con la insignia "Vencido" y el
-- recordatorio para pagar) — hasta que confirmes el pago y lo actives a mano
-- como ya hacías. Esta regla vive en la base de datos, no en el navegador:
-- no se puede saltar editando el código de la página.
--
-- Seguro de correr más de una vez. Pegar en: proyecto de Supabase → SQL
-- Editor → New query → Run.

create table if not exists avisos_gratis_usados (
  whatsapp text not null,
  seccion text not null,
  primera_vez bigint not null,
  primary key (whatsapp, seccion)
);
alter table avisos_gratis_usados enable row level security;
-- A propósito sin ninguna política: nadie puede leerla ni escribirla desde la
-- web directamente. Solo la usa la función de abajo, que corre con permisos
-- de administrador ("security definer") sin importar quién publique el aviso.

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
    return NEW; -- es una edición de un aviso propio que ya existía: no tocar nada
  end if;

  -- Un aviso recién creado nunca arranca destacado — eso solo lo activas tú a
  -- mano en el SQL Editor, después de confirmar el pago por Yape.
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
    -- Ya usó su aviso gratis en esta sección alguna vez (aunque lo haya
    -- borrado): este aviso nuevo queda oculto (vencido) hasta que pague.
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

-- Si ya había avisos publicados antes de esta regla, que su primer aviso de
-- cada sección cuente como su gratis ya usado — si no, tendrían un gratis
-- extra de regalo la próxima vez que publiquen uno nuevo.
insert into avisos_gratis_usados (whatsapp, seccion, primera_vez)
select whatsapp, 'empleos', min(fecha) from empleos group by whatsapp
on conflict (whatsapp, seccion) do nothing;

insert into avisos_gratis_usados (whatsapp, seccion, primera_vez)
select whatsapp, 'mercaderia', min(fecha) from mercaderia group by whatsapp
on conflict (whatsapp, seccion) do nothing;

insert into avisos_gratis_usados (whatsapp, seccion, primera_vez)
select whatsapp, 'servicios', min(fecha) from servicios group by whatsapp
on conflict (whatsapp, seccion) do nothing;

notify pgrst, 'reload schema';

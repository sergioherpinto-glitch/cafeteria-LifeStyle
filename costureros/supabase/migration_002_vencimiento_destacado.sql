-- Confecciones Perú — migración 002: vencimiento automático + destacado pagado.
-- Pegar y ejecutar esto una sola vez en: proyecto de Supabase → SQL Editor → New query → Run.
-- (Solo agrega columnas nuevas a las tablas que ya existen — no borra nada.)

alter table empleos add column if not exists vence bigint;
alter table empleos add column if not exists destacado boolean not null default false;

alter table mercaderia add column if not exists vence bigint;
alter table mercaderia add column if not exists destacado boolean not null default false;

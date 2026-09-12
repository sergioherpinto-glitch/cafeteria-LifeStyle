-- Confecciones Perú — migración 003: modalidad de pago pasa a admitir varias opciones.
-- Pegar y ejecutar esto una sola vez en: proyecto de Supabase → SQL Editor → New query → Run.
-- (Convierte la columna de texto simple a una lista — si ya tenías avisos con un
-- valor de texto ahí, este paso los convierte automáticamente a una lista de un solo ítem.)

alter table empleos
  alter column modalidad_pago drop default,
  alter column modalidad_pago type jsonb using (
    case
      when modalidad_pago is null or modalidad_pago = '' then '[]'::jsonb
      else jsonb_build_array(modalidad_pago)
    end
  ),
  alter column modalidad_pago set default '[]',
  alter column modalidad_pago set not null;

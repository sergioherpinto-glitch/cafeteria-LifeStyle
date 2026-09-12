-- Confecciones Perú — esquema de base de datos compartida (Supabase/Postgres).
-- Pegar y ejecutar esto una sola vez en: proyecto de Supabase → SQL Editor → New query → Run.

create table if not exists empleos (
  id text primary key,
  tipo text not null,
  perfiles jsonb not null default '[]',
  prendas jsonb not null default '[]',
  telas jsonb not null default '[]',
  experiencia text not null default '',
  maquinas jsonb not null default '[]',
  operaciones jsonb not null default '[]',
  labor_manual jsonb not null default '[]',
  tamano_taller text not null default '',
  modalidad_pago jsonb not null default '[]',
  pago text not null default '',
  disponibilidad jsonb not null default '[]',
  zona text not null,
  zonas_trabajo jsonb not null default '[]',
  contacto text not null,
  whatsapp text not null,
  descripcion text not null default '',
  urgente boolean not null default false,
  documento text,
  documento_tipo text,
  fotos jsonb not null default '[]',
  fecha bigint not null,
  vence bigint,
  destacado boolean not null default false
);

create table if not exists mercaderia (
  id text primary key,
  tipo text not null,
  items jsonb not null default '[]',
  tallas jsonb not null default '[]',
  colores jsonb not null default '[]',
  cantidad text not null default '',
  venta_tipo text not null default '',
  modalidad_venta jsonb not null default '[]',
  precio_mayor text not null default '',
  precio_menor text not null default '',
  zona text not null,
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

-- El directorio es público y sin cuentas de usuario todavía (fase 1): cualquiera
-- puede leer y publicar. "Editar/eliminar solo lo mío" hoy es una ayuda de la
-- interfaz (recuerda tus ids en el celular), no una regla de seguridad del
-- servidor — igual que pasaba antes con localStorage. Cuando haya cuentas reales
-- (fase 2), estas políticas se pueden restringir por dueño.
alter table empleos enable row level security;
alter table mercaderia enable row level security;

create policy "empleos: acceso público total" on empleos
  for all using (true) with check (true);

create policy "mercaderia: acceso público total" on mercaderia
  for all using (true) with check (true);

-- Datos de ejemplo (los mismos avisos ficticios que ya tenía la demo).
insert into empleos (id, tipo, perfiles, prendas, telas, experiencia, maquinas, operaciones, labor_manual, tamano_taller, modalidad_pago, pago, disponibilidad, zona, zonas_trabajo, contacto, whatsapp, descripcion, urgente, documento, documento_tipo, fecha) values
('l-seed-0', 'ofrezco', '["Operario(a) de máquina"]', '["Polos/Camisetas"]', '["Tela punto (polos, buzos)"]', '1 a 3 años', '["Recta","Remalle"]', '["Cerrado de costado","Pegado de manga"]', '[]', 'Taller mediano', '["Jornal (sueldo semanal)"]', 'S/1300 + beneficios', '["Tiempo completo (L-S)"]', 'Santa Anita', '[]', 'Taller Mayorazgo Chico', '977000001', 'Experiencia en recta plana y remalle para polos en tela punto.', true, '20601234567', 'RUC', (extract(epoch from now())*1000)::bigint - 10800000),
('l-seed-1', 'ofrezco', '["Manual de costura"]', '["Uniformes"]', '["Tela plana"]', 'Sin experiencia, con ganas de aprender', '[]', '[]', '["Habilitado","Acabados"]', 'Taller mediano', '["Destajo por operación"]', 'A tratar', '["Tiempo completo (L-S)"]', 'Santa Anita', '[]', 'Clínica Municipal - Taller', '955000002', 'También se necesita ayudante de línea, de 18 a 28 años. Se enseña.', true, null, null, (extract(epoch from now())*1000)::bigint - 18000000),
('l-seed-2', 'ofrezco', '["Operario(a) de máquina"]', '["Ropa deportiva","Polos/Camisetas"]', '["Tela punto (polos, buzos)","Tejido grueso"]', 'Sin experiencia', '["Recta","Remalle","Recubridora"]', '[]', '[]', 'Taller grande / Fábrica', '["A tratar"]', 'Con o sin experiencia', '[]', 'Santa Anita', '[]', 'Taller Botica Carrión', '926000003', 'Manuales de costura, con o sin experiencia.', false, null, null, (extract(epoch from now())*1000)::bigint - 72000000),
('l-seed-3', 'ofrezco', '["Operario(a) de máquina"]', '["Camisas"]', '["Tela plana"]', '3 a 5 años', '["Recta","Remalle"]', '["Armado completo"]', '[]', 'Taller mediano', '["Destajo por prenda (armado completo)"]', 'Buen sueldo', '["Tiempo completo (L-S)"]', 'Ate', '[]', 'Confecciones Javier Prado', '977000004', 'Zona Prolongación Javier Prado, costado del estadio de la U.', false, null, null, (extract(epoch from now())*1000)::bigint - 108000000),
('l-seed-4', 'busco', '["Operario(a) de máquina"]', '["Polos/Camisetas","Ropa deportiva"]', '["Tela punto (polos, buzos)"]', 'Más de 5 años', '["Recta","Remalle","Recubridora"]', '["Cerrado de costado","Pegado de manga"]', '[]', '', '["Destajo por operación"]', '', '["Medio tiempo / días específicos"]', 'Ate', '["Santa Anita","Vitarte","Gamarra"]', 'Rosa M.', '944000005', 'Trabajé en talleres de Santa Anita, Vitarte y en Gamarra. Solo trabajo lunes a miércoles.', false, '45678912', 'DNI', (extract(epoch from now())*1000)::bigint - 28800000),
('l-seed-5', 'busco', '["Cortador(a)"]', '["Pantalones/Jeans"]', '["Denim/Jean"]', '3 a 5 años', '[]', '[]', '[]', '', '["Pago por días trabajados"]', '', '["Fines de semana","Turno noche"]', 'San Juan de Lurigancho', '[]', 'Jhon P.', '999000006', 'Busco taller estable, experiencia en corte y confección. Disponible fines de semana o de noche.', false, null, null, (extract(epoch from now())*1000)::bigint - 180000000),
('l-seed-6', 'busco', '["Vendedor(a)"]', '["Ropa deportiva","Casacas"]', '[]', '3 a 5 años', '[]', '[]', '[]', '', '["Jornal (sueldo semanal)"]', '', '["Fines de semana"]', 'Gamarra', '[]', 'Milagros T.', '933000007', 'Experiencia vendiendo ropa deportiva de marca en Gamarra, buen trato al cliente.', false, null, null, (extract(epoch from now())*1000)::bigint - 144000000)
on conflict (id) do nothing;

insert into mercaderia (id, tipo, items, tallas, colores, cantidad, venta_tipo, modalidad_venta, precio_mayor, precio_menor, zona, contacto, whatsapp, descripcion, urgente, documento, documento_tipo, fecha) values
('m-seed-0', 'vendo', '["Chompas/Tejido"]', '["S","M","L","XL"]', '["Multicolor/Varios colores"]', '200 unidades', 'Mayor y menor', '["Recojo en tienda/domicilio","Envío a nivel nacional"]', 'S/25 por unidad', 'S/35 por unidad', 'Gamarra', 'Manuel R.', '911000001', 'Chompas de tejido grueso, varios colores. Mando fotos y video por WhatsApp.', false, '20601987654', 'RUC', (extract(epoch from now())*1000)::bigint - 36000000),
('m-seed-1', 'compro', '["Ropa deportiva"]', '[]', '[]', '1000 unidades', 'Por mayor', '[]', '', '', 'Cercado de Lima', 'Distribuidora Andina', '922000002', 'Mayorista busca proveedor constante de ropa deportiva.', false, null, null, (extract(epoch from now())*1000)::bigint - 54000000),
('m-seed-2', 'vendo', '["Chompas/Tejido"]', '["Talla única/estándar"]', '["Multicolor/Varios colores"]', '500 unidades', 'Por mayor', '["Contra entrega","Envío de muestra primero"]', 'A tratar según cantidad', '', 'Provincia - Sierra', 'Confecciones Rivera', '944556677', 'Chompas para temporada de frío, pensadas para reventa en provincia. Mando muestra primero.', true, null, null, (extract(epoch from now())*1000)::bigint - 21600000)
on conflict (id) do nothing;

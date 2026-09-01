import fs from 'fs';
import path from 'path';

const files = [
  'src/components/auth-form.tsx','src/app/onboarding/page.tsx','src/app/app/page.tsx','src/app/app/routines/page.tsx','src/app/app/routines/[id]/page.tsx','src/app/app/workout/runner.tsx','src/app/app/history/page.tsx','src/app/app/progress/page.tsx','src/app/app/settings/page.tsx','src/components/mobile-nav.tsx'
];
const expected = [
  'Entrar','Crear cuenta','Olvidé mi contraseña','Guardar y continuar','Saltar por ahora','Empezar entrenamiento','Hoy','Rutinas','Historial','Progreso','Ajustes','Crear rutina','Crear ejercicio','Ver rutina','Empezar','Duplicar','Eliminar','Añadir paso','Quitar','Siguiente','Guardar resumen','Guardar','Añadir peso','Guardar nombre','Guardar recordatorios','Cerrar sesión'
];
const text = files.map(f => fs.readFileSync(path.join(process.cwd(), f), 'utf8')).join('\n');
const missing = expected.filter(label => !text.includes(label));
console.log(JSON.stringify({ expected: expected.length, found: expected.length - missing.length, missing }, null, 2));
if (missing.length) process.exit(1);

# FitHabit

## Objetivo
Crear una aplicación web mobile-first tipo PWA para hacer ejercicio en casa, crear constancia y visualizar progreso personal.

## Producto
FitHabit será una web app instalable desde el navegador móvil mediante “Añadir a pantalla de inicio”. Tendrá cuenta de usuario, rutinas recomendadas según material disponible, temporizador de entrenamiento, historial, progreso, peso corporal y recordatorios.

## Usuario principal
Personas con poco tiempo que entrenan en casa y necesitan rutinas rápidas, claras y compatibles con el material que tienen.

## Stack
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Neon PostgreSQL
- Drizzle ORM
- Auth propia con cookies de sesión
- PWA mobile-first

## Estilo
- Claro limpio
- Serio/simple
- Mobile-first
- Tarjetas grandes
- Botones cómodos
- Colores wellness suaves
- Evitar estética gym oscura/neón y plantillas genéricas

## MVP
- Auth: registro, login, logout, recuperación simple de contraseña.
- Onboarding saltable con objetivo, tiempo, nivel, días/semana y material disponible.
- Pantalla Hoy centrada en empezar entrenamiento rápido.
- Rutinas incluidas + personalizadas.
- 8 familias de rutinas con variantes por material.
- Crear, duplicar y editar rutinas.
- Lista base de ejercicios + ejercicios personalizados privados.
- Ejercicios por tiempo y repeticiones.
- Temporizador automático para ejercicios por tiempo.
- Registro manual de entrenamientos.
- Historial.
- Progreso con rachas, calendario mensual, estadísticas por categoría y peso corporal.
- Recordatorios PWA para entrenar y estirar.
- Ajustes de perfil, material, preferencias y recordatorios.

## Navegación móvil
- Hoy
- Rutinas
- Historial
- Progreso
- Ajustes

## Materiales MVP
- Sin material
- Esterilla
- Silla
- Mancuernas
- Banda elástica
- Comba
- Banco
- Kettlebell
- Barra de dominadas
- Rueda abdominal

## Familias de rutinas
1. Full Body
2. Cardio
3. Core
4. Piernas
5. Tren superior
6. Movilidad
7. Estiramiento
8. Flexibilidad suave

## Entidades principales
- users
- sessions
- password_reset_tokens
- user_preferences
- equipment
- user_equipment
- exercises
- exercise_equipment
- routine_families
- routines
- routine_steps
- workouts
- workout_exercises
- body_weight_entries
- notification_preferences

## Reglas
- No usar Expo/React Native: el proyecto es web PWA.
- Usar Neon/PostgreSQL como base de datos.
- Contraseñas siempre hasheadas.
- Sesiones mediante cookies.
- Rutinas base son plantillas: se duplican para editar.
- Rutinas personalizadas usan borrado suave con `deletedAt`.
- Ejercicios personalizados son privados por usuario.
- Proteger historial copiando datos de ejercicios realizados.
- Sin objetivos semanales en MVP.
- Sin favoritos en MVP; usar recientes desde historial.

## Documentación completa
Ver `docs/producto.md`.

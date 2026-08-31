# FitHabit - Documento de producto

## Visión
FitHabit es una aplicación web mobile-first tipo PWA para hacer ejercicio en casa, crear constancia y visualizar progreso personal. La app se podrá añadir a la pantalla de inicio desde el navegador móvil.

## Usuario principal
Personas con poco tiempo que quieren entrenar en casa con rutinas simples, estiramientos, movilidad y seguimiento básico.

## Propuesta
Una app clara y práctica para elegir una rutina compatible con el material disponible, entrenar con temporizador, registrar actividad y revisar progreso.

## Stack decidido
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Neon PostgreSQL
- Drizzle ORM
- Auth propia simple con cookies de sesión
- PWA mobile-first

## Estilo visual
- Claro limpio
- Serio/simple
- Mobile-first
- Tarjetas grandes
- Botones cómodos
- Colores suaves tipo wellness: blanco cálido, verde suave, azul grisáceo
- Nada de estilo gym oscuro/neón

## MVP
### Pantallas principales
- Login
- Registro
- Recuperación simple de contraseña
- Onboarding
- Hoy
- Rutinas
- Crear/editar rutina
- Entrenar
- Resumen de entrenamiento
- Historial
- Progreso
- Ajustes

### Navegación
Pestañas inferiores en móvil:
- Hoy
- Rutinas
- Historial
- Progreso
- Ajustes

## Auth
- Cuenta con nombre, correo y contraseña.
- Contraseñas hasheadas.
- Sesiones mediante cookies.
- Recuperación simple de contraseña con token mostrado en pantalla en MVP, sin envío real de email.

## Onboarding
El usuario puede saltarlo. Si lo salta, se usan valores por defecto.

Preguntas:
- Objetivo: mantenerme activo, ganar fuerza, mejorar movilidad, perder grasa.
- Tiempo disponible: 5, 10, 15, 20 minutos.
- Nivel: principiante, intermedio, avanzado.
- Días por semana: 2, 3, 4, 5+.
- Material disponible: selección múltiple.

Valores por defecto:
- Objetivo: mantenerme activo.
- Tiempo: 10 minutos.
- Nivel: principiante.
- Días por semana: 3.

## Materiales
El usuario marca qué materiales tiene en onboarding y ajustes.

Materiales MVP:
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

La app recomienda ejercicios/rutinas compatibles. Si una rutina requiere material que falta, muestra aviso y ofrece alternativa cuando exista.

## Rutinas incluidas
8 familias, con variantes por material:
1. Full Body
2. Cardio
3. Core
4. Piernas
5. Tren superior
6. Movilidad
7. Estiramiento
8. Flexibilidad suave

Vista mixta:
- Mostrar familias agrupadas.
- Destacar la variante recomendada según material.
- Permitir ver variantes.

Las rutinas incluidas son plantillas: se pueden usar, duplicar y editar la copia. Las originales no se modifican.

## Ejercicios
Habrá lista base + ejercicios personalizados privados por usuario.

Categorías:
- Fuerza
- Cardio
- Core
- Movilidad
- Estiramientos
- Flexibilidad
- Relajación
- Caminata
- Otro

Cada ejercicio base tendrá:
- Nombre
- Categoría
- Tipo recomendado: tiempo o repeticiones
- Material requerido/opcional
- Instrucciones detalladas
- Consejos
- Errores comunes
- Dificultad

Incluye ejercicios de fuerza, cardio, estiramiento, relajación muscular y flexibilidad.

## Entrenamiento activo
- Ejercicios por tiempo: temporizador automático, pasa al siguiente al terminar.
- Ejercicios por repeticiones: el usuario toca siguiente.
- Pausar, saltar y terminar entrenamiento.
- Progreso visual del paso actual.

Al terminar:
- El entrenamiento se guarda.
- Se muestra resumen.
- Intensidad obligatoria: fácil, medio, difícil.
- Notas opcionales.

## Entrenamiento manual
El usuario puede añadir actividad manual:
- Nombre
- Categoría obligatoria
- Duración
- Fecha
- Intensidad obligatoria
- Notas opcionales

## Progreso
- Constancia principal + rendimiento básico.
- Racha actual.
- Mejor racha.
- Entrenamientos esta semana.
- Minutos esta semana.
- Total entrenamientos.
- Total minutos.
- Calendario mensual con días activos.
- Estadísticas por categoría.
- Peso corporal en kg con gráfica simple.

Sin objetivos semanales en MVP.

## Peso corporal
- Registrar peso en kg.
- Fecha.
- Nota opcional.
- Mostrar último peso.
- Cambio desde primer registro.
- Gráfica simple.

## Recordatorios PWA
Recordatorios para entrenar y estirar/movilidad.

Configuración:
- Activar/desactivar.
- Pausar temporalmente.
- Tipos: entrenar, estirar o ambos.
- Días de la semana.
- Hora inicio.
- Hora fin.
- Frecuencia cada X horas.
- No enviar fuera del rango, por ejemplo después de las 23:00.

Limitación: las notificaciones PWA dependen del navegador. Se implementará fallback visual si no están disponibles.

## Modelo de datos previsto
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

## Reglas importantes
- Rutinas personalizadas: borrado suave con `deletedAt`.
- Ejercicios personalizados: privados por usuario; se pueden editar/borrar libremente.
- Historial protegido: `workout_exercises` guarda copia de nombre/datos para no romper registros antiguos.
- Rutinas personalizadas pueden tener familia opcional.
- No favoritos en MVP; usar rutinas recientes calculadas desde historial.

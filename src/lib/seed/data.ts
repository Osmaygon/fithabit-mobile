export const equipmentSeed = [
  ["Sin material", "none", "Ejercicios que solo usan el peso corporal."],
  ["Esterilla", "mat", "Superficie cómoda para suelo, core y estiramientos."],
  ["Silla", "chair", "Apoyo estable para piernas, equilibrio y variantes."],
  ["Mancuernas", "dumbbells", "Carga externa para fuerza."],
  ["Banda elástica", "resistance-band", "Resistencia ligera para fuerza y movilidad."],
  ["Comba", "jump-rope", "Cardio intenso en poco espacio."],
  ["Banco", "bench", "Apoyo para ejercicios de fuerza."],
  ["Kettlebell", "kettlebell", "Carga dinámica para fuerza y cardio."],
  ["Barra de dominadas", "pull-up-bar", "Tren superior y espalda."],
  ["Rueda abdominal", "ab-wheel", "Core avanzado."],
] as const;

export const exercisesSeed = [
  { name: "Sentadilla", slug: "sentadilla", category: "Fuerza", type: "reps", difficulty: "beginner", equipment: ["none"], instructions: "Coloca los pies al ancho de hombros, baja la cadera como si fueras a sentarte y sube empujando el suelo.", tips: "Mantén abdomen activo y mirada al frente.", mistakes: "No hundas rodillas hacia dentro ni levantes talones." },
  { name: "Flexión adaptada", slug: "flexion-adaptada", category: "Tren superior", type: "reps", difficulty: "beginner", equipment: ["none"], instructions: "Apoya rodillas o manos en una superficie elevada. Baja el pecho con control y empuja para volver.", tips: "Cuerpo alineado y codos cerca del torso.", mistakes: "No dejes caer la cadera." },
  { name: "Plancha", slug: "plancha", category: "Core", type: "time", difficulty: "beginner", equipment: ["mat"], instructions: "Apoya antebrazos y puntas de pies. Mantén el cuerpo recto respirando de forma estable.", tips: "Aprieta glúteos y abdomen.", mistakes: "No subas ni hundas la cadera." },
  { name: "Jumping jacks", slug: "jumping-jacks", category: "Cardio", type: "time", difficulty: "beginner", equipment: ["none"], instructions: "Salta abriendo piernas y brazos a la vez; vuelve al centro con ritmo constante.", tips: "Aterriza suave.", mistakes: "No bloquees rodillas al caer." },
  { name: "Puente de glúteos", slug: "puente-gluteos", category: "Fuerza", type: "reps", difficulty: "beginner", equipment: ["mat"], instructions: "Tumbado boca arriba, pies apoyados. Eleva cadera hasta alinear rodillas, cadera y hombros.", tips: "Empuja con talones.", mistakes: "No arquees la zona lumbar." },
  { name: "Mountain climbers", slug: "mountain-climbers", category: "Cardio", type: "time", difficulty: "intermediate", equipment: ["none"], instructions: "Desde posición de plancha, lleva rodillas alternas hacia el pecho con ritmo.", tips: "Mantén hombros sobre muñecas.", mistakes: "No rebotes la cadera en exceso." },
  { name: "Dead bug", slug: "dead-bug", category: "Core", type: "reps", difficulty: "beginner", equipment: ["mat"], instructions: "Boca arriba, brazos arriba y rodillas a 90°. Extiende brazo y pierna contraria sin despegar lumbar.", tips: "Muévete lento.", mistakes: "No arquees la espalda." },
  { name: "Gato-vaca", slug: "gato-vaca", category: "Movilidad", type: "time", difficulty: "beginner", equipment: ["mat"], instructions: "En cuadrupedia, alterna redondear y extender suavemente la espalda.", tips: "Coordina con la respiración.", mistakes: "No fuerces cuello." },
  { name: "Postura del niño", slug: "postura-nino", category: "Relajación", type: "time", difficulty: "beginner", equipment: ["mat"], instructions: "Desde rodillas, lleva cadera hacia talones y brazos al frente. Respira profundo.", tips: "Relaja hombros.", mistakes: "No fuerces si molesta la rodilla." },
  { name: "Estiramiento isquiotibial", slug: "estiramiento-isquios", category: "Estiramientos", type: "time", difficulty: "beginner", equipment: ["mat"], instructions: "Extiende una pierna y flexiona el tronco suavemente hacia el pie manteniendo espalda larga.", tips: "Busca tensión cómoda.", mistakes: "No rebotes." },
  { name: "Mariposa", slug: "mariposa", category: "Flexibilidad", type: "time", difficulty: "beginner", equipment: ["mat"], instructions: "Sentado, junta plantas de los pies y deja caer rodillas hacia los lados con suavidad.", tips: "Respira y mantén espalda alta.", mistakes: "No presiones rodillas con fuerza." },
  { name: "Step-up en silla", slug: "step-up-silla", category: "Fuerza", type: "reps", difficulty: "intermediate", equipment: ["chair"], instructions: "Sube a una silla estable con un pie, extiende cadera y baja con control.", tips: "Usa apoyo firme.", mistakes: "No uses una silla inestable." },
  { name: "Curl con mancuernas", slug: "curl-mancuernas", category: "Tren superior", type: "reps", difficulty: "beginner", equipment: ["dumbbells"], instructions: "Con codos cerca del cuerpo, flexiona brazos levantando mancuernas y baja lento.", tips: "Evita balancearte.", mistakes: "No subas hombros." },
  { name: "Remo con banda", slug: "remo-banda", category: "Tren superior", type: "reps", difficulty: "beginner", equipment: ["resistance-band"], instructions: "Sujeta la banda, tira codos atrás juntando escápulas y vuelve con control.", tips: "Pecho abierto.", mistakes: "No encorves la espalda." },
  { name: "Saltar comba", slug: "saltar-comba", category: "Cardio", type: "time", difficulty: "intermediate", equipment: ["jump-rope"], instructions: "Salta bajo y gira la cuerda con muñecas manteniendo ritmo constante.", tips: "Aterriza suave.", mistakes: "No saltes demasiado alto." },
];

export const routineFamiliesSeed = ["Full Body", "Cardio", "Core", "Piernas", "Tren superior", "Movilidad", "Estiramiento", "Flexibilidad suave"].map((name) => ({
  name,
  slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-"),
  description: `Rutinas de ${name.toLowerCase()} para entrenar en casa.`,
  category: name,
  goal: name.includes("Estir") || name.includes("Movilidad") || name.includes("Flexibilidad") ? "mobility" : "stay_active",
}));

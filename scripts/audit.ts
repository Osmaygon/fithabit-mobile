import { db } from '../src/lib/db';
import { equipment, exercises, routineFamilies, routines, routineSteps } from '../src/lib/db/schema';

async function main() {
  const es = await db.select().from(equipment);
  const xs = await db.select().from(exercises);
  const fs = await db.select().from(routineFamilies);
  const rs = await db.select().from(routines);
  const ss = await db.select().from(routineSteps);
  console.log(JSON.stringify({
    equipment: es.length,
    exercises: xs.length,
    families: fs.length,
    routines: rs.length,
    steps: ss.length,
    routinesWithoutSteps: rs.filter(r => !ss.some(s => s.routineId === r.id)).map(r => r.name),
  }, null, 2));
}
main().catch((e) => { console.error(e); process.exit(1); });

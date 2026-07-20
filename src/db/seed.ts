import { migrate, seed } from "./migrate";

async function main() {
  await migrate();
  await seed();
  console.log("Seed berhasil!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
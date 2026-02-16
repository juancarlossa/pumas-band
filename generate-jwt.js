import bcrypt from "bcryptjs";

const plainPassword = "PumasBand2025!987";

console.log('\n🔐 Generando hash para la contraseña:', plainPassword);
console.log('\nEsto puede tardar unos segundos...\n');

const hash = bcrypt.hashSync(plainPassword, 10);

console.log('✅ Hash generado:');
console.log(hash);
console.log('\n📋 Copia este valor en tu .env como ADMIN_PASSWORD\n');
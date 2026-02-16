import bcrypt from 'bcryptjs';

const plainPassword = "PumasBand2025!987";
const hash = "$2b$10$a3yKpYCaORw1mxQh3JhZ5u13AYInys3IZ3.rRE6ewtsC8coqroeSi";

console.log('\n🔍 Probando bcrypt.compare...\n');
console.log('Contraseña en texto plano:', plainPassword);
console.log('Hash:', hash);
console.log('');

// Probar con compare (async)
bcrypt.compare(plainPassword, hash).then(result => {
    console.log('bcrypt.compare (async):', result ? '✅ MATCH' : '❌ NO MATCH');
});

// Probar con compareSync
const resultSync = bcrypt.compareSync(plainPassword, hash);
console.log('bcrypt.compareSync:', resultSync ? '✅ MATCH' : '❌ NO MATCH');

console.log('\n');

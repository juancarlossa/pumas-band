import bcrypt from 'bcryptjs';

const plainPassword = "test";

console.log('\n🔐 Generando hash para:', plainPassword);
console.log('Longitud de la contraseña:', plainPassword.length);
console.log('\nGenerando hash...\n');

// Usar hashSync igual que en el sistema
const hash = bcrypt.hashSync(plainPassword, 10);

console.log('✅ Hash generado:');
console.log(hash);

// Verificar que el hash funciona
console.log('\n🔍 Verificando hash...');
const isValid = bcrypt.compareSync(plainPassword, hash);
console.log('Verificación:', isValid ? '✅ CORRECTO' : '❌ ERROR');

if (isValid) {
    console.log('\n📋 Copia este hash en tu .env como ADMIN_PASSWORD:');
    console.log(hash);
} else {
    console.log('\n❌ ERROR: El hash no es válido. Intenta de nuevo.');
}

console.log('\n');

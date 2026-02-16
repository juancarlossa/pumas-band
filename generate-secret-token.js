import crypto from 'crypto';

// Genera un token secreto aleatorio de 128 caracteres hexadecimales
const secretToken = crypto.randomBytes(64).toString('hex');

console.log('\n🔑 SECRET_TOKEN generado:\n');
console.log(secretToken);
console.log('\n📋 Copia este valor en tu archivo .env como SECRET_TOKEN\n');

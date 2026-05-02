const bcrypt = require('bcrypt');
const hash = '$2b$10$V/lILSQ7GEPvYYGOJFileew0bOps7bBegKT0P.DgiqhfzWdZfPTWi';

async function testPasswords() {
  const passwordsToTest = ['123456', 'password', 'devtester', 'qwerty'];
  for (const p of passwordsToTest) {
    const match = await bcrypt.compare(p, hash);
    console.log(`Testing ${p}: ${match}`);
  }
}
testPasswords();

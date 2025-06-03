const fs = require('fs');
const path = require('path');

const log = async (event, details) => {
  try {
    const entry = `${new Date().toISOString()} [${event}] ${JSON.stringify(details)}\n`;
    await fs.promises.appendFile(
      path.join(__dirname, 'audit.log'),
      entry,
      { flag: 'a' }
    );
  } catch (err) {
    console.error('Audit log failed:', err);
  }
};

module.exports = { log };
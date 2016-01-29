global.process = global.process || { argv: [] };
console.log(`Hello, ${global.process.argv.join(', ') }. It works!!`);
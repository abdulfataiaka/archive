const {
    usage,
    script,
    command
} = require('./lib/context').call();

if(command === 'install') script.install();
else if(command === 'build') script.build();
else if(command === 'watch') script.watch();
else console.error(usage);

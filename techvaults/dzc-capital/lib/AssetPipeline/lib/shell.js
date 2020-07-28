const { spawn } = require('child_process');

class Shell {
    static exec(command) {
        const exploded = Shell.explode(command);

        const proc = spawn(exploded[0], exploded.splice(1), {
            shell: true
        });

        proc.stdout.setEncoding('utf-8');
        proc.stderr.setEncoding('utf-8');

        proc.stdout.on('data', data => console.debug(data));
        proc.stderr.on('data', data => console.debug(data));
    }

    static explode(command) {
        return command.split(' ')
            .map(item => item.trim())
            .filter(item => item !== '');
    }
}

module.exports = Shell;

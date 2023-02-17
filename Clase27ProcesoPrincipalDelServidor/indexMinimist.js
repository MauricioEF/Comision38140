import minimist from 'minimist';

const args = minimist(process.argv.slice(2),{
    alias: {m:"mode", p:"port", d:"debug"},
    default: {m:"prod",p:0, d:false}
})

const config = {
    mode: args.mode,
    port: args.port,
    debug: args.debug,
    other: args._
}


console.log(config);
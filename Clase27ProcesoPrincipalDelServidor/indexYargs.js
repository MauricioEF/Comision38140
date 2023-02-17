import yargs from "yargs";

const yargsInstance = yargs(process.argv.slice(2))
.alias({
    m:'mode',
    p:'port',
    d:'debug'
})
.default({
    m:'prod',
    p:0,
    d:false
})

const args = yargsInstance.argv

const config = {
    mode: args.mode,
    port: args.port,
    debug: args.debug,
    other: args._
}

console.log(config);

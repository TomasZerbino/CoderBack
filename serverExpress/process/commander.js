const commander = require("commander");

const program = new commander.Command();

program
  .option("-d", "Variable para debug", false)
  .option("-p", "Puerto para el servidor", 8080)
  .option("--mode <mode>", "Modo de trabajo", "production")
  .requiredOption(
    "-u <user>",
    "Usuario utilizando appicativo",
    "No se ha declarado un usuario"
  )
  .option("-l", "--letters [letter...]", "specify the letters");

program.parse();

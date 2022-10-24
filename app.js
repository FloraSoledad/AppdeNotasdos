const process = require("process");
const {
  leerArchivo,
  guardarTarea,
  crearTarea,
  filtrarPorEstado,
  actualizarEstado,
  listarTareas,
  eliminarTarea,
} = require("./funcionesDeTareas");
const tareas = leerArchivo();
const accion = process.argv[2];
/* const titulo = process.argv[3]; */
/* console.log(accion) */
switch (accion) {
  case "listar":
    listarTareas(tareas);

    break;
  case "crear":
    let nuevaTarea = new crearTarea(process.argv[3].trim());
    guardarTarea(nuevaTarea);
    break;

  case "filtrar":
    let tareasFiltradas = filtrarPorEstado(process.argv[3]);

    listarTareas(tareasFiltradas);

    break;

  case "actualizar":
    actualizarEstado(process.argv[3], process.argv[4]);

    break;

    case "eliminar":
           eliminarTarea(process.argv[3]);


  case undefined:
    console.log("______________________________________");
    console.log("Atención - Tienes que pasar una acción");
    console.log("______________________________________");
    break;

  default:
    console.log("_____________________________");
    console.log("No entiendo que queres hacer.");
    console.log("_____________________________");
}

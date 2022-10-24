const fs = require('fs')

const leerArchivo = function () {
        let tareas = fs.readFileSync("./tareas.json",'utf-8');
        return JSON.parse(tareas);
    };
    const listarTareas = function(tareas){
        console.log("______________________________________");
        tareas.forEach((tarea, i) => {
            console.log(`(${i + 1}) ${tarea.titulo} --> ${tarea.estado}`);
        });
        console.log("______________________________________");

    }

    const escribirJSON = function(tareas){
        let tareasStringify = JSON.stringify(tareas, null, 3);
        fs.writeFileSync("./tareas.json", tareasStringify,'utf-8');
    };

    const crearTarea = function (titulo){
        this.titulo = titulo;
        this.estado = "pendiente";
    };

    const guardarTarea = function(tarea) {
        let tareas = leerArchivo();
        tareas.push(tarea);
        escribirJSON(tareas);
    };

    const filtrarPorEstado = function(estado){
        let tareas = leerArchivo();
        let tareasFiltradas = tareas.filter(tarea => tarea.estado === estado);
        return tareasFiltradas
    }

    const actualizarEstado = function(titulo,nuevoEstado){
        let tareas = leerArchivo();

        let tarea = tareas.find(tarea => tarea.titulo === titulo);

        if(!tarea){
            return console.log(`
            *****************************************
            No existe la tarea: "${titulo}"
            *****************************************
            `)
        }


        let tareasActualizadas = tareas.map(tarea => {
            if (tarea.titulo === titulo){
                return {
                    titulo,
                    estado : nuevoEstado
                }
            }
            return tarea
        })

        escribirJSON(tareasActualizadas);
        return listarTareas (tareasActualizadas);
    }

    const eliminarTarea = function(titulo){
        
        let tareas = leerArchivo();

        let tarea =buscarTarea(titulo)

        if(tarea){
        
        let tareasParaGuardar = tarea.filter(tarea => tarea.titulo !== titulo)

        escribirJSON(tareasParaGuardar);
        return listarTareas (tareasParaGuardar);
    }
    return null
     }

    const buscarTarea = function(titulo) {
        let tareas = leerArchivo();
        
        let tarea = tareas.find(tarea => tarea.titulo === titulo);

        if(tarea){
            return true
        }else{
            return console.log(`
            *****************************************
            No existe la tarea: "${titulo}"
            *****************************************
            `)
        }
    }

module.exports = {
    leerArchivo,
    escribirJSON,
    crearTarea,
    guardarTarea,
    filtrarPorEstado,
    listarTareas,
    actualizarEstado,
    eliminarTarea
};
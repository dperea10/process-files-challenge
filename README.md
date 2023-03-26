# Process Files Excels.

_CHALLENGE BACKEND_

_Se desea crear un servicio de carga de excels con validación de formato y notificación de procesamiento._

_El servicio debe presentar una api con un endpoint que permita hacer un upload de un archivo excel conjunto a un formato de mapeo que deberá respetar y una callback para informar cuando el archivo pasa de estado._

_Al subir el excel, se deberá retornar un id haciendo referencia a la tarea de carga._

_Se deberá permitir recuperar el estado de dicha tarea la cual permitirá saber si el excel está en estado “pending” si todavía no se está procesando el archivo, “processing” o “done” e informar en “errors” la cantidad de errores encontrados en el archivo. Se deberá permitir recuperar los errores del archivo de forma paginada, indicando la fila y columna que ocasionó el error_


## Trabajo realizado

_- Se Crean tres enpoint uno de permisos (token de consumo), un post y un get_

_- Se carga un file con un formato establecido y se procesa en dos parte a nivel de base de datos_

_- Se validan los enpoints_

_- Se trabaja con docker para la creacion de los ambientes necesarios para ejecutar el proyecto_

_- Se trabaja con NodeJs, Mongo, ExpressJs y TypeScrips_

_- Los servicios estan en postman, y los archivos en la raiz del proyecto._


## Iniciemos 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Tener instalado lo siguiente:_
_Node_
_Npm (en mi caso trabajé coon la Versión 14)_
_Docker_

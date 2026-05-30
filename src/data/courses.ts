export interface Lesson {
  id: string;
  title: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  explanation: string;
  type: 'quiz' | 'code';
  initialCode?: string;
  expectedOutput?: string;
  language?: string;
  hints?: {
    what: string;
    how: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  xpTotal: number;
  color: string;
  icon: string;
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: 'python',
    title: 'Python para Principiantes',
    description: 'Aprende los fundamentos del lenguaje más popular del mundo.',
    lessonsCount: 15,
    xpTotal: 1500,
    color: 'accent',
    icon: 'code',
    lessons: [
      {
        id: 'python-0',
        title: '¿Qué es la Programación?',
        type: 'quiz',
        question: 'En términos simples, ¿qué es un programa de computadora?',
        options: [
          'Un componente físico como el teclado',
          'Una serie de instrucciones que la computadora ejecuta',
          'Una página de internet para buscar información',
          'Un sistema para enfriar el procesador'
        ],
        correctIndex: 1,
        explanation: 'Programar es como escribir una receta: le das una lista de pasos o instrucciones a la computadora para que realice una tarea específica.'
      },
      {
        id: 'python-1',
        title: 'Tu primera instrucción',
        type: 'code',
        language: 'python',
        question: 'Escribe un programa que muestre el mensaje "Hola Mundo" en la pantalla.',
        initialCode: '# Escribe tu código aquí\n',
        expectedOutput: 'print("Hola Mundo")',
        hints: {
          what: 'Debes usar la función encargada de mostrar mensajes en la consola de Python.',
          how: 'Escribe la palabra "print", seguida de paréntesis, y dentro de los paréntesis pon el texto entre comillas: print("Hola Mundo")'
        },
        explanation: 'La función `print()` es la forma más básica de comunicarnos con el mundo exterior desde nuestro código Python.'
      },
      {
        id: 'python-2',
        title: 'Guardando información',
        type: 'quiz',
        question: '¿Para qué sirve una "variable" en programación?',
        options: [
          'Para ejecutar el código más rápido',
          'Para guardar un dato y poder usarlo más adelante',
          'Para cambiar el nombre del programa',
          'Para mostrar un error en la pantalla'
        ],
        correctIndex: 1,
        explanation: 'Imagina una variable como una caja con un nombre donde puedes guardar datos para no olvidarlos.'
      },
      {
        id: 'python-3',
        title: 'Números en Python',
        type: 'code',
        language: 'python',
        question: 'Crea una variable llamada "puntos" y asígnale el valor 100.',
        initialCode: '# Tu código aquí\n',
        expectedOutput: 'puntos = 100',
        hints: {
          what: 'Usa el signo "=" para asignar un valor a un nombre.',
          how: 'Escribe el nombre de la variable (puntos), el signo igual, y el número 100: puntos = 100'
        },
        explanation: 'En Python, crear variables es directo: nombre = valor.'
      },
      {
        id: 'python-4',
        title: 'Operaciones Matemáticas',
        type: 'quiz',
        question: '¿Qué símbolo usamos para multiplicar dos números en Python?',
        options: ['x', 'X', '*', '•'],
        correctIndex: 2,
        explanation: 'El asterisco (*) es el operador estándar para la multiplicación en casi todos los lenguajes de programación.'
      },
      {
        id: 'python-5',
        title: 'Suma de Variables',
        type: 'code',
        language: 'python',
        question: 'Suma 5 + 5 usando la función print para ver el resultado.',
        initialCode: '# Suma aquí\n',
        expectedOutput: 'print(5+5)',
        hints: {
          what: 'Puedes hacer cálculos directamente dentro de los paréntesis del print.',
          how: 'Escribe print(5 + 5)'
        },
        explanation: 'Python puede realizar cálculos matemáticos instantáneamente.'
      },
      {
        id: 'python-6',
        title: 'Texto y Comillas',
        type: 'quiz',
        question: '¿Por qué el texto en Python debe ir entre comillas?',
        options: [
          'Para que se vea de otro color',
          'Para que Python sepa que es texto literal y no el nombre de una variable',
          'Para que el programa sea más seguro',
          'Para que ocupe menos espacio'
        ],
        correctIndex: 1,
        explanation: 'Las comillas le indican al intérprete: "Esto es texto puro, no intentes ejecutarlo como código".'
      },
      {
        id: 'python-7',
        title: 'Repaso de Fundamentos',
        type: 'quiz',
        question: '¿Cuál es el orden correcto para crear una variable?',
        options: [
          'Valor = Nombre',
          'Variable (Nombre, Valor)',
          'Nombre = Valor',
          'Crear Nombre : Valor'
        ],
        correctIndex: 2,
        explanation: 'Siempre ponemos el nombre a la izquierda, el signo igual en el medio y el contenido a la derecha.'
      },
      {
        id: 'python-8',
        title: 'Entrada de datos',
        type: 'quiz',
        question: '¿Qué función usamos para pedirle al usuario que escriba algo?',
        options: ['ask()', 'input()', 'get()', 'write()'],
        correctIndex: 1,
        explanation: 'input() detiene el programa y espera a que el usuario escriba algo en el teclado.'
      },
      {
        id: 'python-9',
        title: 'Tu primer input',
        type: 'code',
        language: 'python',
        question: 'Pide el nombre del usuario usando input() y guárdalo en una variable llamada "nombre".',
        initialCode: '# Tu código aquí\n',
        expectedOutput: 'nombre = input()',
        hints: {
          what: 'Asigna el resultado de la función input() a la variable nombre.',
          how: 'Escribe nombre = input()'
        },
        explanation: 'Ahora tu programa puede interactuar con las personas.'
      },
      {
        id: 'python-10',
        title: 'Tomando Decisiones',
        type: 'quiz',
        question: '¿Qué palabra clave usamos para crear una condición (Si pasa esto...)?',
        options: ['when', 'case', 'if', 'maybe'],
        correctIndex: 2,
        explanation: 'if (si en inglés) es la base de la lógica: si se cumple una condición, ejecuta el código.'
      },
      {
        id: 'python-11',
        title: 'El bloque IF',
        type: 'code',
        language: 'python',
        question: 'Crea un IF que compruebe si puntos es igual a 100.',
        initialCode: 'puntos = 100\n',
        expectedOutput: 'if puntos == 100:',
        hints: {
          what: 'Usa doble igual (==) para comparar y no olvides los dos puntos al final.',
          how: 'Escribe if puntos == 100:'
        },
        explanation: 'En Python, la comparación usa == y los bloques de código terminan con :.'
      },
      {
        id: 'python-12',
        title: 'Listas de cosas',
        type: 'quiz',
        question: '¿Cómo representamos una lista en Python?',
        options: ['(1, 2, 3)', '{1, 2, 3}', '[1, 2, 3]', '<1, 2, 3>'],
        correctIndex: 2,
        explanation: 'Los corchetes [] se usan para definir listas, que pueden guardar múltiples elementos.'
      },
      {
        id: 'python-13',
        title: 'Creando una Lista',
        type: 'code',
        language: 'python',
        question: 'Crea una lista llamada "frutas" con "manzana" y "pera".',
        initialCode: '',
        expectedOutput: 'frutas = ["manzana", "pera"]',
        hints: {
          what: 'Usa corchetes y separa los textos con comas.',
          how: 'Escribe frutas = ["manzana", "pera"]'
        },
        explanation: 'Las listas permiten organizar grupos de datos relacionados.'
      },
      {
        id: 'python-14',
        title: 'Repetir tareas (Loops)',
        type: 'quiz',
        question: '¿Qué bucle usamos comúnmente para recorrer una lista?',
        options: ['loop', 'for', 'repeat', 'during'],
        correctIndex: 1,
        explanation: 'El bucle for es ideal para iterar sobre cada elemento de una colección.'
      }
    ]
  },
  {
    id: 'web',
    title: 'Desarrollo Web Moderno',
    description: 'HTML, CSS y JavaScript desde cero hasta crear apps reales.',
    lessonsCount: 12,
    xpTotal: 1200,
    color: 'secondary',
    icon: 'book',
    lessons: [
      {
        id: 'web-0',
        title: '¿Cómo funciona el internet?',
        type: 'quiz',
        question: '¿Qué hace un "Navegador" (como Chrome o Safari) con una página web?',
        options: [
          'Almacena todas las imágenes de internet',
          'Traduce el código y lo muestra de forma visual',
          'Permite escribir el código de la página',
          'Aumenta la velocidad de conexión'
        ],
        correctIndex: 1,
        explanation: 'El navegador es el intérprete que lee archivos de texto (código) y los dibuja en tu pantalla.'
      },
      {
        id: 'web-1',
        title: 'El Esqueleto: HTML',
        type: 'code',
        language: 'html',
        question: 'Crea un encabezado de nivel 1 con el texto "Mi Página".',
        initialCode: '<!-- Escribe tu HTML aquí -->\n',
        expectedOutput: '<h1>Mi Página</h1>',
        hints: {
          what: 'Necesitas usar la etiqueta de título más importante de HTML.',
          how: 'Abre la etiqueta con <h1>, escribe el texto "Mi Página" y no olvides cerrar la etiqueta con </h1>'
        },
        explanation: 'La etiqueta <h1> define el título más importante de una página web.'
      },
      {
        id: 'web-2',
        title: 'Listas en HTML',
        type: 'code',
        language: 'html',
        question: 'Crea un elemento de lista (li) con el texto "Primer paso".',
        initialCode: '<ul>\n  \n</ul>',
        expectedOutput: '<li>Primer paso</li>',
        hints: {
          what: 'Usa la etiqueta "li" dentro del bloque "ul".',
          how: 'Escribe <li>Primer paso</li> dentro de las etiquetas <ul>.'
        },
        explanation: '<li> significa List Item y se usa para cada elemento de una lista.'
      },
      {
        id: 'web-3',
        title: 'Enlaces Web',
        type: 'code',
        language: 'html',
        question: 'Crea un enlace (a) que diga "Ir a Google".',
        initialCode: '',
        expectedOutput: '<a>Ir a Google</a>',
        hints: {
          what: 'Usa la etiqueta <a> para crear hipervínculos.',
          how: 'Escribe <a>Ir a Google</a>'
        },
        explanation: 'La etiqueta <a> permite conectar una página con otra.'
      },
      {
        id: 'web-4',
        title: '¿Qué es CSS?',
        type: 'quiz',
        question: '¿Cuál es el propósito principal de CSS?',
        options: [
          'Crear la base de datos',
          'Definir la estructura del texto',
          'Controlar el diseño, colores y apariencia visual',
          'Enviar correos electrónicos'
        ],
        correctIndex: 2,
        explanation: 'CSS (Cascading Style Sheets) es el lenguaje de diseño para la web.'
      },
      {
        id: 'web-5',
        title: 'Colores en CSS',
        type: 'code',
        language: 'css',
        question: 'Cambia el color del texto a rojo (red) para los elementos h1.',
        initialCode: 'h1 {\n  \n}',
        expectedOutput: 'color: red;',
        hints: {
          what: 'Usa la propiedad "color" dentro de las llaves.',
          how: 'Escribe color: red; dentro del bloque h1.'
        },
        explanation: 'La propiedad color define el color de la fuente en CSS.'
      },
      {
        id: 'web-6',
        title: 'Tamaño de fuente',
        type: 'code',
        language: 'css',
        question: 'Cambia el tamaño de fuente a 20px para los párrafos (p).',
        initialCode: 'p {\n  \n}',
        expectedOutput: 'font-size: 20px;',
        hints: {
          what: 'Usa la propiedad font-size.',
          how: 'Escribe font-size: 20px; dentro de las llaves del selector p.'
        },
        explanation: 'font-size controla qué tan grande o pequeño se ve el texto.'
      },
      {
        id: 'web-7',
        title: 'Márgenes en CSS',
        type: 'quiz',
        question: '¿Qué propiedad añade espacio FUERA del borde de un elemento?',
        options: ['padding', 'spacing', 'margin', 'border-out'],
        correctIndex: 2,
        explanation: 'Margin crea espacio alrededor de los elementos, separándolos de sus vecinos.'
      },
      {
        id: 'web-8',
        title: 'JavaScript: La lógica',
        type: 'quiz',
        question: '¿Para qué sirve JavaScript en una web?',
        options: [
          'Para que la web sea interactiva (botones, animaciones, datos)',
          'Para que la web cargue más lento',
          'Para diseñar el logo',
          'Para comprar el dominio'
        ],
        correctIndex: 0,
        explanation: 'JS le da "vida" a la página, permitiendo que responda a las acciones del usuario.'
      },
      {
        id: 'web-9',
        title: 'Variables en JS',
        type: 'code',
        language: 'javascript',
        question: 'Crea una variable constante llamada "precio" con el valor 50.',
        initialCode: '',
        expectedOutput: 'const precio = 50;',
        hints: {
          what: 'Usa la palabra clave const seguida del nombre y el valor.',
          how: 'Escribe const precio = 50;'
        },
        explanation: 'En JavaScript moderno, usamos const para valores que no cambian.'
      },
      {
        id: 'web-10',
        title: 'Funciones en JS',
        type: 'quiz',
        question: '¿Qué es una función en JavaScript?',
        options: [
          'Un tipo de variable especial',
          'Un bloque de código reutilizable que realiza una tarea',
          'Un error del sistema',
          'Una imagen animada'
        ],
        correctIndex: 1,
        explanation: 'Las funciones te permiten escribir código una vez y usarlo muchas veces.'
      },
      {
        id: 'web-11',
        title: 'Llamar a una función',
        type: 'code',
        language: 'javascript',
        question: 'Llama a una función llamada "saludar".',
        initialCode: '',
        expectedOutput: 'saludar();',
        hints: {
          what: 'Escribe el nombre de la función seguido de paréntesis.',
          how: 'Escribe saludar();'
        },
        explanation: 'Los paréntesis indican a JavaScript que debe "ejecutar" la función ahora mismo.'
      }
    ]
  },
  {
    id: 'sql',
    title: 'SQL y Bases de Datos',
    description: 'Domina el manejo de datos con PostgreSQL y consultas complejas.',
    lessonsCount: 10,
    xpTotal: 1000,
    color: 'success',
    icon: 'database',
    lessons: [
      {
        id: 'sql-0',
        title: '¿Qué es una Base de Datos?',
        type: 'quiz',
        question: '¿Cuál es la función principal de una base de datos?',
        options: [
          'Hacer que la computadora funcione mejor',
          'Almacenar y organizar información de forma estructurada',
          'Crear documentos de texto y presentaciones',
          'Proteger la computadora de virus'
        ],
        correctIndex: 1,
        explanation: 'Las bases de datos son como archivadores digitales gigantes donde las empresas guardan todo, desde usuarios hasta inventarios.'
      },
      {
        id: 'sql-1',
        title: 'Seleccionar Datos',
        type: 'code',
        language: 'sql',
        question: 'Selecciona todas las columnas de la tabla "usuarios".',
        initialCode: '-- Escribe tu consulta aquí\n',
        expectedOutput: 'SELECT * FROM usuarios',
        hints: {
          what: 'Usa el comando SELECT y el asterisco para todas las columnas.',
          how: 'Escribe SELECT * FROM usuarios'
        },
        explanation: 'El asterisco (*) actúa como un comodín para decir "tráeme todo".'
      },
      {
        id: 'sql-2',
        title: 'Filtrar con WHERE',
        type: 'code',
        language: 'sql',
        question: 'Selecciona los usuarios donde el pais sea "Mexico".',
        initialCode: 'SELECT * FROM usuarios\n',
        expectedOutput: 'WHERE pais = "Mexico"',
        hints: {
          what: 'Añade la cláusula WHERE al final.',
          how: 'Escribe WHERE pais = "Mexico"'
        },
        explanation: 'WHERE es el filtro maestro de SQL.'
      },
      {
        id: 'sql-3',
        title: '¿Qué es una Primary Key?',
        type: 'quiz',
        question: '¿Para qué sirve una Llave Primaria (Primary Key)?',
        options: [
          'Para abrir la base de datos',
          'Para identificar de forma única cada fila en una tabla',
          'Para encriptar la contraseña',
          'Para borrar los datos'
        ],
        correctIndex: 1,
        explanation: 'Como un DNI o pasaporte, la PK asegura que no haya dos registros iguales.'
      },
      {
        id: 'sql-4',
        title: 'Ordenar resultados',
        type: 'code',
        language: 'sql',
        question: 'Ordena los usuarios por "edad" de forma ascendente.',
        initialCode: 'SELECT * FROM usuarios\n',
        expectedOutput: 'ORDER BY edad ASC',
        hints: {
          what: 'Usa la cláusula ORDER BY.',
          how: 'Escribe ORDER BY edad ASC'
        },
        explanation: 'ORDER BY te permite organizar los datos alfabéticamente o numéricamente.'
      },
      {
        id: 'sql-5',
        title: 'Insertar datos',
        type: 'quiz',
        question: '¿Qué comando se usa para añadir una nueva fila a una tabla?',
        options: ['ADD ROW', 'INSERT INTO', 'NEW DATA', 'UPDATE'],
        correctIndex: 1,
        explanation: 'INSERT INTO es el comando estándar para agregar información nueva.'
      },
      {
        id: 'sql-6',
        title: 'Actualizar registros',
        type: 'code',
        language: 'sql',
        question: 'Cambia el nombre a "Juan" en la tabla usuarios.',
        initialCode: '',
        expectedOutput: 'UPDATE usuarios SET nombre = "Juan"',
        hints: {
          what: 'Usa UPDATE seguido de SET.',
          how: 'Escribe UPDATE usuarios SET nombre = "Juan"'
        },
        explanation: 'UPDATE permite modificar datos que ya existen en la base de datos.'
      },
      {
        id: 'sql-7',
        title: 'Borrar datos',
        type: 'quiz',
        question: '¿Qué sucede si usas DELETE sin un WHERE?',
        options: [
          'Se borra solo la primera fila',
          'Se borran todos los datos de la tabla',
          'El programa da un error y no hace nada',
          'Se borra la tabla completa'
        ],
        correctIndex: 1,
        explanation: '¡Cuidado! Sin WHERE, DELETE vacía toda la tabla.'
      },
      {
        id: 'sql-8',
        title: 'Contar registros',
        type: 'code',
        language: 'sql',
        question: 'Cuenta cuántos usuarios hay en total.',
        initialCode: '',
        expectedOutput: 'SELECT COUNT(*) FROM usuarios',
        hints: {
          what: 'Usa la función COUNT().',
          how: 'Escribe SELECT COUNT(*) FROM usuarios'
        },
        explanation: 'COUNT() es una función de agregación que devuelve el número de filas.'
      },
      {
        id: 'sql-9',
        title: 'Relacionar tablas',
        type: 'quiz',
        question: '¿Qué comando se usa para combinar filas de dos o más tablas?',
        options: ['COMBINE', 'MERGE', 'JOIN', 'CONNECT'],
        correctIndex: 2,
        explanation: 'JOIN es la magia de SQL que permite relacionar datos de diferentes tablas.'
      }
    ]
  },
  {
    id: 'ai',
    title: 'Introducción a la IA',
    description: 'Prompt engineering y cómo usar modelos de lenguaje en tus apps.',
    lessonsCount: 8,
    xpTotal: 800,
    color: 'warning',
    icon: 'brain',
    lessons: [
      {
        id: 'ai-0',
        title: '¿Qué es la IA?',
        type: 'quiz',
        question: '¿Qué intenta lograr la Inteligencia Artificial moderna?',
        options: [
          'Reemplazar el hardware de la computadora',
          'Realizar tareas que normalmente requieren inteligencia humana',
          'Aumentar la capacidad de almacenamiento',
          'Hacer que los programas sean más pesados'
        ],
        correctIndex: 1,
        explanation: 'La IA usa matemáticas y datos para aprender a reconocer patrones y tomar decisiones, igual que nosotros.'
      },
      {
        id: 'ai-1',
        title: '¿Qué es un Prompt?',
        type: 'quiz',
        question: 'En el contexto de IA, ¿qué es un "Prompt"?',
        options: [
          'Un tipo de virus',
          'La instrucción o texto que le das a la IA para obtener una respuesta',
          'La velocidad de la tarjeta de video',
          'Un lenguaje de programación nuevo'
        ],
        correctIndex: 1,
        explanation: 'El prompt es la forma en que nos comunicamos con los modelos de lenguaje.'
      },
      {
        id: 'ai-2',
        title: 'Tu primer Prompt',
        type: 'code',
        language: 'text',
        question: 'Escribe un prompt que le pida a la IA que actúe como un chef.',
        initialCode: '',
        expectedOutput: 'Actúa como un chef',
        hints: {
          what: 'Dale una instrucción clara de rol a la IA.',
          how: 'Escribe: Actúa como un chef'
        },
        explanation: 'Asignar un rol ayuda a la IA a dar respuestas más precisas y contextuales.'
      },
      {
        id: 'ai-3',
        title: 'Alucinaciones de IA',
        type: 'quiz',
        question: '¿Qué es una "alucinación" en un modelo de IA?',
        options: [
          'Cuando la IA se apaga sola',
          'Cuando la IA inventa información falsa con mucha seguridad',
          'Cuando la pantalla brilla mucho',
          'Cuando la IA habla en otro idioma'
        ],
        correctIndex: 1,
        explanation: 'Debido a que predicen la siguiente palabra, a veces las IAs crean hechos que no existen.'
      },
      {
        id: 'ai-4',
        title: 'Contexto en Prompts',
        type: 'quiz',
        question: '¿Por qué es importante dar contexto a la IA?',
        options: [
          'Para que la IA no se aburra',
          'Para que la respuesta sea más relevante y precisa',
          'Para que la IA aprenda tu nombre',
          'Para gastar menos energía'
        ],
        correctIndex: 1,
        explanation: 'Cuanta más información relevante des, menos margen de error tiene la IA.'
      },
      {
        id: 'ai-5',
        title: 'Zero-shot Prompting',
        type: 'quiz',
        question: '¿Qué significa "Zero-shot" en prompting?',
        options: [
          'Pedir algo sin dar ejemplos previos',
          'No obtener ninguna respuesta',
          'Borrar la memoria de la IA',
          'Usar la IA sin internet'
        ],
        correctIndex: 0,
        explanation: 'Zero-shot es cuando le pides una tarea directamente a la IA confiando en su conocimiento base.'
      },
      {
        id: 'ai-6',
        title: 'Few-shot Prompting',
        type: 'code',
        language: 'text',
        question: 'Escribe un ejemplo de clasificación: Perro -> Animal, Mesa -> ',
        initialCode: 'Perro -> Animal, Mesa -> ',
        expectedOutput: 'Mueble',
        hints: {
          what: 'Completa la analogía de categoría.',
          how: 'Escribe: Mueble'
        },
        explanation: 'Dar ejemplos (Few-shot) ayuda enormemente a la IA a entender el formato que esperas.'
      },
      {
        id: 'ai-7',
        title: 'Iteración de Prompts',
        type: 'quiz',
        question: '¿Qué debes hacer si la IA no te da la respuesta que esperas a la primera?',
        options: [
          'Dejar de usarla',
          'Refinar y mejorar el prompt con más detalles',
          'Reiniciar la computadora',
          'Escribir lo mismo en mayúsculas'
        ],
        correctIndex: 1,
        explanation: 'El "Prompt Engineering" es un proceso iterativo de prueba y error.'
      }
    ]
  }
];

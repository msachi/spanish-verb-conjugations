import select from '@inquirer/select';
import input from '@inquirer/input';

const verbs = {
  regAR: {
    description: '-AR verbs (regular)',
    list: [ 'bailar', 'bajar', 'caminar', 'cantar', 'cocinar', 'comprar', 'contestar', 'descansar', 'entrar', 'escuchar', 'estudiar', 'ganar', 'hablar', 'limpiar', 'llegar', 'llevar', 'mirar', 'nadar', 'pasar', 'practicar', 'regresar', 'tocar', 'tomar', 'trabajar', 'viajar' ]
  },
  irregAR: {
    description: '-AR verbs (irregular)',
    list: [ 'almorzar', 'cerrar', 'empezar', 'encontrar', 'jugar', 'pensar', 'recordar' ]
  },
  allAR: {
    description: '-AR verbs (all)',
    list: []
  },
  regER: {
    description: '-ER verbs (regular)',
    list: [ 'aprender', 'beber', 'comer', 'comprender', 'correr', 'deber', 'leer', 'meter', 'prender', 'romper', 'vender' ]
  },
  irregER: {
    description: '-ER verbs (irregular)',
    list: [ 'devolver', 'entender', 'hacer', 'perder', 'poder', 'poner', 'querer', 'saber', 'tener', 'ver', 'volver' ]
  },
  allER: {
    description: '-ER verbs (all)',
    list: []
  },
  regIR: {
    description: '-IR verbs (regular)',
    list: [ 'abrir', 'compartir', 'decidir', 'describir', 'discutir', 'escribir', 'recibir', 'subir', 'sufrir', 'vivir' ]
  }
};

const forms = [ 'yo', 'tú', 'el / ella / usted', 'nosotros', 'vosotros', 'ellos / ellas / ustedes'];

const conjugations = {
  // Regular -AR verbs
  bailar: [ 'bailo', 'bailas', 'baila', 'bailamos', 'bailáis', 'bailan' ],
  bajar: [ 'bajo', 'bajas', 'baja', 'bajamos', 'bajáis', 'bajan' ],
  caminar: [ 'camino', 'caminas', 'camina', 'caminamos', 'camináis', 'caminan' ],
  cantar: [ 'canto', 'cantas', 'canta', 'cantamos', 'cantáis', 'cantan' ],
  cocinar: [ 'cocino', 'cocinas', 'cocina', 'cocinamos', 'cocináis', 'cocinan' ],
  comprar: [ 'compro', 'compras', 'compra', 'compramos', 'compráis', 'compran' ],
  contestar: [ 'contesto', 'contestas', 'contesta', 'contestamos', 'contestáis', 'contestan' ],
  descansar: [ 'descanso', 'descansas', 'descansa', 'descansamos', 'descansáis', 'descansan' ],
  entrar: [ 'entro', 'entras', 'entra', 'entramos', 'entráis', 'entran' ],
  escuchar: [ 'escucho', 'escuchas', 'escucha', 'escuchamos', 'escucháis', 'escuchan' ],
  estudiar: [ 'estudio', 'estudias', 'estudia', 'estudiamos', 'estudiáis', 'estudian' ],
  ganar: [ 'gano', 'ganas', 'gana', 'ganamos', 'ganáis', 'ganan' ],
  hablar: [ 'hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan' ],
  limpiar: [ 'limpio', 'limpias', 'limpia', 'limpiamos', 'limpiáis', 'limpian' ],
  llegar: [ 'llego', 'llegas', 'llega', 'llegamos', 'llegáis', 'llegan' ],
  llevar: [ 'llevo', 'llevas', 'lleva', 'llevamos', 'lleváis', 'llevan' ],
  mirar: [ 'miro', 'miras', 'mira', 'miramos', 'miráis', 'miran' ],
  nadar: [ 'nado', 'nadas', 'nada', 'nadamos', 'nadáis', 'nadan' ],
  pasar: [ 'paso', 'pasas', 'pasa', 'pasamos', 'pasáis', 'pasan' ],
  practicar: [ 'practico', 'practicas', 'practica', 'practicamos', 'practicáis', 'practican' ],
  regresar: [ 'regreso', 'regresas', 'regresa', 'regresamos', 'regresáis', 'regresan' ],
  tocar: [ 'toco', 'tocas', 'toco', 'tocamos', 'tocáis', 'tocan' ],
  tomar: [ 'tomo', 'tomas', 'toma', 'tomamos', 'tomáis', 'toman' ],
  trabajar: [ 'trabajo', 'trabajas', 'trabaja', 'trabajamos', 'trabajáis', 'trabajan' ],
  viajar: [ 'viajo', 'viajas', 'viaja', 'viajamos', 'viajáis', 'viajan' ],
  // Irregular -AR verbs ( e > ie)
  cerrar: [ 'cierro', 'cierras', 'cierra', 'cerramos', 'cerráis', 'cierran' ],
  empezar: [ 'empiezo', 'empiezas', 'empieza', 'empezamos', 'empezáis', 'empiezan' ],
  pensar: [ 'pienso', 'piensas', 'piensa', 'pensamos', 'pensáis', 'piensan' ],
  // Irregular -AR verbs ( o / u > ue)
  almorzar: [ 'almuerzo', 'almuerzas', 'almuerza', 'almorzamos', 'almorzáis', 'almuerzan' ],
  encontrar: [ 'encuentro', 'encuentras', 'encuentra', 'encontramos', 'encontráis', 'encuentran' ],
  recordar: [ 'recuerdo', 'recuerdas', 'recuerda', 'recordamos', 'recordáis', 'recuerdan' ],
  jugar: [ 'juego', 'juegas', 'juega', 'jugamos', 'jugáis', 'juegan' ],
  // Regular -ER verbs
  aprender: [ 'aprendo', 'aprendes', 'aprende', 'aprendemos', 'aprendéis', 'aprenden' ],
  beber: [ 'bebo', 'bebes', 'bebe', 'bebemos', 'bebéis', 'beben'],
  comer: [ 'como', 'comes', 'come', 'comemos', 'coméis', 'comen' ],
  comprender: [ 'comprendo', 'comprendes', 'comprende', 'comprendemos', 'comprendéis', 'comprenden' ],
  correr: [ 'corro', 'corres', 'corre', 'corremos', 'corréis', 'corren' ],
  deber: [ 'debo', 'debes', 'debe', 'debemos', 'debéis', 'deben' ],
  leer: [ 'leo', 'lees', 'lee', 'leemos', 'leéis', 'leen' ],
  meter: [ 'meteo', 'metes', 'mete', 'metemos', 'metéis', 'meten' ],
  prender: [ 'prendo', 'prendes', 'prende', 'prendemos', 'prendéis', 'prenden' ],
  romper: [ 'rompo', 'rompes', 'rompe', 'rompemos', 'rompéis', 'rompen' ],
  vender: [ 'vendo', 'vendes', 'vende', 'vendemos', 'vendéis', 'venden' ],
  // Irregular -ER verbs (e > ie)
  entender: [ 'entiendo', 'entiendes', 'entiende', 'entendemos', 'entendéis', 'entienden' ],
  perder: [ 'pierdo', 'pierdes', 'pierde', 'perdemos', 'perdéis', 'pierden' ],
  querer: [ 'quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren' ],
  tener: [ 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen' ],
  // Irregular -ER verbs (o > ue)
  devolver: [ 'devuelvo', 'devuelves', 'devuelve', 'devolvemos', 'devolvéis', 'devuelven' ],
  poder: [ 'puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden' ],
  volver: [ 'vuelvo', 'vuelves', 'vuelve', 'volvemos', 'volvéis', 'vuelven' ],
  // Irregular -ER verbs (yo)
  hacer: [ 'hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen' ],
  poner: [ 'pongo', 'pones', 'pone', 'ponemos', 'ponéis', 'ponen' ],
  saber: [ 'sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben' ],
  ver: [ 'veo', 'ves', 've', 'vemos', 'veis', 'ven' ],
  // Regular -IR verbs
  abrir: [ 'abro', 'abres', 'abre', 'abrimos', 'abrís', 'abren' ],
  compartir: [ 'comparto', 'compartes', 'comparte', 'compartimos', 'compartís', 'comparten' ],
  decidir: [ 'decido', 'decides', 'decide', 'decidimos', 'decidís', 'deciden' ],
  describir: [ 'describo', 'describes', 'describe', 'describimos', 'describís', 'describen' ],
  discutir: [ 'discuto', 'discutes', 'discute', 'discutimos', 'discutís', 'discuten' ],
  escribir: [ 'escribo', 'escribes', 'escribe', 'escribimos', 'escribís', 'escriben' ],
  recibir: [ 'recibo', 'recibes', 'recibe', 'recibimos', 'recibís', 'reciben' ],
  subir: [ 'subo', 'subes', 'sube', 'subimos', 'subís', 'suben' ],
  sufrir: [ 'sufro', 'sufres', 'sufre', 'sufrimos', 'sufrís', 'sufren' ],
  vivir: [ 'vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven' ]
};

const colors = {
  primary: '\x1b[35m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  neutral: '\x1b[0m'
}

const playRound = async (activeVerbs, score = 0, attempts = 0) => {
  const currVerb = activeVerbs[Math.floor(Math.random() * activeVerbs.length)];
  const currFormIndex = Math.floor(Math.random() * forms.length);
  const currForm = forms[currFormIndex];
  const correctAnswer = conjugations[currVerb][currFormIndex];
  
  const answer = await input({ message: `What is the ${colors.primary}${currForm}${colors.neutral} form of ${colors.primary}${currVerb}${colors.neutral}?`});
  const formattedAnswer = answer.toLowerCase().replace('a\'', 'á').replace('e\'', 'é').replace('i\'', 'í');

  if (formattedAnswer == 'menu' || formattedAnswer == 'exit') {
    console.log(`\nYour score was ${colors.primary}${score}/${attempts}${colors.neutral}.`);
    console.log('Well done for practicing!', '\n');
    return formattedAnswer == 'menu' ? initiateGame() : process.exit();
  }

  if (formattedAnswer === correctAnswer) {
    console.log(`${colors.green}CORRECT${colors.neutral}`, '\n');
    score++;
  } else {
    console.log(`${colors.red}WRONG${colors.neutral} - correct answer is ${colors.primary}${correctAnswer}${colors.neutral}`, '\n');
  }

  attempts++;
  playRound(activeVerbs, score, attempts);
}

const setUpData = () => {
  verbs.allAR.list = [ ...verbs.regAR.list, ...verbs.irregAR.list ];
  verbs.allER.list = [ ...verbs.regER.list, ...verbs.irregER.list ];
}

const verifyData = () => {
  Object.values(verbs).forEach(value => {
    value.list.forEach(verb => {
      if (!conjugations[verb] || conjugations[verb].length !== 6) {
        console.error(`Cannot initiate game - verb ${colors.primary}${verb}${colors.neutral} is missing conjugations!`);
        process.exit();
      }
    });
  });
}

const initiateGame = async () => {
  setUpData();
  verifyData();

  console.log(`Welcome to ${colors.primary}Spanish verb conjugation${colors.neutral} practice!`, '\n');

  const answer = await select({
    message: 'Select which verbs to practice',
    choices: Object.entries(verbs).map(([ key, value]) => ({ name: value.description, value: key}))
  });

  const activeVerbs = verbs[answer].list;

  console.log(`\nGreat, you've chosen to practice ${colors.primary}${verbs[answer].description}${colors.neutral} today!`);
  console.log(`\nTip: You can use ${colors.primary}a'${colors.neutral} / ${colors.primary}e'${colors.neutral} / ${colors.primary}i'${colors.neutral} as shortcuts for ${colors.primary}á${colors.neutral} / ${colors.primary}é${colors.neutral} / ${colors.primary}í${colors.neutral}.`);
  console.log(`\nIf you want to return to the main menu, you can type ${colors.primary}menu${colors.neutral}.`);
  console.log(`If you want to stop practicing, you can type ${colors.primary}exit${colors.neutral}.`, '\n');

  playRound(activeVerbs);
};

initiateGame();
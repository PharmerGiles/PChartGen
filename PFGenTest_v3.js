

let QuantityB = [''];
let ZerothDoseSupply = [''];
let labeltab = [''];
let labeltabVar = [''];
let labelf = [''];

//define function Calc

function Calc() {
  globalThis.QuantityB = 0;
  globalThis.ZerothDoseSupply = 0;
  globalThis.gDoses = [];
  globalThis.FirstDoseDays = 0;
  globalThis.DaysN = 0;

  const FirstDoseDays_text_box = document.getElementById('FirstDoseDays_text_box');
  const Init_Dose_text_box = document.getElementById('Init_Dose_text_box');
  const RemDose_text_box = document.getElementById('RemDose_text_box');
  const Days_text_box = document.getElementById('Days_text_box');
  const DoseRed_text_box = document.getElementById('DoseRed_text_box');

  globalThis.FirstDoseDays = parseInt(FirstDoseDays_text_box.value);
  const Init_Dose = Init_Dose_text_box.value;
  const InitDose = parseInt(Init_Dose);
  const RemDose = RemDose_text_box.value;
  let Rem_dose = parseInt(RemDose);
  const ZerothDoseTab = (InitDose / 5);
  globalThis.ZerothDoseSupply = ZerothDoseTab * globalThis.FirstDoseDays;
  const Dose_tablets = Rem_dose / 5;
  const Days = Days_text_box.value;
  globalThis.DaysN = parseInt(Days);
  const DoseRed = DoseRed_text_box.value;
  const DoseR = parseInt(DoseRed);
  const Quantity = Dose_tablets;

  let Doses = [];
  Doses.push(Rem_dose);
  globalThis.gDoses.push(InitDose);
  globalThis.gDoses.push(Rem_dose);

  while (Rem_dose > 0) {
    Doses.push(Rem_dose - DoseR);
    globalThis.gDoses.push(Rem_dose - DoseR);
    Rem_dose -= DoseR;
    if (Rem_dose === 0) {
      break;
    }
  }

  for (let i of Doses) {
    const DoseRTab = i / 5;
    const QuantityAdd = DoseRTab * globalThis.DaysN;
    const QuantityA = Math.floor(QuantityAdd);
    globalThis.QuantityB += QuantityA;
    i += 1; // Note: This line does not affect the original array
  }
}

//define function Result

function Result() {
  globalThis.QuantityB;
  globalThis.ZerothDoseSupply;
  globalThis.labeltabVar;
  globalThis.labeltab;
  globalThis.labelf;

  result2_label.textContent = '';
  QuantityB += ZerothDoseSupply;
  labeltabVar = '';
  labelf = '';
  labeltab = document.createElement('label');
  labeltab.textContent = labeltabVar;
  labeltabVar = QuantityB.toString();
  labelf = labeltabVar;
  result2_label.textContent = labelf;
}

  // Location of image to be used - this must be in the same folder as the final program/script being run
  //const imgPath = path.join(https://upload.wikimedia.org/wikipedia/en/1/10/Hampshire_Hospitals_Foundation_Trust.jpg);
  //const img = fs.readFileSync(imgPath);


// Importing necessary libraries
const {
  app,
  BrowserWindow
} = require('electron');
const {
  createElement,
  useState
} = require('react');
const {
  render
} = require('react-dom');

// Function to create the main window
function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');
}

// Create the main window when the app is ready
app.whenReady().then(createWindow);

// React component for the GUI
function App() {
  const [firstDoseDays, setFirstDoseDays] = useState('');
  const [initDose, setInitDose] = useState('');
  const [remDose, setRemDose] = useState('');
  const [days, setDays] = useState('');
  const [doseRed, setDoseRed] = useState('');
  const [finalInst, setFinalInst] = useState('');
  const [ptName, setPtName] = useState('');
  const [result, setResult] = useState('');

  return createElement('div', null,
    createElement('h1', null, 'Prednisolone 5mg Reducing Dose calculator'),
    createElement('label', null, 'How many days required for first dose?:'),
    createElement('input', {
      type: 'text',
      value: firstDoseDays,
      onChange: e => setFirstDoseDays(e.target.value)
    }),
    createElement('label', null, 'What is the initial dose prescribed (in mg)?'),
    createElement('input', {
      type: 'text',
      value: initDose,
      onChange: e => setInitDose(e.target.value)
    }),
    createElement('label', null, 'Remaining dose prescribed after initial stepdown (in mg?)'),
    createElement('input', {
      type: 'text',
      value: remDose,
      onChange: e => setRemDose(e.target.value)
    }),
    createElement('label', null, 'How many days required for each dose level?'),
    createElement('input', {
      type: 'text',
      value: days,
      onChange: e => setDays(e.target.value)
    }),
    createElement('label', null, 'How much is dose to be reduced by (in mg)?'),
    createElement('input', {
      type: 'text',
      value: doseRed,
      onChange: e => setDoseRed(e.target.value)
    }),
    createElement('label', null, 'What are the final instructions e.g. ("then STOP.")?'),
    createElement('input', {
      type: 'text',
      value: finalInst,
      onChange: e => setFinalInst(e.target.value)
    }),
    createElement('label', null, "What is the patient's name?"),
    createElement('input', {
      type: 'text',
      value: ptName,
      onChange: e => setPtName(e.target.value)
    }),
    createElement('button', {
      onClick: handleExport
    }, 'Export'),
    createElement('label', null, 'You need '),
    createElement('label', {
      style: {
        width: '10px'
      }
    }, result),
    createElement('label', null, 'tablets.'),
    createElement('label', null, 'Version: GoodShiny4.0 with thanks to Coffee Tom.')
  );
}

// Render the React component
render(createElement(App), document.getElementById('root'));

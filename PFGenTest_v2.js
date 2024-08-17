
// Import relevant libraries essential for program function
const {
  Workbook
} = require('exceljs');
const {
  createCanvas,
  loadImage
} = require('canvas');
const {
  dialog,
  app,
  BrowserWindow
} = require('electron');
const {
  format
} = require('date-fns');
const {
  Image
} = require('canvas');
const {
  NamedStyle,
  Font,
  Border,
  Side,
  DEFAULT_FONT
} = require('exceljs');
const {
  ColumnDimension,
  DimensionHolder
} = require('exceljs');
const {
  getColumnLetter
} = require('exceljs/lib/utils/colCache');

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

const ExcelExport = () => {
  // Import necessary libraries
  const ExcelJS = require('exceljs');
  const fs = require('fs');
  const path = require('path');

  // Global variables
  let gDoses = [];
  let FirstDoseDays = 0;
  let DaysN = 0;
  let rowsel = 0;

  // Truncate empty value from list gDoses from earlier function
  gDoses.pop();

  // Set up Excel workbook/sheet and set default font
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('PredChart');
  const font = {
    name: 'Arial',
    size: 10
  };
  ws.eachRow((row) => {
    row.eachCell((cell) => {
      cell.font = font;
    });
  });

  // Declaring variable to generate the day's date
  const today = new Date();

  // Set column dimensions
  ws.getColumn(3).width = 5;
  ws.getColumn(4).width = 25;
  ws.getColumn(5).width = 5;

  // Initialize variable for row selector
  rowsel = 17;

  // Declaring variables used in function
  const gTabs = [];
  const gDays = [];
  gDays.push(parseInt(FirstDoseDays));
  gDays.push(DaysN);

  // Location of image to be used - this must be in the same folder as the final program/script being run
  const imgPath = path.join(https://upload.wikimedia.org/wikipedia/en/1/10/Hampshire_Hospitals_Foundation_Trust.jpg);
  const img = fs.readFileSync(imgPath);

  // Setting border styles for worksheet
  const borderStyles = {
    thin: {
      style: 'thin',
      color: {
        argb: 'FF000000'
      }
    }
  };
  const borderLBr = {
    top: borderStyles.thin,
    bottom: borderStyles.thin,
    left: borderStyles.thin
  };
  const borderMid = {
    top: borderStyles.thin,
    bottom: borderStyles.thin
  };
  const borderRBr = {
    top: borderStyles.thin,
    bottom: borderStyles.thin,
    right: borderStyles.thin
  };
  const borderTop = {
    top: borderStyles.thin
  };
  const borderBtm = {
    bottom: borderStyles.thin
  };
  const borderL = {
    left: borderStyles.thin
  };
  const borderR = {
    right: borderStyles.thin
  };
  const borderTLC = {
    top: borderStyles.thin,
    left: borderStyles.thin
  };
  const borderTRC = {
    top: borderStyles.thin,
    right: borderStyles.thin
  };
  const borderBLC = {
    bottom: borderStyles.thin,
    left: borderStyles.thin
  };
  const borderBRC = {
    bottom: borderStyles.thin,
    right: borderStyles.thin
  };

  // Variable for 'elasticity' - ensuring cells keep relative position intact if table size changes
  const row_offset_2lines = 2;

  // For loop to generate the table and apply border
  for (let i of gDoses) {
    gTabs.push(i / 5);
    const cellref1 = ws.getCell(`B${rowsel}`);
    cellref1.value = "Take";
    cellref1.border = borderLBr;
    const cellref2 = ws.getCell(`C${rowsel}`);
    cellref2.value = i / 5;
    cellref2.border = borderMid;
    const cellref3 = ws.getCell(`D${rowsel}`);
    cellref3.value = "tablets every MORNING for";
    cellref3.border = borderMid;
    const cellref4 = ws.getCell(`E${rowsel}`);
    cellref4.value = gDays[1];
    cellref4.border = borderMid;
    const cellref5 = ws.getCell(`F${rowsel}`);
    cellref5.value = "days";
    cellref5.border = borderMid;
    const cellref6 = ws.getCell(`G${rowsel}`);
    cellref6.value = i;
    cellref6.border = borderRBr;
    rowsel += 1;
    i += 1;
  }

  // Adding the logo to a cell
  const imageId = wb.addImage({
    buffer: img,
    extension: 'jpeg',
  });
  ws.addImage(imageId, 'A1');

  // Setting relevant template
  ws.getCell('E1').value = "Date:";
  ws.getCell('E3').value = "Royal Hampshire County Hospital";
  ws.getCell('E4').value = "Pharmacy Department";
  ws.getCell('E5').value = "Romsey Road";
  ws.getCell('E6').value = "Winchester";
  ws.getCell('E7').value = "Hampshire";
  ws.getCell('E8').value = "SO22 5DG";
  ws.getCell('E9').value = "";

  // Save the workbook
  wb.xlsx.writeFile('PredChart.xlsx')
    .then(() => {
      console.log('Excel file created successfully.');
    })
    .catch((err) => {
      console.error('Error creating Excel file:', err);
    });
};


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

  const handleExport = () => {
    // Placeholder for Calc, Result, and ExcelExport functions
    console.log('Export button clicked');
  };

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

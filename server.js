// // Global handler for uncaught exception
// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   console.log('UNCAUGHT EXCEPTION !!! SHUTTING DOWN !!!');
//   process.exit(1);
// });

// require('dotenv').config({ path: './config.env' });

// const mongoose = require('mongoose');
// const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then(() => {
//   console.log('Successfuly connected to DB !');
// });

// const PORT = process.env.PORT || 3000;
// const server = app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}`);
// });

// // Global handler for unhandled rejections
// process.on('unhandledRejection', (err) => {
//   console.log(err.name, err.message);
//   console.log('UNHANDLED REJECTION !!! SHUTTING DOWN !!!');
//   server.close(() => {
//     // Server will have time to close all the request and only then the process will exit.
//     process.exit(1);
//   });
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let accMatch = 'unknownValue';
// let recordID = 'unknownValue';
// let recordCount = 'unknownValue';
// let accNum = 'unknownValue';
// let responseCode = 'unknownValue';
// let outputs = {};

// function extractProduct(arr) {
//   let res = [];

//   arr.forEach((obj, index) => {
//     if(res.length > 2) return;
//     if (obj.account.number && (
//       obj?.account?.labels?.includes('product:2') ||
//       obj?.account?.labels?.includes('product:3')
//     )) {
//         res.push(index);
//     }
//   });

//   if (res.length !== 1) return;

//   accMatch = true;
//   recordID = arr[res[0]]?.id;
//   recordCount = 1;
//   accNum = arr[res[0]]?.account?.number || 'unknownValue';
//   responseCode = params.wsResponseCode || 'unknownValue';
//   return res[0];
// }

// if(params?.wsResponseBody?.records) {
//   extractProduct(params.wsResponseBody.records);
// }

// outputs = {
//   output1: accMatch,
//   output2: recordID,
//   output3: recordCount,
//   output4: accNum,
//   output10: responseCode,
// };

// outputs;

/////////////////////////////////////////////////////////////// Latest change request
// let accMatch = 'unknownValue';
// let recordID = 'unknownValue';
// let recordCount = 'unknownValue';
// let accNum = 'unknownValue';
// let responseCode = 'unknownValue';
// let outputs = {};

// function extractProduct(arr) {
//   let res = [];

//   arr.forEach((obj, index) => {
//     if(res.length > 2) return;
//     if (obj.account.number && (
//       obj?.account?.labels?.includes('product:2') ||
//       obj?.account?.labels?.includes('product:3')
//     )) {
//         res.push(index);
//     }
//   });

//   if (res.length !== 1) return;

//   accMatch = true;
//   recordID = arr[res[0]]?.id;
//   recordCount = 1;
//   accNum = arr[res[0]]?.account?.number || 'unknownValue';
//   responseCode = params.wsResponseCode || 'unknownValue';
//   return res[0];
// }

// if(params?.wsResponseBody?.records) {
//   extractProduct(params.wsResponseBody.records);
// }

// outputs = {
//   output1: accMatch,
//   output2: recordID,
//   output3: recordCount,
//   output4: accNum,
//   output10: responseCode,
// };

// outputs;

// function x() {
// var y = 6;
// console.log(y);
// };

const params = {
  "extValue1": "NO",
  extValue2: 1,
  extValue3: 1,
  extValue10: 'NO',
  extValue11: 'undefined',
  extValue12: 'NO',
  extValue13: 'NO',
  extValue14: 'NO',
  extValue15: 'NO',
  extValue16: 'undefined',
  extValue17: 'NO',
  extValue18: 'NO',
  extValue19: 'NO',
};

const YesNoResult = params.extValue1;
let HH_COUNT = params.extValue2;
let EMP_COUNT = params.extValue3;
const HHaccountName = params.extValue10;
const HHavailableBalance = params.extValue11;
const HHcontributionAmount = params.extValue12;
const HHcontributionDate = params.extValue13;
const HHwithdrawlAmount = params.extValue14;
const HHwithdrawlDate = params.extValue15;
const EmpResPlanYearsAcctPhoneticName = params.extValue16;
const EmpResPlanYearsAcctAvailBalance = params.extValue17;
const EmpResLastPaymentAmt = params.extValue18;
const EmpResLastPaymentDate = params.extValue19;

const arrayHH = [
  HHaccountName,
  HHavailableBalance,
  HHcontributionAmount,
  HHcontributionDate,
  HHwithdrawlAmount,
  HHwithdrawlDate,
];
const arrayCBAS = [
  EmpResPlanYearsAcctPhoneticName,
  EmpResPlanYearsAcctAvailBalance,
  EmpResLastPaymentAmt,
  EmpResLastPaymentDate,
];

if (arrayHH.includes('undefined')) HH_COUNT = 0;
if (arrayCBAS.includes('undefined')) EMP_COUNT = 0;

let message = '';
const HHString = `Understood! The current balance on your ${HHaccountName} is ${HHavailableBalance}. Your last contribution payment, of ${HHcontributionAmount}, was done on ${HHcontributionDate}. Your last withdrawal was for ${HHwithdrawlAmount}, and was done on ${HHwithdrawlDate}`;
const CbasString = `Understood! The current balance on your ${EmpResPlanYearsAcctPhoneticName} is ${EmpResPlanYearsAcctAvailBalance}. Your last payment, of ${EmpResLastPaymentAmt}, was done on ${EmpResLastPaymentDate}`;

if (HH_COUNT === 1 && EMP_COUNT === 0) {
  message = HHString;
} else if (HH_COUNT === 0 && EMP_COUNT === 1) {
  message = CbasString;
} else if (YesNoResult === 'NO' && EMP_COUNT === 1) {
  message = CbasString;
} else if (YesNoResult !== 'NO' && HH_COUNT === 1) {
  message = HHString;
}

console.log(message);

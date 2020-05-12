// Imputneri valuner@
const totalCost = document.getElementById('total_cost'),
      anInitialFee = document.getElementById('an_initial_fee'),
      creditTerm = document.getElementById('credit_term');

// Rangeri valuner@
const totalCostRange = document.getElementById('total_cost_range'),
      anInitialFeeRange = document.getElementById('an_initial_fee_range'),
      creditTermRange = document.getElementById('credit_term_reng');

// Verjnakan valuner
const totalAmountOfCredit = document.getElementById('amount_of_credit'),
      totalMonthlyPayment = document.getElementById('monthly_payment'),
      totalRecommendedIncome = document.getElementById('recommended_income');

// All Reng :
const inputsRange = document.querySelectorAll('.input_range');

// All Buttton with % :
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
  totalCost.value = totalCostRange.value;
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
}
assignValue();

const banks = [
  {
    name: 'inecobank',
    precents: 9.8
  },
  {
    name: 'vtbbank',
    precents: 7.9
  },
  {
    name: 'conversbank',
    precents: 7.5
  },
  {
    name: 'ardshinbank',
    precents: 9.2
  }
];

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
  bank.addEventListener("click", () => {
    for (let item of bankBtns) {
      item.classList.remove('active');
    }
    bank.classList.add('active');
    takeActiveBank(bank);
  })
}

const takeActiveBank = currentActive => {
  const dataAttrValue = currentActive.dataset.name;
  const currentBank = banks.find( bank => bank.name === dataAttrValue);
  currentPrecent = currentBank.precents;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (let input of inputsRange) {
  input.addEventListener('input', () => {
    assignValue();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  })
}

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {

  /**
   * AM - amenamsea marum,
   * VCh - varki chap@,
   * TCh - tokosi chap@,
   * ACh - amisneri chap@.
   * 
   * AM = (VCH + (((VCH / 100) * TCH) / 12) * ACH) / ACH.
   * 
   */

  let monthlyPayment; // Aamsakan marum;
  let lounAmount = totalCost - anInitialFee ; // Varki chap@;
  let interestRate = currentPrecent; // Tokosi chap@;
  let numberOfYears = creditTerm; // Tatrineri qanak@;
  let numberOfMonths = 12 * numberOfYears; // Amisneri qanak@;

  monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
  const monthlyPaymentArounded = Math.round(monthlyPayment);

  if (monthlyPaymentArounded < 0) {
    totalAmountOfCredit.innerHTML = `${0} ֏`;
    totalMonthlyPayment.innerHTML = `${0} ֏`;
    totalRecommendedIncome.innerHTML = `${0} ֏`;
  } else {
    totalAmountOfCredit.innerHTML = `${lounAmount} ֏`;
    totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ֏`;
    totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} ֏`;
  }
}
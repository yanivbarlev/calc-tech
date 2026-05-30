const http = require('http');

const calculators = [
  // Loan & Mortgage Calculators
  { name: "Mortgage Calculator", path: "/mortgage" },
  { name: "Loan Calculator", path: "/loan" },
  { name: "Auto Loan Calculator", path: "/auto-loan" },
  { name: "Student Loan Calculator", path: "/student-loan" },
  { name: "Personal Loan Calculator", path: "/personal-loan" },
  { name: "Business Loan Calculator", path: "/business-loan" },
  { name: "Amortization Calculator", path: "/amortization" },
  { name: "Refinance Calculator", path: "/refinance" },
  { name: "Debt Payoff Calculator", path: "/debt-payoff" },
  { name: "Debt Consolidation Calculator", path: "/debt-consolidation" },
  { name: "Credit Card Calculator", path: "/credit-card" },

  // Investment & Retirement
  { name: "Retirement Calculator", path: "/retirement" },
  { name: "401K Calculator", path: "/401k" },
  { name: "IRA Calculator", path: "/ira" },
  { name: "Roth IRA Calculator", path: "/roth-ira" },
  { name: "Investment Calculator", path: "/investment" },
  { name: "ROI Calculator", path: "/roi" },
  { name: "RMD Calculator", path: "/rmd" },
  { name: "Social Security Calculator", path: "/social-security" },
  { name: "Savings Calculator", path: "/savings" },
  { name: "CD Calculator", path: "/cd" },
  { name: "College Cost Calculator", path: "/college-cost" },
  { name: "Present Value Calculator", path: "/present-value" },
  { name: "Future Value Calculator", path: "/future-value" },

  // Interest & Finance
  { name: "Interest Calculator", path: "/interest" },
  { name: "Compound Interest Calculator", path: "/compound-interest" },
  { name: "Simple Interest Calculator", path: "/simple-interest" },
  { name: "Interest Rate Calculator", path: "/interest-rate" },
  { name: "APR Calculator", path: "/apr" },
  { name: "Finance Calculator", path: "/finance" },
  { name: "Payment Calculator", path: "/payment" },
  { name: "Inflation Calculator", path: "/inflation" },

  // Tax & Income Calculators
  { name: "Income Tax Calculator", path: "/income-tax" },
  { name: "Sales Tax Calculator", path: "/sales-tax" },
  { name: "Salary Calculator", path: "/salary" },

  // Real Estate & Housing
  { name: "House Affordability Calculator", path: "/house-affordability" },
  { name: "Rent Calculator", path: "/rent" },
  { name: "Down Payment Calculator", path: "/down-payment" },

  // Business & Commerce
  { name: "Budget Calculator", path: "/budget" },
  { name: "Commission Calculator", path: "/commission" },
  { name: "Discount Calculator", path: "/discount" },

  // Fitness & Health Calculators
  { name: "BMI Calculator", path: "/bmi" },
  { name: "Calorie Calculator", path: "/calorie" },
  { name: "Body Fat Calculator", path: "/body-fat" },
  { name: "BMR Calculator", path: "/bmr" },
  { name: "Ideal Weight Calculator", path: "/ideal-weight" },
  { name: "Pace Calculator", path: "/pace" },
  { name: "Conception Calculator", path: "/conception" },
  { name: "Due Date Calculator", path: "/due-date" },

  // Math Calculators
  { name: "Scientific Calculator", path: "/scientific" },
  { name: "Fraction Calculator", path: "/fraction" },
  { name: "Percentage Calculator", path: "/percentage" },
  { name: "Random Number Generator", path: "/random-number" },
  { name: "Triangle Calculator", path: "/triangle" },
  { name: "Standard Deviation Calculator", path: "/standard-deviation" },

  // Other Calculators
  { name: "Age Calculator", path: "/age" },
  { name: "Date Calculator", path: "/date" },
  { name: "Time Calculator", path: "/time" },
  { name: "Hours Calculator", path: "/hours" },
  { name: "GPA Calculator", path: "/gpa" },
  { name: "Grade Calculator", path: "/grade" },
  { name: "Concrete Calculator", path: "/concrete" },
  { name: "Subnet Calculator", path: "/subnet" },
  { name: "Password Generator", path: "/password" },
  { name: "Conversion Calculator", path: "/conversion" },
];

const testCalculator = (calc) => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: calc.path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      resolve({
        name: calc.name,
        path: calc.path,
        status: res.statusCode,
        passed: res.statusCode === 200
      });
    });

    req.on('error', (err) => {
      resolve({
        name: calc.name,
        path: calc.path,
        status: 'ERROR',
        passed: false,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: calc.name,
        path: calc.path,
        status: 'TIMEOUT',
        passed: false
      });
    });

    req.end();
  });
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testAllCalculators() {
  console.log('Starting calculator tests...\n');

  const results = [];

  for (let i = 0; i < calculators.length; i++) {
    const calc = calculators[i];
    process.stdout.write(`Testing ${i + 1}/${calculators.length}: ${calc.name}...`);

    const result = await testCalculator(calc);
    results.push(result);

    if (result.passed) {
      console.log(' ✓ PASS');
    } else {
      console.log(` ✗ FAIL (${result.status})`);
    }

    // Small delay between requests
    await delay(100);
  }

  console.log('\n' + '='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  console.log(`\nTotal: ${results.length}`);
  console.log(`Passed: ${passed} ✓`);
  console.log(`Failed: ${failed} ✗`);
  console.log(`Success Rate: ${((passed / results.length) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('FAILED CALCULATORS');
    console.log('='.repeat(80));

    results.filter(r => !r.passed).forEach(r => {
      console.log(`\n${r.name}`);
      console.log(`  URL: http://localhost:3001${r.path}`);
      console.log(`  Status: ${r.status}`);
      if (r.error) {
        console.log(`  Error: ${r.error}`);
      }
    });
  }

  // Save detailed results to JSON
  const fs = require('fs');
  fs.writeFileSync('test-results.json', JSON.stringify(results, null, 2));
  console.log('\n\nDetailed results saved to test-results.json');
}

testAllCalculators().catch(console.error);

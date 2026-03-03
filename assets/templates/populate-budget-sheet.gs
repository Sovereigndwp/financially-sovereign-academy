/**
 * FSA Budget Template — Google Apps Script
 * 
 * HOW TO USE:
 * 1. Open the Google Sheet
 * 2. Extensions → Apps Script
 * 3. Delete any existing code, paste this entire file
 * 4. Click ▶ Run (select "buildBudgetTemplate")
 * 5. Authorize when prompted
 * 6. Close the Apps Script editor — your template is ready
 */

function buildBudgetTemplate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.setName('Monthly Budget');

  // Clear everything
  sheet.clear();
  sheet.clearFormats();

  // Set column widths
  sheet.setColumnWidth(1, 320);  // Category
  sheet.setColumnWidth(2, 140);  // Amount
  sheet.setColumnWidth(3, 300);  // Notes
  sheet.setColumnWidth(4, 120);  // % of Income
  sheet.setColumnWidth(5, 120);  // Status

  // Colors
  var darkBg      = '#1a1a2e';
  var cardBg      = '#16213e';
  var headerBg    = '#0f3460';
  var green        = '#10b981';
  var greenLight   = '#34d399';
  var amber        = '#f59e0b';
  var red          = '#ef4444';
  var white        = '#ffffff';
  var dimText      = '#94a3b8';
  var sectionBg    = '#1e3a5f';

  // Set default background
  sheet.getRange('A1:E100').setBackground(darkBg).setFontColor(dimText).setFontFamily('Inter, Arial, sans-serif').setFontSize(10);

  // ============================================
  // TITLE
  // ============================================
  var r = 1;
  sheet.getRange(r, 1, 1, 5).merge().setValue('MY MONTHLY BUDGET')
    .setBackground(headerBg).setFontColor(green).setFontSize(20).setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sheet.setRowHeight(r, 50);

  r = 2;
  sheet.getRange(r, 1, 1, 5).merge().setValue('Financially Sovereign Academy — Fill in YOUR numbers below')
    .setBackground(headerBg).setFontColor(dimText).setFontSize(11)
    .setHorizontalAlignment('center').setFontStyle('italic');
  sheet.setRowHeight(r, 30);

  r = 3; // spacer
  sheet.setRowHeight(r, 8);

  // ============================================
  // MONTHLY INCOME
  // ============================================
  r = 4;
  _sectionHeader(sheet, r, 'MONTHLY INCOME', sectionBg, green);

  r = 5;
  _columnHeaders(sheet, r, ['Category', 'Amount', 'Notes'], headerBg, greenLight);

  var incomeStart = 6;
  var incomeData = [
    ['Primary Job (take-home pay)', 0, 'After taxes, 401k, insurance deductions'],
    ['Second Job / Side Hustle',    0, 'Average monthly amount'],
    ['Freelance / Contract Work',   0, ''],
    ['Government Benefits',         0, 'Social Security, disability, etc.'],
    ['Other Income',                0, 'Rental, alimony, etc.']
  ];
  for (var i = 0; i < incomeData.length; i++) {
    _dataRow(sheet, incomeStart + i, incomeData[i], cardBg, white, dimText);
  }
  var incomeEnd = incomeStart + incomeData.length - 1;

  r = incomeEnd + 1;
  sheet.getRange(r, 1).setValue('TOTAL MONTHLY INCOME').setFontWeight('bold').setFontColor(green).setBackground(sectionBg);
  sheet.getRange(r, 2).setFormula('=SUM(B' + incomeStart + ':B' + incomeEnd + ')')
    .setFontWeight('bold').setFontColor(green).setBackground(sectionBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setBackground(sectionBg);

  // ============================================
  // FIXED EXPENSES
  // ============================================
  r = incomeEnd + 3;
  _sectionHeader(sheet, r, 'FIXED EXPENSES (same every month)', sectionBg, green);

  r++;
  _columnHeaders(sheet, r, ['Category', 'Amount', 'Notes'], headerBg, greenLight);

  var fixedStart = r + 1;
  var fixedData = [
    ['Rent / Mortgage',              0, ''],
    ['Car Payment',                  0, ''],
    ['Car Insurance',                0, 'Divide annual by 12 if paid yearly'],
    ['Health Insurance',             0, 'Skip if deducted from paycheck'],
    ['Renters / Homeowners Insurance', 0, ''],
    ['Phone Bill',                   0, ''],
    ['Internet',                     0, ''],
    ['Utilities (electric/gas/water)', 0, 'Average of last 3 months'],
    ['Student Loan Payment',         0, 'Minimum payment'],
    ['Credit Card Minimums',         0, 'Total minimums across all cards'],
    ['Other Loan Payments',          0, 'Personal loans / medical debt'],
    ['Subscriptions (Netflix etc.)', 0, 'List them all — they add up'],
    ['Gym / Memberships',            0, ''],
    ['Childcare / Tuition',          0, '']
  ];
  for (var i = 0; i < fixedData.length; i++) {
    _dataRow(sheet, fixedStart + i, fixedData[i], cardBg, white, dimText);
  }
  var fixedEnd = fixedStart + fixedData.length - 1;

  r = fixedEnd + 1;
  sheet.getRange(r, 1).setValue('TOTAL FIXED EXPENSES').setFontWeight('bold').setFontColor(amber).setBackground(sectionBg);
  sheet.getRange(r, 2).setFormula('=SUM(B' + fixedStart + ':B' + fixedEnd + ')')
    .setFontWeight('bold').setFontColor(amber).setBackground(sectionBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setBackground(sectionBg);

  var totalFixedRow = r;

  // ============================================
  // VARIABLE EXPENSES
  // ============================================
  r = fixedEnd + 3;
  _sectionHeader(sheet, r, 'VARIABLE EXPENSES (changes monthly)', sectionBg, green);

  r++;
  _columnHeaders(sheet, r, ['Category', 'Amount', 'Notes'], headerBg, greenLight);

  var varStart = r + 1;
  var varData = [
    ['Groceries & Household Supplies', 0, 'Check bank statement for real average'],
    ['Gas / Transportation / Transit',  0, ''],
    ['Dining Out & Takeout',            0, 'Be honest — most people underestimate this'],
    ['Coffee & Drinks',                 0, ''],
    ['Entertainment & Activities',      0, 'Movies, concerts, games, hobbies'],
    ['Clothing & Personal Care',        0, 'Monthly average'],
    ['Gifts & Donations',               0, 'Monthly average'],
    ['Pet Expenses',                     0, ''],
    ['Medical / Prescriptions (OOP)',   0, 'Monthly average'],
    ['Miscellaneous / Unexpected',      0, 'Budget at least $50–100 here']
  ];
  for (var i = 0; i < varData.length; i++) {
    _dataRow(sheet, varStart + i, varData[i], cardBg, white, dimText);
  }
  var varEnd = varStart + varData.length - 1;

  r = varEnd + 1;
  sheet.getRange(r, 1).setValue('TOTAL VARIABLE EXPENSES').setFontWeight('bold').setFontColor(amber).setBackground(sectionBg);
  sheet.getRange(r, 2).setFormula('=SUM(B' + varStart + ':B' + varEnd + ')')
    .setFontWeight('bold').setFontColor(amber).setBackground(sectionBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setBackground(sectionBg);

  var totalVarRow = r;

  // ============================================
  // SAVINGS & DEBT PAYOFF TARGETS
  // ============================================
  r = varEnd + 3;
  _sectionHeader(sheet, r, 'SAVINGS & DEBT PAYOFF TARGETS', sectionBg, green);

  r++;
  _columnHeaders(sheet, r, ['Category', 'Amount', 'Notes'], headerBg, greenLight);

  var savStart = r + 1;
  var savData = [
    ['Pay Yourself First (savings)',       0, 'Target: 10–20% of take-home'],
    ['Emergency Fund Contribution',        0, 'Until you reach 3–6 months of expenses'],
    ['Extra Debt Payoff (above minimums)', 0, 'Avalanche: target highest APR first'],
    ['Investing (brokerage / IRA)',        0, ''],
    ['Sinking Funds',                      0, 'Car repairs, holidays, annual bills']
  ];
  for (var i = 0; i < savData.length; i++) {
    _dataRow(sheet, savStart + i, savData[i], cardBg, white, dimText);
  }
  var savEnd = savStart + savData.length - 1;

  r = savEnd + 1;
  sheet.getRange(r, 1).setValue('TOTAL SAVINGS & DEBT TARGETS').setFontWeight('bold').setFontColor(greenLight).setBackground(sectionBg);
  sheet.getRange(r, 2).setFormula('=SUM(B' + savStart + ':B' + savEnd + ')')
    .setFontWeight('bold').setFontColor(greenLight).setBackground(sectionBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setBackground(sectionBg);

  var totalSavRow = r;
  var totalIncomeRow = incomeEnd + 1;

  // ============================================
  // SUMMARY
  // ============================================
  r = savEnd + 3;
  _sectionHeader(sheet, r, 'SUMMARY', sectionBg, green);

  r++;
  _columnHeaders(sheet, r, ['', 'Amount', '% of Income', 'Status'], headerBg, greenLight);

  // Total Income
  r++;
  sheet.getRange(r, 1).setValue('Total Income').setFontWeight('bold').setFontColor(green).setBackground(cardBg);
  sheet.getRange(r, 2).setFormula('=B' + totalIncomeRow).setFontWeight('bold').setFontColor(green).setBackground(cardBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setValue('100%').setFontColor(dimText).setBackground(cardBg).setHorizontalAlignment('center');
  sheet.getRange(r, 4).setBackground(cardBg);
  var summaryIncomeRow = r;

  // Total Fixed
  r++;
  sheet.getRange(r, 1).setValue('Total Fixed Expenses').setFontColor(white).setBackground(cardBg);
  sheet.getRange(r, 2).setFormula('=B' + totalFixedRow).setFontColor(amber).setBackground(cardBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setFormula('=IF(B' + summaryIncomeRow + '>0, B' + r + '/B' + summaryIncomeRow + ', 0)')
    .setFontColor(dimText).setBackground(cardBg).setNumberFormat('0.0%').setHorizontalAlignment('center');
  sheet.getRange(r, 4).setBackground(cardBg);

  // Total Variable
  r++;
  sheet.getRange(r, 1).setValue('Total Variable Expenses').setFontColor(white).setBackground(cardBg);
  sheet.getRange(r, 2).setFormula('=B' + totalVarRow).setFontColor(amber).setBackground(cardBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setFormula('=IF(B' + summaryIncomeRow + '>0, B' + r + '/B' + summaryIncomeRow + ', 0)')
    .setFontColor(dimText).setBackground(cardBg).setNumberFormat('0.0%').setHorizontalAlignment('center');
  sheet.getRange(r, 4).setBackground(cardBg);

  // Total Savings
  r++;
  sheet.getRange(r, 1).setValue('Total Savings & Debt Targets').setFontColor(white).setBackground(cardBg);
  sheet.getRange(r, 2).setFormula('=B' + totalSavRow).setFontColor(greenLight).setBackground(cardBg).setNumberFormat('$#,##0.00');
  sheet.getRange(r, 3).setFormula('=IF(B' + summaryIncomeRow + '>0, B' + r + '/B' + summaryIncomeRow + ', 0)')
    .setFontColor(dimText).setBackground(cardBg).setNumberFormat('0.0%').setHorizontalAlignment('center');
  sheet.getRange(r, 4).setBackground(cardBg);

  // Net Cash Flow
  r += 2;
  sheet.getRange(r, 1, 1, 4).setBackground(headerBg);
  sheet.getRange(r, 1).setValue('NET CASH FLOW').setFontWeight('bold').setFontSize(13).setFontColor(white);
  sheet.getRange(r, 2).setFormula('=B' + summaryIncomeRow + '-B' + totalFixedRow + '-B' + totalVarRow + '-B' + totalSavRow)
    .setFontWeight('bold').setFontSize(13).setNumberFormat('$#,##0.00');
  // Conditional: green if positive, red if negative
  var netCashFlowCell = sheet.getRange(r, 2);
  var rules = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(0).setFontColor(green).setRanges([netCashFlowCell]).build();
  var rules2 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0).setFontColor(red).setRanges([netCashFlowCell]).build();
  sheet.setConditionalFormatRules([rules, rules2]);

  sheet.getRange(r, 3, 1, 2).merge().setValue('Income minus ALL spending and savings')
    .setFontColor(dimText).setFontStyle('italic').setFontSize(9);
  sheet.setRowHeight(r, 36);
  var netCashFlowRow = r;

  // ============================================
  // 50/30/20 ANALYSIS
  // ============================================
  r += 2;
  _sectionHeader(sheet, r, '50 / 30 / 20 ANALYSIS', sectionBg, green);

  r++;
  _columnHeaders(sheet, r, ['Category', 'Your %', 'Target', 'Status'], headerBg, greenLight);

  // Needs
  r++;
  sheet.getRange(r, 1).setValue('Needs (Fixed + essential variable)').setFontColor(white).setBackground(cardBg);
  sheet.getRange(r, 2).setFormula('=IF(B' + summaryIncomeRow + '>0, (B' + totalFixedRow + ')/B' + summaryIncomeRow + ', 0)')
    .setNumberFormat('0.0%').setFontColor(white).setBackground(cardBg).setHorizontalAlignment('center');
  sheet.getRange(r, 3).setValue('≤ 50%').setFontColor(dimText).setBackground(cardBg).setHorizontalAlignment('center');
  sheet.getRange(r, 4).setFormula('=IF(B' + r + '<=0.5, "✅ On track", "⚠️ Over 50%")')
    .setFontColor(dimText).setBackground(cardBg).setHorizontalAlignment('center');

  // Wants
  r++;
  sheet.getRange(r, 1).setValue('Wants (Non-essential variable)').setFontColor(white).setBackground(cardBg);
  sheet.getRange(r, 2).setFormula('=IF(B' + summaryIncomeRow + '>0, (B' + totalVarRow + ')/B' + summaryIncomeRow + ', 0)')
    .setNumberFormat('0.0%').setFontColor(white).setBackground(cardBg).setHorizontalAlignment('center');
  sheet.getRange(r, 3).setValue('≤ 30%').setFontColor(dimText).setBackground(cardBg).setHorizontalAlignment('center');
  sheet.getRange(r, 4).setFormula('=IF(B' + r + '<=0.3, "✅ On track", "⚠️ Over 30%")')
    .setFontColor(dimText).setBackground(cardBg).setHorizontalAlignment('center');

  // Savings
  r++;
  sheet.getRange(r, 1).setValue('Savings & Debt Payoff').setFontColor(white).setBackground(cardBg);
  sheet.getRange(r, 2).setFormula('=IF(B' + summaryIncomeRow + '>0, (B' + totalSavRow + ')/B' + summaryIncomeRow + ', 0)')
    .setNumberFormat('0.0%').setFontColor(white).setBackground(cardBg).setHorizontalAlignment('center');
  sheet.getRange(r, 3).setValue('≥ 20%').setFontColor(dimText).setBackground(cardBg).setHorizontalAlignment('center');
  sheet.getRange(r, 4).setFormula('=IF(B' + r + '>=0.2, "✅ On track", "⚠️ Under 20%")')
    .setFontColor(dimText).setBackground(cardBg).setHorizontalAlignment('center');

  // ============================================
  // NOTES
  // ============================================
  r += 2;
  _sectionHeader(sheet, r, 'NOTES', sectionBg, green);

  var notes = [
    '1. Use TAKE-HOME pay (after taxes), not gross salary.',
    '2. If net cash flow is negative, cut variable expenses first.',
    '3. If savings is under 10%, increase by 1% each month until you reach 20%.',
    '4. Review and update this budget on the 1st of every month.',
    '5. Track actual spending for one month before setting permanent targets.'
  ];
  for (var i = 0; i < notes.length; i++) {
    r++;
    sheet.getRange(r, 1, 1, 4).merge().setValue(notes[i])
      .setFontColor(dimText).setBackground(darkBg).setFontSize(9);
  }

  // Footer
  r += 2;
  sheet.getRange(r, 1, 1, 5).merge()
    .setValue('Built by Financially Sovereign Academy — financiallysovereign.academy')
    .setFontColor('#475569').setFontSize(9).setHorizontalAlignment('center').setBackground(darkBg);

  // Freeze header rows
  sheet.setFrozenRows(2);

  // Protect formatting
  SpreadsheetApp.flush();
  ss.toast('Budget template created! Fill in your numbers in the Amount column.', 'FSA Budget Template', 10);
}


// ── Helpers ──────────────────────────────────────────────

function _sectionHeader(sheet, row, text, bg, fontColor) {
  sheet.getRange(row, 1, 1, 4).merge().setValue(text)
    .setBackground(bg).setFontColor(fontColor).setFontSize(13)
    .setFontWeight('bold').setVerticalAlignment('middle');
  sheet.setRowHeight(row, 36);
}

function _columnHeaders(sheet, row, labels, bg, fontColor) {
  for (var i = 0; i < labels.length; i++) {
    sheet.getRange(row, i + 1).setValue(labels[i])
      .setBackground(bg).setFontColor(fontColor).setFontWeight('bold').setFontSize(10);
  }
  // Fill remaining columns with bg
  if (labels.length < 4) {
    sheet.getRange(row, labels.length + 1, 1, 4 - labels.length).setBackground(bg);
  }
  sheet.setRowHeight(row, 28);
}

function _dataRow(sheet, row, data, bg, valueColor, noteColor) {
  sheet.getRange(row, 1).setValue(data[0]).setFontColor('#e2e8f0').setBackground(bg);
  sheet.getRange(row, 2).setValue(data[1]).setFontColor(valueColor).setBackground(bg)
    .setNumberFormat('$#,##0.00').setHorizontalAlignment('right');
  if (data[2]) {
    sheet.getRange(row, 3).setValue(data[2]).setFontColor(noteColor).setBackground(bg).setFontSize(9).setFontStyle('italic');
  } else {
    sheet.getRange(row, 3).setBackground(bg);
  }
  sheet.getRange(row, 4).setBackground(bg);
}

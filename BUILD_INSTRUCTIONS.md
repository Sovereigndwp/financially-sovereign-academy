# FSA Platform Build Instructions

## Phase 1: Foundation (Current)

### Files to Generate:

1. **index.html** (Landing Page)
   - Use prompt: mcp/prompts/landingPage.txt
   - Save to: /index.html
   - Test: Open in browser, check responsiveness

2. **assessment.html** (Assessment Flow)
   - Use prompt: mcp/prompts/assessment.txt
   - Save to: /assessment.html
   - Test: Complete assessment, verify localStorage

3. **modules/money-mindset-cash-flow.html** (Module 1)
   - Use prompt: mcp/prompts/module1.txt
   - Save to: /modules/money-mindset-cash-flow.html
   - Test: Read through, test interactions

4. **calculators/budget-calculator.html**
   - Use prompt: mcp/prompts/calculator1.txt
   - Save to: /calculators/budget-calculator.html
   - Test: Input data, verify calculations

5. **calculators/cash-flow-simulator.html**
   - Use prompt: mcp/prompts/calculator2.txt
   - Save to: /calculators/cash-flow-simulator.html
   - Test: Run simulations, check visualizations

### Quality Checklist:
- [ ] Mobile responsive
- [ ] Accessible (WCAG AA)
- [ ] Fast loading (<3s)
- [ ] Works offline (after first load)
- [ ] LocalStorage persistence
- [ ] No console errors
- [ ] Cross-browser compatible

### Deployment:
```bash
# After all files generated:
npm init -y
npm install -g vercel
vercel --prod
```

### Next Phase:
After Phase 1 complete, generate remaining 9 modules using same process.

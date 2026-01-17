/**
 * Financially Sovereign Academy - Interactive Popup Lab System
 * Loads mini-labs and interactive content from JSON data
 */

class PopupLabSystem {
    constructor() {
        this.popups = {};
        this.currentPopup = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;

        try {
            const response = await fetch('/data/popups.json');
            const data = await response.json();
            this.popups = data.popups || {};
            this.createModalContainer();
            this.initialized = true;
        } catch (error) {
            console.error('Failed to load popup data:', error);
        }
    }

    createModalContainer() {
        if (document.getElementById('popup-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'popup-modal';
        modal.className = 'popup-modal';
        modal.innerHTML = `
            <div class="popup-backdrop" onclick="PopupLabs.close()"></div>
            <div class="popup-container">
                <button class="popup-close" onclick="PopupLabs.close()" aria-label="Close">×</button>
                <div class="popup-content" id="popup-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
        this.addStyles();
    }

    addStyles() {
        if (document.getElementById('popup-styles')) return;

        const style = document.createElement('style');
        style.id = 'popup-styles';
        style.textContent = `
            .popup-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .popup-modal.active {
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 1;
            }

            .popup-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(4px);
            }

            .popup-container {
                position: relative;
                background: linear-gradient(135deg, #1a3a2e 0%, #0f2922 100%);
                border: 3px solid #10b981;
                border-radius: 1rem;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                padding: 2.5rem;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                animation: popupSlideIn 0.3s ease;
                z-index: 10001;
            }

            @keyframes popupSlideIn {
                from {
                    transform: translateY(-30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .popup-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(239, 68, 68, 0.2);
                border: 2px solid #ef4444;
                color: #ef4444;
                font-size: 2rem;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                line-height: 1;
                padding: 0;
            }

            .popup-close:hover {
                background: rgba(239, 68, 68, 0.3);
                transform: rotate(90deg);
            }

            .popup-content h2 {
                color: #10b981;
                font-size: 2rem;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 3px solid rgba(16, 185, 129, 0.3);
            }

            .popup-content p {
                color: #e0e0e0;
                line-height: 1.8;
                margin-bottom: 1rem;
            }

            .popup-section {
                background: rgba(0, 0, 0, 0.3);
                border: 2px solid rgba(16, 185, 129, 0.2);
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin: 1.5rem 0;
            }

            .popup-section h3 {
                color: #34d399;
                font-size: 1.3rem;
                margin-bottom: 1rem;
            }

            .lab-input-group {
                margin: 1.5rem 0;
            }

            .lab-input-group label {
                display: block;
                color: #6ee7b7;
                font-weight: 600;
                margin-bottom: 0.5rem;
                font-size: 1rem;
            }

            .lab-input-group input[type="number"],
            .lab-input-group input[type="range"],
            .lab-input-group select {
                width: 100%;
                background: rgba(0, 0, 0, 0.4);
                border: 2px solid rgba(16, 185, 129, 0.3);
                border-radius: 0.5rem;
                padding: 0.75rem;
                color: #e0e0e0;
                font-size: 1rem;
                transition: all 0.2s ease;
            }

            .lab-input-group input:focus {
                outline: none;
                border-color: #10b981;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
            }

            .lab-slider-value {
                display: inline-block;
                background: #10b981;
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 0.5rem;
                font-weight: 700;
                margin-left: 1rem;
                min-width: 80px;
                text-align: center;
            }

            .lab-result {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1));
                border: 2px solid #10b981;
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-top: 1.5rem;
                display: none;
            }

            .lab-result.active {
                display: block;
                animation: fadeIn 0.3s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .lab-result h4 {
                color: #10b981;
                font-size: 1.2rem;
                margin-bottom: 1rem;
            }

            .lab-metric {
                display: flex;
                justify-content: space-between;
                padding: 0.75rem 0;
                border-bottom: 1px solid rgba(16, 185, 129, 0.2);
            }

            .lab-metric:last-child {
                border-bottom: none;
            }

            .lab-metric-label {
                color: #9ca3af;
                font-weight: 500;
            }

            .lab-metric-value {
                color: #10b981;
                font-weight: 700;
                font-size: 1.1rem;
            }

            .lab-metric-value.warning {
                color: #f59e0b;
            }

            .lab-metric-value.danger {
                color: #ef4444;
            }

            .lab-button {
                background: linear-gradient(135deg, #10b981, #34d399);
                color: white;
                border: none;
                border-radius: 0.5rem;
                padding: 0.875rem 2rem;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-top: 1rem;
                width: 100%;
            }

            .lab-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
            }

            .lab-button:active {
                transform: translateY(0);
            }

            .lab-choice-group {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin: 1.5rem 0;
            }

            .lab-choice {
                background: rgba(0, 0, 0, 0.3);
                border: 2px solid rgba(16, 185, 129, 0.3);
                border-radius: 0.75rem;
                padding: 1.25rem;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: left;
            }

            .lab-choice:hover {
                border-color: #10b981;
                transform: translateX(4px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }

            .lab-choice-title {
                color: #10b981;
                font-weight: 700;
                margin-bottom: 0.5rem;
            }

            .lab-choice-desc {
                color: #9ca3af;
                font-size: 0.9rem;
            }

            .lab-outcome {
                background: rgba(16, 185, 129, 0.1);
                border: 2px solid #10b981;
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-top: 1.5rem;
                display: none;
            }

            .lab-outcome.active {
                display: block;
                animation: fadeIn 0.3s ease;
            }

            .lab-outcome.warning {
                background: rgba(245, 158, 11, 0.1);
                border-color: #f59e0b;
            }

            .lab-checklist {
                list-style: none;
                padding: 0;
                margin: 1rem 0;
            }

            .lab-checklist li {
                padding: 0.75rem;
                margin: 0.5rem 0;
                background: rgba(0, 0, 0, 0.2);
                border-left: 4px solid #10b981;
                border-radius: 0.25rem;
                color: #e0e0e0;
            }

            .lab-checklist li::before {
                content: "✓ ";
                color: #10b981;
                font-weight: 700;
                margin-right: 0.5rem;
            }

            @media (max-width: 640px) {
                .popup-container {
                    width: 95%;
                    padding: 1.5rem;
                    max-height: 95vh;
                }

                .popup-content h2 {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    async open(popupId) {
        await this.init();

        const popup = this.popups[popupId];
        if (!popup) {
            console.error(`Popup not found: ${popupId}`);
            return;
        }

        this.currentPopup = popupId;
        const modal = document.getElementById('popup-modal');
        const content = document.getElementById('popup-content');

        content.innerHTML = this.renderPopup(popup, popupId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize any interactive elements
        this.initializeInteractive(popupId, popup);
    }

    close() {
        const modal = document.getElementById('popup-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentPopup = null;
    }

    renderPopup(popup, popupId) {
        let html = `<h2>${popup.title}</h2>`;

        if (popup.intro) {
            html += `<p>${popup.intro}</p>`;
        }

        if (popup.type === 'calculator') {
            html += this.renderCalculator(popup, popupId);
        } else if (popup.type === 'scenario') {
            html += this.renderScenario(popup, popupId);
        } else if (popup.type === 'checklist') {
            html += this.renderChecklist(popup);
        } else if (popup.type === 'info') {
            html += this.renderInfo(popup);
        }

        return html;
    }

    renderCalculator(popup, popupId) {
        let html = '<div class="popup-section">';

        if (popup.inputs) {
            popup.inputs.forEach(input => {
                html += `
                    <div class="lab-input-group">
                        <label for="${popupId}-${input.id}">${input.label}</label>
                        ${input.type === 'range' ? `
                            <input
                                type="range"
                                id="${popupId}-${input.id}"
                                min="${input.min}"
                                max="${input.max}"
                                value="${input.default}"
                                step="${input.step || 1}"
                            >
                            <span class="lab-slider-value" id="${popupId}-${input.id}-value">${input.prefix || ''}${input.default}${input.suffix || ''}</span>
                        ` : input.type === 'select' ? `
                            <select id="${popupId}-${input.id}">
                                ${input.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                            </select>
                        ` : `
                            <input
                                type="${input.type || 'number'}"
                                id="${popupId}-${input.id}"
                                value="${input.default}"
                                min="${input.min || 0}"
                                ${input.max ? `max="${input.max}"` : ''}
                                step="${input.step || 'any'}"
                            >
                        `}
                    </div>
                `;
            });
        }

        html += `
            <button class="lab-button" onclick="PopupLabs.calculate('${popupId}')">
                ${popup.buttonText || 'Calculate'}
            </button>
        </div>
        <div class="lab-result" id="${popupId}-result"></div>
        `;

        return html;
    }

    renderScenario(popup, popupId) {
        let html = `<div class="popup-section">`;

        if (popup.scenario) {
            html += `<p>${popup.scenario}</p>`;
        }

        if (popup.choices) {
            html += '<div class="lab-choice-group">';
            popup.choices.forEach((choice, index) => {
                html += `
                    <div class="lab-choice" onclick="PopupLabs.selectChoice('${popupId}', ${index})">
                        <div class="lab-choice-title">${choice.title}</div>
                        <div class="lab-choice-desc">${choice.description}</div>
                    </div>
                `;
            });
            html += '</div>';
        }

        html += `</div><div class="lab-outcome" id="${popupId}-outcome"></div>`;

        return html;
    }

    renderChecklist(popup) {
        let html = '<div class="popup-section">';

        if (popup.items) {
            html += '<ul class="lab-checklist">';
            popup.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }

        if (popup.tip) {
            html += `<p style="margin-top: 1.5rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem; border-left: 4px solid #10b981;"><strong>💡 Tip:</strong> ${popup.tip}</p>`;
        }

        html += '</div>';
        return html;
    }

    renderInfo(popup) {
        let html = '<div class="popup-section">';

        if (popup.sections) {
            popup.sections.forEach(section => {
                html += `
                    <h3>${section.title}</h3>
                    <p>${section.content}</p>
                `;
            });
        }

        if (popup.example) {
            html += `
                <div style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 0.75rem;">
                    <h4 style="color: #10b981; margin-bottom: 0.75rem;">Example</h4>
                    <p>${popup.example}</p>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    initializeInteractive(popupId, popup) {
        if (popup.type === 'calculator' && popup.inputs) {
            // Set up slider value displays and change listeners
            popup.inputs.forEach(input => {
                const element = document.getElementById(`${popupId}-${input.id}`);
                if (input.type === 'range' && element) {
                    const valueDisplay = document.getElementById(`${popupId}-${input.id}-value`);
                    element.addEventListener('input', (e) => {
                        valueDisplay.textContent = `${input.prefix || ''}${e.target.value}${input.suffix || ''}`;
                    });
                }
            });
        }

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentPopup) {
                this.close();
            }
        });
    }

    calculate(popupId) {
        const popup = this.popups[popupId];
        if (!popup || !popup.calculate) return;

        // Gather input values
        const inputs = {};
        if (popup.inputs) {
            popup.inputs.forEach(input => {
                const element = document.getElementById(`${popupId}-${input.id}`);
                inputs[input.id] = parseFloat(element.value) || element.value;
            });
        }

        // Run calculation function
        const result = popup.calculate(inputs);

        // Display result
        const resultDiv = document.getElementById(`${popupId}-result`);
        resultDiv.innerHTML = this.renderResult(result);
        resultDiv.classList.add('active');
    }

    selectChoice(popupId, choiceIndex) {
        const popup = this.popups[popupId];
        if (!popup || !popup.choices || !popup.choices[choiceIndex]) return;

        const choice = popup.choices[choiceIndex];
        const outcomeDiv = document.getElementById(`${popupId}-outcome`);

        outcomeDiv.innerHTML = `
            <h4>${choice.outcomeTitle || 'Outcome'}</h4>
            <p>${choice.outcome}</p>
            ${choice.lesson ? `<p style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.15); border-radius: 0.5rem;"><strong>Lesson:</strong> ${choice.lesson}</p>` : ''}
        `;

        outcomeDiv.className = `lab-outcome active ${choice.outcomeType || ''}`;
    }

    renderResult(result) {
        if (typeof result === 'string') {
            return `<p>${result}</p>`;
        }

        let html = '<h4>Results</h4>';

        if (result.metrics) {
            result.metrics.forEach(metric => {
                html += `
                    <div class="lab-metric">
                        <span class="lab-metric-label">${metric.label}</span>
                        <span class="lab-metric-value ${metric.type || ''}">${metric.value}</span>
                    </div>
                `;
            });
        }

        if (result.message) {
            html += `<p style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem;">${result.message}</p>`;
        }

        return html;
    }
}

// Global instance
window.PopupLabs = new PopupLabSystem();

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PopupLabs.init());
} else {
    PopupLabs.init();
}

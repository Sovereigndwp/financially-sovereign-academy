/**
 * Financially Sovereign Academy - Progress Manager
 *
 * @version 1.0.0
 * @description Progress tracking for FSA's 10 learning modules
 * @author Financially Sovereign Academy
 * @license MIT
 */

class FSAProgressManager {
    constructor() {
        // Configuration
        this.STORAGE_KEY = 'fsa-progress';
        this.VERSION = '1.0.0';
        
        // FSA Modules (10 total)
        this.MODULES = [
            { id: 1, slug: 'money-mindset-cash-flow', name: 'Money Mindset & Cash Flow' },
            { id: 2, slug: 'emergency-funds-saving', name: 'Emergency Funds & Saving' },
            { id: 3, slug: 'banking-basics', name: 'Banking Without Getting Robbed' },
            { id: 4, slug: 'credit-scores', name: 'Credit Scores Decoded' },
            { id: 5, slug: 'debt-strategy', name: 'Debt Strategy' },
            { id: 6, slug: 'taxes-paychecks', name: 'Taxes & Paychecks' },
            { id: 7, slug: 'investing-fundamentals', name: 'Investing Fundamentals' },
            { id: 8, slug: 'risk-insurance', name: 'Risk & Insurance' },
            { id: 9, slug: 'consumer-protection', name: 'Consumer Protection' },
            { id: 10, slug: 'financial-master-plan', name: 'Financial Master Plan' }
        ];

        // Event listeners
        this.listeners = [];

        // Cache
        this.cache = null;
        this.cacheExpiry = null;
        this.CACHE_DURATION = 5000; // 5 seconds
    }

    /**
     * Initialize the progress manager
     * @returns {Object} The initialized progress data
     */
    init() {
        try {
            const existingData = this._loadFromStorage(this.STORAGE_KEY);

            if (existingData && existingData.version === this.VERSION) {
                this._log('info', 'Loaded existing FSA progress data');
                this.cache = existingData;
                this.cacheExpiry = Date.now() + this.CACHE_DURATION;
                return existingData;
            }

            // No data exists, create fresh structure
            this._log('info', 'Creating fresh FSA progress structure');
            const freshData = this._createFreshStructure();
            this._saveToStorage(this.STORAGE_KEY, freshData);
            this.cache = freshData;
            this.cacheExpiry = Date.now() + this.CACHE_DURATION;
            return freshData;

        } catch (error) {
            this._handleError('init', error);
            return this._createFreshStructure();
        }
    }

    /**
     * Mark a module as complete
     * @param {number} moduleId - Module ID (1-10)
     * @param {Object} metadata - Optional metadata (score, timeSpent, etc.)
     * @returns {boolean} Success status
     */
    setModuleComplete(moduleId, metadata = {}) {
        try {
            const data = this._getData();
            const moduleKey = `module_${moduleId}`;
            const now = new Date().toISOString();

            // Initialize module data if it doesn't exist
            if (!data.modules[moduleKey]) {
                data.modules[moduleKey] = {
                    id: moduleId,
                    completed: false,
                    visited: false,
                    startedAt: now,
                    completedAt: null,
                    attempts: 0,
                    timeSpent: 0,
                    score: null
                };
            }

            // Update module completion
            data.modules[moduleKey].completed = true;
            data.modules[moduleKey].completedAt = now;

            // Merge metadata
            if (metadata.score !== undefined) {
                data.modules[moduleKey].score = metadata.score;
            }
            if (metadata.timeSpent !== undefined) {
                data.modules[moduleKey].timeSpent += metadata.timeSpent;
            }

            // Update global tracking
            data.lastActivity = now;
            data.completedModules = Object.values(data.modules).filter(m => m.completed).length;
            data.progressPercentage = Math.round((data.completedModules / 10) * 100);

            // Save changes
            this._saveData(data);

            // Emit event
            this._emit('moduleComplete', { moduleId, metadata });

            this._log('info', `Module ${moduleId} marked complete`);
            return true;

        } catch (error) {
            this._handleError('setModuleComplete', error);
            return false;
        }
    }

    /**
     * Track module visit (user opened but didn't complete)
     * @param {number} moduleId - Module ID (1-10)
     * @returns {boolean} Success status
     */
    setModuleVisited(moduleId) {
        try {
            const data = this._getData();
            const moduleKey = `module_${moduleId}`;
            const now = new Date().toISOString();

            // Initialize if needed
            if (!data.modules[moduleKey]) {
                data.modules[moduleKey] = {
                    id: moduleId,
                    completed: false,
                    visited: true,
                    startedAt: now,
                    completedAt: null,
                    attempts: 1,
                    timeSpent: 0,
                    score: null
                };
            } else {
                data.modules[moduleKey].visited = true;
                data.modules[moduleKey].attempts += 1;
            }

            // Update global tracking
            data.lastActivity = now;

            this._saveData(data);
            this._emit('moduleVisited', { moduleId });

            return true;

        } catch (error) {
            this._handleError('setModuleVisited', error);
            return false;
        }
    }

    /**
     * Check if a module is complete
     * @param {number} moduleId - Module ID (1-10)
     * @returns {boolean} Completion status
     */
    isModuleComplete(moduleId) {
        try {
            const data = this._getData();
            const moduleKey = `module_${moduleId}`;

            if (!data.modules[moduleKey]) {
                return false;
            }

            return data.modules[moduleKey].completed === true;

        } catch (error) {
            this._handleError('isModuleComplete', error);
            return false;
        }
    }

    /**
     * Get overall progress percentage
     * @returns {number} Percentage complete (0-100)
     */
    getProgressPercentage() {
        try {
            const data = this._getData();
            return data.progressPercentage || 0;
        } catch (error) {
            this._handleError('getProgressPercentage', error);
            return 0;
        }
    }

    /**
     * Get module data
     * @param {number} moduleId - Module ID (1-10)
     * @returns {Object|null} Module data or null
     */
    getModuleData(moduleId) {
        try {
            const data = this._getData();
            const moduleKey = `module_${moduleId}`;
            return data.modules[moduleKey] || null;
        } catch (error) {
            this._handleError('getModuleData', error);
            return null;
        }
    }

    /**
     * Set user persona from assessment
     * @param {string} personaId - Persona identifier
     * @returns {boolean} Success status
     */
    setPersona(personaId) {
        try {
            const data = this._getData();
            data.persona = personaId;
            this._saveData(data);

            this._emit('personaChanged', { personaId });
            this._log('info', `Persona set to: ${personaId}`);
            return true;

        } catch (error) {
            this._handleError('setPersona', error);
            return false;
        }
    }

    /**
     * Get current persona
     * @returns {string|null} Persona ID or null
     */
    getPersona() {
        try {
            const data = this._getData();
            return data.persona;
        } catch (error) {
            this._handleError('getPersona', error);
            return null;
        }
    }

    /**
     * Export progress data as JSON
     * @returns {string} JSON string
     */
    exportProgress() {
        try {
            const data = this._getData();
            return JSON.stringify(data, null, 2);
        } catch (error) {
            this._handleError('exportProgress', error);
            return null;
        }
    }

    /**
     * Clear all progress data
     * @returns {boolean} Success status
     */
    clearAllProgress() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            // Also clear assessment data
            localStorage.removeItem('fsa-assessment-completed');
            localStorage.removeItem('fsa-persona');
            
            this.cache = null;
            this.cacheExpiry = null;

            this._emit('progressCleared', {});
            this._log('info', 'All progress cleared');
            return true;

        } catch (error) {
            this._handleError('clearAllProgress', error);
            return false;
        }
    }

    /**
     * Add event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
        if (typeof callback === 'function') {
            this.listeners.push({ event, callback });
        }
    }

    /**
     * Remove event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    off(event, callback) {
        this.listeners = this.listeners.filter(
            l => !(l.event === event && l.callback === callback)
        );
    }

    // ==================== PRIVATE METHODS ====================

    /**
     * Create fresh data structure
     * @private
     */
    _createFreshStructure() {
        const now = new Date().toISOString();

        return {
            version: this.VERSION,
            createdAt: now,
            lastActivity: now,
            persona: null,
            completedModules: 0,
            progressPercentage: 0,
            modules: {}
        };
    }

    /**
     * Get current data (from cache or storage)
     * @private
     */
    _getData() {
        // Check cache
        if (this.cache && this.cacheExpiry && Date.now() < this.cacheExpiry) {
            return this.cache;
        }

        // Load from storage
        const data = this._loadFromStorage(this.STORAGE_KEY);

        if (!data) {
            return this.init();
        }

        // Update cache
        this.cache = data;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;

        return data;
    }

    /**
     * Save data to storage
     * @private
     */
    _saveData(data) {
        this._saveToStorage(this.STORAGE_KEY, data);
        this.cache = data;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
    }

    /**
     * Load from localStorage
     * @private
     */
    _loadFromStorage(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (error) {
            this._handleError('_loadFromStorage', error);
            return null;
        }
    }

    /**
     * Save to localStorage
     * @private
     */
    _saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            this._handleError('_saveToStorage', error);
            return false;
        }
    }

    /**
     * Emit event to listeners
     * @private
     */
    _emit(event, data) {
        this.listeners
            .filter(l => l.event === event)
            .forEach(l => {
                try {
                    l.callback(data);
                } catch (error) {
                    this._handleError('_emit', error);
                }
            });
    }

    /**
     * Log message
     * @private
     */
    _log(level, message) {
        if (console[level]) {
            console[level](`[FSA Progress] ${message}`);
        }
    }

    /**
     * Handle error
     * @private
     */
    _handleError(method, error) {
        console.error(`[FSA Progress Error in ${method}]:`, error);
    }
}

// Make available globally
window.FSAProgressManager = FSAProgressManager;

class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config) {
            this.config = config;
            this.state = this.config.initial;
            this.history = [];
            this.backHistory = [];
            //this.history = [this.config.initial];

        }
        else
            throw new Error;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.history.push(this.state);
            this.state = state;
            this.backHistory = [];
        }
        else
            throw new Error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.state].transitions[event]) {
            this.history.push(this.state);
            this.state = this.config.states[this.state].transitions[event];
            this.backHistory = [];
        }
        else
            throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var tempArray = [];
        if (event == undefined) {
            for (var s in this.config.states) {
                tempArray.push(s);
            }
            return tempArray;
        }
        else {
            for (var s in this.config.states) {
                if (this.config.states[s].transitions[event]) {
                    tempArray.push(s);
                }
            }
            return tempArray;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length > 0) {
            var lastState = this.state;
            this.state = this.history.pop();
            this.backHistory.push(lastState);
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.backHistory.length > 0) {
            this.history.push(this.state);
            this.state = this.backHistory.pop();
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.backHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

class Job {
    constructor(key) {
        this.key = key;

        this.promise = new Promise(resolve => {
            this._startResolve = resolve;
        });
    }

    markEnded(func) {
        if (func) {
            func();
        }
    }

    markStarted(func) {
        this._startResolve(this.markEnded.bind(this, func));
    }
}

module.exports = Job;
const Job = require('./job');

class Limiter {
    constructor() {
        this.maxExecution = 3;
        this.working = [];
        this.queue = [];
    }

    endJob(job) {
        var index = this.working.indexOf(job)
        if (index > -1) {
            this.working.splice(index, 1);
            this.startNextJob();
        }
    }

    startNextJob() {
        var job = this.queue.shift();
        if (job) {
            job.markStarted(() => {
                this.endJob(job);
            });
            this.working.push(job);
        }
    }

    enqueue(key=null) {
        var job;

        if (key) {
            job = this.queue.find(job => job.key === key)
        }
        
        if (!job) {
            job = new Job(key);
            this.queue.push(job);
            if (this.working.length < this.maxExecution) {
                this.startNextJob();
            }
        }        

        return job.promise;
    }
}

module.exports = Limiter;
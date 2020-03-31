class Operation {
    constructor (step, name, expected_duration) {
        this.step = step;
        this.name = name;
        this.expected_duration = expected_duration;
    }
}

module.exports = Operation;
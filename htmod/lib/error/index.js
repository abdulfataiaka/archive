class Error {
  constructor() {
    this.trace = [];
  }

  is() {
    return this.trace.length > 0;
  }

  stack(error) {
    if (error instanceof Error ) {
      this.trace = this.trace.concat(error.trace);
      return;
    }

    this.trace.push(error);
  }
}

module.exports = Error;

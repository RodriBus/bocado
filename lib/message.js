class Message {
  constructor(text) {
    this.mrkdwn = true;
    this.text = text;
  }
  toString() {
    return JSON.stringify(this);
  }
}

module.exports = Message;

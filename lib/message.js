class Message {
  constructor(text) {
    if (typeof text === 'undefined') {
      throw new Error('Messages must have text');
    }
    this.mrkdwn = true;
    this.text = text;
  }
  toString() {
    return JSON.stringify(this);
  }
}

module.exports = Message;

function commandParser(txt) {
  const text = txt.trim();
  const separator = ' ';
  const obj = {};
  const arr = text.split(separator);
  obj.argument = arr.shift();

  if (arr.length) {
    obj.modifier = arr.shift();
  }
  if (arr.length) {
    obj.extra = arr.join(separator);
  }
  return obj;
}

module.exports = commandParser;

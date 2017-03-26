const debug = require('debug')('bocado:list-command');
const Command = require('../command');
const Message = require('../message');
const db = require('../../db/db');

function listBocatas(resolve, reject) {
  debug('Displaying list of bocatas');

  db.getAllBocatas().then((list) => {
    let msg = 'List of bocatas:\n';
    msg += list.map((bocata) => {
      let entry = `>${bocata.id}. ${bocata.name}  \`/bocata order ${bocata.id}\``;
      if (bocata.ingredients) {
        entry += `\n>\t\t${bocata.ingredients}.`;
      }
      return entry;
    }).reduce((prev, curr) => `${prev}\n${curr}`);
    msg += '\n\nAdd your custom order with details at the end: `/bocata order 15 con mayonesa`';
    resolve(new Message(msg));
  });
}

const listCommand = new Command('list', '` shows available bocata list', () => new Promise(listBocatas));

listCommand.help = `Usage:
\`/bocado list\` shows available bocata list.`;

module.exports = listCommand;


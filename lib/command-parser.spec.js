/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
const chai = require('chai');
const parser = require('./command-parser');

const expect = chai.expect;

describe('command parser', () => {
  const command = 'bocata';
  const id = '5';
  const extra = ' with extra cheese';
  const simpleCommand = `${command}`;
  const commandWithModifier = `${simpleCommand} ${id}`;
  const commandWithModifierAndExtra = `${commandWithModifier} ${extra}`;
  it('should be a function()', () => {
    expect(parser).to.be.a.Function;
  });
  it('should return an object', () => {
    expect(parser('')).to.be.an.object;
  });
  it('object must have "argument" property', () => {
    expect(parser('')).to.have.property('argument');
  });
  it('should parse command strings', () => {
    const simpleResult = parser(simpleCommand);
    expect(simpleResult).to.have.property('argument').and.equal(command);
    expect(simpleResult).to.have.not.property('modifier');
    expect(simpleResult).to.have.not.property('extra');

    const modifierResult = parser(commandWithModifier);
    expect(modifierResult).to.have.property('argument').and.equal(command);
    expect(modifierResult).to.have.property('modifier').and.equal(id);
    expect(modifierResult).to.have.not.property('extra');

    const extraResult = parser(commandWithModifierAndExtra);
    expect(extraResult).to.have.property('argument').and.equal(command);
    expect(extraResult).to.have.property('modifier').and.equal(id);
    expect(extraResult).to.have.property('extra').and.equal(extra);
  });
  it('should parse whitespace padded command strings', () => {
    expect(parser(`    ${simpleCommand}    `)).to.have.property('argument').and.equal(command);

    expect(parser(`    ${commandWithModifier}    `)).to.have.property('argument').and.equal(command);
    expect(parser(`    ${commandWithModifier}    `)).to.have.property('modifier').and.equal(id);

    expect(parser(`    ${commandWithModifierAndExtra}    `)).to.have.property('argument').and.equal(command);
    expect(parser(`    ${commandWithModifierAndExtra}    `)).to.have.property('modifier').and.equal(id);
    expect(parser(`    ${commandWithModifierAndExtra}    `)).to.have.property('extra').and.equal(extra);
  });
});





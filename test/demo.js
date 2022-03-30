import {addToArrayForm} from '../src/20220328/01-989/answer.js'
describe("test addArray", () => {
  var a = [7,7,5,2]
  var b = 7105
  it(`${JSON.stringify(a)} add ${b}`, () => {
    expect(addToArrayForm(a, b)).to.be.equals([1, 4, 8, 5, 7]);
  });
});

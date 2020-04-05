import { expect } from 'chai';
import { random } from '../../helpers';

describe('random helper method', () => {
  it('should return 0', () => {
    expect(random(0)).to.equal(0);
  });

  it('should return 1', () => {
    expect(random(1)).to.equal(1);
  });
});

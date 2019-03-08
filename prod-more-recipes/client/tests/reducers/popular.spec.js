import expect from 'expect';
import factory from '../factory';
import popular, { initialState } from '../../reducers/popular';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => popular(initialState, action);

describe('Testing modal reducer', () => {
  it('Should set popularStatus to null and popular to array of recipes', (done) => {
    const recipe = factory.getMock('recipe');
    const state = dispatch({
      type: actionTypes.SET_POPULAR,
      popular: [{ ...recipe }],
    });
    expect(state.popularStatus).toEqual(null);
    expect(state.popular).toEqual([{ ...recipe }]);
    done();
  });

  it('Should set popularStatus attribute to "new status"', (done) => {
    const state = dispatch({
      type: actionTypes.SET_POPULAR_STATUS,
      status: 'new status',
    });
    expect(state.popularStatus).toEqual('new status');
    done();
  });
});

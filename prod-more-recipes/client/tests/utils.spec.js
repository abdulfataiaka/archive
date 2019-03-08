import expect from 'expect';
import factory from './factory';
import {
  splitIngredients,
  joinIngredients,
  separateIntoCategories,
  resolveStatusCode,
  capitalize,
} from '../utils';

// getCategory = (categories, categoryId)

describe('Testing utils functions', () => {
  it('Should output and array for the comma separated input string', (done) => {
    const result = splitIngredients('one, two');
    expect(result).toEqual(['one', ' two']);
    done();
  });

  it('Should output a comma separated string of the input array', (done) => {
    const result = joinIngredients(['one', 'two']);
    expect(result).toEqual('two, one');
    done();
  });

  it('Should', (done) => {
    const result = separateIntoCategories(null, null);
    expect(result).toEqual({ general: [] });
    done();
  });

  it('Should', (done) => {
    const category = factory.getMock('category');
    const favorite = factory.getMock('favorite');
    const result = separateIntoCategories([
      { ...favorite },
    ], [
      { ...category },
    ]);
    expect(Object.keys(result).includes('general')).toEqual(true);
    expect(result.general.length).toEqual(1);
    done();
  });

  it('Should', (done) => {
    const category = factory.getMock('category');
    const favorite = factory.getMock('favorite');
    const result = separateIntoCategories([
      { ...favorite, categoryId: 12 },
    ], [
      { ...category, id: 12 },
    ]);
    expect(Object.keys(result).includes(category.name)).toEqual(true);
    expect(result[category.name].length).toEqual(1);
    done();
  });

  it('Should', (done) => {
    const result1 = resolveStatusCode(504);
    expect(result1).toEqual('Server seems to be down');
    const result2 = resolveStatusCode(58539);
    expect(result2).toEqual('');
    done();
  });

  it('Should', (done) => {
    const result = capitalize('hello');
    expect(result).toEqual('Hello');
    done();
  });
});

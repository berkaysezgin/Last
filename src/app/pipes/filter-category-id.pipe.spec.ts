import { FilterCategoryIdPipe } from '../features/products/pipes/filter-category-id.pipe';

describe('FilterCategoryIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterCategoryIdPipe();
    expect(pipe).toBeTruthy();
  });
});

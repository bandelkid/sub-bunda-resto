/* eslint-disable no-undef */
const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the restaurants that has been added', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });
    expect(await favoriteResto.getRestaurant(1)).toEqual({ id : 1 });
    expect(await favoriteResto.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteResto.getRestaurant(3)).toEqual(undefined);
  });

  it('should refuse a restaurants from being added if it does not have the correct property', async () => {
    favoriteResto.putRestaurant({ aProperty: 'property' });

    expect(await favoriteResto.getRestaurantList()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });

    expect(await favoriteResto.getRestaurantList()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite restaurants', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });
    favoriteResto.putRestaurant({ id: 3 });

    await favoriteResto.deleteRestaurant(1);

    expect(await favoriteResto.getRestaurantList()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a restaurants even though the restaurants has not been added', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });
    favoriteResto.putRestaurant({ id: 3 });

    await favoriteResto.deleteRestaurant(4);

    expect(await favoriteResto.getRestaurantList()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
};

export { itActsAsFavoriteRestoModel };
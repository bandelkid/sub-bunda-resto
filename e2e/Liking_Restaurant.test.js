/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  // Memulai dari halaman home
  I.amOnPage('/#/');
});

Scenario('showing restaurant details', async ({ I }) => {
  // Klik restaurant pertama
  I.waitForElement('.restaurant-item__content a', 5);

  const firstMovie = locate('.restaurant-item__content a').first();
  const firstMovieTitle = await I.grabTextFrom(firstMovie);
  I.click(firstMovie);

  // Cek apakah elemen detail seperti nama restoran muncul
  I.waitForElement('h2.restaurant__title', 5);
  const detail = locate('h2.restaurant__title').first();
  const detailTitle = await I.grabTextFrom(detail);

  assert.strictEqual(firstMovieTitle, detailTitle);
});

Scenario('liking a restaurant', async ({ I }) => {
  // kita bisa pakai waitForElement atau seeElement atau see
  I.waitForElement('.restaurant-item__content a', 5);

  // saya pilih satu judul resto jadi yang script bisa dipakai di tahap ini
  const firstResto = locate('.restaurant-item__content a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  // saya pastikan saat muncul detail likenya juga muncul lanjut ke sini
  I.waitForElement('h2.restaurant__title', 5);
  const detail = locate('h2.restaurant__title').first();
  const detailTitle = await I.grabTextFrom(detail);

  // klik like nya
  I.waitForElement('button#likeButton.like');
  I.click('#likeButton');
  // Saya berada di page detail dan melihat element like
  I.amOnPage('/#/detail');
  I.seeElement('#likeButton');

  const likedRestoTitle = await I.grabTextFrom('h2.restaurant__title');

  assert.strictEqual(firstRestoTitle, likedRestoTitle, detailTitle);

});

Scenario('unliking a restaurant', async ({ I }) => {
  // Pastikan restoran telah disukai sebelumnya
  I.waitForElement('.restaurant-item__content a', 5);

  // Pilih restoran pertama dari daftar
  const firstResto = locate('.restaurant-item__content a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  // Pastikan berada di halaman detail restoran
  I.waitForElement('h2.restaurant__title', 5);
  const detailTitle = await I.grabTextFrom('h2.restaurant__title');

  // Klik tombol like untuk menyukai restoran
  I.waitForElement('button#likeButton.like');
  I.click('#likeButton');

  // Pastikan restoran sudah masuk ke daftar favorit
  I.amOnPage('/#/like');
  I.waitForElement('.restaurant-item__content a', 5);
  const likedRestoTitle = await I.grabTextFrom('.restaurant-item__content a');
  assert.strictEqual(firstRestoTitle, likedRestoTitle, detailTitle);

  // Buka detail restoran dari daftar favorit
  I.click(locate('.restaurant-item__content a').first());

  // Klik tombol unlike untuk membatalkan menyukai restoran
  I.waitForElement('#likeButton');
  I.click('#likeButton');

  // Pastikan restoran tidak lagi ada di daftar favorit
  I.amOnPage('/#/like');
  I.dontSeeElement('.restaurant-item__content a');
});

import DaftarResto from '../views/pages/daftar-resto';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': DaftarResto, // default page
  '/daftar-resto': DaftarResto,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
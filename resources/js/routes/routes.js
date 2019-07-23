import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import Product from "../pages/Product";
import Create from "../pages/CreateProduct";
import SearchResults from "../pages/SearchResults";
import Update from "../pages/UpdateProduct";
import CategoryPro from "../pages/CategoryPro";
import CategoryPrivate from "../pages/CategoryPrivate";
import AllProducts from "../pages/AllProducts";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import CreateProvider from "../pages/CreateProvider";
import Guest from "../pages/Guest";
import MyOrder from "../pages/MyOrders";
import Config from "../pages/Configurator";
import News from "../pages/News";
import Profile from "../pages/ProfilUser";

const routes = [
  {
        path: '/',
        exact: true,
        auth: true,
        component: Home,
        fallback: Welcome,
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login,
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register,
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword,
    },
    {
        path: '/reset-password',
        exact: true,
        auth: false,
        component: ResetPassword,
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard,
    },
    {
        path: '/configurator',
        exact: true,
        auth: true,
        component: Config,
    },
    {
        path: '/news',
        exact: true,
        auth: false,
        component: News,
    },
    {
        path: '/create',
        exact: true,
        auth: true,
        component: Create,
    },
    {
        path: '/guest',
        exact: true,
        auth: false,
        component: Guest,
    },
    {
        path: '/createprovider',
        exact: true,
        auth: true,
        component: CreateProvider,
    },
    {
        path: '/update',
        exact: true,
        auth: true,
        component: Update,
    },
    {
        path: '/orders',
        exact: true,
        auth: true,
        component: Orders,
    },
    {
        path: '/home',
        exact: true,
        auth: false,
        component: Home,
    },
    {
        path: '/myorder',
        exact: true,
        auth: false,
        component: MyOrder,
    },
    {
        path: '/product/:id',
        exact: true,
        auth: false,
        component: Product,
    },
    {
        path: '/search',
        exact: true,
        auth: false,
        component: SearchResults,
    },
    {
        path: '/cart',
        exact: true,
        auth: false,
        component: Cart,
    },
    {
        path: '/components',
        exact: true,
        auth: false,
        component: CategoryPro,
    },
    {
        path: '/rtu',
        exact: true,
        auth: false,
        component: CategoryPrivate,
    },
    {
        path: '/all',
        exact: true,
        auth: false,
        component: AllProducts,
    },
    {
        path: '/profile',
        exact: true,
        auth: true,
        component: Profile,
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch,
    },
    ];

    export default routes;

import * as routes from "./utils/consts"
import Admin from "./pages/Admin"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Auth from "./pages/Auth"
import Shop from "./pages/Shop"

export const authRouts = [
    {
        path: routes.ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: routes.BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRouts = [
    {
        path: routes.LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: routes.DEVICE_ROUTE + "/:id",
        Component: DevicePage
    },
    {
        path: routes.REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: routes.SHOP_ROUTE,
        Component: Shop
    },
]
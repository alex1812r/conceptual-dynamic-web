import { 
  Person as PersonIcon, 
  Inventory as InventoryIcon,
  ShoppingBag as ShoppingIcon
} from '@mui/icons-material';

export const drawerWidth = 240;

export const sidebarRoutes = [
  {
    name: 'Clients',
    icon: <PersonIcon />,
    href: '/clients'
  },
  {
    name: 'Products',
    icon: <InventoryIcon />,
    href: '/products'
  },
  {
    name: 'Orders',
    icon: <ShoppingIcon />,
    href: '/orders'
  }
]
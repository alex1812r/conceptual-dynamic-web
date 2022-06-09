import { PersonOutline as PersonIcon, Inventory as InventoryIcon } from '@mui/icons-material';

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
  }
]
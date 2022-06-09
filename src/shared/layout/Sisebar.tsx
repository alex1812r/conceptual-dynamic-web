import React, { useMemo } from 'react'
import { 
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  Toolbar 
} from '@mui/material';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { drawerWidth, sidebarRoutes } from './config';
import crmImg from '../assets/images/crm.png'

interface ListItemLinkProps extends Omit<ListItemProps, 'components'> {
  to: string;
  icon?: React.ReactNode;
  text: string;
  selected?: boolean
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, icon, text, selected, ...restProps }) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>((
        itemProps,
        ref,
      ) => {
        const linkProps = { 
          ...itemProps,
          to, 
          ref, 
          role: undefined,
          style: { color: 'inherit', textDecoration: 'none' }
        };
        return <Link {...linkProps} />;
      }),
    [to],
  );
  return (
    <ListItem
      components={{
        Root: renderLink
      }}
      {...restProps}>
      <ListItemButton selected={selected}>
          {icon 
            ? <ListItemIcon>
                {icon}
              </ListItemIcon> 
            : null
          }
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export interface SidebarProps {
  container?: () => HTMLElement
  mobileOpen: boolean;
  toggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ container, mobileOpen, toggle }) => {
  const location = useLocation();

  const routeListItems = useMemo(() => 
    sidebarRoutes.map((item, i) => 
      <ListItemLink 
        key={`route-${i + 1}`}
        to={item.href}
        icon={item.icon}
        text={item.name}
        selected={location.pathname.startsWith(item.href)}
      />
    )
  , [location]) 

  const drawer = useMemo(() => 
    <>
      <Toolbar>
        <img src={crmImg} alt="crm-logo" width="100%" />
      </Toolbar>
      <Divider />
      <List>
        {routeListItems}
      </List>
    </>
  , [routeListItems]);

  return (
    <>
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={toggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
    </>
  );
};
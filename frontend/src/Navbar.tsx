import { Link, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import { NAVBAR_STYLES } from './styles/constants';

const NavbarItem = ({ name, icon: Icon, path }: { name: string, icon: any, path: string }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
      <Link to={path} style={{ textDecoration: 'none', width: '100%' }}>
        <ListItem
            sx={{
              ...NAVBAR_STYLES.item,
              ...(isActive && NAVBAR_STYLES.activeItem),
            }}
        >
          <Box sx={NAVBAR_STYLES.iconWrapper}>
            <ListItemIcon sx={NAVBAR_STYLES.icon}>
              <Icon />
            </ListItemIcon>
          </Box>
          <ListItemText
              primary={name}
              primaryTypographyProps={{
                sx: NAVBAR_STYLES.itemText
              }}
          />
          {isActive && <Box sx={NAVBAR_STYLES.activeIndicator} />}
        </ListItem>
      </Link>
  );
};

export const navbarItems = [
  {
    name: 'Dashboard',
    icon: DashboardIcon,
    path: '/',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Classes',
    icon: ClassIcon,
    path: '/classes',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Logout',
    icon: LogoutIcon,
    path: '/logout',
    component: NavbarItem,
    security: () => true
  },
];
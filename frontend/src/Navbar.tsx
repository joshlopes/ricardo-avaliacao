import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import WalletIcon from '@mui/icons-material/Wallet';
import GraphIcon from '@mui/icons-material/GraphicEq';
import NotificationChannelIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import CompanyIcon from '@mui/icons-material/House';
import UserIcon from '@mui/icons-material/Person';
import {Teacher} from "./types/Teacher";

const NavbarItem = ({ name, icon: Icon, path }: { name: string, icon: any, path: string }) => (
    <Link to={path}>
      <ListItem button>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
);

export const navbarItems = [
  {
    name: 'Dashboard',
    icon: GraphIcon,
    path: '/',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Distribute chains',
    icon: SettingsIcon,
    path: '/distribute-chains',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Wallets',
    icon: WalletIcon,
    path: '/wallets',
    component: NavbarItem,
    security: (user: Teacher) => user.is_super_admin
  },
  {
    name: 'Notification channels',
    icon: NotificationChannelIcon,
    path: '/notification-channels',
    component: NavbarItem,
    security: (user: Teacher) => user.is_super_admin
  },
  {
    name: 'Users',
    icon: UserIcon,
    path: '/users',
    component: NavbarItem,
    security: (user: Teacher) => user.is_super_admin
  },
  {
    name: 'Company',
    icon: CompanyIcon,
    path: '/companies',
    component: NavbarItem,
    security: (user: Teacher) => user.is_super_admin
  },
  {
    name: 'Logout',
    icon: LogoutIcon,
    path: '/logout',
    component: NavbarItem,
    security: () => true
  },
];
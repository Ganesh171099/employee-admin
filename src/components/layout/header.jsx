import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { Logout, Menu as MenuIcon, PersonOutline } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAuthUser } from '../../redux/selectors/authSelectors';
import { logout } from '../../redux/slices/authSlice';
import { setMobileSidebarOpen } from '../../redux/slices/uiSlice';
import { tokens } from '../../theme';
import { notifySuccess } from '../common/notify';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    notifySuccess('Signed out successfully');
    navigate('/login');
  };

  return (
    <Box
      component="header"
      sx={{
        height: tokens.layout.headerHeight,
        px: { xs: 2, md: 3 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${tokens.colors.border}`,
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <IconButton
          sx={{ display: { md: 'none' } }}
          onClick={() => dispatch(setMobileSidebarOpen(true))}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Typography variant="h5">
            Welcome, {user?.name?.split(' ')[0] || 'Admin'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Super Admin · Multi-company platform
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="body2" fontWeight={600}>
            {user?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: tokens.colors.black,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {user?.avatarInitials || 'SA'}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              navigate('/profile');
            }}
          >
            <PersonOutline fontSize="small" sx={{ mr: 1 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout fontSize="small" sx={{ mr: 1 }} />
            Sign out
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default Header;

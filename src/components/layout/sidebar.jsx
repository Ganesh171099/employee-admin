import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { getNavModules } from '../../config/modulesConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setMobileSidebarOpen, toggleSidebar } from '../../redux/slices/uiSlice';
import { tokens } from '../../theme';
import AppLogo from '../common/appLogo';

const MotionBox = motion.create(Box);

const SidebarContent = ({ collapsed, onNavigate }) => {
  const location = useLocation();
  const modules = getNavModules();
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `
          linear-gradient(180deg, ${tokens.colors.surface} 0%, ${tokens.colors.surfaceAlt} 100%)
        `,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: collapsed ? 1.25 : 2, py: 2.25 }}
      >
        <AppLogo compact={collapsed} />
        <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
          <IconButton
            size="small"
            onClick={() => dispatch(toggleSidebar())}
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </Stack>

      <Divider />

      <Box sx={{ px: 1.25, py: 1.5, flex: 1, overflowY: 'auto' }}>
        {!collapsed && (
          <Typography
            variant="overline"
            sx={{ px: 1.25, mb: 1, display: 'block', color: tokens.colors.muted }}
          >
            Platform
          </Typography>
        )}
        <List disablePadding>
          {modules.map((module) => {
            const Icon = module.icon;
            const active = location.pathname.startsWith(module.path);

            return (
              <ListItemButton
                key={module.id}
                component={NavLink}
                to={module.path}
                onClick={onNavigate}
                selected={active}
                sx={{
                  mb: 0.5,
                  borderRadius: 1.5,
                  minHeight: 46,
                  px: collapsed ? 1.25 : 1.5,
                  '&.Mui-selected': {
                    backgroundColor: tokens.colors.black,
                    color: tokens.colors.white,
                    '&:hover': { backgroundColor: tokens.colors.charcoal },
                    '& .MuiListItemIcon-root': { color: tokens.colors.white },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : 40,
                    mr: collapsed ? 0 : 0.5,
                    justifyContent: 'center',
                    color: active ? tokens.colors.white : tokens.colors.slate,
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={module.label}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          sx={{
            p: collapsed ? 1 : 1.5,
            borderRadius: 2,
            border: `1px solid ${tokens.colors.border}`,
            backgroundColor: tokens.colors.surface,
          }}
        >
          {!collapsed ? (
            <>
              <Typography variant="caption" color="text.secondary">
                Environment
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                Demo · Mock API
              </Typography>
            </>
          ) : (
            <Typography variant="caption" fontWeight={700} textAlign="center" display="block">
              DEMO
            </Typography>
          )}
        </MotionBox>
      </Box>
    </Box>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((state) => state.ui.mobileSidebarOpen);
  const width = collapsed ? tokens.layout.sidebarCollapsed : tokens.layout.sidebarWidth;

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width,
            boxSizing: 'border-box',
            transition: 'width 0.25s ease',
            overflowX: 'hidden',
          },
        }}
        open
      >
        <SidebarContent collapsed={collapsed} />
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => dispatch(setMobileSidebarOpen(false))}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          [`& .MuiDrawer-paper`]: {
            width: tokens.layout.sidebarWidth,
          },
        }}
      >
        <SidebarContent
          collapsed={false}
          onNavigate={() => dispatch(setMobileSidebarOpen(false))}
        />
      </Drawer>
    </>
  );
};

export default Sidebar;

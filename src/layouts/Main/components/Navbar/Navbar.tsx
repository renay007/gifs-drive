import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

interface Setting {
  path: string;
  name: string;
}

const settings: Setting[] = [
  {
    path: "/logout",
    name: "Logout",
  },
];

interface Props {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: Props): JSX.Element => {
  const [auth, setAuth] = React.useState(true);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    onLogout();
    setAnchorElUser(null);
  };

  return (
    <Toolbar>
      <AdbIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        component="a"
        href="/"
        sx={{
          flexGrow: 1,
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Gifs Drive
      </Typography>

      {auth ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Rene Midouin" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting, id) => (
              <MenuItem key={id} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <Box>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Box>
      )}
    </Toolbar>
  );
};

export default Navbar;

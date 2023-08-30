import { Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="md:!hidden">
      <Button
        onClick={handleOpen}
        className="!capitalize !transition-opacity menuBtn !text-white !mx-7"
      >
        Menu
      </Button>
      <Menu
        className="menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem>Home</MenuItem>
        <MenuItem>Movies</MenuItem>
        <MenuItem>TV Shows</MenuItem>
        <MenuItem>New</MenuItem>
        <MenuItem>Popular</MenuItem>
      </Menu>
    </div>
  );
};

export default NavMenu;

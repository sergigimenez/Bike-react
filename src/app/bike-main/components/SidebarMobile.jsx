import { Search } from "@mui/icons-material";
import {
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

export const SidebarMobile = ({ stateMenu, theme, menuItems }) => {
  const { primary, secondary, background, color } = theme;
  //const navigate = useNavigate();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [left]: open });
  };

  const onHandleClickMenu = (item) => {
    //navigate(`/bike/${item.navigate}`)
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={stateMenu}
      sx={{ top: "60px" }}
      onClose={toggleDrawer("left", false)}
      onOpen={toggleDrawer("left", false)}
    >
      <Box
        sx={{ width: "100vw", height: "100%", backgroundColor: secondary }}
        role="presentation"
      >
        <TextField
          hiddenLabel
          variant="filled"
          size="small"
          sx={{ input: { color: color }, width: "100%", mr: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: color }}>
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => onHandleClickMenu(item)}>
                <ListItemIcon style={{ color: color }}>
                  {item.customTag}
                </ListItemIcon>
                <ListItemText>{item.id}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

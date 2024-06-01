import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Receipt as ReceiptIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      PaperProps={{
        sx: {
          width: open ? 240 : 56,
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "#2d6a9c",
          color: "#fff",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => navigate("/")} sx={{ mb: 2 }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Accueil"
            sx={{ display: open ? "block" : "none" }}
          />
        </ListItem>
        <ListItem button onClick={() => navigate("/users")} sx={{ mb: 2 }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Utilisateurs"
            sx={{ display: open ? "block" : "none" }}
          />
        </ListItem>
        <ListItem button onClick={() => navigate("/products")} sx={{ mb: 2 }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText
            primary="Produits"
            sx={{ display: open ? "block" : "none" }}
          />
        </ListItem>
        <ListItem button onClick={() => navigate("/factures")} sx={{ mb: 2 }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText
            primary="Factures"
            sx={{ display: open ? "block" : "none" }}
          />
        </ListItem>
        <ListItem button onClick={() => navigate("/devis")} sx={{ mb: 2 }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText
            primary="Devis"
            sx={{ display: open ? "block" : "none" }}
          />
        </ListItem>
        <ListItem button onClick={() => navigate("/clients")} sx={{ mb: 2 }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Clients"
            sx={{ display: open ? "block" : "none" }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

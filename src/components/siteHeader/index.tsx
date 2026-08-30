import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "TV Shows", path: "/tvshows" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(15, 15, 20, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ minHeight: "72px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h4"
              onClick={() => navigate("/")}
              sx={{
                fontWeight: 800,
                letterSpacing: "1px",
                cursor: "pointer",
              }}
            >
              LULU PRIME
            </Typography>

            {!isMobile && (
              <Typography
                variant="caption"
                sx={{
                  marginRight: 3,
                  opacity: 0.6,
                  letterSpacing: "1px",
                }}
              >
                A Movie and TV Show Database App
              </Typography>
            )}
          </div>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => {
                      handleMenuSelect(opt.path);
                      setAnchorEl(null);
                    }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{
                    marginLeft: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;

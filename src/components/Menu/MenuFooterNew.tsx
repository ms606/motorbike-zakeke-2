import React, {useState, useEffect} from 'react';
import MenuFooter from "../Footer/MenuFooter";

export const HamburgerIcon = () => {
    const [iconSize, setIconSize] = useState(30); // Default size
  
    useEffect(() => {
      const updateIconSize = () => {
        if (window.innerWidth < 1318) {
          setIconSize(28); // Smaller size for small screens
        } else {
          setIconSize(30); // Default size for larger screens
        }
      };
  
      window.addEventListener("resize", updateIconSize);
      updateIconSize(); // Initial size set
  
      return () => window.removeEventListener("resize", updateIconSize);
    }, []);
  
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: "5px" }}
      >
        <rect y="3" width="16" height="1" fill="currentColor" />
        <rect y="7" width="16" height="1" fill="currentColor" />
        <rect y="11" width="16" height="1" fill="currentColor" />
      </svg>
    );
  };
  interface MenuFooterNewProps {
    loadMenu: () => void;
    setMenuTrayOpen: (open: boolean) => void;
    menuTrayOpen: boolean;
    viewFooter: React.RefObject<HTMLDivElement>; 
   }


export const MenuFooterNew:React.FC<MenuFooterNewProps> = ({loadMenu, setMenuTrayOpen, menuTrayOpen, viewFooter}) => {
    return (
        <div className="menu_tray_footer">
                <div className="menu_tray_footer_selection">
                  <div
                    className="menu_tray_footer_name"
                    onClick={() => {
                      loadMenu();
                      setMenuTrayOpen(!menuTrayOpen);
                    }}
                  >
                    <div className="menu_tray_footer_summary">SUMMARY</div>

                    <HamburgerIcon />
                  </div>
                </div>
                <div className="menu_tray_add_to_cart">
                  <MenuFooter viewFooter={viewFooter} />                  
                </div>
              </div>
    )
};
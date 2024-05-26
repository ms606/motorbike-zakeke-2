import React from "react";
import ShareIcon from "../../icons/ShareIcon";
import { useZakeke } from "zakeke-configurator-react";
import useStore from "../../Store";
import DownloadPDF from "../Preview/DownloadPDF";

interface MenuFooterProps {
  viewFooter: any;
}

const MenuFooter: React.FC<MenuFooterProps> = ({ viewFooter }) => {
  const { isAddToCartLoading, addToCart, price, useLegacyScreenshot } =
    useZakeke();
  const { priceFormatter, bodyMeasurements } = useStore();

  return (
    <div style={{position: 'absolute', bottom: '0px', right: '0px'}}>
      <div
        className="menu_footer"
        ref={viewFooter}
        style={{
          position: "relative",
          bottom: "5px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div className="menu_price">
          {/* <div className="price_text">Price: </div> */}
          {/* <div className="price_value">{priceFormatter.format(price)}</div> */}
        </div>
        <div className="menu_actions">
          {isAddToCartLoading ? (
            "Adding to cart..."
          ) : (
            <div
              onClick={() =>
                addToCart(bodyMeasurements, undefined, useLegacyScreenshot)
              }
              className="btn btn-primary menu_btn_cart"
            >
              NEXT
            </div>
          )}
          {/* {
              <button className="btn btn-secondary Menu_ff_menu__btn__iOQsk Menu_ff_menu__btn__share__1sacu">
                <div className="menu_btn_share_icon">
                  <ShareIcon />
                </div>  
              </button>
            } */}
        </div>
        <DownloadPDF />
      </div>
    </div>
  );
};
export default MenuFooter;

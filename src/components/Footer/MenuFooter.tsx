import React from "react";
import ShareIcon from "../../icons/ShareIcon";
import { useZakeke } from "zakeke-configurator-react";
import useStore from "../../Store";
import DownloadPDF from "../Preview/DownloadPDF";
import {
  MessageDialog,
  QuestionDialog,
  useDialogManager,
} from "../dialog/Dialogs";
import ErrorDialog from "../dialogs/ErrorDialog";
import QuotationFormDialog from "../dialog/QuotationFormDialog";
import SaveDesignsDraftDialog from '..//dialog/SaveDesignsDraftDialog';
import { T } from "../../Helpers";
import { CustomQuotationConfirmMessage } from "../Layout/SharedComponents";
import { TailSpin } from "react-loader-spinner";

interface MenuFooterProps {
  viewFooter: any;
}

const MenuFooter: React.FC<MenuFooterProps> = ({ viewFooter }) => {
  const {
    isAddToCartLoading,
    addToCart,
    price,
    useLegacyScreenshot,
    product,
    setCameraByName,
    saveComposition,
    createQuote,
  } = useZakeke();
  const {
    priceFormatter,
    bodyMeasurements,
    kneeSliders,
    isDraftEditor,
    isEditorMode,
    isQuoteLoading,
    setIsQuoteLoading,
    isViewerMode,
    // sellerSettings,
  } = useStore();

  const { showDialog, closeDialog } = useDialogManager();

  // Handle the "Get a Quote" button click event
  const handleSubmitRequestQuote = async (formData: any) => {
    let thereIsARequiredFormEmpty = formData.some(
      (form: any) => form.required && form.value === ""
    );
    if (thereIsARequiredFormEmpty)
      showDialog(
        "error",
        <ErrorDialog
          error={T._(
            "Failed to send the quotation since there is at least 1 required field empty.",
            "Composer"
          )}
          onCloseClick={() => closeDialog("error")}
        />
      );
    else
      try {
        closeDialog("request-quotation");
        setIsQuoteLoading(true);
        setCameraByName("buy_screenshot_camera", false, false);
        await saveComposition();
        await createQuote(formData);
        showDialog(
          "message",
          <MessageDialog
            windowDecorator={CustomQuotationConfirmMessage}
            message={T._("Request for quotation sent successfully", "Composer")}
          />
        );
        setIsQuoteLoading(false);
      } catch (ex) {
        console.error(ex);
        setIsQuoteLoading(false);
        showDialog(
          "error",
          <ErrorDialog
            error={T._(
              "An error occurred while sending request for quotation. Please try again.",
              "Composer"
            )}
            onCloseClick={() => closeDialog("error")}
          />
        );
      }
  };

  // Handle the "Get Quote" button click event
  const handleGetQuoteClick = async () => {
    let rule = product?.quoteRule;
    if (rule)
      showDialog(
        "request-quotation",
        <QuotationFormDialog
          getQuoteRule={rule}
          onFormSubmit={handleSubmitRequestQuote}
        />
      );
  };

  // Check if the "Add to Cart" button should be visible based on the quote rule
  const isBuyVisibleForQuoteRule = product?.quoteRule
    ? product.quoteRule.allowAddToCart
    : true;

  // Handle the "Save" button click event
  const handleSaveClick = async () => {
    showDialog(
      "save",
      <SaveDesignsDraftDialog onCloseClick={() => closeDialog("save")} />
    );
  };

  return (
    <div className="menu_footer_master">
      <div
        className="menu_footer"
        ref={viewFooter}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          cursor: "pointer",
        }}
      >
        {/* <div className="menu_actions">
          {isAddToCartLoading ? (
            "Adding to cart..."
          ) : (
            <div
              onClick={() =>
                addToCart(bodyMeasurements, undefined, useLegacyScreenshot)
              }
              className="btn btn-primary menu_btn_cart"
            >
              <span>
									{isDraftEditor || isEditorMode
										? 'Save'
										: 'Finish'}
								</span>
            </div>
          )}
         
        </div>
        <DownloadPDF /> */}

        <div>
          {/* Save composition */}
          {!isDraftEditor &&
            !isEditorMode &&
            !isViewerMode && (
            // sellerSettings &&
            // sellerSettings.canSaveDraftComposition && (
            //   <Button key={"save"} onClick={() => handleSaveClick()}>
            //     <Icon>
            //       <SaveSolid />
            //     </Icon>
            //   </Button>
			<div key={"save"} onClick={() => handleSaveClick()}>
                SAVE ME
              </div>
            )}
        </div>

		

        {/* Get a quote */}
        {/* {product?.quoteRule && !isViewerMode && !isDraftEditor && !isEditorMode && !isDraftEditor && ( */}
        <div className="menu_actions">
          <div
            className="btn btn-primary menu_btn_cart"
            // disabled={disableButtonsByVisibleMessages}
            key={"quote"}
            // primary
            onClick={() => handleGetQuoteClick()}
          >
            QUOTE
            {isQuoteLoading && <TailSpin color="#FFFFFF" height="25px" />}
            {/*{!isQuoteLoading && <span>{T._('Get a quote', 'Composer')}</span>} */}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
export default MenuFooter;

import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import styled from "styled-components";
import { useZakeke } from "zakeke-configurator-react";
import {List, ListItemColor, ListItemImageNoCarousel , ListItem, ListItemImage } from "./list";
import "./selector.css";
import "./Menu/menu.css";
import { Dialog, useDialogManager } from "../components/dialogs/Dialogs";
import ErrorDialog from "../components/dialogs/ErrorDialog";
import ArDeviceSelectionDialog from "../components/dialogs/ArDeviceSelectionDialog";
import Cameras from "./Cameras/Cameras";
import Preview from "./Preview/Preview";
import SvgArrowDown from "../icons/Arrowdown";
import Loader from "../components/Loader/Loader";
import Scroll from "./Scroll/Scroll";
import SelectionIcon from "../icons/SelectionIcon";
import ExplodeSolid from "../assets/icons/expand-arrows-alt-solid.js";

import { ExplodeIconL } from "../assets/icons/ExplodeIcon";
import { Icon } from "./Atomic";
import MenuFooter from "./Footer/MenuFooter";
import Designer from "./Layout/Designer";
import { customizeGroup } from "../Helpers";
import { AiIcon, ArIcon } from "../components/Layout/LayoutStyles";

import {
  PRODUCT_FULL_SUIT,
  PRODUCT_BLAZER,
  PRODUCT_PANT,
  scrollDownOnClick,
} from "../Helpers";
import Zoom from "./Zoom/Zoom";

const Container = styled.div`
  height: 839px;
  overflow: auto;
  font-family: "Avenir Next", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`;

export const ExplodeIcon = styled(Icon)`
  width: 32px;
  height: 32px;
`;

interface SelectorProps {
  refViewer: any; // React.RefObject<HTMLElement>;
  fullScreen: any;
}

const Selector: FunctionComponent<SelectorProps> = ({
  refViewer,
  fullScreen,
}) => {
  const {
    isSceneLoading,
    groups,
    selectOption,
    setCamera,
    setExplodedMode,
    zoomIn,
    zoomOut,
    product,
    IS_IOS,
    IS_ANDROID,
    getMobileArUrl,
    openArMobile,
    isSceneArEnabled,
    productName,
  } = useZakeke();

  // console.log(groups, useZakeke(), "groups");

  const { showDialog, closeDialog } = useDialogManager();

  const idsToRemove = [10483, 10482, -1, 10852, 10856, 11209];

  idsToRemove.push(10640); // id to remove on only blazer product

  const groups1 = groups.filter((obj) => !idsToRemove.includes(obj.id));

  if (product?.name != PRODUCT_PANT) groups1.push(customizeGroup);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //console.log(groups,'groups');

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedStepName, selectStepName] = useState<string | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);
  const [selectedAttributeOptionName, setSelectedAttributeOptionName] =
    useState<string | null>(null);
  const [selectedOptionName, selectOptionName] = useState<string | null>(null);

  const [selectedLiningTypeHeadName, selectLiningTypeHeadName] = useState<
    string | null
  >(null);
  const [selectedLiningTypeName, selectLiningTypeName] = useState<
    string | null
  >(null);

  const [selectedExplodedState, setSelectedExplodedStatese] = useState<
    boolean | null
  >(false);

  const [selectedCameraID, setSelectedCameraID] = useState<string | null>(null);
  const [selectedCameraAngle, setSelectedCameraAngle] = useState<string | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const [checkOnce, setCheckOnce] = useState<boolean | null>(true);

  // const [closeAttribute, setCloseAttribute] = useState<boolean | null>(null);

  const [selectedOptionId, selectOptionId] = useState<number | null>(null);

  const [selectedColorName, selectColorName] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);
  const viewFooter = useRef<HTMLDivElement | null>(null);

  var selectedGroup = groups1.find((group) => group.id === selectedGroupId);
  var selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  // Attributes can be in both groups1 and steps, so show the attributes of step or in a group based on selection
  const attributes = useMemo(
    () => (selectedStep || selectedGroup)?.attributes ?? [],
    [selectedGroup, selectedStep]
  );

  const handleArClick = async (arOnFlyUrl: string) => {
    if (IS_ANDROID || IS_IOS) {
      setIsLoading(true);
      const link = new URL(arOnFlyUrl, window.location.href);
      const url = await getMobileArUrl(link.href);
      setIsLoading(false);
      if (url)
        if (IS_IOS) {
          openArMobile(url as string);
        } else if (IS_ANDROID) {
          showDialog(
            "open-ar",
            <Dialog>
              <button
                style={{ display: "block", width: "100%" }}
                onClick={() => {
                  closeDialog("open-ar");
                  openArMobile(url as string);
                }}
              >
                See your product in AR
              </button>
            </Dialog>
          );
        }
    } else {
      showDialog("select-ar", <ArDeviceSelectionDialog />);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      //   setHeight(window.innerHeight);
    };

    //window.addEventListener('resize', handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [groups]);

  useEffect(() => {
    //console.log(selectedStepName, "selectStepName");

    const previewImage = attributes.forEach((attr) => {
      attr.options.forEach((option) => {
        if (option.selected && !!option.imageUrl) {
          let Previewdata = {
            image: option.imageUrl,
            optionName: option.id,
            attributeName: attr.id,
            stepName: attr.name,
            groupName: attr.code,
          };

          setPreviewImage(Previewdata);
        }
      });
    });

    selectedStep?.attributes.map((x) => {
      if (x.enabled === true) {
      }
    });
  }, [
    attributes,
    selectedGroup,
    selectedAttributeId,
    selectedCameraID,
    selectedLiningTypeHeadName,
    selectedLiningTypeName,
  ]);

  // console.log(selectedGroup, selectedStep,'selectedStep');

  //  console.log(previewImage,'previewImage');
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId
  );

  // Open the first group and the first step when loaded
  useEffect(() => {
    if (!selectedGroup && groups1.length > 0 && groups1[0].id != -2) {
      selectGroup(groups1[0].id);

      if (groups1[0].steps.length > 0) selectStep(groups1[0].steps[0].id);

      // if (templates.length > 0) setTemplate(templates[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups1]);

  // Select attribute first time
  useEffect(() => {
    if (!selectedAttribute && attributes.length === 1)
      selectAttribute(attributes[0]?.id);

    setSelectedAttributeOptionName(
      selectedAttribute && selectedAttribute.options
        ? selectedAttribute.options.find((x) => x.selected === true)?.name ||
            null
        : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, attributes]);

  useEffect(() => {
    if (selectedGroup) {
      const camera = selectedGroup.cameraLocationId;

      if (camera) setCamera(camera);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedGroupId, selectedCameraID, selectedStepId]);
  }, [selectedGroupId]);

  // Camera for left icons
  useEffect(() => {
    if (selectedCameraID) setCamera(selectedCameraID);
    if (selectedCameraAngle === "pant") {
      setSelectedExplodedStatese(false);
    } else {
      setSelectedExplodedStatese(true);
    }

    setSelectedCameraID("");
  }, [selectedCameraID]);

  // Camera for attributes
  useEffect(() => {
    if (
      !isSceneLoading &&
      selectedAttribute &&
      selectedAttribute.cameraLocationId
    ) {
      setCamera(selectedAttribute.cameraLocationId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, !isSceneLoading]);

  // useEffect(() => {

  //     // selectedGroup?.groups1.forEach((group) => {
  //     //   if (instanceOfViewerGroupAttribute(group)) {
  //     //     group.attributes.forEach((attr) => {
  //     //       attr.options.forEach((option) => {
  //     //         if (option.selected && !!option.imageUrl) {
  //     //           const Previewdata = {
  //     //             image: option.imageUrl,
  //     //             optionName: option.id,
  //     //             attributeName: attr.id,
  //     //             stepName: undefined,
  //     //             groupName: group.id,
  //     //           };
  //     //           setPreviewImage(Previewdata);
  //     //         }
  //     //       });
  //     //     });
  //     //   }

  //       selectedGroup?.steps.forEach((step) => {
  //           step.attributes.forEach((attr) => {
  //             attr.options.forEach((option) => {
  //               if (option.selected && !!option.imageUrl) {
  //                 const Previewdata = {
  //                   image: option.imageUrl,
  //                   optionName: option.id,
  //                   attributeName: attr.id,
  //                   stepName: step.id,
  //                   groupName: 'Kuch bhi' //group.id,
  //                 };
  //                 setPreviewImage(Previewdata);
  //               }
  //             });
  //           });
  //         });

  //         console.log('previewwwwwwwwwwwwwwww', previewImage);
  //        // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ selectedAttributeId, previewImage]);

  // console.log(product);


  const handleLeftClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex - 1 + groups.length) % groups.length);
    selectGroup(groups[(currentIndex - 1 + groups.length) % groups.length].id);  
  };

  const handleRightClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex + 1) % groups.length);
    selectGroup(groups[(currentIndex + 1) % groups.length].id);

  };

  if (isSceneLoading || !groups1 || groups1.length === 0 || isLoading)
    return <Loader visible={true} />;

  // if (isLoading)
  // return <Loader visible={isSceneLoading} />;

  // groups1
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options

  return (
    <Container>
      {/* {isSceneArEnabled() && (
       <div className="bubble_button_ar">
          <ArIcon hoverable onClick={() => handleArClick('ar.html')}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.74 6.86v18.27c0 .76.61 1.37 1.36 1.37h8.28v2H7.1c-1.85 0-3.36-1.51-3.36-3.36V6.86A3.36 3.36 0 017.1 3.5h9.28c.337 0 .663.05.97.143l-.734 1.878a1.364 1.364 0 00-.236-.021h-1.22c-.23.86-1.01 1.5-1.94 1.5h-2.96c-.93 0-1.71-.64-1.95-1.5H7.1c-.75 0-1.36.61-1.36 1.36z" fill="#838383"></path><path d="M12.53 16.31v7.59l7.86 4.78 7.86-4.78v-7.57l-7.64-5.02-8.08 5zm12.79.47l-4.94 2.69-4.86-2.66 5.07-3.14 4.73 3.11zm-10.79 1.77l4.84 2.65v4.5l-4.84-2.94v-4.21zm6.84 7.19v-4.53l4.89-2.66v4.22l-4.89 2.97zM19.158 8.172l.552-1.76h.016l.512 1.76h-1.08zm-2.408 2.04h1.768l.256-.816h1.816l.24.816h1.824L20.574 4.5h-1.72l-2.104 5.712zM23.044 10.212h1.76V8.22h.936c.696 0 .744.568.792 1.112.023.296.055.592.143.88h1.76c-.16-.264-.168-.944-.191-1.224-.064-.712-.36-1.24-.84-1.424.584-.216.855-.84.855-1.432 0-1.08-.864-1.632-1.864-1.632h-3.351v5.712zm1.76-4.352h.824c.671 0 .872.208.872.568 0 .512-.448.568-.776.568h-.92V5.86z" fill="#838383"></path></svg>
          </ArIcon> 
         <div className='bubble_button_text' style={{fontSize: "13px"}}>AR</div>
       </div>
			)} */}

      {product?.name === PRODUCT_FULL_SUIT && (
        <div className="bubble_button">
          <div className="bubble_button_button">
            <ExplodeIcon
              hoverable
              onClick={() => {
                setSelectedExplodedStatese(!selectedExplodedState);
                {
                  selectedExplodedState == true
                    ? setExplodedMode(true)
                    : setExplodedMode(false);
                }
              }}
            >
              <ExplodeSolid />
            </ExplodeIcon>
          </div>

          <div className="bubble_button_text">
            {!selectedExplodedState ? "Close" : "Open"}
          </div>
        </div>
      )}

      {/* {!IS_IOS && (
        <div
          className="bubble_button_fullScreen"
          onClick={() => {
            refViewer.current?.requestFullscreen();

            if (refViewer.current?.webkitRequestFullscreen) {
              refViewer.current.webkitRequestFullscreen();
            }

            const element = refViewer.current;

            if (element) {
              if (element.requestFullscreen) {
                // element.requestFullscreen();
              } else if (element.webkitEnterFullscreen) {
                element.webkitEnterFullscreen(); // Use webkitEnterFullscreen for iOS Safari
              } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen(); // For older Firefox
              } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen(); // For Internet Explorer
              }
            }
          }}
        >
          <div className="bubble_button_button">
            <ExplodeIcon>
              <ExplodeIconL />
            </ExplodeIcon>
          </div>

          <div className="bubble_button_text">Full Screen</div>
        </div>
      )} */}

      <div
        className="left-keys"
        style={{
          display: "flex",
          position: "absolute",
          left: "3%",
          flexDirection: "column",
          top: "0%",
        }}
      >
        {/* <Cameras
          cameras={groups}
          onSelect={setSelectedCameraID}
          onCameraAngle={setSelectedCameraAngle}
          selectedCameraAngle={selectedCameraAngle}
        /> */}
        {previewImage?.image && <Preview PreviewImage={previewImage} />}

        <Zoom zoomIn={zoomIn} zoomOut={zoomOut} />

        <Scroll upRef={refViewer.current} downRef={viewFooter.current} />
      </div>

      <div className="menu">
      <div className="menu_group">
      <div className="animate-wrapper-0">
        {/* Personalize A */}

        <div> 
          {/* style={containerStyles}> */}
          {/* {groups[currentIndex].name === "MODALITATE IMPRIMARE" && (!hasTypeZero) ? null : ( */}
          <div className="tray-header">
            {/* <TrayPreviewOpenButton
              width={width}
              trayPreviewOpenButton={trayPreviewOpenButton}
              selectedTrayPreviewOpenButton={selectedTrayPreviewOpenButton}
              selectTrayPreviewOpenButton={selectTrayPreviewOpenButton}
            /> */}

            <div
              style={{
                display: "flex",
                width: "420px",
                top: "50%",
                left: "50%",
                height: "auto",
                margin: "0px auto",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="previous-customization"
                onClick={handleLeftClick}
              >
                <div className="mc-prev">
                 'Left' {/* <AngleLeftSolid /> */}
                </div>
              </button>

              <div className="tray-header-1">
                <div
                  style={{
                    position: "absolute",
                    padding: "0px",
                    width: "100%",
                  }}
                >
                  <div className="active-marketing-component-name">
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "28px",
                      }}
                    >
                      {groups[currentIndex]?.name}
                    </span>
                    <span className="active-marketing-component-index">
                      {" "}
                      {currentIndex + 1} / {groups.length}
                    </span>
                  </div>
                </div>
              </div>
              <button className="next-customization" onClick={handleRightClick}>
                <div className="mc-prev">
                'Right' 
                 {/* <AngleRightSolid /> */}
                </div>
              </button>
            </div>
            
          </div>
          {/* )} */}
          <br />


          <div className={`animate-wrapper-2 show`}>
   

            {selectedGroup &&
              // !selectedTrayPreviewOpenButton &&
              selectedGroup.steps.length > 0 &&
              // !isTrayOpen && 
              (
                <List>
                  {selectedGroup.steps.map((step) => {
                    return (
                      <ListItem
                        key={step.id}
                        onClick={() => selectStep(step.id)}
                        selected={selectedStep === step}
                      >
                        {step.name}
                      </ListItem>
                    );
                  })}
                </List>
              )}

            {(
              <div style={{ width: "100%" }}>
                {/* <List> */}
                  {/* {width > 400 &&
                    attributes &&
                    !isTrayOpen &&
                    attributes.map((attribute) => {
                      return (
                        <ListItem
                          key={attribute.id}
                          onClick={() => selectAttribute(attribute.id)}
                          selected={selectedAttribute === attribute}
                        >
                          {attribute.name}
                        </ListItem>
                      );
                    })} */}

                  {/* Swiper For mobile */}
                  {/* {width <= 400 && attributes && !isTrayOpen && attributes.length > 3 ? (
                    <Swiper
                      spaceBetween={80}
                      slidesPerView={2}
                      navigation={true}
                      centeredSlides={true}
                      modules={[Navigation]}
                      //onSlideChange={() => console.log('slide change')}
                      //onSwiper={(swiper) => console.log(swiper)}
                    >
                      {attributes.map((attribute) => {
                        return (
                          <SwiperSlide>
                            <ListItem
                              key={attribute.id}
                              onClick={() => selectAttribute(attribute.id)}
                              selected={selectedAttribute === attribute}
                            >
                              {attribute.name}
                            </ListItem>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  ) : 
                  (attributes && attributes.map((attribute) => {
                    return (
                      <ListItem
                        key={attribute.id}
                        onClick={() => selectAttribute(attribute.id)}
                        selected={selectedAttribute === attribute}
                      >
                        {attribute.name}
                      </ListItem>
                    );
                  }))                  
                  } */}
                {/* </List> */}

          
                  <List>
                    { selectedAttribute &&
                      selectedAttribute.options.map((option) => {
                        if (option.enabled === false ) return <></>
                         return (
                          <ListItemColor
                            key={option.id}
                            onClick={() => {
                               {
                                if (
                                  option.name === "BRODAT" ||
                                  option.name === "TIPARIT" ||
                                  option.name === "PRINTAT"
                                ) {
             
                                  const indexForGroupTip = groups.findIndex(
                                    (obj) => obj.name === "MODALITATE IMPRIMARE"
                                  );
                                    if(indexForGroupTip > 0 ){
                                      selectGroup(groups[indexForGroupTip].id);
                                       if(groups[groups?.length -1].attributes[0].code === 'MODALITATE IMPRIMARE'){                                                                     
                                        selectOption(option.id);
                                       }
                                      // selectOption(option.id);
                                      selectOptionId(option.id);
                                      selectOptionName(option.name);
                                   }
                                  
                                } else 
                                { selectOption(option.id);
                                  selectOptionId(option.id);
                                  selectOptionName(option.name);
                                }
                              }
                            }}
                            selected={option.selected}
                            selectedColor={selectedColorName}
                          >
                            {option.imageUrl && (
                              <ListItemImage
                                src={option.imageUrl}
                                onClick={() => selectColorName(option.name)}
                              />
                            )}

                            <div style={{ position: "absolute", top: "120%" }}>
                              {option.id === selectedOptionId
                                ? option.name
                                : ""}
                            </div>
                          </ListItemColor>
                        );
                      })}
                    {/* {selectedColorName}   */}
                  </List>
           
              </div>
            )}
          </div>
        </div>
      </div>
      </div>   
      </div>
    </Container>
  );
};

export default Selector;

// 851 lines of code

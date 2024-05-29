import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import styled from "styled-components";
import { useZakeke } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage } from "./list";
import "./selector.css";
import "./Menu/menu.css";
import { Dialog, useDialogManager } from "../components/dialogs/Dialogs";
import ErrorDialog from "../components/dialogs/ErrorDialog";
import Preview from "./Preview/Preview";
import SvgArrowDown from "../icons/Arrowdown";
import Loader from "../components/Loader/Loader";
import Scroll from "./Scroll/Scroll";
import SelectionIcon from "../icons/SelectionIcon";
import ExplodeSolid from "../assets/icons/expand-arrows-alt-solid.js";

import { ExplodeIconL } from "../assets/icons/ExplodeIcon";
import { Icon } from "./Atomic";
import MenuFooter from "./Footer/MenuFooter";
import Designer from "./layouts/Designer";
import { customizeGroup, useActualGroups } from "../Helpers";
import { AiIcon, ArIcon } from "../components/Layout/LayoutStyles";

import {
  PRODUCT_FULL_SUIT,
  PRODUCT_BLAZER,
  PRODUCT_PANT,
  scrollDownOnClick,
} from "../Helpers";
import Zoom from "./Zoom/Zoom";
import Tray from "../components/Tray/Tray";
import Measurements from "../components/Measurements/Measurements";
import useStore from "../Store";


const Container = styled.div`
  height: 839px;
  overflow: auto;
  font-family: "Avenir Next", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  position: relative;
`;

export const ExplodeIcon = styled(Icon)`
  width: 32px;
  height: 32px;
`;

export const HamburgerIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: "5px" }}
  >
    <rect y="3" width="16" height="2" fill="currentColor" />
    <rect y="7" width="16" height="2" fill="currentColor" />
    <rect y="11" width="16" height="2" fill="currentColor" />
  </svg>
);

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
    templates,
    items,
    groups
  } = useZakeke();
  //   console.log(useZakeke(), "useZakeke()");
//   console.log(groups, useZakeke(), "newGroup");

  const newGroup = useActualGroups();
  
  const { showDialog, closeDialog } = useDialogManager();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedColorName, selectColorName] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  //console.log(newGroup,'newGroup');

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(12014);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedStepName, selectStepName] = useState<string | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);
  const [selectedAttributeOptionName, setSelectedAttributeOptionName] =
    useState<string | null>(null);
  const [selectedOptionName, selectOptionName] = useState<string | null>(null);

  const [selectedLiningTypeHeadName, selectLiningTypeHeadName] = useState<
    string | null
  >(null);

  const [selectedCameraID, setSelectedCameraID] = useState<string | null>(null);
  const [selectedCameraAngle, setSelectedCameraAngle] = useState<string | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const [checkOnce, setCheckOnce] = useState<boolean | null>(true);

  // Get a list of all group names so we can populate on the tray
  const [selectedGroupList, selectGroupList] = useState<any | null>(null);

  // const [selectedStepList, setSelectedStepList] = useState<any | null>([]);
  const [selectedStepList, setSelectedStepList] = useState<(number | string)[]>(
    []
  );

  // const [closeAttribute, setCloseAttribute] = useState<boolean | null>(null);

  const viewFooter = useRef<HTMLDivElement | null>(null);

  var indexToRemove = newGroup.findIndex((obj) => obj.id === -1);

  if (indexToRemove !== -1) {
    newGroup.splice(indexToRemove, 1);
  }
  
  var selectedGroup = newGroup.find((group) => group.id === selectedGroupId);
  var selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  //Inner Menu open
  const [menuTrayOpen, setMenuTrayOpen] = useState<boolean | null>(false);

  
  const [selectedPersonalize, setSelectedPersonalize] = useState<any | null>(
    false
  );

  const togglePersonalize = () => {
    setSelectedPersonalize(!selectedPersonalize);
  };

  // Attributes can be in both newGroup and steps, so show the attributes of step or in a group based on selection
  const attributes = useMemo(
    () => (selectedStep || selectedGroup)?.attributes ?? [],
    [selectedGroup, selectedStep]
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      //   setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //  console.log(previewImage,'previewImage');
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId
  );

  // Open the first group and the first step when loaded
  useEffect(() => {
console.log(newGroup,'newGroup');

    if (!selectedGroup && newGroup.length > 0) {
      selectGroup(newGroup[0].id);

      if (newGroup[0].steps.length > 0) selectStep(newGroup[0].steps[0].id);
    }

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup]);

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
  }, [selectedGroupId, selectedGroup, currentIndex]);

  // Camera for left icons
  useEffect(() => {
    if (selectedCameraID) setCamera(selectedCameraID);

    setSelectedCameraID("");
  }, [selectedCameraID, selectedGroup]);

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

  // Open the first group and the first step when loaded
  // useEffect(() => {
  //   console.log(newGroup,'newGroup');
    
  //   if (!selectedGroup && newGroup.length > 0) {
  //     selectGroup(newGroup[0].id);
  //   }

  //   var groupRec: {
  //     id: number;
  //     name: string;
  //     imageUrl: string | null | undefined;
  //   }[] = [];


  //   if (newGroup.length > 0) {
     
  //     newGroup.map((group) => {
  //       groupRec.push({
  //         id: group.id,
  //         name: group.name,
  //         imageUrl: group.imageUrl,
  //       });
  //     });

  //     console.log(groupRec,'groupRec');
      
  //     selectGroupList(groupRec);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    console.log(newGroup, 'newGroup');
  
    if (!selectedGroup && newGroup.length > 0) {
      selectGroup(newGroup[0].id);
    }
  
    var groupRec = newGroup.map(group => ({
      id: group.id,
      name: group.name,
      imageUrl: group.imageUrl
    }));
  
    console.log(groupRec, 'groupRec');
    selectGroupList(groupRec);
    
  }, []);


  const loadMenu = () => {
    var groupRec = newGroup.map(group => ({
      id: group.id,
      name: group.name,
      imageUrl: group.imageUrl
    }));
  
    console.log(groupRec, 'groupRec');
    selectGroupList(groupRec);
  }

  
  const handleLeftClick = () => {
    selectColorName("");
    if (selectedGroup) {
      setCurrentIndex(
        (currentIndex - 1 + selectedGroup?.steps.length) %
          selectedGroup?.steps.length
      );
      selectStep(
        selectedGroup.steps[
          (currentIndex - 1 + selectedGroup?.steps.length) %
            selectedGroup?.steps.length
        ].id
      );
      setSelectedCameraID(
        selectedGroup.steps[
          (currentIndex - 1 + selectedGroup?.steps.length) %
            selectedGroup?.steps.length
        ].cameraLocationID
      );
    }
  };

  const handleRightClick = () => {
 
    selectColorName("");
    if (selectedGroup) {
      setCurrentIndex(
        (currentIndex + 1 + selectedGroup?.steps.length) %
          selectedGroup?.steps.length
      );
      selectStep(
        selectedGroup.steps[
          (currentIndex + 1 + selectedGroup?.steps.length) %
            selectedGroup?.steps.length
        ].id
      );
      setSelectedCameraID(
        selectedGroup.steps[
          (currentIndex + 1 + selectedGroup?.steps.length) %
            selectedGroup?.steps.length
        ].cameraLocationID
      );
    }
  };

  const menuTrayToggle = () => {
    setMenuTrayOpen(!menuTrayOpen);
  };

  const addOptionToList = (optionId: number | string) => {
    setSelectedStepList((prevList) => [...prevList, optionId]);
  };


  if (isSceneLoading || !newGroup || newGroup.length === 0 || isLoading)
    return <Loader visible={true} />;

  // newGroup
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options

  return (
    <Container>
      {/* <div
        className="iHdtWA group-item selected"
        style={{
          position: "absolute",
          top: "5%",
          right: "1%",
          cursor: "pointer",
          marginLeft: "20px",
          width: "30vw",
        }}
      >
        <div
          className="button-53"
          onClick={() => setSelectedPersonalize(!selectedPersonalize)}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "7px",
            }}
          >
            "Personalizează"
          </span>
        </div> */}
      {/* {selectedPersonalize ? ( */}
      {/* <Designer /> */}
      {/* ) : ( */}
      {/* "" */}
      {/* )} */}
      {/* </div> */}

      


      {menuTrayOpen && (
        <Tray
          groupNameList={selectedGroupList}
          menuTrayToggle={menuTrayToggle}
          selectedStepList={selectedStepList}
          // filteredAreas={filteredAreas}
          // toggleFunc={toggleTray}
          // UpdateGroupId={groupIdFromFunc}
          // updCurrentIndex={updCurrentIndex}
          // selectedTray={selectedTrayType}
          // selectStepName={selectStepName}
        />
      )}

      <div className="menu">
        <div className="menu_group">
          {newGroup.map((group) => {
            const handleGroupClick = (group: any) => {
              selectGroup(group.id);
              selectOptionName("");
              setCurrentIndex(0);
              if (group.steps){
                selectStep(group?.steps[0]?.id);
              }
            };

            return (
              <div
                className={`menu_item ${
                  group.id === selectedGroupId ? "selected" : ""
                }`}
                key={group.id}
                onClick={() => {
                  scrollDownOnClick(checkOnce, setCheckOnce);
                  handleGroupClick(group);
                }}
              >
                {group.id === -1 ? "Other" : group.name}
              </div>
            );
          })}
        </div>
        <br />

        { (selectedGroupId && selectedGroupId > 0) ?
        <div className="menu_choice_steps">
          <div className="active-marketing-component-name">
            <div
              onClick={() => {
                handleLeftClick();
              }}
            >
              {"<"}
            </div>

            <span
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                lineHeight: "28px",
                fontFamily: "PF DinDisplay Pro",
                fontWeight: "700",
                fontSize: "18px",
                fontStyle: "italic",
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
            >
              {selectedGroup?.steps[currentIndex]?.name}
            </span>
            <span className="active-marketing-component-index">
              {" "}
              {currentIndex + 1} / {selectedGroup?.steps.length}
            </span>

            <div
              onClick={() => {
                handleRightClick();
              }}
            >
              {">"}
            </div>
          </div>

          {/* <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {selectedGroup && selectedGroup.steps.length > 0 && (
              <List>
                {selectedGroup.steps.map((step) => {
                  return (
                    <ListItem
                      key={step.id}
                      onClick={() => selectStep(step.id)}
                      selected={selectedStep === step}
                    >
                      Step: {step.name}
                    </ListItem>
                  );
                })}
              </List>
            )}
          </div> */}

          <div
            className="new"
            style={{
              width: "100%",
              marginTop: "30px",
              display: "flex",
              flexDirection: "row",
              flexFlow: "wrap",
            }}
          >
            {selectedStep?.attributes.map((attribute, index) => {
              if (!attribute.enabled || !attribute.options) return null; // Skip disabled or missing options

              return attribute.options.map((option) => {
                if (!option.imageUrl) return null; // Skip options without image URL

                return (
                  <ListItem
                    key={option.id}
                    onClick={() => {
                      // Logic for selecting options
                      selectOption(option.id);
                      selectOptionName(option.name);
                      addOptionToList(option.attribute.stepId);
                    }}
                    className="menu_choice_option"
                  >
                    <div className="menu_choice_option_image_container">
                      <ListItemImage
                        src={option.imageUrl}
                        big={attribute.code === "PROTECTORS" ? "Yes" : ""}
                      />
                    </div>
                  </ListItem>
                );
              });
            })}

            <div className="menu_tray_selection">
              <div
                className="menu_tray_name"
                onClick={() => {
                  loadMenu()
                  setMenuTrayOpen(!menuTrayOpen)
                }}
              >
                MENU
              </div>
              <HamburgerIcon />
            </div>
          </div>

         
        </div> : ''}
        
        {/*

        {selectedGroup && selectedGroup.steps.length > 0 && (
          <div className="menu_choice_steps">
            {selectedGroup.steps.map((step) => {
              return (
                <div
                  className="menu_choice_step_step"
                  key={step.id}
                  onClick={() => {
                    selectStepName(step.name);
                    selectStep(step.id);
                    setCamera(step?.cameraLocationID || "");
                    if (selectedStepId != step.id) {
                      selectOptionName("");
                    }
                  }}
                >


                 <div
                    className="menu_choice_step_title"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      borderBottom: "1px solid var(--template-primary--400)",
                    }}
                  >
                    <div
                      className="menu_choice_step_description"
                      style={{
                        paddingBottom: "1em",
                        justifyContent: "center",
                      }}
                    >
                      {step.name}
                    </div>
                  </div>

                  {step.attributes.map((attribute) => {
                    if (attribute.enabled === false) return <></>;
                    return (
                      <>
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                          }}
                        >
                          {attribute.options.map((option) => {
                            return (
                              <>
                                {
                                  <div
                                    style={{
                                      marginLeft: "5px",
                                      width: "23%",
                                    }}
                                  >
                                    <div>
                                      {option.imageUrl && (
                                        <ListItem
                                          key={option.id}
                                          onClick={() => {
                                            attribute.options.map((x) => {
                                              if (x.selected === true)
                                                selectLiningTypeName(x.name);
                                            });

                                            selectOption(option.id);
                                            selectOptionName(option.name);
                                          }}
                                          selected={option.selected}
                                          className="menu_choice_option"
                                        >
                                          <div className="menu_choice_option_image_container">
                                            {option.imageUrl && (
                                              <ListItemImage
                                                src={option.imageUrl}
                                              />
                                            )}
                                          </div>
                                        </ListItem>
                                      )}
                                    </div>
                                  </div>
                                }
                              </>
                            );
                          })}
                        </div>
                      </>
                    );
                  })} 
                </div>
              );
            })}
          </div>
        )}
*/}
        
        {selectedGroup?.id === -4 && (
          <div>
            <div
              className="textEditor"
              style={{ overflowX: "hidden", height: "100%" }}
            >
              <Measurements />
            </div>
            <div
              style={{ position: "relative", bottom: "370px", left: "20px" }}
            >
            </div>
          </div>
        )}

        {selectedGroup?.id === -5 && (
          <div>
            <div
              className="textEditor"
              style={{ overflowX: "hidden", width: "30vw", height: "70vh" }}
            >
              <Designer />
            </div>
            <div
              style={{ position: "relative", bottom: "370px", left: "20px" }}
            >
            </div>
          </div>
        )}

        <br />
        <br />
        <br />
        {/* closed recently */}
        {/* {screenWidth > 500 && (<MenuFooter viewFooter={viewFooter} />)} */}

        {/* ----------------------------------------- */}

        {/* <Menu
           //  newGroup={newGroup}
             //price={price}
           //  selectedGroupId={selectedGroupId || null}
          // selectedStepId={viewerState?.stepId || null}
          // selectedAttributeId={viewerState?.attributeId || null}
          // setViewerState={setViewerState}
          // viewerState={viewerState}
          //   isCartLoading={isCartLoading}
          // newGroupelected={onSelectGroup}
          // stepSelect={onSelectStep}
          // attributeSelected={onSelectAttribute}
          // optionSelected={onSelectOptions}
          // saveText={onSaveText}
          // showCustomizationInfo={onShowCustomizationInfo}
          //   addToCart={onAddToCart}
          // showOptionPreview={onShowOptionPreview}
          // params={customizationParams}
          // share={onShare}
            /> */}

            {screenWidth > 500 && <MenuFooter viewFooter={viewFooter} />}
      </div>
    </Container>
  );
};

export default Selector;

// 851 lines of code

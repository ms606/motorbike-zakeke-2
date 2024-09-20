import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import styled from "styled-components";
import { useZakeke } from "zakeke-configurator-react";
import { ListItem, ListItemImage } from "./list";
import "./selector.css";
import "./Menu/menu.css";
import { useDialogManager } from "../components/dialogs/Dialogs";
import Loader from "../components/Loader/Loader";
import { Icon } from "./Atomic";
import MenuFooter from "./Footer/MenuFooter";
import {MenuFooterNew} from "./Menu/MenuFooterNew";
import Designer from "./layouts/Designer";
import {  useActualGroups } from "../Helpers";

import {
  scrollDownOnClick,
} from "../Helpers";
import Tray from "../components/Tray/Tray";
import Measurements from "../components/Measurements/Measurements";
import Extra from "./Extra/Extra";

const Container = styled.div`
  height: 839px;
  overflow: none;
  font-family: "Helvetica", sans-serif;
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
    addFocusAttributesListener,
    isViewerReady,
  } = useZakeke();

  const newGroup = useActualGroups();

  const { showDialog, closeDialog } = useDialogManager();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedColorName, selectColorName] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(12014);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);
  const [selectedAttributeOptionName, setSelectedAttributeOptionName] =
    useState<string | null>(null);
  const [selectedOptionName, selectOptionName] = useState<string | null>(null);

  const [selectedCameraID, setSelectedCameraID] = useState<string | null>(null);
  
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
  const [menuTrayOpen, setMenuTrayOpen] = useState<boolean>(false);

  const [selectedPersonalize, setSelectedPersonalize] = useState<any | null>(
    false
  );

  const [onLoadFirstTime, setOnLoadFirstTime] = useState<any | null>(false);

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
    if (!onLoadFirstTime && newGroup.length > 0) {
      setOnLoadFirstTime(true);
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
  }, [selectedGroupId, selectedGroup, currentIndex]);

  // Camera for left icons
  useEffect(() => {
     if (selectedCameraID) setCamera(selectedCameraID);

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

  // On clicking the suit it opens the attributes
  // useEffect(() => {
  //   if (isViewerReady) {
  //     addFocusAttributesListener((event: { groups: string | any[] }) => {
  //       if (event.groups.length > 0) {
  //         selectGroup(event.groups[0].groupId);
  //         const group = newGroup.find(
  //           (group) => group.id === event.groups[0].groupId
  //         );

  //         if (group && group.steps) {
  //           const firstStep = group.steps.find((step) =>
  //             step.attributes.find(
  //               (attr) => attr.id == event.groups[0].visibleAttributes[0]
  //             )
  //           );
  //           const index = group.steps.findIndex((step) =>
  //             step.attributes.find(
  //               (attr) => attr.id == event.groups[0].visibleAttributes[0]
  //             )
  //           );

  //           if (index >= 0 && firstStep && selectedGroup) {
  //             setCurrentIndex(0 + 1);
  //             setCurrentIndex(index);
  //             selectStep(firstStep.id);
  //           }
  //         }
  //       }
  //     });
  //   }
  // }, [isViewerReady, selectedGroupId]);

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
    if (!selectedGroup && newGroup.length > 0) {
      selectGroup(newGroup[0].id);
    }

    var groupRec = newGroup.map((group) => ({
      id: group.id,
      name: group.name,
      imageUrl: group.imageUrl,
    }));

    selectGroupList(groupRec);
  }, []);

  const loadMenu = () => {
    var groupRec = newGroup.map((group) => ({
      id: group.id,
      name: group.name,
      imageUrl: group.imageUrl,
    }));

    selectGroupList(groupRec);
  };

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
    <div>
      {menuTrayOpen && (
        <Tray
          groupNameList={selectedGroupList}
          menuTrayToggle={menuTrayToggle}
          selectedStepList={selectedStepList}
        />
      )}

      <Container>
        <div className="menu">
          <div className="menu_group">
            {newGroup.map((group) => {
              const handleGroupClick = (group: any) => {
                selectGroup(group.id);
                selectOptionName("");
                setCurrentIndex(0);
                if (group.steps) {
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
                    setSelectedCameraID(group?.cameraLocationId)
                    if(group){
                      const cameraId = group?.cameraLocationId;
                      
                      console.log(cameraId,'camera angle checks');
                      if(cameraId) {
                         setCamera(cameraId)
                      }
                    }
                    
               
                    
                  }}
                >
                  {group.id === -1 ? "Other" : group.name}
                </div>
              );
            })}
          </div>
          <br />

          {selectedGroupId && selectedGroupId > 0 ? (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <div className="menu_choice_steps">
                <div className="active-marketing-component-name">
                  <div
                    className="arrows"
                    onClick={() => {
                      handleLeftClick();
                    }}
                  >
                    {"<"}
                  </div>
                  <div>
                    <span
                      className="active-marketing-component-name-detail"
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "28px",
                        fontFamily: "Helvetica",
                        fontWeight: "700",
                        fontSize: "18px",
                        // fontStyle: "italic",
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
                  </div>
                  <div
                    className="arrows"
                    onClick={() => {
                      handleRightClick();
                    }}
                  >
                    {">"}
                  </div>
                </div>

                <div
                  className="new"
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "row",
                    flexFlow: "wrap",
                    overflow: "auto",
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
                          <div className="menu_choice_option_image_name">
                            {option.name}
                          </div>
                        </ListItem>
                      );
                    });
                  })}
                </div>
              </div>

              <MenuFooterNew 
                  loadMenu = {loadMenu} 
                  setMenuTrayOpen = {setMenuTrayOpen} 
                  menuTrayOpen = {menuTrayOpen} 
                  viewFooter = {viewFooter} />
            </div>
          ) : (
            ""
          )}

          {selectedGroup?.id === -4 && (
            <div style={{ position: "relative", width: "100%"}}>
              <div
                className="textEditor"
                style={{ overflowX: "hidden", height: "70vh" }}
              >
                <Measurements />

                
              </div>

              <MenuFooterNew 
                  loadMenu = {loadMenu} 
                  setMenuTrayOpen = {setMenuTrayOpen} 
                  menuTrayOpen = {menuTrayOpen} 
                  viewFooter = {viewFooter} />

              
            </div>
          )}

          {selectedGroup?.id === -5 && (
            <div style={{ position: "relative" }}>
              <div
                className="textEditor"
                style={{
                  overflowX: "hidden",
                  width: "37vw",
                  height: "70vh",
                  borderRadius: "15px",
                }}
              >
                <Designer />
              </div>

              <MenuFooterNew 
                  loadMenu = {loadMenu} 
                  setMenuTrayOpen = {setMenuTrayOpen} 
                  menuTrayOpen = {menuTrayOpen} 
                  viewFooter = {viewFooter} />
            </div>
          )}

          {selectedGroup?.id === -6 && (
            <div style={{ position: "relative" }}>
              <div
                className="textEditor"
                style={{
                  overflowX: "hidden",
                  width: "37vw",
                  height: "80vh",
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                }}
              >
                <Extra />
              </div>
            
                <MenuFooterNew 
                  loadMenu = {loadMenu} 
                  setMenuTrayOpen = {setMenuTrayOpen} 
                  menuTrayOpen = {menuTrayOpen} 
                  viewFooter = {viewFooter} />
            </div>
          )}

        </div>
      </Container>
    </div>
  );
};

export default Selector;

// 851 lines of code

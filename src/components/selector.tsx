import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import styled from "styled-components";
import { useZakeke, Group } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage } from "./list";
import "./selector.css";
import "./Menu/menu.css";
import { Dialog, useDialogManager } from '../components/dialogs/Dialogs';
import ErrorDialog from '../components/dialogs/ErrorDialog';
import ArDeviceSelectionDialog from '../components/dialogs/ArDeviceSelectionDialog';
import Cameras from "./Cameras/Cameras";
import Preview from "./Preview/Preview";
//import Menu from "./Menu/Menu";
import SvgArrowDown from "../icons/Arrowdown";
import ShareIcon from "../icons/ShareIcon";
import Viewer from "../pages/Viewer/Viewer";
import Loader from "../components/Loader/Loader";
import SelectionIcon from "../icons/SelectionIcon";
import ExplodeSolid from "../assets/icons/expand-arrows-alt-solid.js";

import DownArrow from "../assets/icons/DownArrow.js";
import UpArrow from "../assets/icons/UpArrow.js";
// '../../../../components/Loader/Loader';
import { Icon } from "./Atomic";

import Designer from "./Layout/Designer";
import { reduceRight } from "lodash";

import {
	AiIcon,
	ArIcon,
} from '../components/Layout/LayoutStyles';


const dialogsPortal = document.getElementById("dialogs-portal")!;

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
  refViewer: React.RefObject<HTMLElement>;
  fullScreen: any;
}

const Selector: FunctionComponent<SelectorProps> = ({
  refViewer,
  fullScreen,
}) => {
  //console.log(refViewer);
  const {
    isSceneLoading,
    isAddToCartLoading,
    price,
    groups,
    selectOption,
    addToCart,
    templates,
    setTemplate,
    setCamera,
    setExplodedMode,
    zoomIn,
    zoomOut,
    defaultColor,
    product,
    cameras,
    IS_IOS,
		IS_ANDROID,
		getMobileArUrl,
		openArMobile,
    isSceneArEnabled
    // isArEnable,
    // onArIconClick
  } = useZakeke();

  console.log(useZakeke(), 'groups');
  
  const { showDialog, closeDialog } = useDialogManager();

  const idsToRemove = [10483, 10482, -1];

  idsToRemove.push(10640); // id to remove on only blazer product

  const groups1 = groups.filter((obj) => !idsToRemove.includes(obj.id));

  // const groupsCustom: Group[];

  const customizeGroup: Group = {
    id: -2,
    guid: "0000-0000-0000-0000",
    name: "LINING TEXT",
    enabled: true,
    attributes: [],
    steps: [],
    cameraLocationId: "4f500be3-14f3-4226-cfd6-e1bbf4e390d4",
    displayOrder: groups.length - 1,
    direction: 0,
    attributesAlwaysOpened: false,
    imageUrl: "",
    templateGroups: [],
  };

  if (product?.name != "FlexFabrix™ By DA Dress Pants")
    groups1.push(customizeGroup);

  //console.log(groups,'groups');

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);
  const [selectedAttributeOptionName, setSelectedAttributeOptionName] =
    useState<string | null>(null);
  const [selectedOptionName, selectOptionName] = useState<string | null>(null);

  const [selectedExplodedState, setSelectedExplodedStatese] = useState<
    boolean | null
  >(false);

  const [selectedCameraID, setSelectedCameraID] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<any | null>(null);

  const [selectedCollapse, selectCollapse] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const [checkOnce, setCheckOnce] = useState<boolean | null>(true);


  const viewFooter = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const item = {
      guid: "",
      name: "Dummy`",
      text: "Text",
      fillColor: defaultColor,
      fontFamily: "Rubik",
      fontSize: 58,
      fontWeight: "bold bold",
      isTextOnPath: false,
      constraints: null,
    };
    // removeItem('cf38ec2c-91ea-433f-a491-fb849998daf7')
    // removeItem('c1c008ca-7bb2-460f-e288-74efbe9afbd3')
    // removeItem('e7c7bf12-c701-4792-875b-c62cfee0a363')
    // addItemText(item, 385515)

    // console.log(groups,items,templates,'inside effec');
    const fullBlazerGroup = groups.filter((obj) => obj.id === 10483);

    // console.log(fullBlazerGroup,'1');
  }, [groups]);

  // const idsToRemove = [10483, -1];

  // for (let i = groups1.length - 1; i >= 0; i--) {
  //   if (idsToRemove.includes(groups1[i].id)) {
  //     groups1.splice(i, 1);
  //   }
  // }

  const selectedGroup = groups1.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;
  //console.log(groups1, selectedGroup, "groups1");

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
						'open-ar',
						<Dialog>
							<button
								style={{ display: 'block', width: '100%' }}
								onClick={() => {
									closeDialog('open-ar');
									openArMobile(url as string);
								}}
							>
								See your product in AR
							</button>
						</Dialog>
					);
				}
		} else {
			showDialog('select-ar', <ArDeviceSelectionDialog />);
		}
	};


  useEffect(() => {
    //console.log(attributes,'attri ')

    const previewImage = attributes.forEach((attr) => {
      attr.options.forEach((option) => {
        if (option.selected && !!option.imageUrl) {
          const Previewdata = {
            image: option.imageUrl,
            optionName: option.id,
            attributeName: attr.id,
            stepName: attr.name,
            groupName: attr.code,
          };
          setPreviewImage(Previewdata);
          //  console.log(Previewdata, 'previewImage');
          //console.log(Previewdata,'attributes');
          return;
        }
      });
    });
  }, [attributes, selectedGroup, selectedAttributeId, selectedCameraID]);

  //  console.log(previewImage,'previewImage');
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId
  );

  // Open the first group and the first step when loaded
  useEffect(() => {
    if (!selectedGroup && groups1.length > 0 && groups1[0].id != -2) {
      selectGroup(groups1[0].id);

      if (groups1[0].steps.length > 0) selectStep(groups1[0].steps[0].id);

      if (templates.length > 0) setTemplate(templates[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups1]);

  // Select attribute first time
  useEffect(() => {
    if (!selectedAttribute && attributes.length > 0)
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

      // if (selectedCameraID) setCamera(selectedCameraID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedGroupId, selectedCameraID, selectedStepId]);

  }, [selectedGroupId]);

  // Camera for attributes
  useEffect(() => {
    //   console.log(groups,'inside camera attributes');

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

  if (isSceneLoading || !groups1 || groups1.length === 0 || isLoading)
    return <Loader visible={isSceneLoading} />;

    if (isLoading)
    return <Loader visible={isSceneLoading} />;

  // groups1
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options

  return (
    <Container>
      {/* {isArEnable() && (
       <div onClick={onArIconClick}>AR</div> 
        // <BubbleButton label={t('AR')} onClick={onArIconClick}>
        //   <ViewerIcon>
        //     <ArIcon />
        //   </ViewerIcon>
        // </BubbleButton>
      )} */}

      {isSceneArEnabled() && (
       <div className="bubble_button_ar">
          <ArIcon hoverable onClick={() => handleArClick('ar.html')}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.74 6.86v18.27c0 .76.61 1.37 1.36 1.37h8.28v2H7.1c-1.85 0-3.36-1.51-3.36-3.36V6.86A3.36 3.36 0 017.1 3.5h9.28c.337 0 .663.05.97.143l-.734 1.878a1.364 1.364 0 00-.236-.021h-1.22c-.23.86-1.01 1.5-1.94 1.5h-2.96c-.93 0-1.71-.64-1.95-1.5H7.1c-.75 0-1.36.61-1.36 1.36z" fill="#838383"></path><path d="M12.53 16.31v7.59l7.86 4.78 7.86-4.78v-7.57l-7.64-5.02-8.08 5zm12.79.47l-4.94 2.69-4.86-2.66 5.07-3.14 4.73 3.11zm-10.79 1.77l4.84 2.65v4.5l-4.84-2.94v-4.21zm6.84 7.19v-4.53l4.89-2.66v4.22l-4.89 2.97zM19.158 8.172l.552-1.76h.016l.512 1.76h-1.08zm-2.408 2.04h1.768l.256-.816h1.816l.24.816h1.824L20.574 4.5h-1.72l-2.104 5.712zM23.044 10.212h1.76V8.22h.936c.696 0 .744.568.792 1.112.023.296.055.592.143.88h1.76c-.16-.264-.168-.944-.191-1.224-.064-.712-.36-1.24-.84-1.424.584-.216.855-.84.855-1.432 0-1.08-.864-1.632-1.864-1.632h-3.351v5.712zm1.76-4.352h.824c.671 0 .872.208.872.568 0 .512-.448.568-.776.568h-.92V5.86z" fill="#838383"></path></svg>
          </ArIcon> 
         <div className='bubble_button_text' style={{fontSize: "13px"}}>AR</div>
       </div>
        
			)}

      {product?.name === "FlexFabrix™ By DA Suit" && (
        <div className="bubble_button">
          <div className="bubble_button_button">
            <ExplodeIcon
              hoverable
              onClick={() => {
                {
                  selectedExplodedState == true
                    ? setSelectedExplodedStatese(false)
                    : setSelectedExplodedStatese(true);
                }
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

      <div
        className="bubble_button_fullScreen"
        onClick={() => {
          refViewer.current?.requestFullscreen();
        }}
      >
        <div className="bubble_button_button">
          <ExplodeIcon>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2H2v6h2V4h4V2zM24 2h6v6h-2V4h-4V2zM8 30H2v-6h2v4h4v2zM24 30h6v-6h-2v4h-4v2zM24 24H8a2.002 2.002 0 01-2-2V10a2.002 2.002 0 012-2h16a2.002 2.002 0 012 2v12a2.002 2.002 0 01-2 2zM8 10v12h16V10H8z"
                fill="#838383"
              ></path>
            </svg>
          </ExplodeIcon>
        </div>

        <div className="bubble_button_text">Full Screen</div>
      </div>

      <div>
        <Cameras cameras={groups} onSelect={setSelectedCameraID} />
        {previewImage?.image && <Preview PreviewImage={previewImage} />}
        <div className="viewer_zoom">
          <div
            className="ff_zoom_in"
            onClick={() => zoomIn()}
            style={{ cursor: "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z"></path>
              <path d="M24 15h-7V8h-2v7H8v2h7v7h2v-7h7z"></path>
              <path fill="none" d="M0 0h32v32H0z"></path>
            </svg>
          </div>

          <div className="ff_zoom_description">ZOOM</div>
          <div
            className="ff_zoom_out"
            onClick={() => zoomOut()}
            style={{ cursor: "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z"></path>
              <path d="M8 15h16v2H8z"></path>
              <path fill="none" d="M0 0h32v32H0z"></path>
            </svg>
          </div>

          {/* <img src={previewImage?.image}/> */}
        </div>
        <div className="scrollPosition">
          <div
            className="scroll"
            style={{ position: "relative", left: "3%" }}
            onClick={() =>
              refViewer.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <UpArrow />
            {/* Down */}
          </div>
          <div
            className="scroll"
            style={{ position: "relative", left: "3%" }}
            onClick={() =>
              viewFooter.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <DownArrow />
            {/* Down */}
          </div>
        </div>
      </div>

      <div className="menu">
        <div className="menu_group">
          {groups1.map((group) => {
            return (
              <div
                // className="menu_item"
                className= {`menu_item ${group.id === selectedGroupId ? "selected":""}`}
                //  {group.id === selectedGroupId ? "menu_item"}
                key={group.id}
                onClick={() => {
                  if(checkOnce && window.innerWidth < 500){
                    setCheckOnce(false)
                    window.scrollTo({
                      top: window.scrollY + 150,
                      behavior: 'smooth'
                  });
                  }
                  selectGroup(group.id);
                  selectOptionName("");
                  // console.log(group);
                  if (group.name.toLowerCase() === "pant") {
                    setExplodedMode(true);
                  } else {
                    setExplodedMode(false);
                  }

                  if (product?.name === "FlexFabrix™ By DA Suit") {
                    if (
                      group.name.toLowerCase() === "blazer view" ||
                      group.name.toLowerCase() === "lining text"
                    ) {
                      selectOption(1363645); // Open jacket comm
                    } 
                    else {
                      selectOption(1363646);
                    }
                  }

                  if (product?.name === "FlexFabrix™ By DA Blazer") {
                    if (
                      group.name.toLowerCase() === "blazer view" ||
                      group.name.toLowerCase() === "lining text"
                    ) {
                      selectOption(1382103); // Open jacket comm
                    } else {
                      selectOption(1382104);
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
        {selectedGroup && selectedGroup.steps.length > 0 && (
          <div className="menu_choice_steps">
            {selectedGroup.steps.map((step) => {
              //       console.log(selectedStepId, step ,'selected step');
              return (
                <div
                  className="menu_choice_step_step"
                  key={step.id}
                  onClick={() => {
                    // selectOptionName("");
                    // selectCollapse(!selectedCollapse);

                    selectStep(step.id);
                    setCamera(step?.cameraLocationID || "");
                    // console.log(step?.cameraLocationID,'camera location id');
                    if (selectedStepId != step.id) {
                      selectOptionName("");
                    }
                    // setCamera("032464dd-2bf4-42ec-8cf2-42a0dcc7a75f")
                  }}
                  //selected={selectedStep === step}
                >
                  <div
                    className="menu_choice_step_title"
                    style={{
                      display: "flex",
                      borderBottom:
                        selectedStepId != step.id
                          ? "1px solid var(--template-primary--400)"
                          : "",
                    }}
                    // onClick={()=> {selectCollapse(!selectedCollapse)}}
                  >
                    <div
                      className="menu_choice_step_description"
                      style={{
                        paddingBottom: "1em",
                        marginRight: "auto",
                      }}
                    >
                      {step.name}
                    </div>
                    <div
                      className="menu_choice_step_toggle"
                      style={{
                        fontSize: "12px",
                        lineHeight: "16px",
                        textTransform: "uppercase",
                      }}
                      onClick={() => {
                        // selectCollapse(true);
                        //   console.log("toggle", selectedCollapse);
                        // selectGroup(-1);
                        // selectStep(-1);
                        // selectAttribute(-1);
                      }}
                    >
                      {selectedStepId != step.id ? "Customize" : "Close"}
                    </div>
                  </div>

                  {step.id === selectedStepId &&
                    step.attributes.map((attribute) => {
                      //   console.log(attribute, 'selected step, selectedGroup');
                      return (
                        <>
                          <div
                            className="menu_choice_attribute_title"
                            style={{
                              color:
                                selectedAttributeId === attribute.id
                                  ? "var(--template-primary--900)"
                                  : "var(--template-primary--600)",
                              borderBottom:
                                selectedAttributeId != attribute.id
                                  ? "1px solid var(--template-primary--400)"
                                  : "",
                            }}
                            onClick={(e) => {
                              // e.stopPropagation();
                              if (selectedAttributeId === attribute.id) {
                                selectAttribute(null);
                              } else {
                                selectOptionName("");
                                selectAttribute(attribute.id);
                              }

                              //if sele
                              if (selectedAttributeId === attribute.id)
                                selectCollapse(!selectedCollapse);

                              if (attribute.name === 'Stretch'){
                                showDialog('error', <ErrorDialog error={"Stretch Lining style will add $50 to the total cost"} onCloseClick={() => closeDialog('error')} />);
                              }

                              }}
                          >
                            <br />
                            <div
                              className="menu_choice_attribute_selection_icon"
                              style={{
                                width: "21px",
                                height: "21px",
                                marginRight: "12px",
                                fill:
                                  selectedAttributeId === attribute.id
                                    ? "var(--template-primary--900)"
                                    : "var(--template-primary--600)",
                              }}
                            >
                              <SelectionIcon />
                            </div>

                            <div
                              className="menu_choice_attribute_description"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "auto",
                              }}
                            >
                              {attribute.name}
                            </div>
                            <br />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "1em",
                              }}
                              className="menu_choice_attribute_selected_option"
                            >
                              {selectedAttributeId === attribute.id
                                ? selectedOptionName
                                : ""}
                                {/* {selectedOptionName} */}
                            </div>
                            <div
                              className="menu_choice_attribute_state_icon"
                              style={{ width: "21px", height: "21px" }}
                            >
                              <div
                                style={{
                                  transform:
                                    attribute.id === selectedAttributeId &&
                                    !selectedCollapse
                                      ? "rotate(-180deg)"
                                      : "",
                                  fill:
                                    attribute.id === selectedAttributeId
                                      ? "var(--template-primary--900)"
                                      : "var(--template-primary--600)",
                                }}
                              >
                                <SvgArrowDown />
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                            }}
                            onClick={(e) => {
                              console.log("Div3 clicked");
                              // Prevent the event from reaching div2 or div1
                              //   e.stopPropagation();
                            }}
                          >
                            {attribute.options.map((option) => {
                              //  console.log(selectedCollapse, "selectedCollapse");

                              //  console.log(option,'attribute option detail');
                              return (
                                <>
                                  {option.enabled == true && (
                                    <div
                                      style={{
                                        //marginRight: "10px",
                                        marginLeft: "5px",
                                        width: "23%",
                                      }}
                                    >
                                      <div>
                                        {!selectedCollapse &&
                                          selectedAttributeId ===
                                            option.attribute.id &&
                                          option.imageUrl && (
                                            <ListItem
                                              key={option.id}
                                              onClick={() => {
                                                selectOption(option.id);
                                                selectOptionName(option.name)
                                                // if (product?.name === 'FlexFabrix™ By DA Suit') {
                                                //   if(groups?.name.toLowerCase() === 'blazer view' || groups.name.toLowerCase() === 'lining text'){
                                                //     selectOption(1363645); // Open jacket comm
                                                //   }
                                                //   else {
                                                //     selectOption(1363646);
                                                //   }
                                                //   }

                                                //   if (product?.name === 'FlexFabrix™ By DA Blazer'){
                                                //   if(groups?.name.toLowerCase() === 'blazer view' || groups.name.toLowerCase() === 'lining text'){
                                                //     selectOption(1382103); // Open jacket comm
                                                //   }
                                                //   else {
                                                //     selectOption(1382104);
                                                //   }
                                                //   }
                                              }}
                                              selected={option.selected}
                                              className="menu_choice_option"
                                            >
                                              <div
                                                className="menu_choice_option_image_container"
                                                // style={}
                                              >
                                                {option.imageUrl && (
                                                  <ListItemImage
                                                    src={option.imageUrl}
                                                  />
                                                )}
                                              </div>

                                              <div className="menu_choice_option_description">
                                                {option.name}
                                              </div>
                                            </ListItem>
                                          )}
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                            })}
                            {/* </div>
                            </div> */}
                          </div>
                        </>
                      );
                    })}
                </div>
              );
            })}
          </div>
        )}

        {selectedGroup?.id === -2 && (
          <div
            className="textEditor"
            style={{ overflowX: "hidden", height: "100%" }}
          >
            {/* <div className="menu_help_customization_help">Initial's applied on your blazer's inner pocket</div> */}
            <Designer />
          </div>
        )}

        <br />
        <br />
        <br />
        <div className="menu_footer" ref={viewFooter}>
          <div className="menu_price">
            <div className="price_text">Price: </div>
            <div className="price_value">{price}</div>
          </div>
          <div className="menu_actions">
            {isAddToCartLoading ? (
              "Adding to cart..."
            ) : (
              <button
                onClick={addToCart}
                className="btn btn-primary menu_btn_cart"
              >
                Add to cart
              </button>
            )}
            {
              <button className="btn btn-secondary Menu_ff_menu__btn__iOQsk Menu_ff_menu__btn__share__1sacu">
                <div className="menu_btn_share_icon">
                  <ShareIcon />
                </div>
                {/* <span className="Menu_ff_menu__btn__share_text__3eeX0">Share</span> */}
              </button>
            }
          </div>
        </div>

        {/* ----------------------------------------- */}

        {/* <Menu
         //  groups1={groups1}
           //price={price}
         //  selectedGroupId={selectedGroupId || null}
        // selectedStepId={viewerState?.stepId || null}
        // selectedAttributeId={viewerState?.attributeId || null}
        // setViewerState={setViewerState}
        // viewerState={viewerState}
        //   isCartLoading={isCartLoading}
        // groupSelected={onSelectGroup}
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
      </div>
    </Container>
  );
};

export default Selector;

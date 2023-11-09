import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useZakeke, Group } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage } from "./list";
import "./selector.css";
import "./Menu/menu.css";

import Cameras from "./Cameras/Cameras";
import Preview from "./Preview/Preview";
//import Menu from "./Menu/Menu";
import SvgArrowDown from "../icons/Arrowdown";
import ShareIcon from "../icons/ShareIcon";
import Viewer from "../pages/Viewer/Viewer";
import Loader from "../components/Loader/Loader";
import SelectionIcon from "../icons/SelectionIcon";
import ExplodeSolid from "../assets/icons/expand-arrows-alt-solid.js";
// '../../../../components/Loader/Loader';
import { Icon } from "./Atomic";

import Designer from "./Layout/Designer";

const dialogsPortal = document.getElementById('dialogs-portal')!;

const Container = styled.div`
  height: 100%;
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


const Selector: FunctionComponent<SelectorProps> = ({refViewer,fullScreen}) => {

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
    hasExplodedMode,
    zoomIn,
    zoomOut,
    addItemText,
    items,
    fonts,
    defaultColor,
    removeItem,
    product
  } = useZakeke();
 
  
  // removeItem('4218fc40-22fa-484e-8a74-e0dc11c4a127');
  const idsToRemove = [10483, 10482, -1];

  idsToRemove.push (10640) // id to remove on only blazer product 

  const groups1 = groups.filter(obj => !idsToRemove.includes(obj.id));

  // const groupsCustom: Group[];

  const customizeGroup: Group = {
		id: -2,
		guid: '0000-0000-0000-0000',
		name: 'LINING TEXT',
		enabled: true,
		attributes: [],
		steps: [],
		cameraLocationId: '4f500be3-14f3-4226-cfd6-e1bbf4e390d4',
		displayOrder: groups.length - 1,
		direction: 0,
		attributesAlwaysOpened: false,
		imageUrl: '',
		templateGroups: [],
	};
  
  
  groups1.push(customizeGroup);
   
//  console.log(groups,'groups');
  
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


  useEffect(() => {

    const item = {
      guid: '',
      name: 'Dummy`',
      text: "Text",
      fillColor: defaultColor,
      fontFamily: 'Rubik',
      fontSize: 58,
      fontWeight: 'bold bold',
      isTextOnPath: false,
      constraints: null,
  }
  // removeItem('cf38ec2c-91ea-433f-a491-fb849998daf7')
  // removeItem('c1c008ca-7bb2-460f-e288-74efbe9afbd3')
  // removeItem('e7c7bf12-c701-4792-875b-c62cfee0a363')
  // addItemText(item, 385515)

      // console.log(groups,items,templates,'inside effec');
      const fullBlazerGroup = groups.filter(obj => obj.id === 10483); 
      
    // console.log(fullBlazerGroup,'1'); 
  },[groups])
  
  // const idsToRemove = [10483, -1];

  // for (let i = groups1.length - 1; i >= 0; i--) {
  //   if (idsToRemove.includes(groups1[i].id)) {
  //     groups1.splice(i, 1);
  //   }
  // }

  
  const selectedGroup = groups1.find((group) =>group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;
  //console.log(groups1, selectedGroup, "groups1");

  // Attributes can be in both groups1 and steps, so show the attributes of step or in a group based on selection
  const attributes = useMemo(
    () => (selectedStep || selectedGroup)?.attributes ?? [],
    [selectedGroup, selectedStep]
  );

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
    if (!selectedAttribute && attributes.length > 0) selectAttribute(attributes[0]?.id);

    setSelectedAttributeOptionName(
      selectedAttribute && selectedAttribute.options
        ? selectedAttribute.options.find(x => x.selected === true)?.name || null
        : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, attributes]);

  useEffect(() => {
    if (selectedGroup) {
      
      const camera = selectedGroup.cameraLocationId;
      if (camera) setCamera(camera);
      
      if (selectedCameraID) setCamera(selectedCameraID);


    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupId, selectedCameraID, selectedStepId]);


  // Camera for attributes
	useEffect(() => {

 //   console.log(groups,'inside camera attributes');

		if (!isSceneLoading && selectedAttribute && selectedAttribute.cameraLocationId) {
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

  if (isSceneLoading || !groups1 || groups1.length === 0)
    return <Loader visible={isSceneLoading} />;

  // groups1
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options
  
  return (
    <Container>
    {product?.name === 'FlexFabrix™ By DA Suit' && (
     
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
    )
    
    }
      


      <div className="bubble_button_fullScreen" onClick={() => {refViewer.current?.requestFullscreen()}}>
        <div className="bubble_button_button">
        <ExplodeIcon>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2H2v6h2V4h4V2zM24 2h6v6h-2V4h-4V2zM8 30H2v-6h2v4h4v2zM24 30h6v-6h-2v4h-4v2zM24 24H8a2.002 2.002 0 01-2-2V10a2.002 2.002 0 012-2h16a2.002 2.002 0 012 2v12a2.002 2.002 0 01-2 2zM8 10v12h16V10H8z" fill="#838383"></path></svg>
        </ExplodeIcon>
        </div>

        <div className="bubble_button_text">
          Full Screen
        </div>
      </div>

      <div>
        <Cameras cameras={groups} onSelect={setSelectedCameraID} />
        {previewImage?.image && <Preview PreviewImage={previewImage} />}
        <div className="viewer_zoom" >
          <div className="ff_zoom_in" onClick={() => zoomIn()} style={{cursor: 'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z"></path>
              <path d="M24 15h-7V8h-2v7H8v2h7v7h2v-7h7z"></path>
              <path fill="none" d="M0 0h32v32H0z"></path>
            </svg>
          </div>

          <div className="ff_zoom_description">ZOOM</div>
          <div className="ff_zoom_out" onClick={() => zoomOut()} style={{cursor: 'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z"></path>
              <path d="M8 15h16v2H8z"></path>
              <path fill="none" d="M0 0h32v32H0z"></path>
            </svg>
          </div>
          {/* <img src={previewImage?.image}/> */}
        </div>
      </div>

      <div className="menu">
        <div className="menu_group">
          {groups1.map((group) => {
            return (
              <div
                className="menu_item"
                key={group.id}
                onClick={() => {
                  selectGroup(group.id);
                  // console.log(group);
                  if(group.name.toLowerCase() === 'pant'){
                    setExplodedMode(true)
                  }else {
                    setExplodedMode(false)
                  }
                  
                  if (product?.name === 'FlexFabrix™ By DA Suit') {
                    if(group.name.toLowerCase() === 'blazer view' || group.name.toLowerCase() === 'lining text'){
                      selectOption(1363645); // Open jacket comm                    
                    }
                    else {
                      selectOption(1363646);
                    }  
                  }

                  if (product?.name === 'FlexFabrix™ By DA Blazer'){
                    if(group.name.toLowerCase() === 'blazer view' || group.name.toLowerCase() === 'lining text'){
                      selectOption(1382103); // Open jacket comm                    
                    }
                    else {
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
                    selectStep(step.id)
                    setCamera(step?.cameraLocationID || '')       
                    // setCamera("032464dd-2bf4-42ec-8cf2-42a0dcc7a75f")             
                    console.log(step?.cameraLocationID || '');
                    
                    // setCamera("f1e09acb-28a1-4a65-d965-ff64333d950a")
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
                            onClick={() => {
                              if (selectedAttributeId === attribute.id) {
                                selectAttribute(null);
                              } else {
                                selectAttribute(attribute.id);
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
                            >
                              {selectedAttributeId === attribute.id
                                ? selectedOptionName
                                : ""}
                            </div>
                            <div
                              className="menu_choice_attribute_state_icon"
                              style={{ width: "21px", height: "21px" }}
                            >
                              <div
                                style={{
                                  transform:
                                    attribute.id === selectedAttributeId
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
                          >
                            {attribute.options.map((option) => {
                              //  console.log(option,'attribute option detail');
                              return (
                                <div
                                  style={{
                                    //marginRight: "10px",
                                    marginLeft: "5px",
                                    width: "23%",
                                  }}
                                >
                                  <div>
                                    {selectedAttributeId ===
                                      option.attribute.id &&
                                      option.imageUrl && (
                                        <ListItem
                                          key={option.id}
                                          onClick={() => {
                                            selectOptionName(option.name);
                                            selectOption(option.id);
                                          }}
                                          selected={option.selected}
                                          className="menu_choice_option"
                                        >
                                          <div className="menu_choice_option_image_container" 
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


        {selectedGroup?.id === -2 && 
        <div style={{ overflowX: "hidden", height: "100%"}}>
            {/* <div className="menu_help_customization_help">Initial's applied on your blazer's inner pocket</div> */}
            <Designer />
          </div>
        }

        <br />
        <br />
        <br />
        <div className="menu_footer">
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

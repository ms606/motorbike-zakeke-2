import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useZakeke, Option } from "zakeke-configurator-react";
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

const Selector: FunctionComponent<{}> = () => {
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
  } = useZakeke();

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

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;
  //console.log(groups, selectedGroup, "groups");

  // Attributes can be in both groups and steps, so show the attributes of step or in a group based on selection
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

    

    console.log(previewImage,'prevoew');
    
  }, [attributes, selectedGroup, selectedAttributeId, selectedCameraID]);

  //  console.log(previewImage,'previewImage');
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId
  );

  //console.log(selectedAttributeOptionName?.name,'selectedAttributeOptionName');
  // console.log(selectedAttribute?.options.map(x => if((x.selected === true)
  // )) 'selectedAttribute');

  // Open the first group and the first step when loaded
  useEffect(() => {
    if (!selectedGroup && groups.length > 0) {
      selectGroup(groups[0].id);

      if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);

      if (templates.length > 0) setTemplate(templates[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups]);

  // Select attribute first time
  // useEffect(() => {
  //   if (!selectedAttribute && attributes.length > 0) selectAttribute(attributes[0]?.id);

  //   setSelectedAttributeOptionName(
  //     selectedAttribute && selectedAttribute.options
  //       ? selectedAttribute.options.find(x => x.selected === true)?.name || null
  //       : null
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedAttribute, attributes]);

  useEffect(() => {
    if (selectedGroup) {
      const camera = selectedGroup.cameraLocationId;
      if (camera) setCamera(camera);

      if (selectedCameraID) setCamera(selectedCameraID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupId, selectedCameraID]);

  // useEffect(() => {

  //     // selectedGroup?.groups.forEach((group) => {
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

  if (isSceneLoading || !groups || groups.length === 0)
    return <Loader visible={isSceneLoading} />;

  // groups
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options

  return (
    <Container>
      <div className="bubble_button">
        <div 
          className="bubble_button_button">
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

        <div className='bubble_button_text'>
          {!selectedExplodedState ? "Close" : "Open"}
        </div>
      </div>

      <div>
        <Cameras cameras={groups} onSelect={setSelectedCameraID} />
        {previewImage?.image && <Preview PreviewImage={previewImage} />}

        {/* <img src={previewImage?.image}/> */}
      </div>
      <div className="menu">
        <div className="menu_group">
          {groups.map((group) => {
            return (
              <div
                className="menu_item"
                key={group.id}
                onClick={() => {
                  selectGroup(group.id);
                }}
                //   selected={selectedGroup === group}
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
                  onClick={() => selectStep(step.id)}
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
                                          <div className="menu_choice_option_image_container">
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
         //  groups={groups}
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

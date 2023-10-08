import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useZakeke, Option } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage } from "./list";
import "./selector.css";

import Cameras from "./Cameras/Cameras";
import Preview from "./Preview/Preview";
//import Menu from "./Menu/Menu";
import SvgArrowDown from "../icons/Arrowdown";
import Viewer from "../pages/Viewer/Viewer";
import Loader from "../components/Loader/Loader";
// '../../../../components/Loader/Loader';

const Container = styled.div`
  height: 100%;
  overflow: auto;
  font-family: "Avenir Next", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
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
  } = useZakeke();

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);
  const [selectedAttributeOptionName, setSelectedAttributeOptionName] =
    useState<string | null>(null);

  const [selectedCameraID, setSelectedCameraID] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<any | null>(null);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

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

    //console.log(previewImage,'prevoew');
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
      <div>
        <Cameras cameras={groups} onSelect={setSelectedCameraID} />
        {previewImage?.image && <Preview PreviewImage={previewImage} />}
        {/* <img src={previewImage?.image}/> */}
      </div>
      <div
        className="menu"
        style={{
          display: "flex",
          flexFlow: "column",
          position: "relative",
          maxHeight: "calc(100% - 3px)",
          height: "calc(100vh - 72px)",
          // padding: "32px 26px",
          // backgroundColor: "var(--template-primary--000)",
          // borderRadius: "32px",
        }}
      >
        <div
          className="menu_group"
          style={{
            // position: "absolute",
            height: "58px",
            // overflow: "auto",
            whiteSpace: "nowrap",
            top: "30px",
          }}
        >
          {groups.map((group) => {
            return (
              <div
                style={{
                  display: "inline-block",
                  padding: "16px",
                  background: "#f4f4f4",
                  color: "#838383",
                  fontSize: "16px",
                  fontWeight: "400",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "60px",
                  marginLeft: "8px",
                  cursor: "pointer",
                  marginRight: "4px",
                  marginBottom: "2px",
                }}
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
          <div
            style={{
              // height: "69vh",
              margin: "0",
              padding: "32px 26px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "40px",
              borderRadius: "32px",
              backgroundColor: "var(--template-primary--000)",
            }}
          >
            {selectedGroup.steps.map((step) => {
              //       console.log(selectedStepId, step ,'selected step');
              return (
                <div
                  className="menu_choice_step_step"
                  key={step.id}
                  onClick={() => selectStep(step.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "12px 4px",
                    fontFamily: "Avenir Next ,sans-serif",
                    fontStyle: "normal",
                    lineHeight: "10px",
                    fontWeight: "400",
                    fontSize: "20px",
                    color: "var(--template-primary--900)",
                    cursor: "pointer",
                  }}
                  //selected={selectedStep === step}
                >
             
                  <div className="menu_choice_step_title" 
                      style={{display: "flex", 
                              borderBottom: selectedStepId != step.id ? "1px solid var(--template-primary--400)" : ''}}>

                    <div className="menu_choice_step_description"
                        style={{paddingBottom: "1em", 
                                // borderBottom: selectedStepId != step.id ? "1px solid var(--template-primary--400)": "",
                                marginRight: "auto"}}>
                        {step.name}
                    </div>
                    <div className="menu_choice_step_toggle" 
                         style={{fontSize: "12px", lineHeight: "16px", textTransform: "uppercase"}}>
                        {selectedStepId != step.id ? 'Customize' : 'Close'}
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
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              cursor: "pointer",
                              padding: "16px 4px",
                              fontFamily: "Avenir Next ,sans-serif",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "10px",
                              color: selectedAttributeId === attribute.id ? "var(--template-primary--900)" : "var(--template-primary--600)",
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
                                fill: selectedAttributeId === attribute.id ? "var(--template-primary--900)" : "var(--template-primary--600)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                data-testid="check-icon"
                              >
                                <path d="M14 21.414l-5-5.001L10.413 15 14 18.586 21.585 11 23 12.415l-9 8.999z"></path>
                                <path d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z"></path>
                                <path
                                  data-name="<Transparent Rectangle>"
                                  fill="none"
                                  d="M0 0h32v32H0z"
                                ></path>
                              </svg>
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
                              className="menu_choice_attribute_state_icon"
                              style={{ width: "21px", height: "21px" }}
                            >
                              <div
                                style={{
                                  transform:
                                    attribute.id === selectedAttributeId
                                      ? "rotate(-180deg)"
                                      : "",
                                }}
                              >
                              <SvgArrowDown />
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
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
                                          onClick={() =>
                                            selectOption(option.id)
                                          }
                                          selected={option.selected}
                                          className="menu_choice_option"
                                        >
                                          <div
                                            className="menu_choice_option_image_container"
                                            style={{
                                              width: "68px",
                                              height: "68px",
                                              margin: "0 auto",
                                              borderRadius: "8px",
                                            }}
                                          >
                                            {option.imageUrl && (
                                              <ListItemImage
                                                src={option.imageUrl}
                                              />
                                            )}
                                          </div>

                                          <div
                                            className="menu_choice_option_description"
                                            style={{
                                              fontSize: "16px",
                                              lineHeight: "1.4em",
                                              textAlign: "center",
                                              marginTop: "8px",
                                              color:
                                                "var(--template-primary--600)",
                                            }}
                                          >
                                            {option.name}
                                          </div>
                                        </ListItem>
                                      )}
                                  </div>
                                </div>
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

        {/* <div
          className="menu_choice"
          style={{
            marginTop: "64px",
            backgroundColor: "var(--template-primary--000)",
            borderRadius: "32px",
            padding: "32px 26px",
          }}
        >
          <div
            className="menu_choice_attributes"
            style={{ color: "var(--template-primary--600)", overflowY: "auto" }}
          >
            {attributes &&
              attributes.map((attribute) => {
             //   console.log(attribute, 'attribute names');
                
                return (
                  <div
                    className="menu_choice_attribute"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      borderBottom: "1px Solid #d7d7d7",
                      maxWidth: "100%",
                    }}
                  >
                    <div
                      className="menu_choice_attribute_title"
                      key={attribute.id}
                      onClick={() => selectAttribute(attribute.id)}
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      //selected={selectedAttribute === attribute}
                    >
                      <div
                        className="menu_choice_attribute_selection_icon"
                        style={{
                          width: "21px",
                          height: "21px",
                          marginRight: "12px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          data-testid="check-icon"
                        >
                          <path d="M14 21.414l-5-5.001L10.413 15 14 18.586 21.585 11 23 12.415l-9 8.999z"></path>
                          <path d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z"></path>
                          <path
                            data-name="<Transparent Rectangle>"
                            fill="none"
                            d="M0 0h32v32H0z"
                          ></path>
                        </svg>
                      </div>
                      <div
                        className="menu_choice_attribute_description"
                        style={{ marginRight: "auto" }}
                      >
                        {" "}
                        {attribute.name}
                      </div>
                      <div
                        className="menu_choice_attribute_description"
                        style={{ marginLeft: "auto" }}
                      >
                        {selectedAttributeOptionName}
                      </div>
                      <div
                        className="menu_choice_attribute_state_icon"
                        style={{
                          width: "21px",
                          height: "21px",
                          marginRight: "12px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                        >
                          <path d="M16 22L6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"></path>
                          <path fill="none" d="M0 0h32v32H0z"></path>
                        </svg>
                      </div>

                      <br></br>
                      <br></br>
                      <br></br>
                    </div>
                  </div>
                );
              })}
          </div>

          <div
            style={{
              display: "flex",
              flexFlow: "row-wrap",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              margin: "0 8px"
            }}
          >
            {selectedAttribute &&
              selectedAttribute.options.map((option) => {
                return (
                  <ListItem
                    key={option.id}
                    onClick={() => selectOption(option.id)}
                    selected={option.selected}
                    className="menu_choice_option"
                  >
                    <div
                      className="menu_choice_option_image_container"
                      style={{
                        width: "68px",
                        height: "68px",
                        margin: "0 auto",
                        borderRadius: "8px",
                      }}
                    >
                      {option.imageUrl && (
                        <ListItemImage src={option.imageUrl} />
                      )}
                    </div>

                    <div
                      className="menu_choice_option_description"
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.4em",
                        textAlign: "center",
                        marginTop: "8px",
                        color: "var(--template-primary--600)",
                      }}
                    >
                      {option.name}
                    </div>
                  </ListItem>
                );
              })}
          </div>
        </div> */}

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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.25 15a3.752 3.752 0 00-2.918 1.418L8.85 12.99c.2-.645.2-1.335 0-1.98l5.482-3.427A3.75 3.75 0 1013.5 5.25c.003.335.054.669.15.99L8.167 9.668a3.75 3.75 0 100 4.665l5.483 3.427a3.59 3.59 0 00-.15.99A3.75 3.75 0 1017.25 15zm0-12a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm-12 11.25a2.25 2.25 0 110-4.499 2.25 2.25 0 010 4.499zm12 6.75a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z"
                      fill="#292929"
                    ></path>
                  </svg>
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

import React, { useState, useMemo, useEffect } from "react";
import "./Tray.css";

import { useZakeke } from "zakeke-configurator-react";

const Tray = ({
  groupNameList,
  menuTrayToggle,
  selectedStepList
  //, filteredAreas, toggleFunc, UpdateGroupId, updCurrentIndex, selectedTray, selectStepName
}) => {
  const {
    setItemTextOnPath,
    addItemText,
    fonts,
    defaultColor,
    items,
    groups,
    publicTranslations,
  } = useZakeke();
  const staticsVals = publicTranslations?.statics;
  const dynamicsVals = publicTranslations?.dynamics;

  const [selectedGroupId, selectGroup] = useState(null);
  const [selectedStepId, selectStep] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStepName, selectStepName] = useState(null);
  const [selectedAttributeId, selectAttribute] = useState(null);
  const [selectedAttributeOptionName, setSelectedAttributeOptionName] =
    useState(null);

  const itemAvailable = items?.filter((item) => item.type === 0).length > 0;
  const acopName = groups;

  // var selectedStep = selectedGroup
  //   ? selectedGroup.steps.find((step) => step.id === selectedStepId)
  //   : null;

  //     // Attributes can be in both groups and steps, so show the attributes of step or in a group based on selection
  // const attributes = useMemo(
  //   () => (selectedStep || selectedGroup)?.attributes ?? [],
  //   [selectedGroup, selectedStep]
  // );

  // const selectedAttribute = attributes.find(
  //   (attribute) => attribute.id === selectedAttributeId
  // );


   // Open the first group and the first step when loaded
  //  useEffect(() => {
  //   if (!selectedGroup && groups.length > 0) {
  //     selectGroup(groups[0].id);

  //     if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);
  //  }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedGroup, groups]);

  // Select attribute first time
  // useEffect(() => {
  //   if (!selectedAttribute && attributes.length === 1)
  //     selectAttribute(attributes[0]?.id);

  //   setSelectedAttributeOptionName(
  //     selectedAttribute && selectedAttribute.options
  //       ? selectedAttribute.options.find((x) => x.selected === true)?.name ||
  //           null
  //       : null
  //   );

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedGroupId, selectedAttribute, attributes]);

  useEffect(() => {

    setSelectedGroup(groups.find((group) => group.id === selectedGroupId));
   
    var selectedGroup = groups.find((group) => group.id == selectedGroupId);
    setSelectedGroup(groups.find((group) => group.id == selectedGroupId));

    var selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  },[selectedGroupId])

  const handleMultipleClicks = (event) => {
    // console.log(event.target.id);
    selectGroup(event.target.id);

    // console.log(groups, event.target.id, groups.find((group) => group.id == event.target.id));
    //   UpdateGroupId(event.target.id, "colors");
  //   toggleFunc("colors");
  };

  // const handleTextItem = (actualAreaId) => {
  //   const itemText = {
  //     guid: "",
  //     name: "",
  //     text: `${dynamicsVals?.get("Enter Your Name") ?? "Enter Your Name"}`,
  //     fillColor: defaultColor,
  //     fontFamily: fonts[0].name,
  //     fontSize: 48,
  //     fontWeight: "normal normal",
  //     isTextOnPath: false,
  //     constraints: null,
  //     placeholder: "Input your text here",
  //     backgroundColor: "rgb(235, 237, 242)",
  //   };

  //   UpdateGroupId(actualAreaId, "signature"); // This is for setting index
  //   addItemText(itemText, actualAreaId);
  //   toggleFunc("signature");
  //   selectStepName('')
  // };

  // const handleImageItem = (actualAreaId) => {
  //   selectStepName('')
  //   UpdateGroupId(actualAreaId, "logos"); // This is for setting index
  //   toggleFunc("logos");
  // };

  return (
    <div
      style={{ transition: "all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1) 0s", position: "relative",
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vh',
        height: '100vh',
        zIndex: '999999',

       }}
    >
      {groupNameList && (
        <div>
          <div className="full-tray">            
            <div className="tray-mc-header">
              <div className="tray-trigger-menu-button">
                SUMMARY
              </div>  
              
              <button
                className="tray-trigger-close-button"
                 onClick={() => menuTrayToggle()}
                 >
                 <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 25 25"
                  role="img"
                  width="25px"
                  height="25px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M18.973 5.027L5.028 18.972M5.027 5.027l13.945 13.945"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="tray-mc-content">
              <div className="tray-mc-list-wrapper">
                {/* <div className="mc-list-title">
                  {" "}
                  {dynamicsVals?.get("Select Colors") ?? "Select Colors"}{" "}
                </div> */}
                <div className="tray-mc-grid">
                  {groupNameList.map((groupName, i) => {
                    if(groupName.id < 0) return <></>
                    return (
                      <div className={`heading ${groupName.id == selectedGroupId ? 'selected-group-tray' : ''}`}
                        id={groupName.name}>
                        <div
                          className="sitems"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flexGrow: 1,
                            justifyContent: "flex-start",
                          }}
                          onClick={handleMultipleClicks}
                          id={groupName.id}
                        >
                          <div id={groupName.id} className="slabel">
                            <span
                              id={groupName.id}
                              style={{
                                // fontSize: "9px",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                            >
                              {groupName.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="tray-mc-sub-steps">
       

            {selectedGroup?.steps.map((x,i) => (
              <div className="tray-mc-sub-list" key={i}>
                <div className="tray-mc-sub-key"> {i+1}.</div>
                <div style={{ fontWeight: selectedStepList.includes(x.id) ? '550' : 'normal' }} > {x.name}</div>
                {selectedStepList.includes(x.id) && <span style={{paddingLeft: '50px'}}>✔️ </span>}
              </div>
            ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
export default Tray;

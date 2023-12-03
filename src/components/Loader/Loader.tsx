import React from "react";
import './Loader.css'

import SvgSpinner from "../../../src/icons/Spinner";

export interface LoaderProps {
  visible: boolean;
  loadingText?: string
}

const Loader: React.FC<LoaderProps> = props => {
  return (
    <div
      data-testid="loader"
    //   className={classNames(styles.ff_loader_overlay, {
    //     [styles.ff_loader_overlay_hide]: !props.visible,
    //   })}
    >
      <div //className={styles.ff_loader}
        className="loader"
      >
        <SvgSpinner />
      </div>
      {props.loadingText && (
          <span>{props.loadingText}</span>
      )}
    </div>
  );
};

export default Loader;

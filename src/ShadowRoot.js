import React, { useState } from "react";
import root from "react-shadow";
import { StyleSheetManager } from "styled-components";

export const ShadowRoot = ({ children }) => {
  const [stylesNode, setStylesNode] = useState(null);

  return (
    <root.div>
      <div ref={(node) => setStylesNode(node)}>
        {stylesNode && (
          <StyleSheetManager target={stylesNode}>{children}</StyleSheetManager>
        )}
      </div>
    </root.div>
  );
};

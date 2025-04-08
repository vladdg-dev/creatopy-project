import React from "react";

import {
  JsonDesign,
  isImage,
  isText,
  isButton,
  JsonSlideOrElement,
} from "../server/jsonTypes";

const renderBackground = (background: any) => {
  if (!background) return null;

  switch (background.type) {
    case "solid":
      return (
        <div
          style={{
            backgroundColor: background.scolor,
            width: "100%",
            height: "100%",
            border: background.useBorder
              ? `1px solid ${background.borderColor}`
              : "none",
          }}
        />
      );

    case "lgrad":
      return (
        <div
          style={{
            background: `linear-gradient(${
              background.backgroundRotation || 0
            }deg, ${background.gradColors?.join(", ") || ""})`,
            width: "100%",
            height: "100%",
            border: background.useBorder
              ? `1px solid ${background.borderColor}`
              : "none",
          }}
        />
      );

    case "rgrad":
      return (
        <div
          style={{
            background: `radial-gradient(circle, ${
              background.gradColors?.join(", ") || ""
            })`,
            width: "100%",
            height: "100%",
            border: background.useBorder
              ? `1px solid ${background.borderColor}`
              : "none",
          }}
        />
      );

    case "image":
      return (
        <div
          style={{
            backgroundImage: `url(${background.url})`,
            backgroundSize: background.scaleMode,
            backgroundPosition: `${background.horizontalAlign} ${background.verticalAlign}`,
            backgroundRepeat:
              background.scaleMode === "tile" ? "repeat" : "no-repeat",
            width: "100%",
            height: "100%",
            border: background.useBorder
              ? `1px solid ${background.borderColor}`
              : "none",
          }}
        />
      );

    case "none":
    default:
      return null;
  }
};

const renderElements = (elements: JsonSlideOrElement[]) => {
  return elements.map((element, index) => {
    switch (element.type) {
      case "slide":
        return (
          <div key={index} className="slide">
            {renderElements(element.elements || [])}
          </div>
        );

      case "layer":
        if (isImage(element)) {
          const { properties } = element;
          const { dropShadow } = properties;

          return (
            <img
              key={index}
              src={`${process.env.API_URL}/assets/media/${properties.url}`}
              alt={properties.originalName}
              style={{
                position: "absolute",
                top: properties.y,
                left: properties.x,
                width: properties.width,
                height: properties.height,
                transform: `rotate(${properties.rotation}deg)`,
                opacity: properties.opacity / 100,
                boxShadow: dropShadow?.useShadow
                  ? `${dropShadow.hShadow}px ${dropShadow.vShadow}px ${dropShadow.blur}px ${dropShadow.spread}px ${dropShadow.color}`
                  : "none",
              }}
            />
          );
        } else if (isText(element)) {
          return (
            <p
              key={index}
              style={{
                position: "absolute",
                top: element.properties.y,
                left: element.properties.x,
                width: element.properties.width,
                height: element.properties.height,
                fontSize: element.properties.fontSize,
                textAlign: element.properties.alignment,
              }}
            >
              {element.properties.text}
            </p>
          );
        } else if (isButton(element)) {
          return (
            <button
              key={index}
              style={{
                position: "absolute",
                top: element.properties.y,
                left: element.properties.x,
                width: element.properties.width,
                height: element.properties.height,
                color: element.properties.labelStyle.color,
                border: "none",
                cursor: "pointer",
                animation: "fadeIn 1s ease-in",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              {element.properties.buttonLabel}
              <style>
                {`
                @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
                }
              `}
              </style>
            </button>
          );
        }
        break;

      default:
        return null;
    }
  });
};

const App: React.FC<{ data?: JsonDesign }> = ({ data }) => {
  return (
    <div
      style={{
        position: "relative",
        width: `${data?.properties?.width}${data?.properties?.measureUnit}`,
        height: `${data?.properties?.height}${data?.properties?.measureUnit}`,
        overflow: "hidden",
        transform: `scale(3.5)`,
      }}
    >
      <h1
        style={{
          animation: "slideUp 1s ease-out",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          color: `rgba(255,255,255,1)`,
        }}
      >
        {data?.properties?.name}
      </h1>
      <style>
        {`
          @keyframes slideUp {
        from {
          transform: translateX(-50%) translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
          }
        `}
      </style>
      {data && renderBackground(data.properties.backgroundColor)}
      {data && renderElements(data.elements)}
    </div>
  );
};

export default App;

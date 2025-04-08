/* eslint-disable max-lines */

export type JsonGradColor = {
  c: string;
  p: number;
};

export type JsonMeasureUnit = "px" | "mm" | "cm" | "in";

export type JsonUrlTarget = "_blank" | "_self" | "_parent" | "_top";

export const JsonLayerTypeArr = [
  "embed",
  "image",
  "shape",
  "svg",
  "video",
  "audio",
  "text",
  "button",
  "youtube",
  "clipart",
  "countdown",
  "rain",
  "snow",
  "fog",
] as const;

export const NotAcceptedLayer = ["menu"];

export type JsonLayerType = (typeof JsonLayerTypeArr)[number];

export type JsonDesignBackground = JsonBackground & {
  borderColor?: string;
  useBorder: boolean;
};

export type EditorLayerFeed = Record<string, string | null>;
export type AdStudioLayerFeedPropertyBind = {
  hash: string;
  column: string;
  index?: string;
} | null;
export type AdStudioLayerFeed = Record<
  string,
  AdStudioLayerFeedPropertyBind | AdStudioLayerFeedPropertyBind[]
>;

export type JsonPropertiesFeed = EditorLayerFeed | AdStudioLayerFeed;

export function isEditorLayerFeed(
  variable: JsonPropertiesFeed
): variable is EditorLayerFeed {
  return typeof variable === "string" && variable !== null;
}

export function isAdStudioLayerFeed(
  variable: JsonPropertiesFeed
): variable is AdStudioLayerFeed {
  return (
    variable !== null &&
    ((typeof variable === "object" &&
      "hash" in variable &&
      "column" in variable) ||
      Array.isArray(variable))
  );
}

export type EditorDesignFeed = {
  hash?: string;
  row?: number;
  name?: string;
  url?: string;
  background?: string;
};

export type AdStudioDesignFeed = {
  hashes?: { hash: string; row: number }[];
  properties?: {
    [key: string]: AdStudioDesignFeedProperty;
  };
};

export type AdStudioDesignFeedProperty = { hash: string; column: string };

export type JsonDesignFeed = EditorDesignFeed | AdStudioDesignFeed;

export function isEditorDesignFeed(
  variable: JsonDesignFeed
): variable is EditorDesignFeed {
  return (
    typeof variable === "object" && variable !== null && "hash" in variable
  );
}

export function isAdStudioDesignFeed(
  variable: JsonDesignFeed
): variable is AdStudioDesignFeed {
  return (
    typeof variable === "object" && variable !== null && "hashes" in variable
  );
}

export type JsonDesignProperties = {
  sortIndex?: number;
  name: string;
  width: number;
  height: number;
  loop: boolean;
  loopCount?: number;
  imageQuality?: number;
  bannerSize?: string;
  customSize?: boolean;
  presetSize?: boolean;
  backgroundColor?: JsonDesignBackground;
  lastId: number;
  version: string;
  showGuidelines: boolean;
  measureUnit: JsonMeasureUnit;
  sizeVariation?: string | null;
  feed?: JsonDesignFeed;
  fallbackImagePosition?: number;
  fallbackImageSlideIndex?: number;
  bannerUrl: string;
  useAsClickTag: boolean;
};

export type JsonRGradPos =
  | "center center"
  | "center right"
  | "center left"
  | "bottom left"
  | "bottom center"
  | "bottom right"
  | "top left"
  | "top center"
  | "top right";

export type JsonAlign =
  | "bottom"
  | "center"
  | "left"
  | "middle"
  | "right"
  | "top";

export type JsonScaleMode =
  | "stretch"
  | "aspect"
  | "mask"
  | "tile"
  | "crop"
  | "userCrop";

export type JsonBackgroundType = "solid" | "rgrad" | "lgrad" | "image" | "none";

export type JsonBackgroundSolid = {
  type: "solid";
  scolor: string;
};

export type JsonBackgroundSolidText = JsonBackgroundSolid & {
  feed?: AdStudioLayerFeedPropertyBind;
};

export type JsonBackgroundLinearGradient = {
  type: "lgrad";
  gradColors: JsonGradColor[];
  backgroundRotation: number;
};

export type JsonBackgroundRadialGradient = {
  type: "rgrad";
  gradColors: JsonGradColor[];
  rgradPos: JsonRGradPos;
};

export type JsonBackgroundImage = {
  type: "image";
  originalWidth: number;
  originalHeight: number;
  url: string;
  backgroundRotation?: number;
  scaleMode: JsonScaleMode;
  contentScale?: number;
  horizontalAlign: JsonAlign;
  verticalAlign: JsonAlign;
  contentOffsetX?: number;
  contentOffsetY?: number;
  hqUrl?: string;
  source?: string;
  hash?: string;
  licensing?: boolean;
};

export type JsonBackgroundNone = {
  type: "none";
};

export interface JsonBackgroundBorder {
  useBorder?: boolean;
  borderColor?: string;
}

export type JsonBackground =
  | JsonBackgroundNone
  | JsonBackgroundSolid
  | JsonBackgroundLinearGradient
  | JsonBackgroundRadialGradient
  | JsonBackgroundImage;

export type JsonBackgroundWithBorder = JsonBackgroundBorder & JsonBackground;

export type JsonTextGradient =
  | JsonBackgroundNone
  | JsonBackgroundSolidText
  | JsonBackgroundLinearGradient
  | JsonBackgroundRadialGradient
  | JsonBackgroundImage;

export function isJsonBackgroundNone(
  bg: JsonBackground | undefined
): bg is JsonBackgroundNone {
  return bg !== undefined && bg && bg.type === "none";
}

export function isJsonBackgroundSolid(
  bg: JsonBackground | undefined
): bg is JsonBackgroundSolid {
  return bg !== undefined && bg && bg.type === "solid";
}

export function isJsonBackgroundLinearGradient(
  bg: JsonBackground | undefined
): bg is JsonBackgroundLinearGradient {
  return bg !== undefined && bg && bg.type === "lgrad";
}

export function isJsonBackgroundRadialGradient(
  bg: JsonBackground | undefined
): bg is JsonBackgroundRadialGradient {
  return bg !== undefined && bg && bg.type === "rgrad";
}

export function isJsonBackgroundImage(
  bg: JsonBackground | undefined
): bg is JsonBackgroundImage {
  return bg !== undefined && bg && bg.type === "image";
}

export type JsonGuidelines = {
  v: number[];
  h: number[];
};

export type JsonSlideOrElement = JsonSlide | JsonElement;

export function isSlide(
  element: JsonSlideOrElement | JsonDesign
): element is JsonSlide {
  return (element as JsonSlide).type === "slide";
}

export function isElement(
  element: JsonSlideOrElement | JsonDesign
): element is JsonElement {
  return (element as JsonElement).type === "layer";
}

export function isDesign(
  element: JsonSlideOrElement | JsonDesign
): element is JsonDesign {
  return !isElement(element) && !isSlide(element);
}

export function isText(element: JsonElement): element is JsonText {
  return element.layerType === "text";
}

export function isSvg(element: JsonElement): element is JsonSvg {
  return element.layerType === "svg";
}

export function isAudio(element: JsonElement): element is JsonAudio {
  return element.layerType === "audio";
}

export function isImage(element: JsonElement): element is JsonImage {
  return element.layerType === "image";
}

export function isVideo(element: JsonElement): element is JsonVideo {
  return element.layerType === "video";
}

export function isShape(element: JsonElement): element is JsonShape {
  return element.layerType === "shape";
}

export function isEmbed(element: JsonElement): element is JsonEmbed {
  return element.layerType === "embed";
}

export function isButton(element: JsonElement): element is JsonButton {
  return element.layerType === "button";
}

export function isClipart(element: JsonElement): element is JsonClipart {
  return element.layerType === "clipart";
}

export function isYoutube(element: JsonElement): element is JsonYoutube {
  return element.layerType === "youtube";
}

export function isCountdown(element: JsonElement): element is JsonCountdown {
  return element.layerType === "countdown";
}

export function isWeather(
  element: JsonElement
): element is JsonRain | JsonSnow | JsonFog {
  return ["fog", "rain", "snow"].includes(element.layerType);
}

export function isMedia(element: JsonElement): element is JsonElementMedia {
  return (
    isImage(element) || isSvg(element) || isVideo(element) || isAudio(element)
  );
}

export function hasAnimation({
  properties: { buildIn, buildMid, buildOut },
}: JsonElement) {
  if (!buildOut || !buildMid || !buildIn) {
    return false;
  }

  return (
    buildIn.type !== "none" ||
    buildMid.type !== "none" ||
    buildOut.type !== "none"
  );
}

export function isAnimated(
  element: JsonElement
): element is JsonAnimatedElement {
  return (
    hasAnimation(element) ||
    isVideo(element) ||
    isAudio(element) ||
    isYoutube(element) ||
    isEmbed(element) ||
    isCountdown(element) ||
    isWeather(element)
  );
}

export type JsonSlide = {
  properties: JsonSlideProperties;
  type: "slide";
  elements: JsonElement[];
};

export type JsonTransitionType =
  | "none"
  | "instant"
  | "alpha"
  | "alpha-words"
  | "blur"
  | "blur-words"
  | "slide"
  | "slideBounce"
  | "slideElastic"
  | "roll"
  | "zoom"
  | "flip"
  | "rotate"
  | "scale"
  | "show"
  | "hide"
  | "cross"
  | "scaleBounce"
  | "scaleElastic"
  | "vibrate"
  | "flicker"
  | "shake"
  | "jello"
  | "bounce"
  | "pulsate"
  | "blink"
  | "video"
  | "audio"
  | "advanced"
  | "shadowPop"
  | "fadeAudio"
  | "swing"
  | "fly"
  | "tilt"
  | "slit"
  | "step"
  | "kenBurns";

export type JsonTransitionTypeSlide =
  | "none"
  | "alpha"
  | "blur"
  | "slide"
  | "slideBounce"
  | "slideElastic"
  | "scale"
  | "scaleElastic"
  | "scaleBounce"
  | "roll"
  | "zoom"
  | "flip"
  | "rotate"
  | "swing"
  | "fly"
  | "tilt"
  | "slit"
  | "step";

export type JsonTransitionCrossType = "cross" | "hide" | "show";

export type JsonTransitionDirection =
  | "custom"
  | "l2r"
  | "r2l"
  | "t2b"
  | "b2t"
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topRight"
  | "topLeft"
  | "bottomRight"
  | "bottomLeft"
  | "forward"
  | "backward"
  | "center"
  | "vertical"
  | "horizontal"
  | "random"
  | "topForward"
  | "topBack"
  | "rightForward"
  | "rightBack"
  | "bottomForward"
  | "bottomBack"
  | "leftForward"
  | "leftBack";

export type JsonSlideTransition = JsonTransition & {
  type: JsonTransitionTypeSlide;
  crosstype: JsonTransitionCrossType;
};

export type JsonTweenType =
  | "Sine"
  | "Quad"
  | "Cubic"
  | "Quart"
  | "Quint"
  | "Expo"
  | "Circ"
  | "Strong"
  | "Bounce"
  | "Back"
  | "Elastic";

export type JsonEaseType =
  | "linear"
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut";

export type AdvancedMoveProperty = {
  delay: number;
  duration: number;
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
  tween: JsonTweenType;
  ease: JsonEaseType;
};

export type AdvancedOpacityProperty = {
  delay: number;
  duration: number;
  from: number;
  to: number;
  tween: JsonTweenType;
  ease: JsonEaseType;
};

export type AdvancedBlurProperty = {
  delay: number;
  duration: number;
  from: number;
  to: number;
  tween: JsonTweenType;
  ease: JsonEaseType;
};

export type AdvancedRotateProperty = {
  delay: number;
  duration: number;
  from: number;
  to: number;
  tween: JsonTweenType;
  ease: JsonEaseType;
};

export type AdvancedScaleProperty = {
  delay: number;
  duration: number;
  from: [number, number];
  to: [number, number];
  tween: JsonTweenType;
  ease: JsonEaseType;
  transformOrigin?: {
    from: string;
    to: string;
  };
};

export enum AdvancedPanelItems {
  MOVE = "move",
  ROTATE = "rotate",
  SCALE = "scale",
  OPACITY = "opacity",
  BLUR = "blur",
}

export type AdvancedProperties = {
  [AdvancedPanelItems.MOVE]: AdvancedMoveProperty[];
  [AdvancedPanelItems.ROTATE]: AdvancedRotateProperty[];
  [AdvancedPanelItems.SCALE]: AdvancedScaleProperty[];
  [AdvancedPanelItems.OPACITY]: AdvancedOpacityProperty[];
  [AdvancedPanelItems.BLUR]: AdvancedBlurProperty[];
};

export type JsonTransition = {
  type: JsonTransitionType;
  direction: JsonTransitionDirection;
  duration: number;
  delay: number;
  tween: JsonTweenType;
  ease: JsonEaseType;
  wordsDuration?: number;
  wordsAppearOrder?: "l2r" | "r2l";
  slidePosX: number;
  slidePosY: number;
  alphaOffset: number;
  slideOffset: number;
  blurAmount: number;
  zoom: number;
  preset: string;
  color?: string;
  shadowLength?: number;
  advancedProperties?: AdvancedProperties;
};

export type JsonTransitionGradColor = {
  gradColors: JsonGradColor[];
};

export type JsonTransitionMid = {
  type: JsonTransitionType;
  direction: "vertical" | "horizontal" | "top";
  variation?: string | null;
  duration: number;
  delay: number;
  motionTime: number;
  ease: JsonEaseType;
  tween: JsonTweenType;
  preset: string;
  startEnd: string;
  advancedProperties?: AdvancedProperties;
  gradient?: JsonTransitionGradColor;
};

export type JsonSlideProperties = {
  duration: number;
  /** @deprecated Use bannersetElementId instead of id */
  id: number;
  bannersetElementId?: number;
  stopSlide: boolean;
  guidelines?: JsonGuidelines;
  transition?: JsonSlideTransition;
};

export type JsonElement =
  | JsonText
  | JsonButton
  | JsonImage
  | JsonSvg
  | JsonAudio
  | JsonVideo
  | JsonShape
  | JsonEmbed
  | JsonYoutube
  | JsonClipart
  | JsonCountdown
  | JsonSnow
  | JsonRain
  | JsonFog;
export type JsonElementMedia = JsonSvg | JsonAudio | JsonImage | JsonVideo;
export type JsonAnimatedElement =
  | JsonVideo
  | JsonAudio
  | JsonYoutube
  | JsonEmbed;

export type JsonElementProperties =
  | JsonTextProperties
  | JsonButtonProperties
  | JsonImageProperties
  | JsonSvgProperties
  | JsonAudioProperties
  | JsonVideoProperties
  | JsonShapeProperties
  | JsonEmbedProperties
  | JsonYoutubeProperties
  | JsonClipartProperties
  | JsonRainProperties
  | JsonSnowProperties
  | JsonFogProperties
  | JsonCountdownProperties;

export type JsonShadow = {
  useShadow: boolean;
  hShadow: number;
  vShadow: number;
  blur: number;
  spread: number;
  color: string;
};

export type JsonBlur = {
  useBlur: boolean;
  pixels: number;
};

export const JsonFlipTypeArr = [
  "both",
  "horizontal",
  "none",
  "vertical",
] as const;

export type JsonFlipType = (typeof JsonFlipTypeArr)[number];

export type JsonTextAlignment = "left" | "right" | "center" | "justify";

export const JsonTextVerticalAlignment = {
  top: "top",
  center: "center",
  bottom: "bottom",
} as const;
export type JsonTextVerticalAlignmentType =
  (typeof JsonTextVerticalAlignment)[keyof typeof JsonTextVerticalAlignment];

export type JsonActionType = "gotoURL" | "gotoSlide" | "none";

export type JsonActionTarget = "_blank" | "_self" | "_parent" | "_top";

export type JsonActionSlide = "prev" | "next" | "first" | "last" | number;

export const JsonTextContentBoundary = {
  overflow: "overflow", // @deprecated use JsonTextContentHeightType.auto instead
  shrink: "shrink",
  ellipsis: "ellipsis",
  autoscroll: "autoscroll",
} as const;
export type JsonTextContentBoundaryType =
  (typeof JsonTextContentBoundary)[keyof typeof JsonTextContentBoundary];

export const JsonTextContentHeight = {
  auto: "auto",
  fixed: "fixed",
} as const;
export type JsonTextContentHeightType =
  (typeof JsonTextContentHeight)[keyof typeof JsonTextContentHeight];

export type JsonActionGotoURL = {
  event: string;
  target: JsonActionTarget;
  type: "gotoURL";
  url: string;
  useHandCursor: boolean;
};

export type JsonActionGotoSlide = {
  event: string;
  type: "gotoSlide";
  slide: JsonActionSlide;
  useHandCursor: boolean;
};

export type JsonActionVideoEnd = {
  event: string;
  target: string | null;
  type: "gotoSlide";
  url: string;
  slide: JsonActionSlide;
  useHandCursor: boolean;
};

export type JsonActionNone = {
  type: "none";
  event: string;
};

export type JsonAction =
  | JsonActionGotoURL
  | JsonActionGotoSlide
  | JsonActionNone
  | JsonActionVideoEnd;

export function isJsonActionGotoSlide(
  action: JsonAction
): action is JsonActionGotoSlide {
  return action.type === "gotoSlide";
}

export function isJsonActionGotoURL(
  action: JsonAction
): action is JsonActionGotoURL {
  return action.type === "gotoURL";
}

export function isJsonActionNone(action: JsonAction): action is JsonActionNone {
  return action.type === "none";
}

export type JsonBaseElementProperties = {
  id: number;
  bannersetElementId?: number | null;
  elementCategory?: string | null;
  layerName: string;
  dropShadow?: JsonShadow;
  blur?: JsonBlur;
  opacity: number;
  rotation: number;
  flip?: JsonFlipType;
  x: number;
  y: number;
  width: number;
  height: number;
  buildIn?: JsonTransition;
  buildMid?: JsonTransitionMid;
  buildOut?: JsonTransition;
  actions?: JsonAction[];
  locked?: boolean;
  lockedProperties?: string[];
  visible: boolean;
  group?: number | null;
  feed?: JsonPropertiesFeed;
};

export type JsonTextProperties = JsonBaseElementProperties & {
  text?: string;
  alignment: JsonTextAlignment;
  verticalAlign?: JsonTextVerticalAlignmentType;
  contentHeightType: JsonTextContentHeightType;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  config: JsonTextSlateConfig; // TODO:
  textShadow?: JsonShadow;
  initialFontSize?: number;
  textDirection?: string | null;
  scale?: number;
  blendMode?: JsonBlendMode;
  outline?: JsonTextOutline;
};

export type JsonTextOutline = {
  useOutline?: boolean;
  color?: string;
  weight?: number;
};

export type JsonText = {
  type: "layer";
  layerType: "text";
  properties: JsonTextProperties;
};

export type JsonOldTextV2 = {
  type: "layer";
  layerType: "text";
  properties: JsonTextProperties & { config: JsonTextOldConfig[] };
};

export type JsonOldTextV1 = {
  properties: JsonTextOldConfigStyle;
};

// TODO: add all attributes
export type JsonTextSlateConfigNode = {
  defaultFontSettings?: JsonFontSettings;
  children: Array<JsonTextSlateConfigChildren | JsonTextSlateConfigNode>;
  type:
    | "paragraph"
    | "legacy"
    | "subparagraph"
    | "wrapper"
    | "bullet-list"
    | "number-list"
    | "list-item"
    | "feed-chip";
};

export function isSlateConfigChildren(
  config:
    | JsonTextSlateConfigChildren
    | JsonTextSlateConfigNode
    | JsonTextOldConfig
): config is JsonTextSlateConfigChildren {
  return !("children" in config) && "fontSettings" in config;
}

export function isSlateConfigNode(
  config:
    | JsonTextSlateConfigChildren
    | JsonTextSlateConfigNode
    | JsonTextOldConfig
): config is JsonTextSlateConfigNode {
  return "children" in config && "type" in config;
}

export function isSlateConfig(
  config: JsonTextSlateConfig | JsonTextOldConfig[]
): config is JsonTextSlateConfig {
  return "type" in config && "nodes" in config;
}

export function isTextOldConfig(
  config: JsonTextSlateConfig | JsonTextOldConfig
): config is JsonTextOldConfig {
  return "style" in config && "children" in config;
}

export function isOldTextV1(
  node: JsonText | JsonOldTextV2 | JsonOldTextV1
): node is JsonOldTextV1 {
  return !("type" in node);
}

export function isOldSetText(
  node: JsonTextSet | JsonTextOldConfigStyle
): node is JsonTextOldConfigStyle {
  return !("config" in node);
}

export type JsonFontSettings = {
  fontFamily: string;
  fontType: FontType;
  fontStyle: FontStyle;
  fontPrefix: string | null;
  fontWeight: number;
  fontFaceUrl: string | null;
  fontUrl: string | null;
};

export type JsonTextSlateConfigChildren = {
  color: string;
  textScript: "none" | "superscript" | "subscript";
  textDecoration: TextDecorationEnum;
  textTransform: TextTransform;
  fontSettings: JsonFontSettings;
  typography: "heading" | "subheading" | "body";
  gradient?: JsonTextGradient;
  fontSizePercent: number;
  fontSize?: number;
  text: string;
  feed?: AdStudioLayerFeedPropertyBind;
  feedText?: AdStudioLayerFeedPropertyBind;
};

export enum TextContentBoundaryType {
  OVERFLOW = "overflow",
  SHRINK = "shrink",
  ELLIPSIS = "ellipsis",
}

export type Boundary = {
  type?: JsonTextContentBoundaryType;
  minFontSize?: number;
};

export type JsonTextSlateConfig = {
  type: "slate";
  nodes: JsonTextSlateConfigNode[];
  selection?: unknown;
  keepSelection?: boolean;
  boundary?: Boundary;
};

export type JsonTextOldConfigStyle = {
  fontFamily: string;
  fontType: FontType;
  fontStyle: FontStyle;
  fontPrefix: string | null;
  fontWeight: number | string;
  fontFaceUrl: string | null;
  fontUrl: string | null;
};

export interface JsonCountdownConfigStyle extends JsonTextOldConfigStyle {
  textDecoration: TextDecorationEnum;
  color: string;
}

export type JsonTextOldConfigChildren = {
  style: JsonTextOldConfigStyle;
};

export type JsonTextOldConfig = {
  style: JsonTextOldConfigStyle;
  children: JsonTextOldConfigChildren[];
};

export type JsonCountdownConfig = {
  style: JsonCountdownConfigStyle;
  children: { style: JsonCountdownConfigStyle }[];
};

export type JsonCountdownProperties = JsonBaseElementProperties & {
  countToDate: boolean;
  countValue: string | number;
  countTimeZone: number;
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  scale: number;
  textShadow: JsonShadow;
  alignment: JsonTextAlignment;
  config: JsonCountdownConfig[];
};

export type JsonCountdown = {
  type: "layer";
  layerType: "countdown";
  properties: JsonCountdownProperties;
};

export type JsonRainProperties = JsonBaseElementProperties & {
  size: number;
  speed: number;
  density: number;
  opacity: number;
  particleSize: number;
  splashEffect: boolean;
  splashEffectParticleSize: number;
  splashEffectSize: number;
};

export type JsonRain = {
  type: "layer";
  layerType: "rain";
  properties: JsonRainProperties;
};

export type JsonSnowProperties = JsonBaseElementProperties & {
  size: number;
  speed: number;
  density: number;
  opacity: number;
  particleSize: number;
};

export type JsonSnow = {
  type: "layer";
  layerType: "snow";
  properties: JsonSnowProperties;
};

export type JsonFogProperties = JsonBaseElementProperties & {
  size: number;
  speed: number;
  density: number;
  opacity: number;
};

export type JsonFog = {
  type: "layer";
  layerType: "fog";
  properties: JsonFogProperties;
};

export type JsonBorder = {
  color: string;
  weight: number;
  radius: number;
};

export type FontType = "google" | "custom" | "all" | "bannersnack" | "creatopy";
export type FontStyle = "normal" | "italic" | "regular" | "slanted" | "oblique";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

export type JsonButtonLabelStyle = JsonFontSettings & {
  fontDesign?: string;
  textTransform?: TextTransform;
  fontSize?: number;
  color?: string;
  letterSpacing?: number;
  dropShadow?: JsonShadow;
  initialFontSize?: number;
  textDirection?: string;
  fontPrefix?: string | null;
};

export type JsonButtonProperties = JsonBaseElementProperties & {
  buttonLabel: string;
  html: string;
  backgroundColor?: JsonBackground;
  backgroundOverColor?: string;
  labelShadow?: JsonShadow;
  labelStyle: JsonButtonLabelStyle;
  labelOffsetX: number;
  labelOffsetY: number;
  border?: JsonBorder;
  hoverState?: {
    backgroundColor?: JsonBackground;
    border?: JsonBorder;
    dropShadow?: JsonShadow;
    labelShadow?: JsonShadow;
    labelStyle?: JsonButtonLabelStyle;
  };
};

export type JsonButton = {
  type: "layer";
  layerType: "button";
  properties: JsonButtonProperties;
};

export type JsonAdjustColor = {
  useAdjustColor: boolean;
  brightness: number;
  contrast: number;
  saturate: number;
  hue: number;
};

export type JsonCropData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type JsonImageProperties = JsonBaseElementProperties & {
  url: string;
  scaleMode: JsonScaleMode;
  horizontalAlign: JsonAlign;
  verticalAlign: JsonAlign;
  adjustColor: JsonAdjustColor;
  contentScale: number;
  contentOffsetX: number;
  contentOffsetY: number;
  originalWidth: number;
  originalHeight: number;
  hqUrl?: string;
  cropData?: JsonCropData;
  source?: string;
  hash?: string;
  licensing?: boolean;
  blendMode?: JsonBlendMode;
  mediaFolderId?: number;
  originalName?: string;
  maskImage?: string;
};

export type JsonImage = {
  type: "layer";
  layerType: "image";
  properties: JsonImageProperties;
};

export type JsonLineData = {
  iteration: number;
  width: number;
  height: number;
  left: number;
  leftMargin: number;
  rightMargin: number;
  leftWidth: number;
  rightWidth: number;
};

export type JsonSvgProperties = JsonBaseElementProperties & {
  url: string;
  colorGroups: Record<string, string>;
  originalWidth: number;
  originalHeight: number;
  resourceKey: string;
  lineData?: JsonLineData; // TODO
};

export type JsonSvg = {
  type: "layer";
  layerType: "svg";
  properties: JsonSvgProperties;
};

export type JsonBlendMode =
  | "color"
  | "color-burn"
  | "color-dodge"
  | "darken"
  | "difference"
  | "exclusion"
  | "hard-light"
  | "hue"
  | "lighten"
  | "luminosity"
  | "multiply"
  | "normal"
  | "overlay"
  | "saturation"
  | "screen"
  | "soft-light";

export type JsonShapeProperties = JsonBaseElementProperties & {
  backgroundColor?: JsonBackground;
  type: "circle" | "rectangle";
  border?: JsonBorder;
  cropData?: JsonCropData;
  blendMode?: JsonBlendMode;
};

export type JsonShape = {
  type: "layer";
  layerType: "shape";
  properties: JsonShapeProperties;
};

export type JsonYoutubeProperties = JsonBaseElementProperties & {
  youtubeURL: string;
  autoplay: boolean;
  loop: boolean;
  adjustColor?: JsonAdjustColor;
  displayYoutubeLogo: boolean;
  soundOnMouseOver: boolean;
  volume: number;
  startAt: boolean;
  startAtTime: string;
  hideControls: boolean;
};

export type JsonYoutube = {
  type: "layer";
  layerType: "youtube";
  properties: JsonYoutubeProperties;
};

export type JsonUseIframe = "auto" | "yes" | "no";

export type JsonEmbedProperties = JsonBaseElementProperties & {
  backgroundColor?: JsonBackground;
  code: string;
  useBorder: boolean;
  borderColor?: string;
  margin: number;
  originalWidth?: number;
  useIframe: JsonUseIframe;
  scrollbar: boolean;
  autoResize: boolean;
  adjustColor?: JsonAdjustColor;
};

export type JsonEmbed = {
  type: "layer";
  layerType: "embed";
  properties: JsonEmbedProperties;
};

export type JsonAutoplay = "enabled" | "disabled";

export type JsonVideoProperties = JsonBaseElementProperties & {
  format: string;
  url: string;
  scaleMode: JsonScaleMode;
  horizontalAlign: JsonAlign;
  verticalAlign: JsonAlign;
  adjustColor?: JsonAdjustColor;
  contentScale: number;
  originalWidth: number;
  originalHeight: number;
  cropData?: JsonCropData;
  startTime: number;
  endTime: number;
  duration: number;
  autoplay: JsonAutoplay;
  controls: boolean;
  loop: boolean;
  soundOnHover: boolean;
  volume: number;
  provider?: JsonStockMediaProvider;
  maskImage?: string;
  source?: string;
};

export type JsonStockMediaProvider =
  | "unsplash"
  | "pixabay"
  | "pexels"
  | "giphy"
  | "melodie"
  | "audioProviders"
  | "shutterstock";

export type JsonVideo = {
  type: "layer";
  layerType: "video";
  properties: JsonVideoProperties;
};

export type JsonAudioProperties = JsonBaseElementProperties & {
  format: string;
  url: string;
  startTime: number;
  endTime: number;
  duration: number;
  volume: number;
  soundOnHover: boolean;
};

export type JsonAudio = {
  type: "layer";
  layerType: "audio";
  properties: JsonAudioProperties;
};

export type JsonClipartProperties = JsonBaseElementProperties & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgObject: any;
};

export type JsonClipart = {
  type: "layer";
  layerType: "clipart";
  properties: JsonClipartProperties;
};

export type JsonDesign = {
  properties: JsonDesignProperties;
  elements: JsonSlideOrElement[];
  resources?: Record<string, TResource>;
};

export type DesignJsonWithHash = {
  hash: string;
  json: JsonDesign;
};

type JsonSetBaseProperties = {
  bannersetElementType: string;
  layerType: JsonLayerType;
  elementCategory: number;
  locked: boolean;
  lockedProperties: string[];
  feed?: JsonPropertiesFeed;
};

export type JsonVideoSet = JsonVideoProperties & JsonSetBaseProperties;
export type JsonButtonSet = JsonButtonProperties & JsonSetBaseProperties;
export type JsonImageSet = JsonImageProperties & JsonSetBaseProperties;
export type JsonSvgSet = JsonSvgProperties & JsonSetBaseProperties;
export type JsonTextSet = JsonTextProperties & JsonSetBaseProperties;
export type JsonShapeSet = JsonShapeProperties & JsonSetBaseProperties;

export type JsonSetElement = JsonElementProperties & JsonSetBaseProperties;

export function isJsonSetImage(
  element: JsonSetElement
): element is JsonImageSet {
  return element.layerType === "image";
}

export function isJsonSetVideo(
  element: JsonSetElement
): element is JsonVideoSet {
  return element.layerType === "video";
}

export function isJsonSetSvg(element: JsonSetElement): element is JsonSvgSet {
  return element.layerType === "svg";
}

export function isJsonSetText(element: JsonSetElement): element is JsonTextSet {
  return element.layerType === "text";
}

export function isJsonSetButton(
  element: JsonSetElement
): element is JsonButtonSet {
  return element.layerType === "button";
}

export function isJsonSetShape(
  element: JsonSetElement
): element is JsonShapeSet {
  return element.layerType === "shape";
}

export type JsonSetSlide = JsonSlideProperties & {
  elements: JsonSetElement[];
  elementType: "slide";
  feed?: JsonPropertiesFeed;
};

export function isJsonDesignSet(
  element: JsonDesignSet | JsonSetElement
): element is JsonDesignSet {
  return (
    "elements" in element &&
    !("layerType" in element) &&
    !("elementType" in element)
  );
}

export type JsonDesignSet = {
  hash: string;
  userId?: number;
  name: string;
  lastElementId: number;
  backgroundColor: JsonDesignBackground;
  loopCount: number;
  hasVideo: boolean;
  hasAudio: boolean;
  elements: JsonSetSlide[];
  feed?: JsonDesignFeed;
};

export type TResource = {
  content: string;
  usages: number;
};

export enum TextDecorationEnum {
  NONE = "none",
  UNDERLINE = "underline",
  STRIKETHROUGH = "line-through",
}

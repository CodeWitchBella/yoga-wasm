#pragma once

#include "../yoga/Yoga.h"

#include "./Layout.hh"
#include "./Config.hh"

#define NODE_STYLE_PROPERTY(TYPE, NAME, PARAM_NAME) \
  void set##NAME(TYPE PARAM_NAME);                  \
  TYPE get##NAME(void) const;

#define NODE_STYLE_EDGE_PROPERTY(TYPE, NAME, PARAM_NAME)               \
  NODE_STYLE_PROPERTY(TYPE, NAME##Left, PARAM_NAME##Left);             \
  NODE_STYLE_PROPERTY(TYPE, NAME##Right, PARAM_NAME##Right);           \
  NODE_STYLE_PROPERTY(TYPE, NAME##Top, PARAM_NAME##Top);               \
  NODE_STYLE_PROPERTY(TYPE, NAME##Bottom, PARAM_NAME##Bottom);         \
  NODE_STYLE_PROPERTY(TYPE, NAME##Start, PARAM_NAME##Start);           \
  NODE_STYLE_PROPERTY(TYPE, NAME##End, PARAM_NAME##End);               \
  NODE_STYLE_PROPERTY(TYPE, NAME##Horizontal, PARAM_NAME##Horizontal); \
  NODE_STYLE_PROPERTY(TYPE, NAME##Vertical, PARAM_NAME##Vertical);     \
  NODE_STYLE_PROPERTY(TYPE, NAME##All, PARAM_NAME##All);

#define NODE_LAYOUT_PROPERTY(TYPE, NAME) \
  TYPE getComputed##NAME(void) const;

#define NODE_LAYOUT_EDGE_PROPERTY(TYPE, NAME, PARAM_NAME) \
  NODE_LAYOUT_PROPERTY(TYPE, NAME##Left);                 \
  NODE_LAYOUT_PROPERTY(TYPE, NAME##Right);                \
  NODE_LAYOUT_PROPERTY(TYPE, NAME##Top);                  \
  NODE_LAYOUT_PROPERTY(TYPE, NAME##Bottom);               \
  NODE_LAYOUT_PROPERTY(TYPE, NAME##Start);                \
  NODE_LAYOUT_PROPERTY(TYPE, NAME##End);

typedef YGSize (*JSMeasureFunction)(float width,
                                    YGMeasureMode widthMode,
                                    float height,
                                    YGMeasureMode heightMode);

struct MeasureCallback
{
  virtual YGSize measure(float width,
                         YGMeasureMode widthMode,
                         float height,
                         YGMeasureMode heightMode) = 0;
};

struct MeasureCallbackWrapper : public emscripten::wrapper<MeasureCallback>
{
  EMSCRIPTEN_WRAPPER(MeasureCallbackWrapper);
  YGSize measure(float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode)
  {
    return call<YGSize>("measure", width, widthMode, height, heightMode);
  }
};

struct DirtiedCallback
{
  virtual void dirtied() = 0;
};

struct DirtiedCallbackWrapper : public emscripten::wrapper<DirtiedCallback>
{
  EMSCRIPTEN_WRAPPER(DirtiedCallbackWrapper);
  void dirtied()
  {
    return call<void>("dirtied");
  }
};

class Node
{

public:
  static Node *createDefault(void);
  static Node *createWithConfig(Config *config);

  static void destroy(Node *node);

public:
  static Node *fromYGNode(YGNodeRef nodeRef);

private:
  Node(Config *config);

public:
  ~Node(void);

public: // Prevent accidental copy
  Node(Node const &) = delete;

  Node const &operator=(Node const &) = delete;

public:
  void reset(void);

public: // Style setters
  void copyStyle(Node const &other);
  void setIsReferenceBaseline(bool isReferenceBaseline);
  void setMargin(YGEdge edge, double value);
  void setMarginPercent(YGEdge edge, double value);
  void setMarginAuto(YGEdge edge);
  double getComputedMargin(YGEdge edge);

  void setPositionType(YGPositionType type);
  void setPosition(YGEdge edge, double value);
  void setPositionPercent(YGEdge edge, double value);

public: // Style properties
  NODE_STYLE_PROPERTY(YGDirection, Direction, direction);
  NODE_STYLE_PROPERTY(YGFlexDirection, FlexDirection, flexDirection);
  NODE_STYLE_PROPERTY(YGJustify, JustifyContent, justifyContent);
  NODE_STYLE_PROPERTY(YGAlign, AlignContent, alignContent);
  NODE_STYLE_PROPERTY(YGAlign, AlignItems, alignItems);
  NODE_STYLE_PROPERTY(YGAlign, AlignSelf, alignSelf);
  NODE_STYLE_PROPERTY(YGWrap, FlexWrap, flexWrap);
  NODE_STYLE_PROPERTY(YGOverflow, Overflow, overflow);
  NODE_STYLE_PROPERTY(YGDisplay, Display, display);

  NODE_STYLE_PROPERTY(float, Flex, flex);
  NODE_STYLE_PROPERTY(float, FlexGrow, flexGrow);
  NODE_STYLE_PROPERTY(float, FlexShrink, flexShrink);
  NODE_STYLE_PROPERTY(YGValue, FlexBasis, flexBasis);

  NODE_STYLE_EDGE_PROPERTY(YGValue, Padding, padding);
  NODE_STYLE_EDGE_PROPERTY(float, Border, border);

  NODE_STYLE_PROPERTY(YGValue, Width, width);
  NODE_STYLE_PROPERTY(YGValue, Height, height);
  NODE_STYLE_PROPERTY(YGValue, MinWidth, minWidth);
  NODE_STYLE_PROPERTY(YGValue, MinHeight, minHeight);
  NODE_STYLE_PROPERTY(YGValue, MaxWidth, maxWidth);
  NODE_STYLE_PROPERTY(YGValue, MaxHeight, maxHeight);

  NODE_STYLE_PROPERTY(float, AspectRatio, aspectRatio);

public: // Tree hierarchy mutators
  void insertChild(Node *child, unsigned index);
  void removeChild(Node *child);

public: // Tree hierarchy inspectors
  unsigned getChildCount(void) const;

  // The following functions cannot be const because they could discard const qualifiers (ex: constNode->getChild(0)->getParent() wouldn't be const)

  Node *getParent(void);
  Node *getChild(unsigned index);

public: // Measure func mutators
  void setMeasureFunc(MeasureCallback *measureCb);
  void unsetMeasureFunc(void);

  void setDirtiedFunc(DirtiedCallback *dirtiedCb);
  void unsetDirtiedFunc(void);

public: // Measure func inspectors
  YGSize callMeasureFunc(float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode) const;
  void callDirtiedFunc() const;

public: // Dirtiness accessors
  void markDirty(void);
  bool isDirty(void) const;

public: // Layout mutators
  void calculateLayout(float width, float height, YGDirection direction);

public: // Layout getters
  Layout getComputedLayout(void) const;

  NODE_LAYOUT_PROPERTY(float, Left);
  NODE_LAYOUT_PROPERTY(float, Top);
  NODE_LAYOUT_PROPERTY(float, Width);
  NODE_LAYOUT_PROPERTY(float, Height);

  NODE_LAYOUT_EDGE_PROPERTY(float, Border, border);
  NODE_LAYOUT_EDGE_PROPERTY(float, Padding, padding);

public: // HasNewLayout manipulators
  bool hasNewLayout(void) const;
  void setHasNewLayout(bool hasNewLayout);

private:
  YGNodeRef m_node;
  std::unique_ptr<MeasureCallback> m_measureCb;
  std::unique_ptr<DirtiedCallback> m_dirtiedCb;
};

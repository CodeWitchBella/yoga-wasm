/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

#include <algorithm>
#include <emscripten/bind.h>

#include "../yoga/Yoga.h"

#include "./Layout.hh"
#include "./Config.hh"
#include "./Node.hh"
#include "./Value.hh"

static YGSize globalMeasureFunc(YGNodeRef nodeRef, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode)
{
  Node const &node = *reinterpret_cast<Node const *>(YGNodeGetContext(nodeRef));

  Size size = node.callMeasureFunc(width, widthMode, height, heightMode);
  YGSize ygSize = {static_cast<float>(size.width),
                   static_cast<float>(size.height)};

  return ygSize;
}

static void globalDirtiedFunc(YGNodeRef nodeRef)
{
  Node const &node = *reinterpret_cast<Node const *>(YGNodeGetContext(nodeRef));

  node.callDirtiedFunc();
}

/* static */ Node* Node::createDefault(void) {
  return new Node(nullptr);
}

/* static */ Node* Node::createWithConfig(Config* config) {
  return new Node(config);
}

/* static */ void Node::destroy(Node* node) {
  delete node;
}

/* static */ Node* Node::fromYGNode(YGNodeRef nodeRef) {
  return reinterpret_cast<Node*>(YGNodeGetContext(nodeRef));
}

Node::Node(Config* config)
    : m_node(
          config != nullptr ? YGNodeNewWithConfig(config->m_config)
                            : YGNodeNew()),
      m_measureFunc(nullptr),
      m_dirtiedFunc(nullptr) {
  YGNodeSetContext(m_node, reinterpret_cast<void*>(this));
}

Node::~Node(void) {
  YGNodeFree(m_node);
}

void Node::reset(void) {
  m_measureFunc.reset(nullptr);
  m_dirtiedFunc.reset(nullptr);

  YGNodeReset(m_node);
}

void Node::copyStyle(Node const& other) {
  YGNodeCopyStyle(m_node, other.m_node);
}

void Node::setPositionType(int positionType) {
  YGNodeStyleSetPositionType(m_node, static_cast<YGPositionType>(positionType));
}

void Node::setPosition(int edge, double position) {
  YGNodeStyleSetPosition(m_node, static_cast<YGEdge>(edge), position);
}

void Node::setPositionPercent(int edge, double position) {
  YGNodeStyleSetPositionPercent(m_node, static_cast<YGEdge>(edge), position);
}

void Node::setAlignContent(int alignContent) {
  YGNodeStyleSetAlignContent(m_node, static_cast<YGAlign>(alignContent));
}

void Node::setAlignItems(int alignItems) {
  YGNodeStyleSetAlignItems(m_node, static_cast<YGAlign>(alignItems));
}

void Node::setAlignSelf(int alignSelf) {
  YGNodeStyleSetAlignSelf(m_node, static_cast<YGAlign>(alignSelf));
}

void Node::setFlexDirection(int flexDirection) {
  YGNodeStyleSetFlexDirection(
      m_node, static_cast<YGFlexDirection>(flexDirection));
}

void Node::setFlexWrap(int flexWrap) {
  YGNodeStyleSetFlexWrap(m_node, static_cast<YGWrap>(flexWrap));
}

void Node::setJustifyContent(int justifyContent) {
  YGNodeStyleSetJustifyContent(m_node, static_cast<YGJustify>(justifyContent));
}

void Node::setMargin(int edge, double margin) {
  YGNodeStyleSetMargin(m_node, static_cast<YGEdge>(edge), margin);
}

void Node::setMarginPercent(int edge, double margin) {
  YGNodeStyleSetMarginPercent(m_node, static_cast<YGEdge>(edge), margin);
}

void Node::setMarginAuto(int edge) {
  YGNodeStyleSetMarginAuto(m_node, static_cast<YGEdge>(edge));
}

void Node::setOverflow(int overflow) {
  YGNodeStyleSetOverflow(m_node, static_cast<YGOverflow>(overflow));
}

void Node::setDisplay(int display) {
  YGNodeStyleSetDisplay(m_node, static_cast<YGDisplay>(display));
}

void Node::setFlex(double flex) {
  YGNodeStyleSetFlex(m_node, flex);
}

void Node::setFlexBasis(double flexBasis) {
  YGNodeStyleSetFlexBasis(m_node, flexBasis);
}

void Node::setFlexBasisPercent(double flexBasis) {
  YGNodeStyleSetFlexBasisPercent(m_node, flexBasis);
}

void Node::setFlexGrow(double flexGrow) {
  YGNodeStyleSetFlexGrow(m_node, flexGrow);
}

void Node::setFlexShrink(double flexShrink) {
  YGNodeStyleSetFlexShrink(m_node, flexShrink);
}

void Node::setWidth(double width) {
  YGNodeStyleSetWidth(m_node, width);
}

void Node::setWidthPercent(double width) {
  YGNodeStyleSetWidthPercent(m_node, width);
}

void Node::setWidthAuto() {
  YGNodeStyleSetWidthAuto(m_node);
}

void Node::setHeight(double height) {
  YGNodeStyleSetHeight(m_node, height);
}

void Node::setHeightPercent(double height) {
  YGNodeStyleSetHeightPercent(m_node, height);
}

void Node::setHeightAuto() {
  YGNodeStyleSetHeightAuto(m_node);
}

void Node::setMinWidth(double minWidth) {
  YGNodeStyleSetMinWidth(m_node, minWidth);
}

void Node::setMinWidthPercent(double minWidth) {
  YGNodeStyleSetMinWidthPercent(m_node, minWidth);
}

void Node::setMinHeight(double minHeight) {
  YGNodeStyleSetMinHeight(m_node, minHeight);
}

void Node::setMinHeightPercent(double minHeight) {
  YGNodeStyleSetMinHeightPercent(m_node, minHeight);
}

void Node::setMaxWidth(double maxWidth) {
  YGNodeStyleSetMaxWidth(m_node, maxWidth);
}

void Node::setMaxWidthPercent(double maxWidth) {
  YGNodeStyleSetMaxWidthPercent(m_node, maxWidth);
}

void Node::setMaxHeight(double maxHeight) {
  YGNodeStyleSetMaxHeight(m_node, maxHeight);
}

void Node::setMaxHeightPercent(double maxHeight) {
  YGNodeStyleSetMaxHeightPercent(m_node, maxHeight);
}

void Node::setAspectRatio(double aspectRatio) {
  YGNodeStyleSetAspectRatio(m_node, aspectRatio);
}

void Node::setBorder(int edge, double border) {
  YGNodeStyleSetBorder(m_node, static_cast<YGEdge>(edge), border);
}

void Node::setPadding(int edge, double padding) {
  YGNodeStyleSetPadding(m_node, static_cast<YGEdge>(edge), padding);
}

void Node::setPaddingPercent(int edge, double padding) {
  YGNodeStyleSetPaddingPercent(m_node, static_cast<YGEdge>(edge), padding);
}

void Node::setIsReferenceBaseline(bool isReferenceBaseline) {
  YGNodeSetIsReferenceBaseline(m_node, isReferenceBaseline);
}

int Node::getPositionType(void) const {
  return YGNodeStyleGetPositionType(m_node);
}

Value Node::getPosition(int edge) const {
  return Value::fromYGValue(
      YGNodeStyleGetPosition(m_node, static_cast<YGEdge>(edge)));
}

int Node::getAlignContent(void) const {
  return YGNodeStyleGetAlignContent(m_node);
}

int Node::getAlignItems(void) const {
  return YGNodeStyleGetAlignItems(m_node);
}

int Node::getAlignSelf(void) const {
  return YGNodeStyleGetAlignSelf(m_node);
}

int Node::getFlexDirection(void) const {
  return YGNodeStyleGetFlexDirection(m_node);
}

int Node::getFlexWrap(void) const {
  return YGNodeStyleGetFlexWrap(m_node);
}

int Node::getJustifyContent(void) const {
  return YGNodeStyleGetJustifyContent(m_node);
}

Value Node::getMargin(int edge) const {
  return Value::fromYGValue(
      YGNodeStyleGetMargin(m_node, static_cast<YGEdge>(edge)));
}

int Node::getOverflow(void) const {
  return YGNodeStyleGetOverflow(m_node);
}

int Node::getDisplay(void) const {
  return YGNodeStyleGetDisplay(m_node);
}

Value Node::getFlexBasis(void) const {
  return Value::fromYGValue(YGNodeStyleGetFlexBasis(m_node));
}

double Node::getFlexGrow(void) const {
  return YGNodeStyleGetFlexGrow(m_node);
}

double Node::getFlexShrink(void) const {
  return YGNodeStyleGetFlexShrink(m_node);
}

Value Node::getWidth(void) const {
  return Value::fromYGValue(YGNodeStyleGetWidth(m_node));
}

Value Node::getHeight(void) const {
  return Value::fromYGValue(YGNodeStyleGetHeight(m_node));
}

Value Node::getMinWidth(void) const {
  return Value::fromYGValue(YGNodeStyleGetMinWidth(m_node));
}

Value Node::getMinHeight(void) const {
  return Value::fromYGValue(YGNodeStyleGetMinHeight(m_node));
}

Value Node::getMaxWidth(void) const {
  return Value::fromYGValue(YGNodeStyleGetMaxWidth(m_node));
}

Value Node::getMaxHeight(void) const {
  return Value::fromYGValue(YGNodeStyleGetMaxHeight(m_node));
}

double Node::getAspectRatio(void) const {
  return YGNodeStyleGetAspectRatio(m_node);
}

double Node::getBorder(int edge) const {
  return YGNodeStyleGetBorder(m_node, static_cast<YGEdge>(edge));
}

Value Node::getPadding(int edge) const {
  return Value::fromYGValue(
      YGNodeStyleGetPadding(m_node, static_cast<YGEdge>(edge)));
}

bool Node::isReferenceBaseline() {
  return YGNodeIsReferenceBaseline(m_node);
}

void Node::insertChild(Node* child, unsigned index) {
  YGNodeInsertChild(m_node, child->m_node, index);
}

void Node::removeChild(Node* child) {
  YGNodeRemoveChild(m_node, child->m_node);
}

unsigned Node::getChildCount(void) const {
  return YGNodeGetChildCount(m_node);
}

Node* Node::getParent(void) {
  auto nodePtr = YGNodeGetParent(m_node);

  if (nodePtr == nullptr)
    return nullptr;

  return Node::fromYGNode(nodePtr);
}

Node* Node::getChild(unsigned index) {
  auto nodePtr = YGNodeGetChild(m_node, index);

  if (nodePtr == nullptr)
    return nullptr;

  return Node::fromYGNode(nodePtr);
}

void Node::setMeasureFunc(MeasureCallback *measureFunc) {
  m_measureFunc.reset(measureFunc);

  YGNodeSetMeasureFunc(m_node, &globalMeasureFunc);
}

void Node::unsetMeasureFunc(void) {
  m_measureFunc.reset(nullptr);

  YGNodeSetMeasureFunc(m_node, nullptr);
}

Size Node::callMeasureFunc(
    double width,
    int widthMode,
    double height,
    int heightMode) const {
  return m_measureFunc->measure(width, widthMode, height, heightMode);
}

void Node::setDirtiedFunc(DirtiedCallback *dirtiedFunc)
{
  m_dirtiedFunc.reset(dirtiedFunc);

  YGNodeSetDirtiedFunc(m_node, &globalDirtiedFunc);
}

void Node::unsetDirtiedFunc(void) {
  m_dirtiedFunc.reset(nullptr);

  YGNodeSetDirtiedFunc(m_node, nullptr);
}

void Node::callDirtiedFunc(void) const {
  m_dirtiedFunc->dirtied();
}

void Node::markDirty(void) {
  YGNodeMarkDirty(m_node);
}

bool Node::isDirty(void) const {
  return YGNodeIsDirty(m_node);
}

void Node::calculateLayout(double width, double height, int direction) {
  YGNodeCalculateLayout(
      m_node, width, height, static_cast<YGDirection>(direction));
}

double Node::getComputedLeft(void) const {
  return YGNodeLayoutGetLeft(m_node);
}

double Node::getComputedRight(void) const {
  return YGNodeLayoutGetRight(m_node);
}

double Node::getComputedTop(void) const {
  return YGNodeLayoutGetTop(m_node);
}

double Node::getComputedBottom(void) const {
  return YGNodeLayoutGetBottom(m_node);
}

double Node::getComputedWidth(void) const {
  return YGNodeLayoutGetWidth(m_node);
}

double Node::getComputedHeight(void) const {
  return YGNodeLayoutGetHeight(m_node);
}

Layout Node::getComputedLayout(void) const {
  Layout layout;

  layout.left = YGNodeLayoutGetLeft(m_node);
  layout.right = YGNodeLayoutGetRight(m_node);

  layout.top = YGNodeLayoutGetTop(m_node);
  layout.bottom = YGNodeLayoutGetBottom(m_node);

  layout.width = YGNodeLayoutGetWidth(m_node);
  layout.height = YGNodeLayoutGetHeight(m_node);

  return layout;
}

double Node::getComputedMargin(int edge) const {
  return YGNodeLayoutGetMargin(m_node, static_cast<YGEdge>(edge));
}

double Node::getComputedBorder(int edge) const {
  return YGNodeLayoutGetBorder(m_node, static_cast<YGEdge>(edge));
}

double Node::getComputedPadding(int edge) const {
  return YGNodeLayoutGetPadding(m_node, static_cast<YGEdge>(edge));
}

using namespace emscripten;
EMSCRIPTEN_BINDINGS(Node)
{
  
  class_<MeasureCallback>("MeasureCallback")
    .function("measure", &MeasureCallback::measure, pure_virtual())
    .allow_subclass<MeasureCallbackWrapper>("MeasureCallbackWrapper")
    ;

  class_<DirtiedCallback>("DirtiedCallback")
    .function("dirtied", &DirtiedCallback::dirtied, pure_virtual())
    .allow_subclass<DirtiedCallbackWrapper>("DirtiedCallbackWrapper")
    ;

  class_<Node>("Node")
    .class_function("createDefault", &Node::createDefault, allow_raw_pointers())
    .class_function("createWithConfig", &Node::createWithConfig, allow_raw_pointers())
    .class_function("destroy", &Node::destroy, allow_raw_pointers())

    .function("reset", &Node::reset, allow_raw_pointers())

    .function("copyStyle", &Node::copyStyle, allow_raw_pointers())

    .function("setPositionType", &Node::setPositionType, allow_raw_pointers())
    .function("setPosition", &Node::setPosition, allow_raw_pointers())
    .function("setPositionPercent", &Node::setPositionPercent, allow_raw_pointers())

    .function("setAlignContent", &Node::setAlignContent, allow_raw_pointers())
    .function("setAlignItems", &Node::setAlignItems, allow_raw_pointers())
    .function("setAlignSelf", &Node::setAlignSelf, allow_raw_pointers())
    .function("setFlexDirection", &Node::setFlexDirection, allow_raw_pointers())
    .function("setFlexWrap", &Node::setFlexWrap, allow_raw_pointers())
    .function("setJustifyContent", &Node::setJustifyContent, allow_raw_pointers())

    .function("setMargin", &Node::setMargin, allow_raw_pointers())
    .function("setMarginPercent", &Node::setMarginPercent, allow_raw_pointers())
    .function("setMarginAuto", &Node::setMarginAuto, allow_raw_pointers())

    .function("setOverflow", &Node::setOverflow, allow_raw_pointers())
    .function("setDisplay", &Node::setDisplay, allow_raw_pointers())

    .function("setFlex", &Node::setFlex, allow_raw_pointers())
    .function("setFlexBasis", &Node::setFlexBasis, allow_raw_pointers())
    .function("setFlexBasisPercent", &Node::setFlexBasisPercent, allow_raw_pointers())
    .function("setFlexGrow", &Node::setFlexGrow, allow_raw_pointers())
    .function("setFlexShrink", &Node::setFlexShrink, allow_raw_pointers())

    .function("setWidth", &Node::setWidth, allow_raw_pointers())
    .function("setWidthPercent", &Node::setWidthPercent, allow_raw_pointers())
    .function("setWidthAuto", &Node::setWidthAuto, allow_raw_pointers())
    .function("setHeight", &Node::setHeight, allow_raw_pointers())
    .function("setHeightPercent", &Node::setHeightPercent, allow_raw_pointers())
    .function("setHeightAuto", &Node::setHeightAuto, allow_raw_pointers())

    .function("setMinWidth", &Node::setMinWidth, allow_raw_pointers())
    .function("setMinWidthPercent", &Node::setMinWidthPercent, allow_raw_pointers())
    .function("setMinHeight", &Node::setMinHeight, allow_raw_pointers())
    .function("setMinHeightPercent", &Node::setMinHeightPercent, allow_raw_pointers())

    .function("setMaxWidth", &Node::setMaxWidth, allow_raw_pointers())
    .function("setMaxWidthPercent", &Node::setMaxWidthPercent, allow_raw_pointers())
    .function("setMaxHeight", &Node::setMaxHeight, allow_raw_pointers())
    .function("setMaxHeightPercent", &Node::setMaxHeightPercent, allow_raw_pointers())

    .function("setAspectRatio", &Node::setAspectRatio, allow_raw_pointers())

    .function("setBorder", &Node::setBorder, allow_raw_pointers())

    .function("setPadding", &Node::setPadding, allow_raw_pointers())
    .function("setPaddingPercent", &Node::setPaddingPercent, allow_raw_pointers())

    .function("getPositionType", &Node::getPositionType, allow_raw_pointers())
    .function("getPosition", &Node::getPosition, allow_raw_pointers())

    .function("getAlignContent", &Node::getAlignContent, allow_raw_pointers())
    .function("getAlignItems", &Node::getAlignItems, allow_raw_pointers())
    .function("getAlignSelf", &Node::getAlignSelf, allow_raw_pointers())
    .function("getFlexDirection", &Node::getFlexDirection, allow_raw_pointers())
    .function("getFlexWrap", &Node::getFlexWrap, allow_raw_pointers())
    .function("getJustifyContent", &Node::getJustifyContent, allow_raw_pointers())

    .function("getMargin", &Node::getMargin, allow_raw_pointers())

    .function("getFlexBasis", &Node::getFlexBasis, allow_raw_pointers())
    .function("getFlexGrow", &Node::getFlexGrow, allow_raw_pointers())
    .function("getFlexShrink", &Node::getFlexShrink, allow_raw_pointers())

    .function("getWidth", &Node::getWidth, allow_raw_pointers())
    .function("getHeight", &Node::getHeight, allow_raw_pointers())

    .function("getMinWidth", &Node::getMinWidth, allow_raw_pointers())
    .function("getMinHeight", &Node::getMinHeight, allow_raw_pointers())

    .function("getMaxWidth", &Node::getMaxWidth, allow_raw_pointers())
    .function("getMaxHeight", &Node::getMaxHeight, allow_raw_pointers())

    .function("getAspectRatio", &Node::getAspectRatio, allow_raw_pointers())

    .function("getBorder", &Node::getBorder, allow_raw_pointers())

    .function("getOverflow", &Node::getOverflow, allow_raw_pointers())
    .function("getDisplay", &Node::getDisplay, allow_raw_pointers())

    .function("getPadding", &Node::getPadding, allow_raw_pointers())

    .function("insertChild", &Node::insertChild, allow_raw_pointers())
    .function("removeChild", &Node::removeChild, allow_raw_pointers())

    .function("getChildCount", &Node::getChildCount, allow_raw_pointers())

    .function("getParent", &Node::getParent, allow_raw_pointers())
    .function("getChild", &Node::getChild, allow_raw_pointers())

    .function("isReferenceBaseline", &Node::isReferenceBaseline, allow_raw_pointers())
    .function("setIsReferenceBaseline", &Node::setIsReferenceBaseline, allow_raw_pointers())

    .function("setMeasureFunc", &Node::setMeasureFunc, allow_raw_pointers())
    .function("unsetMeasureFunc", &Node::unsetMeasureFunc, allow_raw_pointers())

    .function("setDirtiedFunc", &Node::setDirtiedFunc, allow_raw_pointers())
    .function("unsetDirtiedFunc", &Node::unsetDirtiedFunc, allow_raw_pointers())

    .function("markDirty", &Node::markDirty, allow_raw_pointers())
    .function("isDirty", &Node::isDirty, allow_raw_pointers())

    .function("calculateLayout", &Node::calculateLayout, allow_raw_pointers())

    .function("getComputedLeft", &Node::getComputedLeft, allow_raw_pointers())
    .function("getComputedRight", &Node::getComputedRight, allow_raw_pointers())

    .function("getComputedTop", &Node::getComputedTop, allow_raw_pointers())
    .function("getComputedBottom", &Node::getComputedBottom, allow_raw_pointers())

    .function("getComputedWidth", &Node::getComputedWidth, allow_raw_pointers())
    .function("getComputedHeight", &Node::getComputedHeight, allow_raw_pointers())

    .function("getComputedLayout", &Node::getComputedLayout, allow_raw_pointers())

    .function("getComputedMargin", &Node::getComputedMargin, allow_raw_pointers())
    .function("getComputedBorder", &Node::getComputedBorder, allow_raw_pointers())
    .function("getComputedPadding", &Node::getComputedPadding, allow_raw_pointers())
    ;
}

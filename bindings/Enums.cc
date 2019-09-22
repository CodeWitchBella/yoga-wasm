#include <emscripten/bind.h>

#include "../yoga/YGEnums.h"
#include "../yoga/YGNode.h"
#include "../yoga/Yoga.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(YGEnums) {
  // YGEnums ==========================================
  enum_<YGAlign>("Align")
    .value("auto", YGAlignAuto)
    .value("flex-start", YGAlignFlexStart)
    .value("center", YGAlignCenter)
    .value("flex-end", YGAlignFlexEnd)
    .value("stretch", YGAlignStretch)
    .value("baseline", YGAlignBaseline)
    .value("space-between", YGAlignSpaceBetween)
    .value("space-around", YGAlignSpaceAround)
    ;
  constant("ALIGN_AUTO", YGAlignAuto);
  constant("ALIGN_FLEX_START", YGAlignFlexStart);
  constant("ALIGN_CENTER", YGAlignCenter);
  constant("ALIGN_FLEX_END", YGAlignFlexEnd);
  constant("ALIGN_STRETCH", YGAlignStretch);
  constant("ALIGN_BASELINE", YGAlignBaseline);
  constant("ALIGN_SPACE_BETWEEN", YGAlignSpaceBetween);
  constant("ALIGN_SPACE_AROUND", YGAlignSpaceAround);
  
  enum_<YGDimension>("Dimension")
    .value("width", YGDimensionWidth)
    .value("height", YGDimensionHeight)
    ;
  constant("DIMENSION_WIDTH", YGDimensionWidth);
  constant("DIMENSION_HEIGHT", YGDimensionHeight);

  enum_<YGDirection>("Direction")
    .value("inherit", YGDirectionInherit)
    .value("ltr", YGDirectionLTR)
    .value("rtl", YGDirectionRTL)
    ;
  constant("DIRECTION_INHERIT", YGDirectionInherit);
  constant("DIRECTION_LTR", YGDirectionLTR);
  constant("DIRECTION_RTL", YGDirectionRTL);

  enum_<YGDisplay>("Display")
    .value("flex", YGDisplayFlex)
    .value("none", YGDisplayNone)
    ;
  constant("DISPLAY_FLEX", YGDisplayFlex);
  constant("DISPLAY_NONE", YGDisplayNone);

  enum_<YGEdge>("Edge")
    .value("left", YGEdgeLeft)
    .value("top", YGEdgeTop)
    .value("right", YGEdgeRight)
    .value("bottom", YGEdgeBottom)
    .value("start", YGEdgeStart)
    .value("end", YGEdgeEnd)
    .value("horizontal", YGEdgeHorizontal)
    .value("vertical", YGEdgeVertical)
    .value("all", YGEdgeAll)
    ;
  constant("EDGE_LEFT", YGEdgeLeft);
  constant("EDGE_TOP", YGEdgeTop);
  constant("EDGE_RIGHT", YGEdgeRight);
  constant("EDGE_BOTTOM", YGEdgeBottom);
  constant("EDGE_START", YGEdgeStart);
  constant("EDGE_END", YGEdgeEnd);
  constant("EDGE_HORIZONTAL", YGEdgeHorizontal);
  constant("EDGE_VERTICAL", YGEdgeVertical);
  constant("EDGE_ALL", YGEdgeAll);
  
  enum_<YGFlexDirection>("FlexDirection")
    .value("column", YGFlexDirectionColumn)
    .value("column-reverse", YGFlexDirectionColumnReverse)
    .value("row", YGFlexDirectionRow)
    .value("row-reverse", YGFlexDirectionRowReverse)
    ;
  constant("FLEX_DIRECTION_COLUMN", YGFlexDirectionColumn);
  constant("FLEX_DIRECTION_COLUMN_REVERSE", YGFlexDirectionColumnReverse);
  constant("FLEX_DIRECTION_ROW", YGFlexDirectionRow);
  constant("FLEX_DIRECTION_ROW_REVERSE", YGFlexDirectionRowReverse);

  enum_<YGJustify>("Justify")
    .value("flex-start", YGJustifyFlexStart)
    .value("center", YGJustifyCenter)
    .value("flex-end", YGJustifyFlexEnd)
    .value("space-between", YGJustifySpaceBetween)
    .value("space-around", YGJustifySpaceAround)
    .value("space-evenly", YGJustifySpaceEvenly)
    ;
  constant("JUSTIFY_FLEX_START", YGJustifyFlexStart);
  constant("JUSTIFY_CENTER", YGJustifyCenter);
  constant("JUSTIFY_FLEX_END", YGJustifyFlexEnd);
  constant("JUSTIFY_SPACE_BETWEEN", YGJustifySpaceBetween);
  constant("JUSTIFY_SPACE_AROUND", YGJustifySpaceAround);
  constant("JUSTIFY_SPACE_EVENLY", YGJustifySpaceEvenly);

  // YGLogLevel

  enum_<YGMeasureMode>("MeasureMode")
    .value("undefined", YGMeasureModeUndefined)
    .value("exactly", YGMeasureModeExactly)
    .value("atMost", YGMeasureModeAtMost)
    ;
  constant("MEASURE_MODE_UNDEFINED", YGMeasureModeUndefined);
  constant("MEASURE_MODE_EXACTLY", YGMeasureModeExactly);
  constant("MEASURE_MODE_AT_MOST", YGMeasureModeAtMost);

  // enum_<YGNodeType>("NodeType")
  //   .value("default", YGNodeTypeDefault)
  //   .value("text", YGNodeTypeText)
  //   ;

  enum_<YGOverflow>("Overflow")
    .value("visible", YGOverflowVisible)
    .value("hidden", YGOverflowHidden)
    .value("scroll", YGOverflowScroll)
    ;
  constant("OVERFLOW_VISIBLE", YGOverflowVisible);
  constant("OVERFLOW_HIDDEN", YGOverflowHidden);
  constant("OVERFLOW_SCROLL", YGOverflowScroll);

  enum_<YGPositionType>("PositionType")
    .value("relative", YGPositionTypeRelative)
    .value("absolute", YGPositionTypeAbsolute)
    ;
  constant("POSITION_TYPE_RELATIVE", YGPositionTypeRelative);
  constant("POSITION_TYPE_ABSOLUTE", YGPositionTypeAbsolute);
  
  enum_<YGUnit>("Unit")
    .value("undefined", YGUnitUndefined)
    .value("point", YGUnitPoint)
    .value("percent", YGUnitPercent)
    .value("auto", YGUnitAuto)
    ;
  constant("UNIT_UNDEFINED", YGUnitUndefined);
  constant("UNIT_POINT", YGUnitPoint);
  constant("UNIT_PERCENT", YGUnitPercent);
  constant("UNIT_AUTO", YGUnitAuto);

  enum_<YGWrap>("Wrap")
    .value("nowrap", YGWrapNoWrap)
    .value("wrap", YGWrapWrap)
    .value("wrap-reverse", YGWrapWrapReverse)
    ;
  constant("WRAP_NO_WRAP", YGWrapNoWrap);
  constant("WRAP_WRAP", YGWrapWrap);
  constant("WRAP_WRAP_REVERSE", YGWrapWrapReverse);
}
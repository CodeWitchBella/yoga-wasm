export default function adapt(Yoga) {
  Yoga.Node.create = () => {
    return Yoga.Node.createWithConfig(new Yoga.Config())
  }
  Yoga.Node.createDefault = () =>
    Yoga.Node.createWithConfig(new Yoga.Config())

  function pt(v) {
    if (v === undefined)
      return { value: 0, unit: Yoga.Constants.unit.undefined }
    return { value: v, unit: Yoga.Constants.unit.point }
  }
  function auto(v) {
    return { value: v, unit: Yoga.Constants.unit.auto }
  }
  function un(v) {
    if (typeof v === 'number') {
      console.warn(new Error('Number passed to un'))
      return v
    }
    if (v.unit === Yoga.Constants.unit.undefined) return 0
    if (v.value !== v.value) console.warn(new Error('NaN'))
    return v.value
  }
  function percent(v) {
    return { value: v, unit: Yoga.Constants.unit.percent }
  }

  Yoga.EDGE_TOP = 'EDGE_TOP'
  Yoga.EDGE_BOTTOM = 'EDGE_BOTTOM'
  Yoga.EDGE_LEFT = 'EDGE_LEFT'
  Yoga.EDGE_RIGHT = 'EDGE_RIGHT'

  Yoga.FLEX_DIRECTION_COLUMN = Yoga.Constants.flexDirection.column
  Yoga.FLEX_DIRECTION_ROW = Yoga.Constants.flexDirection.row
  Yoga.FLEX_DIRECTION_COLUMN_REVERSE = Yoga.Constants.flexDirection['column-reverse']
  Yoga.FLEX_DIRECTION_ROW_REVERSE = Yoga.Constants.flexDirection['row-reverse']

  Yoga.JUSTIFY_CENTER = Yoga.Constants.justify.center
  Yoga.JUSTIFY_FLEX_END = Yoga.Constants.justify['flex-end']
  Yoga.JUSTIFY_FLEX_START = Yoga.Constants.justify['flex-start']
  Yoga.JUSTIFY_SPACE_AROUND = Yoga.Constants.justify['space-around']
  Yoga.JUSTIFY_SPACE_BETWEEN = Yoga.Constants.justify['space-between']
  Yoga.JUSTIFY_SPACE_EVENLY = Yoga.Constants.justify['space-evenly']

  Yoga.ALIGN_BASELINE = Yoga.Constants.align.baseline
  Yoga.ALIGN_FLEX_END = Yoga.Constants.align['flex-end']
  Yoga.ALIGN_FLEX_START = Yoga.Constants.align['flex-start']
  Yoga.ALIGN_SPACE_AROUND = Yoga.Constants.align['space-around']
  Yoga.ALIGN_SPACE_BETWEEN = Yoga.Constants.align['space-between']
  Yoga.ALIGN_STRETCH = Yoga.Constants.align.stretch
  Yoga.ALIGN_CENTER = Yoga.Constants.align.center

  Yoga.WRAP_WRAP = Yoga.Constants.wrap.wrap
  Yoga.WRAP_NOWRAP = Yoga.Constants.wrap.nowrap
  Yoga.WRAP_WRAP_REVERSE = Yoga.Constants.wrap['wrap-reverse']

  Yoga.MEASURE_MODE_AT_MOST = Yoga.Constants.measureMode.atMost
  Yoga.MEASURE_MODE_EXACTLY = Yoga.Constants.measureMode.exactly
  Yoga.MEASURE_MODE_UNDEFINED = Yoga.Constants.measureMode.undefined

  Yoga.POSITION_TYPE_RELATIVE = Yoga.Constants.position.relative
  Yoga.POSITION_TYPE_ABSOLUTE = Yoga.Constants.position.absolute

  Yoga.Node.prototype.reset = function(...args) {
    console.log('reset', args)
  }
  Yoga.Node.prototype.setPositionType = function(val) {
    this.position = val
  }
  Yoga.Node.prototype.setPosition = function(dim, v) {
    if (dim === Yoga.EDGE_TOP) this.top = pt(v)
    else if (dim === Yoga.EDGE_LEFT) this.left = pt(v)
    else if (dim === Yoga.EDGE_RIGHT) this.right = pt(v)
    else if (dim === Yoga.EDGE_BOTTOM) this.bottom = pt(v)
    else console.log('setPosition: unknown dim ' + dim)
  }
  Yoga.Node.prototype.setPositionPercent = function(...args) {
    console.log('setPositionPercent', args)
  }
  Yoga.Node.prototype.setAlignContent = function(...args) {
    console.log('setAlignContent', args)
  }
  Yoga.Node.prototype.setAlignItems = function(align) {
    this.alignItems = align
  }
  Yoga.Node.prototype.setAlignSelf = function(...args) {
    console.log('setAlignSelf', args)
  }
  Yoga.Node.prototype.setFlexDirection = function(v) {
    this.flexDirection = v
  }
  Yoga.Node.prototype.setFlexWrap = function(wrap) {
    console.log('setFlexWrap', wrap)
    this.flexWrap = wrap
  }
  Yoga.Node.prototype.setJustifyContent = function(v) {
    console.log('setJustifyContent')
    this.justifyContent = v
  }
  Yoga.Node.prototype.setMargin = function(dim, v) {
    if (dim === Yoga.EDGE_TOP) this.marginTop = pt(v)
    else if (dim === Yoga.EDGE_LEFT) this.marginLeft = pt(v)
    else if (dim === Yoga.EDGE_RIGHT) this.marginRight = pt(v)
    else if (dim === Yoga.EDGE_BOTTOM) this.marginBottom = pt(v)
    else console.log('setMargin: unknown dim ' + dim)
  }
  Yoga.Node.prototype.setMarginPercent = function(...args) {
    console.log('setMarginPercent', args)
  }
  Yoga.Node.prototype.setMarginAuto = function(...args) {
    console.log('setMarginAuto', args)
  }
  Yoga.Node.prototype.setOverflow = function(...args) {
    console.log('setOverflow', args)
  }
  Yoga.Node.prototype.setDisplay = function(...args) {
    console.log('setDisplay', args)
  }
  Yoga.Node.prototype.setFlex = function(...args) {
    console.log('setFlex', args)
  }
  Yoga.Node.prototype.setFlexBasis = function(v) {
    this.flexBasis = auto(v)
  }
  Yoga.Node.prototype.setFlexBasisPercent = function(...args) {
    console.log('setFlexBasisPercent', args)
  }
  Yoga.Node.prototype.setFlexGrow = function(v) {
    this.flexGrow = v
  }
  Yoga.Node.prototype.setFlexShrink = function(...args) {
    console.log('setFlexShrink', args)
  }
  Yoga.Node.prototype.setWidth = function(width) {
    if (width === 'auto') this.width = auto(0)
    else this.width = pt(width)
  }
  Yoga.Node.prototype.setWidthPercent = function(...args) {
    console.log('setWidthPercent', args)
  }
  Yoga.Node.prototype.setWidthAuto = function(...args) {
    console.log('setWidthAuto', args)
  }
  Yoga.Node.prototype.setHeight = function(height) {
    if (height === 'auto') this.height = auto(0)
    else this.height = pt(height)
  }
  Yoga.Node.prototype.setHeightPercent = function(height) {
    this.height = percent(height)
    //console.log('setHeightPercent', args)
  }
  Yoga.Node.prototype.setHeightAuto = function(...args) {
    console.log('setHeightAuto', args)
  }
  Yoga.Node.prototype.setMinWidth = function(...args) {
    console.log('setMinWidth', args)
  }
  Yoga.Node.prototype.setMinWidthPercent = function(...args) {
    console.log('setMinWidthPercent', args)
  }
  Yoga.Node.prototype.setMinHeight = function(...args) {
    console.log('setMinHeight', args)
  }
  Yoga.Node.prototype.setMinHeightPercent = function(...args) {
    console.log('setMinHeightPercent', args)
  }
  Yoga.Node.prototype.setMaxWidth = function(...args) {
    console.log('setMaxWidth', args)
  }
  Yoga.Node.prototype.setMaxWidthPercent = function(...args) {
    console.log('setMaxWidthPercent', args)
  }
  Yoga.Node.prototype.setMaxHeight = function(...args) {
    console.log('setMaxHeight', args)
  }
  Yoga.Node.prototype.setMaxHeightPercent = function(...args) {
    console.log('setMaxHeightPercent', args)
  }
  Yoga.Node.prototype.setAspectRatio = function(...args) {
    console.log('setAspectRatio', args)
  }
  Yoga.Node.prototype.setBorder = function(...args) {
    console.log('setBorder', args)
  }
  Yoga.Node.prototype.setPadding = function(dim, v) {
    if (dim === Yoga.EDGE_TOP) this.paddingTop = pt(v)
    else if (dim === Yoga.EDGE_LEFT) this.paddingLeft = pt(v)
    else if (dim === Yoga.EDGE_RIGHT) this.paddingRight = pt(v)
    else if (dim === Yoga.EDGE_BOTTOM) this.paddingBottom = pt(v)
    else console.log('setPadding: unknown dim ' + dim)
  }
  Yoga.Node.prototype.setPaddingPercent = function(...args) {
    console.log('setPaddingPercent', args)
  }
  Yoga.Node.prototype.getPositionType = function(...args) {
    console.log('getPositionType', args)
  }
  Yoga.Node.prototype.getPosition = function(...args) {
    console.log('getPosition', args)
  }
  Yoga.Node.prototype.getAlignContent = function(...args) {
    console.log('getAlignContent', args)
  }
  Yoga.Node.prototype.getAlignItems = function(...args) {
    console.log('getAlignItems', args)
  }
  Yoga.Node.prototype.getAlignSelf = function(...args) {
    console.log('getAlignSelf', args)
  }
  Yoga.Node.prototype.getFlexDirection = function(...args) {
    console.log('getFlexDirection', args)
  }
  Yoga.Node.prototype.getFlexWrap = function(...args) {
    console.log('getFlexWrap', args)
  }
  Yoga.Node.prototype.getJustifyContent = function(...args) {
    console.log('getJustifyContent', args)
  }
  Yoga.Node.prototype.getMargin = function(...args) {
    console.log('getMargin', args)
  }
  Yoga.Node.prototype.getFlexBasis = function(...args) {
    console.log('getFlexBasis', args)
  }
  Yoga.Node.prototype.getFlexGrow = function(...args) {
    console.log('getFlexGrow', args)
  }
  Yoga.Node.prototype.getFlexShrink = function(...args) {
    console.log('getFlexShrink', args)
  }
  Yoga.Node.prototype.getWidth = function(...args) {
    console.log('getWidth', args)
  }
  Yoga.Node.prototype.getHeight = function(...args) {
    console.log('getHeight', args)
  }
  Yoga.Node.prototype.getMinWidth = function(...args) {
    console.log('getMinWidth', args)
  }
  Yoga.Node.prototype.getMinHeight = function(...args) {
    console.log('getMinHeight', args)
  }
  Yoga.Node.prototype.getMaxWidth = function(...args) {
    console.log('getMaxWidth', args)
  }
  Yoga.Node.prototype.getMaxHeight = function(...args) {
    console.log('getMaxHeight', args)
  }
  Yoga.Node.prototype.getAspectRatio = function(...args) {
    console.log('getAspectRatio', args)
  }
  Yoga.Node.prototype.getBorder = function(...args) {
    console.log('getBorder', args)
  }
  Yoga.Node.prototype.getOverflow = function(...args) {
    console.log('getOverflow', args)
  }
  Yoga.Node.prototype.getDisplay = function(...args) {
    console.log('getDisplay', args)
  }
  Yoga.Node.prototype.getPadding = function(...args) {
    console.log('getPadding', args)
  }
  Yoga.Node.prototype.isReferenceBaseline = function(...args) {
    console.log('isReferenceBaseline', args)
  }
  Yoga.Node.prototype.setIsReferenceBaseline = function(...args) {
    console.log('setIsReferenceBaseline', args)
  }
  Yoga.Node.prototype.setDirtiedFunc = function(...args) {
    console.log('setDirtiedFunc', args)
  }
  Yoga.Node.prototype.unsetDirtiedFunc = function(...args) {
    console.log('unsetDirtiedFunc', args)
  }
  Yoga.Node.prototype.getComputedLeft = function() {
    return this.computedLeft
  }
  Yoga.Node.prototype.getComputedRight = function() {
    return un(this.computedRight)
  }
  Yoga.Node.prototype.getComputedTop = function() {
    return this.computedTop
  }
  Yoga.Node.prototype.getComputedBottom = function() {
    return un(this.computedBottom)
  }
  Yoga.Node.prototype.getComputedWidth = function() {
    return this.computedWidth
  }
  Yoga.Node.prototype.getComputedHeight = function() {
    return this.computedHeight
  }
  Yoga.Node.prototype.getComputedMargin = function(dim) {
    if (dim === Yoga.EDGE_TOP) return un(this.marginTop)
    else if (dim === Yoga.EDGE_LEFT) return un(this.marginLeft)
    else if (dim === Yoga.EDGE_RIGHT) return un(this.marginRight)
    else if (dim === Yoga.EDGE_BOTTOM) return un(this.marginBottom)
    else console.log('getComputedMargin: unknown dim ' + dim)
  }
  Yoga.Node.prototype.getComputedBorder = function(dim) {
    if (dim === Yoga.EDGE_TOP) return this.computedBorderTop
    else if (dim === Yoga.EDGE_LEFT) return this.computedBorderLeft
    else if (dim === Yoga.EDGE_RIGHT) return this.computedBorderRight
    else if (dim === Yoga.EDGE_BOTTOM) return this.computedBorderBottom
    else console.log('getComputedBorder: unknown dim ' + dim)
  }
  Yoga.Node.prototype.getComputedPadding = function(dim) {
    if (dim === Yoga.EDGE_TOP) return this.computedPaddingTop
    else if (dim === Yoga.EDGE_LEFT) return this.computedPaddingLeft
    else if (dim === Yoga.EDGE_RIGHT) return this.computedPaddingRight
    else if (dim === Yoga.EDGE_BOTTOM) return this.computedPaddingBottom
    else console.log('getComputedPadding: unknown dim ' + dim)
  }

  const originalSetMeasureFunc = Yoga.Node.prototype.setMeasureFunc
  Yoga.Node.prototype.setMeasureFunc = function(f) {
    function func(...args) {
      const ret = f.apply(null, args)
      return Object.assign({ width: 0, height: 0 }, ret)
    }
    return originalSetMeasureFunc.apply(this, [func])
  }

  Yoga.Config.create = () => new Yoga.Config()
  Yoga.Config.prototype.free = function() {
    Yoga.Config.destroy(this)
  }

  return Yoga
}

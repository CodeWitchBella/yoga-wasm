export default function adapt(Yoga) {
  Yoga.Node.create = () => {
    return Yoga.Node.createWithConfig(new Yoga.Config())
  }
  Yoga.Node.createDefault = () =>
    Yoga.Node.createWithConfig(new Yoga.Config())

  function pt(v) {
    if (v === undefined)
      return { value: 0, unit: Yoga.UNIT_UNDEFINED }
    if (v === 'auto')
      return { value: 0, unit: Yoga.UNIT_AUTO }
    if(typeof v === 'string') {
      const clear = v.replace(/ /g, '')
      if (clear.endsWith('%')) {
        return {
          value: Number.parseFloat(clear.substring(0, clear.length-1)),
          unit: Yoga.UNIT_PERCENT
        }
      }
    }
    return { value: v, unit: Yoga.UNIT_POINT }
  }
  function auto(v) {
    return { value: v, unit: Yoga.UNIT_AUTO }
  }
  function un(v) {
    if (typeof v === 'number') {
      console.warn(new Error('Number passed to un'))
      return v
    }
    if (v.unit === Yoga.UNIT_UNDEFINED) return 0
    if (v.value !== v.value) console.warn(new Error('NaN'))
    return v.value
  }
  function percent(v) {
    return { value: v, unit: Yoga.UNIT_PERCENT }
  }

  Yoga.Node.prototype.setAlignContent = function(v) {
    this.alignContent = v
  }
  Yoga.Node.prototype.setAlignItems = function(align) {
    this.alignItems = align
  }
  Yoga.Node.prototype.setAlignSelf = function(v) {
    this.alignSelf = v
  }
  Yoga.Node.prototype.setFlexDirection = function(v) {
    this.flexDirection = v
  }
  Yoga.Node.prototype.setFlexWrap = function(wrap) {
    this.flexWrap = wrap
  }
  Yoga.Node.prototype.setJustifyContent = function(v) {
    this.justifyContent = v
  }
  Yoga.Node.prototype.setOverflow = function(v) {
    this.overflow = v
  }
  Yoga.Node.prototype.setDisplay = function(v) {
    this.display = v
  }
  Yoga.Node.prototype.setFlex = function(...args) {
    console.log('setFlex', args)
  }
  Yoga.Node.prototype.setFlexBasis = function(v) {
    this.flexBasis = pt(v)
  }
  Yoga.Node.prototype.setFlexBasisPercent = function(...args) {
    this.flexBasis = percent(v)
  }
  Yoga.Node.prototype.setFlexGrow = function(v) {
    this.flexGrow = v
  }
  Yoga.Node.prototype.setFlexShrink = function(v) {
    this.flexShrink = v
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
  Yoga.Node.prototype.setMinWidth = function(v) {
    this.minWidth = pt(v)
  }
  Yoga.Node.prototype.setMinWidthPercent = function(...args) {
    console.log('setMinWidthPercent', args)
  }
  Yoga.Node.prototype.setMinHeight = function(v) {
    this.minHeight = pt(v)
  }
  Yoga.Node.prototype.setMinHeightPercent = function(...args) {
    console.log('setMinHeightPercent', args)
  }
  Yoga.Node.prototype.setMaxWidth = function(v) {
    this.maxWidth = pt(v)
  }
  Yoga.Node.prototype.setMaxWidthPercent = function(...args) {
    this.maxWidth = auto(v)
  }
  Yoga.Node.prototype.setMaxHeight = function(v) {
    this.maxHeight = pt(v)
  }
  Yoga.Node.prototype.setMaxHeightPercent = function(...args) {
    this.maxHeight = auto(v)
  }
  Yoga.Node.prototype.setAspectRatio = function(...args) {
    console.log('setAspectRatio', args)
  }
  Yoga.Node.prototype.setBorder = function(dim, v) {
    if (dim === Yoga.EDGE_TOP) this.borderTop = v
    else if (dim === Yoga.EDGE_LEFT) this.borderLeft = v
    else if (dim === Yoga.EDGE_RIGHT) this.borderRight = v
    else if (dim === Yoga.EDGE_BOTTOM) this.borderBottom = v
    else if(dim === Yoga.EDGE_START) this.borderStart = v
    else if(dim === Yoga.EDGE_END) this.borderEnd = v
    else console.log('setPadding: unknown dim ' + dim)
  }
  Yoga.Node.prototype.setPadding = function(dim, v) {
    if (dim === Yoga.EDGE_TOP) this.paddingTop = pt(v)
    else if (dim === Yoga.EDGE_LEFT) this.paddingLeft = pt(v)
    else if (dim === Yoga.EDGE_RIGHT) this.paddingRight = pt(v)
    else if (dim === Yoga.EDGE_BOTTOM) this.paddingBottom = pt(v)
    else if(dim === Yoga.EDGE_START) this.paddingStart = pt(v)
    else if(dim === Yoga.EDGE_END) this.paddingEnd = pt(v)
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

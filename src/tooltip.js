function Tooltip(options) {
  this.content = document.createElement('div');
  this.content.className = 'tooltip-content';
  this.shadow = document.createElement('div');
  this.shadow.className = 'tooltip-shadow';
  this.shadow.style.visibility = 'hidden';
  this.options = options;
  this.content.style.backgroundColor = this.options.backgroundColor;

  this.shadow.appendChild(this.content);
  document.body.appendChild(this.shadow);
}

Tooltip.DELAY = 300;
Tooltip.OFFSET = 5;

Tooltip.prototype.show = function(text, x, y) {
  this.content.innerText = text;

  this.shadow.style.left = x + 'px';
  this.shadow.style.top = y + 'px';
  this.shadow.style.visibility = 'visible';
}

Tooltip.prototype.hide = function() {
  this.shadow.style.visibility = 'hidden';
}

Tooltip.prototype.schedule = function(targetElement, event) {
  let e = event || window.event;
  let x = e.clientX, y = e.clientY;
  x += window.pageXOffset || document.documentElement.scrollLeft;
  y += window.pageYOffset || document.documentElement.scrollTop;
  const _this = this;
  const timerID = setTimeout(function() {
    const text = targetElement.getAttribute('tooltip');
    _this.show(text, x + Tooltip.OFFSET, y + Tooltip.OFFSET);
  }, Tooltip.DELAY);

  function mouseOut() {
    _this.hide();
    clearTimeout(timerID);
    if (targetElement.removeEventListener) {
      targetElement.removeEventListener('mouseout', mouseOut, false);
    }
  }

  targetElement.addEventListener('mouseout', mouseOut, false);
}

module.exports = Tooltip;

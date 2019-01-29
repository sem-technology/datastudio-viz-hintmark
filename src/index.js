const dscc = require('@google/dscc');
const div = document.createElement('div');
const svgIcons = require('./icons');
const Tooltip = require('./tooltip');

function transformStyles(style) {
  return {
    backgroundColor: style.background_color.value ?
      style.background_color.value.color : style.background_color.defaultValue,
    hintmarkIcon: style.hintmark_icon.value || style.hintmark_icon.defaultValue,
    hintmarkText: style.hintmark_text.value || style.hintmark_text.defaultValue,
    marksizeSelect: style.marksize_select.value || style.marksize_select.defaultValue,
  };
}

div.setAttribute('id', 'hintmark');
document.body.appendChild(div);

dscc.subscribeToData(function(data) {
  const styles = transformStyles(data.style);
  const tooltip = new Tooltip(styles);
  const div = document.getElementById('hintmark');
  div.innerHTML = svgIcons[styles.hintmarkIcon];
  const svg = document.getElementById('mark_svg');
  svg.setAttribute('tooltip', styles.hintmarkText);
  svg.addEventListener('mouseover', function(event) {
    tooltip.schedule(this, event);
  });
  div.style.width = dscc.getWidth() + 'px';
  div.style.height = parseInt(styles.marksizeSelect * dscc.getHeight() / 100, 10)  + 'px';
}, {
  transform: dscc.objectTransform
});

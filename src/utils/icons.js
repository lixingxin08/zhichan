"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var normalViewBox = '0 0 1024 1024';
var newViewBox = '64 64 896 896';
var fill = 'fill';
var outline = 'outline';
var twotone = 'twotone';
function getNode(viewBox) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return {
        tag: 'svg',
        attrs: { viewBox: viewBox, focusable: false },
        children: paths.map(function (path) {
            if (Array.isArray(path)) {
                return {
                    tag: 'path',
                    attrs: {
                        fill: path[0],
                        d: path[1]
                    }
                };
            }
            return {
                tag: 'path',
                attrs: {
                    d: path
                }
            };
        })
    };
}
function getIcon(name, theme, icon) {
    return {
        name: name,
        theme: theme,
        icon: icon
    };
}

exports.CheckOutline = getIcon('check', outline, getNode(newViewBox, 'M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'));

exports.CaretDownOutline = getIcon('caret-down', outline, getNode(normalViewBox, 'M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z'));
exports.CaretDownFill = getIcon('caret-down', fill, getNode(normalViewBox, 'M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z'));
exports.CaretLeftOutline = getIcon('caret-left', outline, getNode(normalViewBox, 'M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z'));
exports.CaretLeftFill = getIcon('caret-left', fill, getNode(normalViewBox, 'M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z'));
exports.CaretRightOutline = getIcon('caret-right', outline, getNode(normalViewBox, 'M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z'));
exports.CaretRightFill = getIcon('caret-right', fill, getNode(normalViewBox, 'M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z'));
exports.RightOutline = getIcon('right', outline, getNode(newViewBox, 'M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z'));
exports.CloseOutline = getIcon('close', outline, getNode(newViewBox, 'M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'));

exports.PlusSquareFill = getIcon('plus-square', fill, getNode(newViewBox, 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM704 536c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z'));
exports.PlusSquareOutline = getIcon('plus-square', outline, getNode(newViewBox, 'M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z', 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z'));
exports.PlusSquareTwoTone = getIcon('plus-square', twotone, function (primaryColor, secondaryColor) {
    return getNode(newViewBox, [
        primaryColor,
        'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z'
    ], [
        secondaryColor,
        'M184 840h656V184H184v656zm136-352c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48z'
    ], [
        primaryColor,
        'M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z'
    ]);
});

exports.ArrowLeftOutline = getIcon('arrow-left', outline, getNode(newViewBox, 'M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z'));
exports.MinusSquareOutline = getIcon('minus-square', outline, getNode(newViewBox, 'M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z', 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z'));
exports.MinusSquareTwoTone = getIcon('minus-square', twotone, function (primaryColor, secondaryColor) {
    return getNode(newViewBox, [
        primaryColor,
        'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z'
    ], [
        secondaryColor,
        'M184 840h656V184H184v656zm136-352c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48z'
    ], [
        primaryColor,
        'M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z'
    ]);
});
exports.MinusSquareFill = getIcon('minus-square', fill, getNode(newViewBox, 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM704 536c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z'));


exports.CheckCircleOutline = getIcon('check-circle', outline, getNode(newViewBox, 'M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z', 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'));
exports.CheckCircleTwoTone = getIcon('check-circle', twotone, function (primaryColor, secondaryColor) {
  return getNode(newViewBox, [
      primaryColor,
      'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
  ], [
      secondaryColor,
      'M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm193.4 225.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.4 12.7z'
  ], [
      primaryColor,
      'M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z'
  ]);
});
exports.CloseCircleFill = getIcon('close-circle', fill, getNode(newViewBox, 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z'));
exports.CloseCircleOutline = getIcon('close-circle', outline, getNode(newViewBox, 'M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z', 'M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'));

exports.CloseCircleTwoTone = getIcon('close-circle', twotone, function (primaryColor, secondaryColor) {
  return getNode(newViewBox, [
      primaryColor,
      'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
  ], [
      secondaryColor,
      'M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm171.8 527.1c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.6 8-8 8l-66-.3-99.3-118.4-99.3 118.5-66.1.3c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.9-5.2L471 512.3l-130.1-155a8.32 8.32 0 0 1-1.9-5.2c0-4.5 3.6-8 8-8l66.1.3 99.3 118.4 99.4-118.5 66-.3c4.4 0 8 3.6 8 8 0 1.9-.6 3.8-1.8 5.2l-130.1 155 129.9 154.9z'
  ], [
      primaryColor,
      'M685.8 352c0-4.4-3.6-8-8-8l-66 .3-99.4 118.5-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155-130.1 154.9a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3 99.3-118.5L611.7 680l66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.9 512.2l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z'
  ]);
});
exports.CheckCircleFill = getIcon('check-circle', fill, getNode(newViewBox, 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z'));
exports.ExclamationCircleFill = getIcon('exclamation-circle', fill, getNode(newViewBox, 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z'));
exports.ExclamationCircleOutline = getIcon('exclamation-circle', outline, getNode(newViewBox, 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z', 'M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z'));
exports.ExclamationCircleTwoTone = getIcon('exclamation-circle', twotone, function (primaryColor, secondaryColor) {
  return getNode(newViewBox, [
      primaryColor,
      'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
  ], [
      secondaryColor,
      'M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z'
  ], [
      primaryColor,
      'M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8zm-24 112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z'
  ]);
});

exports.CalendarFill = getIcon('calendar', fill, getNode(newViewBox, 'M112 880c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V460H112v420zm768-696H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v176h800V216c0-17.7-14.3-32-32-32z'));
exports.CalendarOutline = getIcon('calendar', outline, getNode(newViewBox, 'M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z'));
exports.CalendarTwoTone = getIcon('calendar', twotone, function (primaryColor, secondaryColor) {
    return getNode(newViewBox, [
        secondaryColor,
        'M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v136h656V256H712v48z'
    ], [
        primaryColor,
        'M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zm0-448H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136z'
    ]);
});
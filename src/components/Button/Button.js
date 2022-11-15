var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import style from './Button.scss';
import { buttonSizes, buttonThemes, buttonVariants } from './constants';
var Button = function (_a) {
    var children = _a.children, loading = _a.loading, disabled = _a.disabled, loadingAndDisabled = _a.loadingAndDisabled, _b = _a.theme, theme = _b === void 0 ? buttonThemes.THEME_1 : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.variant, variant = _d === void 0 ? buttonVariants.CONTAINED : _d, _e = _a.size, size = _e === void 0 ? buttonSizes.MEDIUM : _e, _f = _a.classes, classes = _f === void 0 ? {} : _f, restProps = __rest(_a, ["children", "loading", "disabled", "loadingAndDisabled", "theme", "className", "variant", "size", "classes"]);
    return (React.createElement(MuiButton, __assign({ variant: variant, size: size, classes: __assign(__assign({}, classes), { root: "shared-component-button ".concat(className, " ").concat(theme, " ").concat(classes.root || ''), disabled: "shared-component-disabled ".concat(classes.disabled || ''), outlined: "shared-components-button-outlined ".concat(classes.outlined || ''), text: "shared-components-button-text ".concat(classes.text || '') }), disabled: loadingAndDisabled || disabled }, restProps), loadingAndDisabled || loading ? (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { visibility: 'hidden' } }, children),
        React.createElement(CircularProgress, { className: "shared-component-button-loading", size: 24, color: "inherit" }))) : (children)));
};
// @ts-ignore
export default withStyles(style)(Button);
//# sourceMappingURL=Button.js.map
// @flow strict
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import borders from './Borders.css';
import styles from './Touchable.css';
import { fromClassName, identity, toProps, type Style } from './style.js';
import { bind, range } from './transforms.js';

type MouseCursor =
  | 'copy'
  | 'grab'
  | 'grabbing'
  | 'move'
  | 'noDrop'
  | 'pointer'
  | 'zoomIn'
  | 'zoomOut';
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  children?: React.Node,
  disabled?: boolean,
  fullHeight?: boolean,
  fullWidth?: boolean,
  mouseCursor?: MouseCursor,
  onBlur?: ({ event: SyntheticFocusEvent<HTMLDivElement> }) => void,
  onFocus?: ({ event: SyntheticFocusEvent<HTMLDivElement> }) => void,
  onMouseEnter?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onMouseLeave?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onTouch?: ({
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
  rounding?: Rounding,
|};

const SPACE_CHAR_CODE = 32;
const ENTER_CHAR_CODE = 13;

const RoundingPropType = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  'circle',
  'pill',
]);

const getRoundingStyle = (r: Rounding): Style => {
  if (typeof r === 'number') {
    return bind(range('rounding'), borders)(r);
  }

  if (r === 'circle') {
    return fromClassName(borders.circle);
  }

  if (r === 'pill') {
    return fromClassName(borders.pill);
  }

  return identity();
};

const forwardEvent = (disabled: boolean, handler: any => void) => event => {
  if (!disabled && handler) {
    handler({ event });
  }
};

const Touchable = React.forwardRef(
  (props: Props, ref: React.ElementRef<any>) => {
    const {
      accessibilityControls,
      accessibilityExpanded,
      accessibilityHaspopup,
      accessibilityLabel,
      children,
      disabled = false,
      fullWidth = true,
      fullHeight,
      mouseCursor = 'pointer',
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onTouch,
      rounding = 0,
    } = props;

    const classes = classnames(
      styles.touchable,
      toProps(getRoundingStyle(rounding)).className,
      {
        [styles.fullHeight]: fullHeight,
        [styles.fullWidth]: fullWidth,
        [styles[mouseCursor]]: !disabled,
      }
    );

    const handleBlur = useCallback(forwardEvent(disabled, onBlur), [
      disabled,
      onBlur,
    ]);
    const handleClick = useCallback(forwardEvent(disabled, onTouch), [
      disabled,
      onTouch,
    ]);
    const handleFocus = useCallback(forwardEvent(disabled, onFocus), [
      disabled,
      onFocus,
    ]);
    const handleMouseEnter = useCallback(forwardEvent(disabled, onMouseEnter), [
      disabled,
      onMouseEnter,
    ]);
    const handleMouseLeave = useCallback(forwardEvent(disabled, onMouseLeave), [
      disabled,
      onMouseLeave,
    ]);
    const handleKeyPress = useCallback(
      forwardEvent(disabled, ({ event }) => {
        // Check to see if space or enter were pressed
        if ([SPACE_CHAR_CODE || ENTER_CHAR_CODE].includes(event.charCode)) {
          // Prevent the default action to stop scrolling when space is pressed
          event.preventDefault();
          onTouch({ event });
        }
      }),
      [disabled, onTouch]
    );

    return (
      <div
        aria-controls={accessibilityControls}
        aria-disabled={disabled}
        aria-expanded={accessibilityExpanded}
        aria-haspopup={accessibilityHaspopup}
        aria-label={accessibilityLabel}
        className={classes}
        onBlur={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyPress={handleKeyPress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        role="button"
        tabIndex={disabled ? null : '0'}
      >
        {children}
      </div>
    );
  }
);

//  NOTE: This is needed in order to override the ForwardRef display name that is
//  used in dev tools and in snapshot testing.
Touchable.displayName = 'Touchable';

Touchable.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mouseCursor: PropTypes.oneOf([
    'copy',
    'grab',
    'grabbing',
    'move',
    'noDrop',
    'pointer',
    'zoomIn',
    'zoomOut',
  ]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onTouch: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  rounding: RoundingPropType,
};

export default Touchable;

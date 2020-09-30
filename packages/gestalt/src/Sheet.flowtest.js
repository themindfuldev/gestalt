// @flow strict
import React from 'react';
import Sheet from './Sheet.js';

const Valid = (
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    closeOnOutsideClick
    footer={<footer />}
    heading="Sheet title"
    onDismiss={() => {}}
    size="sm"
    subHeading={<section />}
  >
    <section />
  </Sheet>
);

// $FlowExpectedError[incompatible-type]
const MissingProp = <Sheet />;

const NonExistingProp = (
  // $FlowExpectedError[incompatible-type]
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    onDismiss={() => {}}
    nonExisting={33}
  />
);

const SubHeadingRequiresHeadingProp = (
  // $FlowExpectedError[incompatible-type]
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    onDismiss={() => {}}
    subHeading={<section />}
  />
);

const InvalidTypeProp = (
  // $FlowExpectedError[incompatible-type]
  <Sheet
    accessibilityDismissButtonLabel="Dismiss"
    accessibilitySheetLabel="Sheet"
    onDismiss={123}
  />
);

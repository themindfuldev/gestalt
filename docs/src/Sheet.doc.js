// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Sheet"
    description="Side sheets are surfaces that allow users to view information or complete sub-tasks in a workflow while keeping the context of the current page."
  />
);

card(
  <Example
    id="animationExample"
    name="Example: animation on show and dismiss"
    description={`
    A \`<Sheet>\` can be animated by wrapping it in a \`<AnimationController>\` and providing an \`"onDismissEnd"\` callback function which will ultimately remove the element from the React tree. 
    The \`<AnimationController>\` children render prop will provide an \`"onDismissStart"\` callback function which needs to be passed as the event handler to all your elements which trigger the dismiss action.    
    In the example below, please notice the following animations:
    - On show: backdrop fade in + slide in from the side, from the "Open sheet" button entrypoint.
    - On dismiss: backdrop fade out + slide out to the side, from 7 exitpoints:
      - ESC key
      - Click on outside
      - X button (header)
      - Close button (footer)
      - Right arrow icon red button (content)
      - Done red button (content)
      - Left arrow red icon button (content)

    PS: This animation is controlled by \`useReducedMotion\`.
  `}
    defaultCode={`
function AnimationExample() {
  const [shouldShow, setShouldShow] = React.useState(false);

  return (
    <>
      <Button
        inline
        text="Open sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={new FixedZIndex(2)}>
          <AnimationController onDismissEnd={() => setShouldShow(false)}>
            {({ onDismissStart }) => (
              <Sheet
                accessibilityDismissButtonLabel="Close"
                accessibilitySheetLabel="Animated sheet"
                footer={
                  <Heading size="md">
                    <Button inline onClick={onDismissStart} text="Close" />
                  </Heading>
                }
                heading="Animated Sheet"
                onDismiss={onDismissStart}
                size="md"
              >
                <Row justifyContent="center" alignItems="center" height="100%">
                 <IconButton 
                    accessibilityLabel="Done icon left"
                    icon="directional-arrow-right" 
                    iconColor="red"
                    inline 
                    onClick={onDismissStart} 
                    size="lg"                     
                  />
                  <Button color="red" inline onClick={onDismissStart} size="lg" text="Done" />
                  <IconButton 
                    accessibilityLabel="Done icon right"
                    icon="directional-arrow-left" 
                    iconColor="red"
                    inline 
                    onClick={onDismissStart} 
                    size="lg"                     
                  />
                </Row>
              </Sheet>
            )}
          </AnimationController>
        </Layer>
      )}
    </>
  );
}`}
  />
);

card(
  <Example
    id="noAnimationExample"
    name="Example: no animation on show and dismiss"
    description={`
    By default, when not using <AnimationController>, there are no animations. 
    In that case, please directly provide to your elements your callback function which will ultimately remove the element from the React tree.
  `}
    defaultCode={`
function NoAnimationExample() {
  const [shouldShow, setShouldShow] = React.useState(false);

  return (
    <>
      <Button
        inline
        text="Open sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={new FixedZIndex(2)}>
          <Sheet
            accessibilityDismissButtonLabel="Close"
            accessibilitySheetLabel="Non-animated sheet"
            footer={
              <Heading size="md">
                <Button inline onClick={() => setShouldShow(false)} text="Close" />
              </Heading>
            }
            heading="Non-animated Sheet"
            onDismiss={() => setShouldShow(false)}
            size="md"
          >
            <Row justifyContent="center" alignItems="center" height="100%">
              <IconButton 
                accessibilityLabel="Done icon left"
                icon="directional-arrow-right" 
                iconColor="red"
                inline 
                onClick={() => setShouldShow(false)} 
                size="lg"                     
              />
              <Button color="red" inline onClick={() => setShouldShow(false)} size="lg" text="Done" />
              <IconButton 
                accessibilityLabel="Done icon right"
                icon="directional-arrow-left" 
                iconColor="red"
                inline 
                onClick={() => setShouldShow(false)} 
                size="lg"                     
              />
            </Row>
          </Sheet>
        </Layer>
      )}
    </>
  );
}`}
  />
);

card(
  <Example
    id="sizesExample"
    name="Sizes"
    description={`
      There are 3 different pre-selected widths available for a \`Sheet\`, as well as a last-resort option to set a custom width. Click on each button to view a sample Sheet of the specified size.
      All Sheets have a max width of 100%.
    `}
    defaultCode={`
function SizesExample(props) {
  function reducer(state, action) {
    switch (action.type) {
      case 'small':
        return { heading: 'Small sheet', size: 'sm' };
      case 'medium':
        return { heading: 'Medium sheet', size: 'md' };
      case 'large':
        return { heading: 'Large sheet', size: 'lg' };
      case 'none':
        return { };
      default:
        throw new Error();
    }
  }

  const initialState = {};
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      <Box padding={1}>
        <Button
          inline
          text="Small Sheet"
          onClick={() => { dispatch({ type: 'small' }) }}
        />
      </Box>
      <Box padding={1}>
        <Button
          inline
          text="Medium Sheet"
          onClick={() => { dispatch({ type: 'medium' }) }}
        />
      </Box>
      <Box padding={1}>
        <Button
          inline
          text="Large Sheet"
          onClick={() => { dispatch({ type: 'large' }) }}
        />
      </Box>
      {state.size && (
        <Layer zIndex={new FixedZIndex(2)}>
          <AnimationController onDismissEnd={() => { dispatch({ type: 'none' }) }}>
            {({ onDismissStart }) => (
              <Sheet
                accessibilityDismissButtonLabel="Dismiss"
                accessibilitySheetLabel="Example sheet to demonstrate different sizes"
                footer={<Heading size="md">Footer</Heading>}
                heading={state.heading}
                onDismiss={onDismissStart}
                size={state.size}
              >
                <Heading size="md">Content</Heading>
              </Sheet>
            )}
          </AnimationController>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="closeOnOutsideClickExample"
    name="Prevent close on outside click"
    description={`
      Sometimes we need the user to complete some required action at a Sheet. We can increase the user focus by preventing the user closing the sheet from clicking on the backdrop (gray area) outside of the Sheet.
      For that you can set: \`closeOnOutsideClick\` to \`false\`.
      PS: The user will still be able to close the Sheet via the Dismiss button and the ESC key.
    `}
    defaultCode={`
function CloseOnOutsideExample(props) {
  const [shouldShow, setShouldShow] = React.useState(false);
  return (
    <>
      <Button
        inline
        text="Open sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={new FixedZIndex(2)}>
          <AnimationController onDismissEnd={() => setShouldShow(false)}>
            {({ onDismissStart }) => (
              <Sheet
                accessibilityDismissButtonLabel="Dismiss"
                accessibilitySheetLabel="Example sheet to demonstrate preventing close on outside click"
                closeOnOutsideClick={false}
                heading="Sheet that can't be closed by clicking outside"
                onDismiss={onDismissStart}
                size="lg"
              >
                <Text>Click on the dismiss button or press the ESC key to close the sheet.</Text>
              </Sheet>
            )}
          </AnimationController>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="defaultPaddingAndStylingExample"
    name="Default padding &amp; styling"
    description={`
      Some of the padding required to style your sheet has already been provided for ease of use. The sheet shown
      by clicking on the "View default padding & styling" button highlights the default behavior.
      The shadow (when scrolling) between the \`heading\`, \`children\`, and \`footer\` are included as well. Please try scrolling up and down the children to verify the shadow.
    `}
    defaultCode={`
function DefaultPaddingExample(props) {
  const [shouldShow, setShouldShow] = React.useState(false);
  return (
    <>
      <Button
        inline
        text="View default padding & styling"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={new FixedZIndex(2)}>
          <AnimationController onDismissEnd={() => setShouldShow(false)}>
            {({ onDismissStart }) => (
              <Sheet
                accessibilityDismissButtonLabel="Close"
                accessibilitySheetLabel="Example sheet to demonstrate default padding and styling"
                heading="Sheet default styling"
                onDismiss={onDismissStart}
                footer={
                  <Box color="lightGray">
                    <Heading size="md">Footer</Heading>
                  </Box>
                }
                size="md"
              >
                <Box marginBottom={8}>
                  <Text weight="bold">English</Text>
                  <Text>
                    <ol>
                      <li>One</li>
                      <li>Two</li>
                      <li>Three</li>
                      <li>Four</li>
                      <li>Five</li>
                      <li>Six</li>
                      <li>Seven</li>
                      <li>Eight</li>
                      <li>Nine</li>
                      <li>Ten</li>
                    </ol>
                  </Text>
                </Box>
                <Box marginBottom={8}>
                  <Text weight="bold">Español</Text>
                  <Text>
                    <ol>
                      <li>Uno</li>
                      <li>Dos</li>
                      <li>Tres</li>
                      <li>Cuatro</li>
                      <li>Cinco</li>
                      <li>Seis</li>
                      <li>Siete</li>
                      <li>Ocho</li>
                      <li>Nueve</li>
                      <li>Diez</li>
                    </ol>
                  </Text>
                </Box>
                <Box marginBottom={8}>
                  <Text weight="bold">Português</Text>
                  <Text>
                    <ol>
                      <li>Um</li>
                      <li>Dois</li>
                      <li>Três</li>
                      <li>Quatro</li>
                      <li>Cinco</li>
                      <li>Seis</li>
                      <li>Sete</li>
                      <li>Oito</li>
                      <li>Nove</li>
                      <li>Dez</li>
                    </ol>
                  </Text>
                </Box>  
                <Box marginBottom={8}>
                  <Text weight="bold">普通话</Text>
                  <Text>
                    <ol>
                      <li>一</li>
                      <li>二</li>
                      <li>三</li>
                      <li>四</li>
                      <li>五</li>
                      <li>六</li>
                      <li>七</li>
                      <li>八</li>
                      <li>九</li>
                      <li>十</li>
                    </ol>
                  </Text>
                </Box>            
              </Sheet>
            )}
          </AnimationController>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="subHeadingExample"
    name="Sub-heading"
    description={`
      Specifies a sub-heading component to be docked under the heading. 
      The shadow (when scrolling) between the \`subHeading\`, \`children\`, and \`footer\` are included as well. Please try scrolling up and down the children to verify the shadow.
    `}
    defaultCode={`
function SubheadingExample(props) {
  const SheetWithSubheading = ({
    onDismissStart,
  }) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);
    const enRef = React.useRef();
    const esRef = React.useRef();
    const ptRef = React.useRef();
    const chRef = React.useRef();
    const refs = [enRef, esRef, ptRef, chRef];
  
    const handleChangeTab = ({ activeTabIndex, event }) => {
      event.preventDefault();
      setActiveTabIndex(activeTabIndex);
      refs[activeTabIndex].current.scrollIntoView({
        behavior: 'smooth'
      });
    }

    return (
      <Sheet
        accessibilityDismissButtonLabel="Close"
        accessibilitySheetLabel="Example sheet to demonstrate subHeading"
        heading="Sheet with subHeading"
        onDismiss={onDismissStart}
        footer={<Heading size="md">Footer</Heading>}
        size="md"
        subHeading={
          <Box marginBottom={4} marginStart={8} marginEnd={8}>
            <Tabs
              tabs={[
                {
                  text: "English",
                  href: "#"
                },
                {
                  text: "Español",
                  href: "#"
                },
                {
                  text: "Português",
                  href: "#"
                },
                {
                  text: '普通话',
                  href: '#'
                }
              ]}
              activeTabIndex={activeTabIndex}
              onChange={handleChangeTab}
            />
          </Box>
        }
      >
        <Box marginBottom={8} ref={enRef}>
          <Text weight="bold">English</Text>
          <Text>
            <ol>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
              <li>Four</li>
              <li>Five</li>
              <li>Six</li>
              <li>Seven</li>
              <li>Eight</li>
              <li>Nine</li>
              <li>Ten</li>
            </ol>
          </Text>
        </Box>
        <Box marginBottom={8} ref={esRef}>
          <Text weight="bold">Español</Text>
          <Text>
            <ol>
              <li>Uno</li>
              <li>Dos</li>
              <li>Tres</li>
              <li>Cuatro</li>
              <li>Cinco</li>
              <li>Seis</li>
              <li>Siete</li>
              <li>Ocho</li>
              <li>Nueve</li>
              <li>Diez</li>
            </ol>
          </Text>
        </Box>
        <Box marginBottom={8} ref={ptRef}>
          <Text weight="bold">Português</Text>
          <Text>
            <ol>
              <li>Um</li>
              <li>Dois</li>
              <li>Três</li>
              <li>Quatro</li>
              <li>Cinco</li>
              <li>Seis</li>
              <li>Sete</li>
              <li>Oito</li>
              <li>Nove</li>
              <li>Dez</li>
            </ol>
          </Text>
        </Box>  
        <Box marginBottom={8} ref={chRef}>
          <Text weight="bold">普通话</Text>
          <Text>
            <ol>
              <li>一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
              <li>七</li>
              <li>八</li>
              <li>九</li>
              <li>十</li>
            </ol>
          </Text>
        </Box>            
      </Sheet>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(false);

  return (
    <>
      <Button
        inline
        text="View subheading"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={new FixedZIndex(2)}>
          <AnimationController onDismissEnd={() => setShouldShow(false)}>
            {({ onDismissStart }) => <SheetWithSubheading onDismissStart={onDismissStart} />}
          </AnimationController>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    name="Empty Sheet"
    description={`
      By design, the props children, footer and heading are all optional, so this example is just to demonstrate it's possible to have a completely empty Sheet, even though that is unlikely to be a real use case.
    `}
    defaultCode={`
function EmptyExample(props) {
  const [shouldShow, setShouldShow] = React.useState(false);
  return (
    <>
      <Button
        inline
        text="View empty sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={new FixedZIndex(2)}>
          <AnimationController onDismissEnd={() => setShouldShow(false)}>
            {({ onDismissStart }) => (
              <Sheet
                accessibilityDismissButtonLabel="Close"
                accessibilitySheetLabel="Example to demonstrate empty sheet"
                onDismiss={onDismissStart}
                size="sm"
              />
            )}
          </AnimationController>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="refExample"
    name="Example: ref"
    description={`
    A \`Sheet\` with focus using refs
  `}
    defaultCode={`
function RefExample() {
  const [shouldShow, setShouldShow] = React.useState(false);

  const sheetRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const callbackRef = (node) => {
    if (node !== null) {
      sheetRef.current.style.backgroundColor = '#004b91';
      buttonRef.current.focus();
    }
  }

  return (
    <>
      <Button
        inline
        text="Open sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={new FixedZIndex(2)}>
          <AnimationController onDismissEnd={() => setShouldShow(false)}>
            {({ onDismissStart }) => (
              <>
                <Sheet
                  accessibilityDismissButtonLabel="Close"
                  accessibilitySheetLabel="Focused sheet"
                  onDismiss={onDismissStart}
                  ref={sheetRef}
                  size="md"
                >
                  <Box color="white" minHeight={400} padding={8}>
                    <Box marginBottom={8}>
                      <Heading size="md">Focused content</Heading>                
                    </Box>
                    <Button 
                      inline 
                      onClick={() => alert('Geronimoooo!')}
                      ref={buttonRef} 
                      text="Focused button (Press Enter to be convinced)" 
                    />
                  </Box>
                </Sheet>
                <div ref={callbackRef} />
              </>
              )}
          </AnimationController>
        </Layer>
      )}
    </>
  );
}`}
  />
);

card(
  <Card
    id="accessibilityExample"
    description={`
    We want to make sure every button on the page is unique when being read by screenreader.

    - \`accessibilityDismissButtonLabel\` allows us to provide a short, descriptive label for screen-readers as a text alternative to the Dismiss button..
    - \`accessibilitySheetLabel\` allows us to provide a short, descriptive label for screen-readers to contextualize the purpose of Sheet.

    ~~~html
    <Sheet
      accessibilityDismissButtonLabel="Close"
      accessibilitySheetLabel="Edit the details about your board House and Home"
      heading="Edit board"
      onDismiss={handleSheetDismiss}
      footer={<Footer />}
      size="lg"
    >
      {children}
    </Sheet>
    ~~~
  `}
    name="Accessibility Props"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityDismissButtonLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers as a text alternative to the Dismiss button.',
          'Accessibility: It populates aria-label on the <button> element for the Dismiss button.',
        ],
        href: 'accessibilityExample',
      },
      {
        name: 'accessibilitySheetLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to contextualize the purpose of Sheet.',
          'Please do not repeat the same text being passed in the "heading" prop, but instead provide something that summarizes the Sheet. For instance, if the heading is "Pin Builder", the accessibilitySheetLabel can be "Create a new Pin".',
          'Accessibility: It populates aria-label on the <div role="dialog"> element which represents the Sheet component.',
        ],
        href: 'accessibilityExample',
      },
      {
        name: 'children',
        type: 'React.Node',
        required: false,
        defaultValue: null,
        description: [
          'Supply the container element that is going to be used as the Sheet main content.',
          'Obs: This element will be padded by 32px, differently than <Modal>.',
        ],
        href: 'defaultPaddingAndStylingExample',
      },
      {
        name: 'closeOnOutsideClick',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: [
          'Indicate whether clicking on the backdrop (gray area) outside of the Sheet will automatically close it.',
          'Possible values:',
          '- true: clicking on the backdrop will close the Sheet.',
          '- false: clicking on the backdrop will keep the Sheet open.',
        ],
        href: 'closeOnOutsideClickExample',
      },
      {
        name: 'footer',
        type: 'React.Node',
        required: false,
        defaultValue: null,
        description: [
          'Supply the container element that is going to be used as the Sheet custom footer.',
          'Obs: This element will be padded by 32px, similarly to <Modal>.',
        ],
        href: 'defaultPaddingAndStylingExample',
      },
      {
        name: 'heading',
        type: `string`,
        required: false,
        defaultValue: null,
        description: [
          'Supply the text that is going to be placed as the Sheet text heading.',
          'Please do not repeat the same text being passed in the "accessibilitySheetLabel" prop, but instead provide something that identifies the Sheet. For instance, if the heading is "Pin Builder", the accessibilitySheetLabel can be "Create a new Pin".',
          'Obs: This element will be padded by 32px, similarly to <Modal>.',
        ],
        href: 'defaultPaddingAndStylingExample',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
        defaultValue: null,
        description: [
          'Callback fired when the Sheet is dismissed from one of these ways:',
          '- Clicking on the Dismiss button.',
          '- Pressing the ESC key.',
          '- Clicking on the backdrop (gray area) outside of the Sheet when the prop "closeOnOutsideClick" is true.',
        ],
        href: 'defaultPaddingAndStylingExample',
      },
      {
        name: 'ref',
        type: "React.Ref<'div'>",
        description:
          'Forward the ref to the underlying <div role="dialog"> element which represents the Sheet component.',
        href: 'refExample',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        defaultValue: 'sm',
        description: [
          'Determine the width of the Sheet component. Possible values:',
          '- sm: 540px',
          '- md: 720px',
          '- lg: 900px',
        ],
        href: 'sizesExample',
      },
      {
        name: 'subHeading',
        type: `React.Node`,
        required: false,
        defaultValue: null,
        description: [
          'Supply the container element that is going to be used as the Sheet sub-heading docker under the heading.',
          'It can only be provided when a heading is also provided.',
        ],
        href: 'subHeadingExample',
      },
    ]}
  />
);

export default cards;
#Popover

This is a simple popover component that gives you an easy to use, 
and flexible popover menu.

##Install

```bash
$ npm install --save reactable-popover
```

##Usage

```js
<Popover
  className="my-class"                // Optional: A class name to be added to the popover
  toggleButton={<button>Foo</button>} // Required: The element that will toggle the popover. Does not have to be a button.
  position="top"                      // Optional: 
  leftOffset={10}
  topOffset={10}
  horizontalJustify="right">

  <ul>
    <li>Menu Item One</li>
    <li>Menu Item Two</li>
  </ul>
</Popover>
```

The content inside the popover component will be rendered as is. You can use it for
menus, forms, or just for informational purposes.

##Options
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Required?</th>
      <th>Description</th>
      <th>Parameters</th>
    </tr>
  </thead>

  </tbody>
    <tr>
      <td>className</td>
      <td>Optional</td>
      <td>A class name to be added to the outer div of the popover</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>toggleButton</td>
      <td>Required</td>
      <td>The element that will toggle the popover. This does not have to be a button.</td>
      <td>Any element</td>
    </tr>
    <tr>
      <td>position</td>
      <td>Optional</td>
      <td>The position of the popover relative to the toggleButton. Defaults to bottom.</td>
      <td>One of top, bottom, left, or right</td>
    </tr>
    <tr>
      <td>leftOffset</td>
      <td>Optional</td>
      <td>The number of pixels to offset the popover from the left (should be negative for right justified popovers)</td>
      <td>Any integer</td>
    </tr>
    <tr>
      <td>topOffset</td>
      <td>Options</td>
      <td>The number of pixels to offset the popover from the top of the popover. Defaults to 10.</td>
      <td>Any integer</td>
    </tr>
    <tr>
      <td>horizontalJustify</td>
      <td>Optional</td>
      <td>The side of the toggleButton to calculate the offset from. Defaults to left.</td>
      <td>One of left or right</td>
    </tr>
  </tbody>
</table>


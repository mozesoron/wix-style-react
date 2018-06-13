# RichTextArea component


## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| absoluteLinks | bool | false | - | Is the rich text area automatically transforming relative links to absolute after user insert |
| disabled | bool | false | - | Is the rich text area disabled |
| error  | bool | false | - | Is input value erroneous |
| errorMessage | string | - | - | The error message to display when hovering the error icon, if not given or empty there will be no tooltip |
| resizable | bool | false | - | Is the rich text area vertically resizable |
| maxHeight | string or number |  | - | Max height of the text editor |
| placeholder | string | - | - | Placeholder text |
| value | string | - | - | Content HTML. Supported tags: `p`, `strong`, `em`, `u`, `ul`, `ol`, `li` |
| onChange | func | - | - | Change callback |
| onImageRequest | func | - | - | Image icon click callback. It is a function which recieves a callback. The callback function should be called when we obtain the url text (callback(text)), causing the image to reflect in the editor   |


[@ryanuo/utils](../../index.md) / [browser](../index.md) / isMobile

# Function: isMobile()

```ts
function isMobile(): boolean;
```

Check if the user is visiting via a mobile device.

## Returns

`boolean`

Returns true if the user appears to be using a mobile device; otherwise returns false.

## Example

```ts
import { isMobile } from '@ryanuo/utils'
if (isMobile()) {
  console.log('This is a mobile device.')
}
```
This function determines the device type by detecting the User Agent. It uses regular expressions to search for typical identifiers of mobile devices.
If the User Agent contains keywords such as Android, webOS, iPhone, iPad, iPod, BlackBerry, IEMobile, or Opera Mini,
it identifies the device as mobile. This information is crucial for providing responsive design and optimizing user experience.

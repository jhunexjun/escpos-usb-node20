# node-escpos-node20
ESC/POS Printer driver for Node.js for node 20 or higher.

This is the project you need for thermal printer using USB.


## Appendix

Issue that fixed this project:

The official escpos-usb + node-usb combo does not currently support Node 20+ reliably out‑of‑the‑box. The ecosystem hasn’t been updated for newer Node versions, so most people stick with Node 18, which is the last version that works well with it.

Here’s a breakdown of why and what your options are:

Why It Currently Doesn’t Work on Node 20

- The package escpos-usb hasn’t been updated in years (~2020) and was built with older usb APIs in mind.

- Newer versions of the usb library (the native Node addon that escpos-usb depends on) changed API methods and event patterns (usb.on etc.) which breaks escpos-usb.

- Because both escpos and escpos-usb are unmaintained/older, there’s no version published that supports Node 20+ explicitly.

Downgrading to:

- Node 18.20.8 ✔️
- usb@1.6.3 ✔️

makes everything compatible because:

- usb@1.6.3 still uses the older API that escpos-usb expects.
- Node 18 is fully supported by the usb module and by native bindings.
- That’s why your print test works perfectly after installing those versions.
## Installation

This project was tested using
```bash
$ node -v
v20.19.0
```

If you use this usb as an adapter:

- On Linux, you'll need libudev to build libusb.
- On Ubuntu/Debian: sudo apt-get install build-essential libudev-dev.
- On Windows, Use Zadig to install the WinUSB driver for your USB device.
Otherwise you will get LIBUSB_ERROR_NOT_SUPPORTED when attempting to open devices.

Notes in installing Zadig.
- In my case my printer is Senda Portable Thermal Printer. It's a small printer bought from online.
- In your Zadig go to Options > List All Devices. 
- In my case it shows `POS 58 Printer`.
- You may try `WinUSB (v6.1.7600.16385)` as your driver or `libusbK (v3.0.5.16)`. Can't remember exactly.

In your project you have this dependency:

```bash
"dependencies": {
  "escpos": "^3.0.0-alpha.6",
  "escpos-usb-node20": "github:jhunexjun/escpos-usb-node20"
}
```
Or you can add it by `npm install escpos jhunexjun/escpos-usb-node20` but to be exact the above version is what I used because `npm install escpos` can install different version.
No need to depend on `usb package` `(npm install usb)` in your project since that's actually dependent to this project, not yours.

### Notes to Vite + Electron
Most probably you're using Vite because of Electron. In your `vite.main.config.mjs`.
```bash
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'usb',
        'escpos',
        'escpos-usb-node20'
      ]
    }
  }
})
```
Or probably if you want to experiment:
```bash
npm install --save-dev @electron/rebuild
npx electron-rebuild
```
Or specify the module
```bash
npx electron-rebuild -f -w usb
```
This recompiles usb for Electron's ABI.
## Usage/Examples

There are 2 ways for module loading.

ES module-way
```javascript
import escpos from 'escpos';
import USB from 'escpos-usb-node20';

escpos.USB = USB;
// Select the adapter based on your printer type
// console.log(escpos.USB.findPrinter());

// const device = new escpos.USB(4070, 33054); // example VID/PID
// or
const device = new escpos.USB();
const printer = new escpos.Printer(device);
device.open(() => {
  printer
    .align("CT")
    .style("B")
    .size(0.5, 0.5)
    .text("POS58 TEST Jhun")
    .text("Electron + Node.js")
    .cut()
    .close();
});
```
Note that in ES module way, you'll see a warning
`(node:4620) [MODULE_TYPELESS_PACKAGE_JSON]`
To eliminate, add below to your package.json. It's just warning, so the code will just run. For CommonJS, no need to add.
```bash
{
    "type": "module"
}
```

CommonJS way
```javascript
const escpos = require('escpos');
escpos.USB = require('node-escpos-node20');

// Select the adapter based on your printer type
// console.log(escpos.USB.findPrinter());

// const device = new escpos.USB(4070, 33054); // example VID/PID
// or
const device = new escpos.USB();

const printer = new escpos.Printer(device);

device.open(() => {
  printer
    .align("CT")
    .style("B")
    .size(0.5, 0.5)
    .text("POS58 TEST Jhun")
    .text("Electron + Node.js")
    .cut()
    .close();
});
```
## Acknowledgements

 - [ESCPOS PROJECT](https://github.com/lsongdev/node-escpos)


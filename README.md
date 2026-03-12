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

If you use this usb as an adapter:

- On Linux, you'll need libudev to build libusb.
- On Ubuntu/Debian: sudo apt-get install build-essential libudev-dev.
- On Windows, Use Zadig to install the WinUSB driver for your USB device.
Otherwise you will get LIBUSB_ERROR_NOT_SUPPORTED when attempting to open devices.

Notes in installing Zadig.
- In my case my printer is Senda Portable Thermal Printer. It's a small printer bought from online.
- In your Zadig go to Options > List All Devices. 
- In my case it shows `POS 58 Printer`.
- You may try `WinUSB (v6.1.7600.16385)` as your drive or `libusbK (v3.0.5.16)`. Can't remember exactly.

In your project you have this dependency:

```bash
"dependencies": {
  "escpos": "^3.0.0-alpha.6",
  "node-escpos-node20": "github:jhunexjun/node-escpos-node20"
}
```
Or you can add it by `npm install escpos jhunexjun/node-escpos-node20` but to be exact the above version is what I used because `npm install escpos` can install different version.
No need to depend on `usb package` `(npm install usb)` in your project since that's actually dependent to this project, not yours.
    
## Usage/Examples

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


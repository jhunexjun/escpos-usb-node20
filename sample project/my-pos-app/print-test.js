// const escpos = require('escpos');
// install escpos-usb adapter module manually
// escpos.USB = require('escpos-usb-node20');

import escpos from 'escpos';
import USB from 'escpos-usb-node20';

escpos.USB = USB;

// Select the adapter based on your printer type
// console.log(escpos.USB.findPrinter());

// const device = new escpos.USB(4070, 33054); // example VID/PID
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

  // printer
  //   .font('a')
  //   .align('ct')
  //   .style('bu')
  //   .size(0.5, 0.5)
  //   .text('The quick brown fox jumps over the lazy dog')
  //   .text('敏捷的棕色狐狸跳过懒狗')
  //   .barcode('1234567', 'EAN8')
  //   .table(["One", "Two", "Three"])
  //   .tableCustom(
  //     [
  //       { text:"Left", align:"LEFT", width:0.33, style: 'B' },
  //       { text:"Center", align:"CENTER", width:0.33},
  //       { text:"Right", align:"RIGHT", width:0.33 }
  //     ],
  //     { encoding: 'cp857', size: [1, 1] } // Optional
  //   )
  //   .qrimage('https://github.com/song940/node-escpos', function(err){
  //     this.cut();
  //     this.close();
  //   });
});
import ATEM from "applest-atem";

const atem = new ATEM();
atem.connect("192.168.86.60");

atem.once("stateChanged", (err, state) => {
  // Delay few seconds from connecting.
  const uploader = new ATEM.FileUploader(atem); // Pass the atem instance.
  uploader.uploadFromPNGFile("output/david_adams.png", 0, 0); // Pass a path of valid PNG file.
});

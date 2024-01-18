# Flickr images to postcard converter

The intention of this tool was to be able to convert my (digital) Flickr albums into analog albums.
Meaning: downloading the photos and then printing them in a standard postcard size (e.g. 10 x 15 cm / 4" x 6").

Example album: https://www.flickr.com/photos/more-cars/albums/72177720310105891/.

With modern printers this is not a difficult task.
But for my old printer there exist no drivers anymore, so I have to feed the images to it via USB stick.
Also, to avoid getting badly cropped or resized prints, the images need to be properly prepared.
And additionally, I wanted to print some meta information on the image (e.g. the Flickr id).

So, the scope of this tool is to download a given Flickr image or Flickr album, convert the photos and
save them in a separate folder.
It makes sure, that all photos are resized to the new aspect ratio,
but without stretching, squeezing or cropping the image.
Optionally, the user can define a text label and custom margins.

## Installation

### Requirements

* Node.js 14 or higher -> https://nodejs.org/en
* npm
* Flickr API key -> https://www.flickr.com/services/api/keys/

### Quickstart

* clone the repository: https://github.com/dgerike/flickr-images-to-postcard-converter
* install the dependencies: `npm install`
* configure the `.env` file
    * at least the `FLICKR_API_KEY` and the `FLICKR_IMAGE_ID` must be set
* run `npm start` on the terminal
* a `data` folder should have been created, containing the original and the processed photo

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

## Running the app as Docker container

If you only want to run the app, without installing Node.js and all of its dependencies then you can use one of the
prepared docker images.
They are available at
dockerhub: https://hub.docker.com/repository/docker/dennisgerike/flickr-photos-to-postcard-converter/general.

The following example runs the app by providing the settings via environment variables.

```
docker run \
  --env FLICKR_API_KEY=<YOUR_FLICKR_API_KEY> \
  --env FLICKR_IMAGE_ID=51457247338 \
  --env ASPECT_RATIO=1.5 \
  --env MARGIN_HORIZONTAL=0 \
  --env MARGIN_VERTICAL=5 \
  --env CUSTOM_TEXT='TEST 1234' \
  --env TEXT_COLOR='242,72,10' \
  --env TEXT_VERTICAL_BUFFER=2.5 \
  --volume $HOME/temp:/app/data \
  dennisgerike/flickr-photos-to-postcard-converter:latest
```

Alternatively, you can store the settings in an env file and provide that to docker.
See the `.env.template` file in the project's root directory for reference.

```
docker run \
  --env-file ./.env \
  --volume $HOME/temp:/app/data \
  dennisgerike/flickr-photos-to-postcard-converter:latest
```

## Running the app locally

### Requirements

* Node.js 14 or higher -> https://nodejs.org/en
* npm
* Flickr API key -> https://www.flickr.com/services/api/keys/

### Quickstart

* clone the repository: https://github.com/dgerike/flickr-photos-to-postcard-converter
* install the dependencies: `npm install`
* configure the `.env` file
    * at least the `FLICKR_API_KEY` and the `FLICKR_IMAGE_ID` must be set
* run `npm start` on the terminal
* a `data` folder should have been created, containing the original and the processed photo

## Running the tests

### Requirements

* Node.js 18 or higher -> https://nodejs.org/en
* npm
* Flickr API key -> https://www.flickr.com/services/api/keys/

### Quickstart

Executing the cucumber tests (behavior):

* run `npm run test-behavior`

Executing the jest tests (functionality aka unit tests):

* run `npm run test-functionality`

Executing all tests (behavior and functionality)

* run `npm test`

## Create docker image

* `docker login`
* `docker buildx create --use`
* ```
  docker buildx build . --push \
  --platform linux/amd64,linux/arm64 \
  --tag dennisgerike/flickr-photos-to-postcard-converter:1.4.0 \
  --tag dennisgerike/flickr-photos-to-postcard-converter:latest 
  ```

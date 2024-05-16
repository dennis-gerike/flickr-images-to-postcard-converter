# Flickr photos to postcard converter

[![Test Runs](https://github.com/dennis-gerike/flickr-photos-to-postcard-converter/actions/workflows/run-tests.yaml/badge.svg)](https://github.com/dennis-gerike/flickr-photos-to-postcard-converter/actions/workflows/run-tests.yaml)
[![Code Coverage](https://coveralls.io/repos/github/dennis-gerike/flickr-photos-to-postcard-converter/badge.svg?branch=main)](https://coveralls.io/github/dennis-gerike/flickr-photos-to-postcard-converter?branch=main)
[![Cucumber Reports](https://img.shields.io/badge/cucumber-reports-green.svg?logo=Cucumber)](https://reports.cucumber.io/report-collections/60e52a2b-f83f-4231-a64b-349387ca055c)
[![Docker Hub Images](https://img.shields.io/badge/dockerhub-images-blue.svg?logo=Docker)](https://hub.docker.com/r/dennisgerike/flickr-photos-to-postcard-converter/tags)

This tool allows you to convert and adjust your Flickr photos, so you can easily print them onto postcards.
It automatically downloads all photos of a given Flickr album,
adjusts them to have the standard postcard format of 3:2
and offers a few customization options.

![example](documentation/flickr-photo-2-postcard-converter.png)

* Example photo: https://www.flickr.com/photos/more-cars/34080043505/
* Example album: https://www.flickr.com/photos/more-cars/albums/72157689925468203/

## Why do I need a separate tool for that?

You can do this process manually, of course.
The downloading part is easy.
Flickr allows you to download all photos of an album with just a few clicks.
The printing part is also easy.
Most modern printers allow you to throw in a folder full of pictures,
change the paper size to `4x6 inches`
and the printer will do the rest.
No matter if the photos are ultra-wide or in portrait mode, the printer will embed them perfectly into the available
space.

So, why this tool then?
When you don't have a modern printer then things can become more difficult.
In my personal case, there exist no drivers anymore for my old printer.
The only remaining way to feed images to it is via USB stick.
But, the printer terminal offers only a handful of configuration options, the preview-screen is ultra-small and the
images cannot be zoomed.
Also, this mode does not allow to print the filename onto the photo, either.
So, in order to print a whole Flickr album, the preparation can be quite time-consuming.
And this is where this tool comes in.

## Features & Scope

First of all, this is a pure command-line tool.
There is no GUI (yet) to select the photos or configure the converter.

The scope of this tool is straightforward:

* download the given Flickr photo or Flickr album,
* convert the photos according to the configured settings,
* save them in the specified output folder

The user can configure the following options:

* adjusting the aspect ratio:
    * postcard format is only a suggestion, it can be any other aspect ratio
* adding horizontal and/or vertical margins:
    * for aesthetic reasons or to circumvent technical issues (e.g. limited printer capabilities)
* adding a caption:
    * e.g. to show the title of the photo or other meta information
* adjusting the space between text and photo:
    * for aesthetic reasons, so the text is not tightly pressed against the photo

The tool will make sure that all photos are correctly resized -
without stretching, squeezing or cropping the original photo.

## How to run the app

There are two options to run this app - **Docker** and **Node.js**.

Docker is the recommended way if you just want to use the app,
without the hassle of installing Node.js, npm and all the dependencies.

The Node.js option is the way to go if you want to be able to modify or debug the code, or to run the tests.

In either case, the configuration always happens via environment variables or an environment file.
Environment variables are recommended when using the Docker option.
The environment file is recommended for the Node.js case.

### Running in Docker container

The docker images are hosted on _Docker Hub_:

https://hub.docker.com/r/dennisgerike/flickr-photos-to-postcard-converter

They are available for `linux/amd64` and `linux/arm64`.
That should cover most of the common use cases (e.g. PC, M1 Mac, NAS, Raspberry Pi).
When your platform is not supported,
either try to build the missing image yourself (see below) or create a new issue in GitHub.

If not configured otherwise, the app will store the processed images in the folder `/app/data` **within** the container.
So, you need to attach a volume to get them out of the container (see examples below.)

#### ...via environment variables

The following example shows you a minimal version when using environment variables.
The `FLICKR_API_KEY` and `MEDIA_ID` are mandatory settings.
Omitting them will cause the app to fail.
All other settings are optional.
Omitting them will cause the app to use default values.

```shell
docker run \
  --env FLICKR_API_KEY=<YOUR_FLICKR_API_KEY> \
  --env MEDIA_ID=51457247338 \
  --volume $HOME/temp:/app/data \
  dennisgerike/flickr-photos-to-postcard-converter:latest
```

The next example shows a request that has every available configuration option selected.
Leaving variables empty (see `DOWNLOAD_PATH`) has the same effect as omitting them.
The app will fall back to using default values.

```shell
docker run \
  --env FLICKR_API_KEY=<YOUR_FLICKR_API_KEY> \
  --env SOURCE_TYPE=flickr-photo
  --env MEDIA_ID=51457247338 \
  --env DOWNLOAD_PATH= \
  --env PROCESSED_PATH='./flickr-postcard' \
  --env ASPECT_RATIO=1.5 \
  --env MARGIN_HORIZONTAL=0 \
  --env MARGIN_VERTICAL=5 \
  --env CUSTOM_TEXT='TEST 1234' \
  --env TEXT_COLOR='242,72,10' \
  --env TEXT_VERTICAL_BUFFER=2.5 \
  --volume $HOME/temp:/app/data \
  dennisgerike/flickr-photos-to-postcard-converter:latest
```

#### ...via environment file

Alternatively, you can push all the settings into an environment file and provide that to docker.
See the `.env.template` file in the project's root directory for reference.

```shell
docker run \
  --env-file ./.env \
  --volume $HOME/temp:/app/data \
  dennisgerike/flickr-photos-to-postcard-converter:latest
```

### Running via local Node.js

#### Requirements

For a local installation Node.js in version 14 or higher is needed.
Version 18 or higher is recommended.
See https://nodejs.org/en/about/previous-releases or https://nodejs.org/en.

This tool uses the official Flickr REST API to download the photos and the meta information.
For the tool to work a valid API key is necessary.
You can request one here: https://www.flickr.com/services/api/misc.api_keys.html

#### Quickstart

* clone the repository: https://github.com/dennis-gerike/flickr-photos-to-postcard-converter
* install the dependencies: `npm install`
* configure the `.env` file
    * at least the `FLICKR_API_KEY` and the `MEDIA_ID` must be set
* run `npm start`
* verify that a `data` folder has been created in the root directory of this repo
    * it should contain the original photo(s) and the processed image(s)

## Running the tests

There exist two test suites in the `./tests` folder -
the **functionality tests** (written in Jest) and
the **behavior tests** (written in Cucumber).
The behavior tests implement the Gherkin scenarios from the `./specification` folder.
They are written from the user's perspective and focus on the "what".
The other suite contains the unit tests (aka developer tests aka functionality tests).
Those focus on the "how".

All test results will be saved in the folder `./test-reports`.

### Requirements

Node.js 18 or higher is needed.
A valid Flickr API key is needed for the behavior tests.
The functionality tests don't need a Flickr API key.
Those are working with mocked API responses and fixtures.

### Quickstart

#### Executing the Cucumber tests

Running `npm run test-behavior` will execute all cucumber tests and then create a report in the folder `./test-reports`.

Running `npm run test-behavior-and-publish` does the same,
but additionally uploads the test report to `reports.cucumber.io`.
The results will be available there for 24 hours.

Cucumber tests that are executed in the GitHub Actions pipeline
(see `./.github/workflows/run-tests.yaml`) will also upload their results, but they will not be deleted after 24 hours.
They are all collected here: https://reports.cucumber.io/report-collections/60e52a2b-f83f-4231-a64b-349387ca055c.

#### Executing the Jest tests

Running `npm run test-functionality` will execute the whole Jest test suite.

When running `npm run test-functionality-with-coverage` then a code coverage report will be created afterward.
It will be saved in `./test-reports/coverage`.

When the Jest tests are executed in the GitHub Actions pipeline
(see `./.github/workflows/run-tests.yaml`) then the coverage report will automatically be uploaded to `coveralls.io`.
They are all collected here: https://coveralls.io/github/dennis-gerike/flickr-photos-to-postcard-converter.

#### Executing both test suites

To run all test suites the command `npm test` can be used.

#### Cleanup after testing

Running the tests will produce temporary files in different folders.
To remove those files the command `npm run cleanup` can be used.

## Creating the docker images

### Pipeline

The GitHub Actions pipeline is responsible for wrapping the app into a docker image.
Whenever a new git tag is created the pipeline will be triggered.
The first step will always be to run the test suites.
When they are green then the docker image will be built.
When the build step was successful, then the image will be uploaded to Docker Hub.
Should any of the steps fail, then the whole process will be cancelled.
Have a look at the workflow files `./.github/create-and-publish-docker-image.yaml`
and `./.github/build-docker-image.yaml` for more details.

### Manually

In case there are problems with the pipeline the images can also be created manually.

* open a terminal
* login to Docker Hub by running `docker login`
* run `docker buildx create --use` to be able to create cross-platform images
* run the following command to build the images and push them to Docker Hub
  ```shell
  docker buildx build . --push \
  --platform linux/amd64,linux/arm64 \
  --tag dennisgerike/flickr-photos-to-postcard-converter:<ENTER_VERSION_NUMBER> \
  --tag dennisgerike/flickr-photos-to-postcard-converter:latest 
  ```

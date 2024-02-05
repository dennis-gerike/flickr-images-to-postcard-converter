@FP2PC-2
Feature: Downloading a whole photo album from Flickr
  As a user
  I want to be able to download all photos from a specific Flickr album
  So, I can later convert them to postcards

  @FP2PC-8
  Scenario: It should be possible to download the original images for a given Flickr Album ID
    When the user selects the Flickr photo album "72157719875631770"
    When the user triggers the download of the photo album
    Then all photos of the album "72157719875631770" should have been downloaded

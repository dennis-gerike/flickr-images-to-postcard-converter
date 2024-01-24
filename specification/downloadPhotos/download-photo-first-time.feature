Feature: Downloading a photo from Flickr

  Scenario: It should be possible to download the original image for a given Flickr Photo ID
    When the user selects the Flickr photo "53477514597"
    When the user triggers the download
    Then the photo "53477514597" should have been downloaded

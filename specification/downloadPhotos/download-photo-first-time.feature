Feature: Downloading a single photo from Flickr
  As a user
  I want to be able to download a specific photo from Flickr
  So, I can later convert it to a postcard

  Scenario: It should be possible to download the original image for a given Flickr Photo ID
    When the user selects the Flickr photo "53477514597"
    When the user triggers the download of the photo
    Then the photo "53477514597" should have been downloaded

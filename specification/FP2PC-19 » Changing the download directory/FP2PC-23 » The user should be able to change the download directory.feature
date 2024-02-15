@FP2PC-19
Feature: Changing the download directory
  As a user
  I want to be able to specify the directory for the downloaded Flickr photos
  So, I can make sure that the app has sufficient write permissions and disk space

  @FP2PC-21
  Rule: The user should be able to change the download directory

  @FP2PC-23
  Scenario: The user should be able to change the download directory
    Given the user selected a Flickr photo
    When the user specifies the download directory
    And the user starts the conversion process
    Then the downloaded photo should be located in the specified directory

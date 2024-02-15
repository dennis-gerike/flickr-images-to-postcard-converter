@FP2PC-19 @ignore
Feature: Changing the download directory
  As a user
  I want to be able to specify the directory for the downloaded Flickr photos
  So, I can make sure that the app has sufficient write permissions and disk space

  @FP2PC-25
  Rule: If the specified download folder doesn't exist then it should automatically be created

  @FP2PC-34
  Scenario: If the specified download folder doesn't exist then it should automatically be created
    Given the user selected a Flickr photo
    When the user specifies a download directory that does not exist yet
    And the user starts the conversion process
    Then the downloaded photo should be located in the specified directory

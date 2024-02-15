@FP2PC-20
Feature: Changing the directory for the processed images
  As a user
  I want to be able to specify the directory in which the processed images will be saved
  So, I can make sure that the app has sufficient write permissions and disk space

  @FP2PC-26
  Rule: If the specified folder for the processed images doesn't exist then it should automatically be created

  @FP2PC-36
  Scenario: If the specified folder for the processed images doesn't exist then it should automatically be created
    Given the user selected a Flickr photo
    When the user specifies a directory for the processed images that does not exist yet
    And the user starts the conversion process
    Then the processed photo should be located in the specified directory

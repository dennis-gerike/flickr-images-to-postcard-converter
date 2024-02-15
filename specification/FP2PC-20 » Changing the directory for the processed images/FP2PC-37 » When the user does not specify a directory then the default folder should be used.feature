@FP2PC-20 @ignore
Feature: Changing the directory for the processed images
  As a user
  I want to be able to specify the directory in which the processed images will be saved
  So, I can make sure that the app has sufficient write permissions and disk space

  @FP2PC-35
  Rule: When the user does not specify a directory then the default folder should be used

  @FP2PC-37
  Scenario: When the user does not specify a directory then the default folder should be used
    Given the user selected a Flickr photo
    When the user does not specify the directory for the processed images
    And the user starts the conversion process
    Then the processed photo should be located in the default directory

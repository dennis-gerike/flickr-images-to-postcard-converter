@FP2PC-3 @ignore
Feature: Setting the aspect ratio of the final image
  As a user
  I want to be able to change the aspect ratio for the final image
  So, I don’t have to rely on my printer’s capabilities to resize the original image correctly

  @FP2PC-38
  Rule: When no aspect ratio is selected then the default value should be used

  @FP2PC-40
  Scenario: When no aspect ratio is selected then the default value should be used
    When the user selects a Flickr photo
    And the user starts the conversion process
    Then the converted image should have the default aspect ratio

@FP2PC-3
Feature: Setting the aspect ratio of the final image
  As a user
  I want to be able to change the aspect ratio for the final image
  So, I don’t have to rely on my printer’s capabilities to resize the original image correctly

  @FP2PC-11
  Rule: It should not be possible to select a negative aspect ratio

  @FP2PC-18
  Scenario: It should not be possible to select a negative aspect ratio
    Given the user selected a Flickr photo
    When the user configures the aspect ratio to be -5:10
    And the user starts the conversion process
    Then the conversion process should have failed

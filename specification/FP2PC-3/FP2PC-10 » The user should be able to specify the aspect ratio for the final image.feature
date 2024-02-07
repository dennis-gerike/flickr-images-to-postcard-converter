@FP2PC-3
Feature: Setting the aspect ratio of the final image
  As a user
  I want to be able to change the aspect ratio for the final image
  So, I don’t have to rely on my printer’s capabilities to resize the original image correctly

  @FP2PC-10
  Scenario: The user should be able to specify the aspect ratio for the final image
    When the user selects a photo with an aspect ratio of 16:9
    And the user configures the aspect ratio to be 3:2
    And the user starts the conversion process
    Then the converted image should have an aspect ratio of 3:2

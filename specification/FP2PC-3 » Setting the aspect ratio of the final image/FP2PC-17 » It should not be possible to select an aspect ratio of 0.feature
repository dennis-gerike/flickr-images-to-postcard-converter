@FP2PC-3
Feature: Setting the aspect ratio of the final image
  As a user
  I want to be able to change the aspect ratio for the final image
  So, I don’t have to rely on my printer’s capabilities to resize the original image correctly

  @FP2PC-12
  Rule: It should not be possible to select an aspect ratio of 0

  @FP2PC-17
  Scenario: It should not be possible to select an aspect ratio of 0
    When the user configures the aspect ratio to be 0
    And the user starts the conversion process
    Then the conversion process should have failed

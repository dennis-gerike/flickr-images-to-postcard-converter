@FP2PC-3
Feature: Setting the aspect ratio of the final image
  As a user
  I want to be able to change the aspect ratio for the final image
  So, I don’t have to rely on my printer’s capabilities to resize the original image correctly

  @FP2PC-10
  Scenario: It should be possible to change the aspect ratio for the final image
    Given there exists an original image with an aspect ratio of 16:9
    When the user selects an original image with an aspect ratio of 16:9
    And the user sets the aspect ratio of the final image to 3:2
    Then the final image should have an aspect ratio of 3:2

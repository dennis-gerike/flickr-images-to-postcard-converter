Feature: Setting the aspect ratio of the final image

  Scenario: It should be possible to change the aspect ratio for the final image
    Given there exists an original image with an aspect ratio of 16:9
    When the user selects an original image with an aspect ratio of 16:9
    And the user sets the aspect ratio of the final image to 3:2
    Then the final image should have an aspect ratio of 3:2

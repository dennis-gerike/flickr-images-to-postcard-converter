@FP2PC-3
Feature: Setting the aspect ratio of the final image
  As a user
  I want to be able to change the aspect ratio for the final image
  So, I don’t have to rely on my printer’s capabilities to resize the original image correctly

  @FP2PC-9
  Rule: No component or setting should influence the aspect ratio of the final image

  @FP2PC-14
  Scenario: No component or setting should influence the aspect ratio of the final image
    When the user selects a Flickr photo
    And the user adds a horizontal margin
    And the user adds a vertical margin
    And the user adds a text
    And the user adds a buffer between text and image
    And the user configures the aspect ratio to be 3:2
    And the user starts the conversion process
    Then the converted image should have an aspect ratio of 3:2

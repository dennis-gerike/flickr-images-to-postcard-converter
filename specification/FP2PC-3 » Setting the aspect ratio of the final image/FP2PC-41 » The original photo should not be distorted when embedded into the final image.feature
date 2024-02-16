@FP2PC-3
Feature: Setting the aspect ratio of the final image
  As a user
  I want to be able to change the aspect ratio for the final image
  So, I don’t have to rely on my printer’s capabilities to resize the original image correctly

  @FP2PC-13
  Rule: The original photo should not be distorted when embedded into the final image

  @FP2PC-41
  Scenario: The original photo should not be distorted when embedded into the final image
    When the user selects a Flickr photo
    And the user configures the aspect ratio to be 3:2
    And the user starts the conversion process
    Then the original image should be embedded in the final image without any distortion

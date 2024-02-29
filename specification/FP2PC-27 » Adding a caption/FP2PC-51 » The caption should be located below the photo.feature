@FP2PC-27 @ignore
Feature: Adding a caption
  As a user
  I want to be able to add a caption to the final image
  So I know what is shown there or where the photo was taken or where I can find the original

  @FP2PC-46
  Rule: The caption should be located below the photo

  @FP2PC-51
  Scenario: The caption should be located below the photo
    When the user selects a Flickr photo
    And the user specifies a caption
    And the user starts the conversion process
    Then in the processed image the caption should be below the photo

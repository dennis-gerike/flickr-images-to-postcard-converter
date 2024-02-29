@FP2PC-27 @ignore
Feature: Adding a caption
  As a user
  I want to be able to add a caption to the final image
  So I know what is shown there or where the photo was taken or where I can find the original

  @FP2PC-42
  Rule: The user should be able to add a caption

  @FP2PC-47
  Scenario: The user should be able to add a caption
    When the user selects a Flickr photo
    And the user specifies a caption
    And the user starts the conversion process
    Then the processed image should contain a photo
    And the processed image should contain a caption

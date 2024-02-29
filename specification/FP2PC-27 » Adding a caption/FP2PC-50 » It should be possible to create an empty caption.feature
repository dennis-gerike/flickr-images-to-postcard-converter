@FP2PC-27 @ignore
Feature: Adding a caption
  As a user
  I want to be able to add a caption to the final image
  So I know what is shown there or where the photo was taken or where I can find the original

  @FP2PC-45
  Rule: When no caption is specified then no space should be reserved for it

  @FP2PC-50
  Scenario: It should be possible to create an empty caption
    Given the user selected a Flickr photo
    When the user specifies an empty caption
    And the user starts the conversion process
    Then the processed image should contain a caption
    But the caption in the processed image should contain no text

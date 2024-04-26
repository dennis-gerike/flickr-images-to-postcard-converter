@FP2PC-64 @ignore
Feature: Support for empty caption
  As a user
  I want to have the option to create an empty caption segment
  So I can manually add information about the picture

  @FP2PC-52
  Rule: The user should be able to specify an empty caption

  @FP2PC-50
  Scenario: It should be possible to create an empty caption
    Given the user selected a photo with an aspect ratio of 1:1
    When the user specifies an empty caption
    And the user starts the conversion process
    Then the final image should contain a caption segment
    But the caption segment in the final image should contain no text
